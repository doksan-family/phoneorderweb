import type { ProductPricingEntryDraft } from "./types";

/** 대상 가입유형의 지원금·개별 설정 전체를 교체하며 원본과 참조를 공유하지 않는다. */
export function copySubscriptionPricing(
  entry: ProductPricingEntryDraft,
  source: string,
  target: string,
): Partial<ProductPricingEntryDraft> {
  if (source === target || !entry.subscriptionTypes.includes(source) || !entry.subscriptionTypes.includes(target)) return {};
  return {
    publicSupportBySubType: {
      ...entry.publicSupportBySubType,
      [target]: { ...entry.publicSupportBySubType[source] },
    },
    rebateBySubType: {
      ...entry.rebateBySubType,
      [target]: entry.rebateBySubType[source] ?? null,
    },
    conditionOverrides: {
      ...entry.conditionOverrides,
      [target]: structuredClone(entry.conditionOverrides?.[source] ?? {}),
    },
  };
}
