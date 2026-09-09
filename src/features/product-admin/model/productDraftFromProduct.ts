import type { AdminProductSummary } from "@/entities/product/api/admin";
import { buildPricingEntries } from "./productPricingPrefill";
import { createEmptyProductDraft } from "./productDraft";
import type { ProductDraft } from "./types";

/** 수정 폼 prefill. 응답에 없던 항목은 등록 기본값을 그대로 쓴다. */
export function createProductDraftFromProduct(
  product: AdminProductSummary
): ProductDraft {
  const empty = createEmptyProductDraft();

  return {
    categoryCode: product.categoryCode || empty.categoryCode,
    brand: product.brand || empty.brand,
    name: product.name,
    summary: product.summary,
    badges: product.badges,
    isFeatured: product.isFeatured,
    colors: product.colors.map((color, index) => ({
      id: `color-${index}`,
      label: color.label,
      colorHex: color.color_hex ?? color.value,
    })),
    variants: product.variants.length
      ? product.variants.map((variant, index) => ({
          id: `variant-${index}`,
          storageValue: variant.storage_value,
          releasePrice: variant.release_price,
        }))
      : empty.variants,
    installmentMonths: product.installmentMonthOptions.length
      ? product.installmentMonthOptions
      : empty.installmentMonths,
    pricingEntries: buildPricingEntries(product),
  };
}
