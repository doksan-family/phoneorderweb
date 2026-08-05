import type { ProductCreatePayload } from "@/entities/product/api/admin";
import type { ProductDraft } from "./types";

export function createPayloadFromDraft(draft: ProductDraft): ProductCreatePayload {
  return {
    category_code: draft.category_code,
    brand: draft.brand,
    name: draft.name.trim(),
    summary: nullableText(draft.summary),
    badges: draft.badges.map((badge) => badge.trim()).filter(Boolean),
    is_featured: draft.is_featured,
    display_order: 0,
    is_active: true,
    variants: draft.variants.map((variant, index) => ({
      storage_value: variant.storageValue.trim(),
      original_price: variant.originalPrice,
      sale_price: variant.salePrice,
      display_order: index,
      is_active: true,
    })),
    colors: draft.colors
      .filter((color) => color.label.trim() && color.colorHex.trim())
      .map((color, index) => ({
        label: color.label.trim(),
        value: color.colorHex.trim(),
        color_hex: nullableText(color.colorHex),
        display_order: index,
        is_active: true,
      })),
    plan_ids: draft.planIds.map((planId) => planId.trim()).filter(Boolean),
    subscription_types: draft.subscriptionTypes.filter(Boolean),
    installment_month_options: draft.installmentMonthOptions,
    pricing_overrides: createPricingOverrides(draft),
  };
}

function nullableText(value: string) {
  return value.trim() || null;
}

function createPricingOverrides(draft: ProductDraft) {
  return draft.pricingOverrides
    .filter(hasOverrideValue)
    .map((override) => ({
      storage_value: nullableText(override.storageValue),
      plan_id: nullableText(override.planId),
      subscription_type: nullableText(override.subscriptionType),
      device_price: override.devicePrice,
      support_amount: override.supportAmount,
      extra_support_amount: override.extraSupportAmount,
      monthly_plan_discount: override.monthlyPlanDiscount,
      total_benefit_amount: null,
      calculation_method: override.calculationMethod.trim() || "default_v1",
      calculation_params: {},
      priority: override.priority,
    }));
}

function hasOverrideValue(override: ProductDraft["pricingOverrides"][number]) {
  return [
    override.devicePrice,
    override.supportAmount,
    override.extraSupportAmount,
    override.monthlyPlanDiscount,
  ].some((value) => value !== null);
}
