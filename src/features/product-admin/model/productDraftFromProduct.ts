import type { AdminProductSummary } from "@/entities/product/api/admin";
import { createEmptyProductDraft } from "./productDraft";
import type { ProductDraft } from "./types";

/** 수정 폼 prefill. 응답에 없던 항목은 등록 기본값을 그대로 쓴다. */
export function createProductDraftFromProduct(
  product: AdminProductSummary
): ProductDraft {
  const empty = createEmptyProductDraft();

  return {
    category_code: product.categoryCode || empty.category_code,
    brand: product.brand || empty.brand,
    name: product.name,
    summary: product.summary,
    badges: product.badges,
    is_featured: product.isFeatured,
    variants: product.variants.length
      ? product.variants.map((variant, index) => ({
          id: `variant-${index}`,
          storageValue: variant.storage_value,
          originalPrice: variant.original_price,
          salePrice: variant.sale_price,
        }))
      : empty.variants,
    colors: product.colors.map((color, index) => ({
      id: `color-${index}`,
      label: color.label,
      colorHex: color.color_hex ?? color.value,
    })),
    planIds: product.planIds,
    subscriptionTypes: product.subscriptionTypes.length
      ? product.subscriptionTypes
      : empty.subscriptionTypes,
    installmentMonthOptions: product.installmentMonthOptions.length
      ? product.installmentMonthOptions
      : empty.installmentMonthOptions,
    pricingOverrides: product.pricingOverrides.map((override, index) => ({
      id: `override-${index}`,
      storageValue: override.storage_value ?? "",
      planId: override.plan_id ?? "",
      subscriptionType: override.subscription_type ?? "",
      devicePrice: override.device_price,
      supportAmount: override.support_amount,
      extraSupportAmount: override.extra_support_amount,
      monthlyPlanDiscount: override.monthly_plan_discount,
      calculationMethod: override.calculation_method,
      priority: override.priority,
    })),
  };
}
