import assert from "node:assert/strict";
import { test } from "node:test";
import { buildPricingEntries } from "./productPricingPrefill.ts";
import { createPricingOverrides } from "./productPricingPayload.ts";
import { pricingEntryCondition } from "./pricingEntryCondition.ts";
import { mapAdminProductOptions } from "../../../entities/product/model/adminProductOptionMapper.ts";
import type { ProductDraft } from "./types";

const variants = ["256GB", "512GB"].map((storage_value, index) => ({ storage_value, release_price: 1000000, display_order: index, is_active: true }));
function draft(entries: ProductDraft["pricingEntries"]): ProductDraft {
  return { categoryCode: "samsung", brand: "삼성", name: "휴대폰", summary: "", badges: [], isFeatured: false, colors: [],
    installmentMonths: [24], variants: variants.map((value) => ({ id: value.storage_value, storageValue: value.storage_value, releasePrice: value.release_price })), pricingEntries: entries };
}

test("관리자 응답 → 편집 → 저장 왕복 시 허용 방식·용량별 금액·비활성 조건을 보존한다", () => {
  const source = mapAdminProductOptions({
    plan_ids: ["plan-a", "plan-b"], subscription_types: ["number_transfer", "device_change"], variants,
    pricing_overrides: [
      { rebate_amount: 100000, public_support_amount: 300000, priority: 0 },
      { plan_id: "plan-a", available_discount_types: ["contract_discount"], priority: 10 },
      { plan_id: "plan-a", storage_value: "512GB", rebate_amount: 250000, available_discount_types: ["public_support"], priority: 20 },
      { plan_id: "plan-b", subscription_type: "device_change", is_active: false, priority: 30 },
    ],
  });
  const entries = buildPricingEntries(source);
  assert.equal(entries.length, 2);
  assert.deepEqual(pricingEntryCondition(entries[0], "number_transfer", "256GB").availableDiscountTypes, ["contract_discount"]);
  assert.equal(pricingEntryCondition(entries[0], "number_transfer", "512GB").rebateAmount, 250000);
  const rows = createPricingOverrides(draft(entries));
  assert.equal(rows.length, 8);
  assert.equal(rows.filter((row) => row.plan_id === "plan-b" && row.subscription_type === "device_change").every((row) => row.is_active === false), true);
  const restored = buildPricingEntries({ ...source, pricingOverrides: rows });
  for (let index = 0; index < entries.length; index++) {
    for (const sub of ["number_transfer", "device_change"]) {
      for (const storage of ["256GB", "512GB"]) assert.deepEqual(pricingEntryCondition(restored[index], sub, storage), pricingEntryCondition(entries[index], sub, storage));
    }
  }
});

test("구버전 응답의 허용 방식 생략은 두 방식이며 선택약정을 금액 유무로 추측하지 않는다", () => {
  const entries = buildPricingEntries({ planIds: ["a", "b"], subscriptionTypes: ["number_transfer"], variants, pricingOverrides: [{ plan_id: "a", rebate_amount: 100000 }] });
  assert.equal(entries.length, 2);
  assert.deepEqual(entries[0].availableDiscountTypes, ["public_support", "contract_discount"]);
  const rows = createPricingOverrides(draft(entries));
  assert.equal(rows.length, 4);
  assert.ok(rows.every((row) => row.available_discount_types?.length === 2));
  assert.ok(rows.every((row) => row.public_support_amount === 0));
});

test("같은 우선순위에서는 구체적인 규칙이 우선하고 누락 차원의 규칙도 적용된다", () => {
  const entries = buildPricingEntries({ planIds: ["a"], subscriptionTypes: ["number_transfer"], variants, pricingOverrides: [
    { plan_id: "a", storage_value: "256GB", public_support_amount: 400000 },
    { public_support_amount: 100000 },
  ] });
  assert.equal(pricingEntryCondition(entries[0], "number_transfer", "256GB").publicSupportAmount, 400000);
  assert.equal(pricingEntryCondition(entries[0], "number_transfer", "512GB").publicSupportAmount, 100000);
});
