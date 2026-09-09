import type { PricingPolicy } from "@/entities/pricing-policy/api/admin";
import { calcEstimate, type PricingCalcInput } from "../../../entities/pricing-policy/model/calc.ts";

export function pricingPreviewComparison(input: PricingCalcInput, policy: PricingPolicy) {
  return {
    withoutRebate: calcEstimate({ ...input, rebateAmount: 0 }, policy),
    withRebate: calcEstimate(input, policy),
  };
}
