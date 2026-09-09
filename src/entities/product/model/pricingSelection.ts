import type { ProductPricingOption } from "./pricingTypes";
import { DISCOUNT_LABELS } from "./discountTypes.ts";

/** 선택이 바뀌면 새 조건에서 허용되는 할인 방식·할부 개월로 좁힌다. */
export function resolvePricingSelection(pricing: ProductPricingOption | undefined, discountId: string, installmentId: string) {
  const allowed = pricing?.availableDiscountTypes ?? [];
  const discountType = allowed.find((type) => type === discountId) ?? allowed[0];
  const discount = pricing?.discountOptions.find((option) => option.discountType === discountType);
  const source = discount?.installmentOptions.length ? discount.installmentOptions : pricing?.installmentOptions ?? [];
  const months = [...new Set(source.map((option) => option.months).filter((value) => Number.isInteger(value) && value > 0))].sort((a, b) => a - b);
  const installmentMonths = months.find((value) => String(value) === installmentId) ?? months[0];
  return {
    discountType,
    installmentMonths,
    discountTypeOptions: allowed.map((type) => ({ id: type, label: DISCOUNT_LABELS[type] })),
    installmentOptions: months.map((value) => ({ id: String(value), label: `${value}개월` })),
    request: pricing?.id && discountType ? {
      pricing_id: pricing.id, discount_type: discountType,
      ...(installmentMonths ? { installment_months: installmentMonths } : {}),
    } : null,
  };
}
