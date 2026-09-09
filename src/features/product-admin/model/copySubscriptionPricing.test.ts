import assert from "node:assert/strict";
import { test } from "node:test";
import { copySubscriptionPricing } from "./copySubscriptionPricing.ts";
import type { ProductPricingEntryDraft } from "./types";

function entry(): ProductPricingEntryDraft {
  return {
    id: "entry", carrierCode: "skt", planId: "plan", availableDiscountTypes: ["public_support", "contract_discount"],
    subscriptionTypes: ["number_transfer", "device_change"],
    publicSupportBySubType: { number_transfer: { "256GB": 0, "512GB": 300000 }, device_change: { "256GB": 100000 } },
    rebateBySubType: { number_transfer: 200000, device_change: null },
    conditionOverrides: { number_transfer: { "512GB": { availableDiscountTypes: ["contract_discount"], rebateAmount: 150000, isActive: false } }, device_change: { "256GB": { rebateAmount: 90000 } } },
  };
}

test("번호이동의 0원 지원금·공통 금액·개별 설정을 기기변경에 독립적으로 복사한다", () => {
  const source = entry();
  const next = { ...source, ...copySubscriptionPricing(source, "number_transfer", "device_change") };
  assert.deepEqual(next.publicSupportBySubType.device_change, { "256GB": 0, "512GB": 300000 });
  assert.equal(next.rebateBySubType.device_change, 200000);
  assert.deepEqual(next.conditionOverrides?.device_change, source.conditionOverrides?.number_transfer);
  next.publicSupportBySubType.device_change["512GB"] = 1;
  next.conditionOverrides!.device_change["512GB"].availableDiscountTypes!.push("public_support");
  assert.equal(source.publicSupportBySubType.number_transfer["512GB"], 300000);
  assert.deepEqual(source.conditionOverrides?.number_transfer["512GB"].availableDiscountTypes, ["contract_discount"]);
  assert.equal(source.publicSupportBySubType.device_change["256GB"], 100000);
});

test("기기변경에서 역방향 복사할 때 빈 값과 없는 개별 설정도 교체한다", () => {
  const source = entry();
  delete source.conditionOverrides!.device_change;
  const next = { ...source, ...copySubscriptionPricing(source, "device_change", "number_transfer") };
  assert.equal(next.rebateBySubType.number_transfer, null);
  assert.deepEqual(next.publicSupportBySubType.number_transfer, { "256GB": 100000 });
  assert.deepEqual(next.conditionOverrides?.number_transfer, {});
  assert.equal(next.planId, source.planId);
  assert.deepEqual(next.availableDiscountTypes, source.availableDiscountTypes);
});

test("선택하지 않은 가입유형을 복사 대상으로 만들지 않는다", () => {
  const source = { ...entry(), subscriptionTypes: ["number_transfer"] };
  assert.deepEqual(copySubscriptionPricing(source, "number_transfer", "device_change"), {});
});
