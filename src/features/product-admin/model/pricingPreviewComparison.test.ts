import assert from "node:assert/strict";
import { test } from "node:test";
import { pricingPreviewComparison } from "./pricingPreviewComparison.ts";
import { equalPaymentMonthly } from "../../../shared/lib/installment.ts";
import type { PricingPolicy } from "@/entities/pricing-policy/api/admin";

const policy: PricingPolicy = { contract_discount_rate: 25, installment_annual_rate: 5.9, installment_calculation_method: "equal_payment", rebate_applies_to_public_support: true, rebate_applies_to_contract_discount: true, updated_at: "" };
const input = { releasePrice: 1200000, planMonthlyFee: 80000, publicSupportAmount: 300000, rebateAmount: 200000, installmentMonths: 24 };

for (const discountType of ["public_support", "contract_discount"] as const) {
  test(`${discountType}: 지원금 제외·적용 금액을 원금과 이자로 각각 계산한다`, () => {
    const { withoutRebate, withRebate } = pricingPreviewComparison({ ...input, discountType }, policy);
    const base = discountType === "public_support" ? 900000 : 1200000;
    assert.equal(withoutRebate.deviceInstallmentPrincipal, base);
    assert.equal(withRebate.deviceInstallmentPrincipal, base - 200000);
    assert.equal(withoutRebate.monthlyDevicePayment, equalPaymentMonthly(base, 5.9, 24));
    assert.equal(withRebate.monthlyDevicePayment, equalPaymentMonthly(base - 200000, 5.9, 24));
    assert.equal(withRebate.totalBenefitAmount - withoutRebate.totalBenefitAmount, 200000);
    assert.equal(withRebate.discountedPlanMonthlyFee, withoutRebate.discountedPlanMonthlyFee);
    assert.equal(input.rebateAmount, 200000);
  });
}

test("가격 정책이 추가 지원금을 적용하지 않으면 두 견적은 같은 납부금이다", () => {
  const { withoutRebate, withRebate } = pricingPreviewComparison({ ...input, discountType: "contract_discount" }, { ...policy, rebate_applies_to_contract_discount: false });
  assert.equal(withRebate.estimatedMonthlyPayment, withoutRebate.estimatedMonthlyPayment);
  assert.equal(withRebate.appliedRebateAmount, 0);
});

test("추가 지원금이 0원이거나 미입력인 경우 동일한 금액을 표시한다", () => {
  for (const rebateAmount of [0, null]) {
    const { withoutRebate, withRebate } = pricingPreviewComparison({ ...input, rebateAmount, discountType: "public_support" }, policy);
    assert.equal(withRebate.estimatedMonthlyPayment, withoutRebate.estimatedMonthlyPayment);
  }
});
