import type { ProductCreatePricingOverrideInput } from "@/entities/product/api/types";
import type { ProductDraft } from "./types";
import { pricingEntryCondition } from "./pricingEntryCondition.ts";

/** 한 요금제·가입유형·용량의 허용 방식과 금액을 하나의 규칙으로 저장한다. */
export function createPricingOverrides(draft: ProductDraft): ProductCreatePricingOverrideInput[] {
  const rows: ProductCreatePricingOverrideInput[] = [];
  const subscriptions = [...new Set(draft.pricingEntries.flatMap((entry) => entry.subscriptionTypes))];
  for (const entry of draft.pricingEntries) {
    for (const subscriptionType of subscriptions) {
      for (const variant of draft.variants) {
        const condition = pricingEntryCondition(entry, subscriptionType, variant.storageValue);
        rows.push({
          plan_id: entry.planId,
          subscription_type: subscriptionType,
          storage_value: variant.storageValue.trim(),
          available_discount_types: [...condition.availableDiscountTypes],
          public_support_amount: condition.publicSupportAmount ?? 0,
          rebate_amount: condition.rebateAmount ?? 0,
          priority: rows.length, display_order: rows.length, is_active: entry.subscriptionTypes.includes(subscriptionType) && condition.isActive,
        });
      }
    }
  }
  return rows;
}
