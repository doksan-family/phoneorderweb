import assert from "node:assert/strict";
import { test } from "node:test";
import { QueryClient } from "@tanstack/react-query";
import { productQuoteQueryOptions } from "./quoteQueries.ts";
import type { ProductQuoteData } from "../api/quoteTypes";

const data: ProductQuoteData = {
  pricing_id: "pricing-a", product_id: "product-a", product_variant_id: "variant-a", plan_id: "plan-a",
  subscription_type: "number_transfer", available_discount_types: ["contract_discount"], discount_type: "contract_discount",
  installment_months: 36, estimated_monthly_payment: 55000,
};

test("견적 요청은 할인 방식 하나와 할부 개월을 전송하고 응답 ID·금액을 상담에 사용한다", async (t) => {
  const request = { pricing_id: "pricing-a", discount_type: "contract_discount" as const, installment_months: 36 };
  t.mock.method(globalThis, "fetch", async (url: string, init: RequestInit) => {
    assert.ok(url.endsWith("/functions/v1/public-product-quote"));
    assert.equal(init.method, "POST");
    assert.deepEqual(JSON.parse(String(init.body)), request);
    return new Response(JSON.stringify({ ok: true, data }));
  });
  const client = new QueryClient();
  try {
    const result = await client.fetchQuery(productQuoteQueryOptions(request));
    assert.equal(result.estimate.estimatedMonthlyPayment, 55000);
    assert.equal(result.consultationPayload?.discountType, "contract_discount");
    assert.equal(result.consultationPayload?.installmentMonths, 36);
    assert.equal(result.consultationPayload?.variantId, "variant-a");
  } finally { client.clear(); }
});

test("견적 캐시는 할인 방식과 할부 개월을 구분하고 조건 없이는 실행하지 않는다", () => {
  const first = productQuoteQueryOptions({ pricing_id: "a", discount_type: "public_support", installment_months: 24 });
  assert.notDeepEqual(first.queryKey, productQuoteQueryOptions({ pricing_id: "a", discount_type: "contract_discount", installment_months: 24 }).queryKey);
  assert.notDeepEqual(first.queryKey, productQuoteQueryOptions({ pricing_id: "a", discount_type: "public_support", installment_months: 36 }).queryKey);
  assert.equal(first.staleTime, 30000);
  assert.equal(productQuoteQueryOptions(null).enabled, false);
});

test("서버가 선택한 방식을 허용하지 않으면 이전 금액으로 상담하지 않는다", async (t) => {
  t.mock.method(globalThis, "fetch", async () => new Response(JSON.stringify({ ok: true, data })));
  const client = new QueryClient();
  try {
    await assert.rejects(client.fetchQuery(productQuoteQueryOptions({ pricing_id: "pricing-a", discount_type: "public_support" })), /할인 방식/);
  } finally { client.clear(); }
});
