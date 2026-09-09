import type { ProductPricingEntryDraft } from "./types";

export function pricingEntryCondition(entry: ProductPricingEntryDraft, sub: string, storage: string) {
  const override = entry.conditionOverrides?.[sub]?.[storage];
  return {
    isActive: override?.isActive ?? true,
    availableDiscountTypes: override?.availableDiscountTypes ?? entry.availableDiscountTypes,
    publicSupportAmount: entry.publicSupportBySubType[sub]?.[storage] ?? null,
    rebateAmount: override?.rebateAmount !== undefined ? override.rebateAmount : entry.rebateBySubType[sub] ?? null,
  };
}
