import assert from "node:assert/strict";
import { test } from "node:test";
import type { PublicProductDetail, PublicProductPricingOption } from "../api/publicTypes";
import type { ProductDetailProfile } from "./types";
import { getDefaultConsultationSelection, getDefaultPricingOption, mapPricingOptions } from "./publicProductProfileEstimate.ts";
import { resolvePricingSelection } from "./pricingSelection.ts";
import { resolveConsultationSelection } from "../../../features/consultation/model/resolveConsultationSelection.ts";

const pricing: PublicProductPricingOption = {
  pricing_id: "pricing-a", variant_id: "variant-a", carrier_id: "skt", carrier_name: "SKT",
  plan_id: "plan-a", plan_name: "요금제", plan_monthly_fee: 80000,
  subscription_type: "number_transfer", subscription_type_label: "번호이동",
  available_discount_types: ["contract_discount"],
  quote: { discount_type: "public_support", installment_months: 24, estimated_monthly_payment: 90000 },
  discount_options: [
    { discount_type: "public_support", discount_type_label: "공시지원금", quote: { estimated_monthly_payment: 90000 } },
    { discount_type: "contract_discount", discount_type_label: "선택약정", quote: { estimated_monthly_payment: 60000 },
      installment_options: [{ installment_months: 36, quote: { estimated_monthly_payment: 55000 } }] },
  ],
};
const detail: PublicProductDetail = { id: "product-a", name: "상품", category: "samsung", category_code: "samsung", category_name: "삼성", brand: "삼성", summary: "", representative_image_url: null, pricing_options: [pricing] };
function profile(): ProductDetailProfile {
  return { colors: [{ id: "black", label: "블랙", hexCode: "#000000" }], capacities: [], currentCarriers: [], joiningCarriers: [], plans: [], discounts: [], estimate: null, detailTabs: { modelInfo: [], cautions: [] }, pricingOptions: mapPricingOptions(detail) };
}

test("상세 응답에 금액이 있어도 available_discount_types가 허용하지 않으면 노출하지 않는다", () => {
  const option = mapPricingOptions(detail)[0];
  assert.deepEqual(option.availableDiscountTypes, ["contract_discount"]);
  assert.deepEqual(option.discountOptions.map((item) => item.discountType), ["contract_discount"]);
  const selected = resolvePricingSelection(option, "public_support", "24");
  assert.deepEqual(selected.request, { pricing_id: "pricing-a", discount_type: "contract_discount", installment_months: 36 });
});

test("구버전 응답의 허용 방식 생략은 두 방식을 유지하고 명시적 빈 목록은 견적을 만들지 않는다", () => {
  const old = mapPricingOptions({ ...detail, pricing_options: [{ ...pricing, available_discount_types: undefined }] })[0];
  assert.equal(old.availableDiscountTypes.length, 2);
  const none = mapPricingOptions({ ...detail, pricing_options: [{ ...pricing, available_discount_types: [] }] })[0];
  assert.equal(resolvePricingSelection(none, "", "").request, null);
});

test("default_selection의 pricing_id를 먼저 사용한다", () => {
  const other = { ...pricing, pricing_id: "pricing-b" };
  assert.equal(getDefaultPricingOption({ ...detail, pricing_options: [pricing, other], default_selection: { pricing_id: "pricing-b" } })?.pricing_id, "pricing-b");
});

test("서버 기본 선택의 할인 방식·할부·색상을 상품 상세 초기값으로 복원한다", () => {
  const selection = getDefaultConsultationSelection({ ...detail, default_selection: {
    pricing_id: "pricing-a", discount_type: "contract_discount", installment_months: 36, color_value: "black",
  } });
  assert.equal(selection?.discountType, "contract_discount");
  assert.equal(selection?.installmentMonths, 36);
  assert.equal(selection?.colorValue, "black");
  assert.equal(selection?.productId, "product-a");
});

test("상담 URL은 허용되지 않은 할인·할부·색상·다른 ID 조합을 거부한다", () => {
  const value = profile();
  for (const query of ["discountType=public_support", "installmentMonths=24", "colorValue=red", "pricingId=missing", "pricingId=pricing-a&variantId=other", "planId=other"]) {
    assert.equal(resolveConsultationSelection(value, new URLSearchParams(query)), null, query);
  }
  const valid = resolveConsultationSelection(value, new URLSearchParams("pricingId=pricing-a&discountType=contract_discount&installmentMonths=36&colorValue=black"));
  assert.equal(valid?.request?.discount_type, "contract_discount");
  assert.equal(valid?.request?.installment_months, 36);
  assert.equal(resolveConsultationSelection({ ...value, canApplyForConsultation: false }, new URLSearchParams()), null);
});
