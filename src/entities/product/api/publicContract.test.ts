import assert from "node:assert/strict";
import { test } from "node:test";
import { fetchPublicProducts, fetchPublicProductDetail } from "./public.ts";
import { fetchPublicApiBootstrap } from "../../public-api/api/public.ts";
import { mapPublicProductToProduct } from "../model/publicProductMapper.ts";
import { appendProductFields } from "./adminProductForm.ts";
import { createConsultation } from "../../consultation/api/public.ts";

const product = {
  id: "product-a", name: "상품", brand: "삼성", category: "samsung", category_code: "samsung", category_name: "삼성", summary: "", representative_image_url: null,
  can_apply_for_consultation: false,
  default_pricing: { plan_name: "요금제", quote: { estimated_monthly_payment: 55000 } },
  consultation_payload: { product_id: "product-a", pricing_id: "pricing-a", variant_id: "variant-a", plan_id: "plan-a", subscription_type: "number_transfer" as const, discount_type: "contract_discount" as const, installment_months: 36 },
};

test("카드 단말 가격은 서버 원금을 사용하고 0원과 견적 누락을 구분한다", () => {
  for (const amount of [0, 750000]) {
    const mapped = mapPublicProductToProduct({ ...product, can_apply_for_consultation: true,
      default_pricing: { quote: { device_installment_principal: amount } } });
    assert.equal(mapped.discountedDevicePrice, amount);
  }
  assert.equal(mapPublicProductToProduct({ ...product, can_apply_for_consultation: true }).discountedDevicePrice, null);
  assert.equal(mapPublicProductToProduct({ ...product,
    default_pricing: { device_installment_principal: 750000 } }).discountedDevicePrice, null);
  assert.equal(mapPublicProductToProduct({ ...product, can_apply_for_consultation: true,
    default_pricing: { device_installment_principal: 750000 } }).discountedDevicePrice, 750000);
});

test("상품 목록과 bootstrap은 같은 상품 DTO의 상담 가능 여부·기본 견적·선택값을 보존한다", async (t) => {
  t.mock.method(globalThis, "fetch", async (url: string) => new Response(JSON.stringify({ ok: true,
    data: url.includes("bootstrap") ? { products: [product], banners: { main: [], event: [] }, categories: { items: [] }, site_settings: {} } : [product],
  })));
  const direct = await fetchPublicProducts();
  const bootstrap = await fetchPublicApiBootstrap();
  assert.deepEqual(direct, bootstrap.products);
  const mapped = mapPublicProductToProduct(direct[0]);
  assert.equal(mapped.canApplyForConsultation, false);
  assert.equal(mapped.monthlyEstimate, 55000);
  assert.equal(mapped.consultationPayload?.discountType, "contract_discount");
  assert.equal(mapped.consultationPayload?.installmentMonths, 36);
});

test("상세 endpoint는 pricing_id와 허용 방식 목록을 그대로 전달한다", async (t) => {
  t.mock.method(globalThis, "fetch", async (url: string) => {
    assert.ok(url.endsWith("/functions/v1/public-product-detail?id=product-a"));
    return new Response(JSON.stringify({ ok: true, data: { ...product, pricing_options: [{ pricing_id: "pricing-a", available_discount_types: ["contract_discount"] }] } }));
  });
  const detail = await fetchPublicProductDetail("product-a");
  assert.deepEqual(detail.pricing_options?.[0].available_discount_types, ["contract_discount"]);
});

test("관리자 multipart는 허용 방식 배열을 가격 조건 JSON 내부에 담고 단일 discount_type은 보내지 않는다", () => {
  const form = new FormData();
  const rows = [{ plan_id: "plan-a", available_discount_types: ["public_support", "contract_discount"] as const, public_support_amount: 300000, rebate_amount: 200000 }];
  appendProductFields(form, { pricing_overrides: rows.map((row) => ({ ...row, available_discount_types: [...row.available_discount_types] })) });
  assert.deepEqual(JSON.parse(String(form.get("pricing_overrides"))), rows);
  assert.equal(form.has("discount_type"), false);
});

test("상담 endpoint에는 확인된 견적의 ID와 선택한 할인 방식 하나만 보낸다", async (t) => {
  const payload = { ...product.consultation_payload, name: "테스트", phone: "01012345678", password: "test-only", privacy_agreed: true as const, marketing_agreed: false };
  t.mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
    assert.ok(url.endsWith("/functions/v1/public-consultations"));
    assert.equal(init.method, "POST");
    const body = JSON.parse(String(init.body));
    assert.equal(body.discount_type, "contract_discount");
    assert.equal(body.installment_months, 36);
    assert.equal(body.pricing_id, "pricing-a");
    assert.equal("available_discount_types" in body, false);
    return new Response(JSON.stringify({ ok: true, data: { id: "consultation-a" } }), { status: 201 });
  });
  await createConsultation(payload);
});
