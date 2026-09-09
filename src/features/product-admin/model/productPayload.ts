import { createPricingOverrides } from "./productPricingPayload";
import type { ProductCreatePayload } from "@/entities/product/api/admin";
import {
  planIdsFromEntries,
  subscriptionTypesFromEntries,
} from "./productDraft";
import type { ProductDraft } from "./types";

/**
 * 등록 폼 draft를 POST /admin-products 본문으로 변환한다.
 * PATCH도 같은 payload에서 필요한 필드만 골라 쓴다.
 */
export function createPayloadFromDraft(draft: ProductDraft): ProductCreatePayload {
  return {
    category_code: draft.categoryCode,
    brand: draft.brand,
    name: draft.name.trim(),
    summary: draft.summary.trim() || null,
    badges: draft.badges.map((badge) => badge.trim()).filter(Boolean),
    is_featured: draft.isFeatured,
    display_order: 0,
    is_active: true,
    variants: draft.variants.map((variant, index) => ({
      storage_value: variant.storageValue.trim(),
      release_price: variant.releasePrice,
      display_order: index,
      is_active: true,
    })),
    colors: draft.colors
      .filter((color) => color.label.trim() && color.colorHex.trim())
      .map((color, index) => ({
        label: color.label.trim(),
        value: color.colorHex.trim(),
        color_hex: color.colorHex.trim() || null,
        display_order: index,
        is_active: true,
      })),
    plan_ids: planIdsFromEntries(draft.pricingEntries),
    subscription_types: subscriptionTypesFromEntries(draft.pricingEntries),
    installment_month_options: [...draft.installmentMonths].sort((a, b) => a - b),
    pricing_overrides: createPricingOverrides(draft),
  };
}
