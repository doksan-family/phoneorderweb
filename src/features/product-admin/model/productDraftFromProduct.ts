import type { AdminProductSummary } from "@/entities/product/api/admin";
import { isSelectableSubscriptionType } from "@/shared/config/subscription";
import { createEmptyProductDraft } from "./productDraft";
import type { ProductDraft, ProductPricingEntryDraft } from "./types";

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
    pricingEntries: buildEntries(product),
  };
}

/**
 * 저장돼 있던 pricing_overrides를 요금 조건 카드로 되돌린다.
 * (요금제, 할인방식) 단위로 묶고, 그 안에서 가입유형 × 용량별로 금액을 나눠 담는다.
 * 명시적 override가 없으면 요금제마다 공시지원금 카드를 하나씩 만든다.
 * 통신사 코드는 카드에서 요금제로부터 유추한다.
 */
function buildEntries(product: AdminProductSummary): ProductPricingEntryDraft[] {
  const storageValues = product.variants.map((variant) => variant.storage_value);
  const grouped = new Map<string, ProductPricingEntryDraft>();

  product.pricingOverrides
    .filter(
      (override) =>
        override.plan_id &&
        override.subscription_type &&
        isSelectableSubscriptionType(override.subscription_type)
    )
    .forEach((override) => {
      const planId = override.plan_id ?? "";
      const sub = override.subscription_type ?? "";
      const discountType =
        override.public_support_amount != null
          ? ("public_support" as const)
          : ("contract_discount" as const);
      const key = `${planId}|${discountType}`;

      let entry = grouped.get(key);
      if (!entry) {
        entry = {
          id: `entry-${grouped.size}`,
          carrierCode: "",
          planId,
          discountType,
          subscriptionTypes: [],
          publicSupportBySubType: {},
          rebateBySubType: {},
        };
        grouped.set(key, entry);
      }
      if (!entry.subscriptionTypes.includes(sub)) entry.subscriptionTypes.push(sub);

      const rebate = override.rebate_amount ?? null;
      if (rebate !== null && entry.rebateBySubType[sub] == null) {
        entry.rebateBySubType[sub] = rebate;
      }

      if (discountType === "public_support") {
        const amount = override.public_support_amount ?? null;
        const byStorage = (entry.publicSupportBySubType[sub] ??= {});
        // storage_value가 없으면(전체 용량) 모든 용량에 같은 값을 펼친다.
        const targets = override.storage_value
          ? [override.storage_value]
          : storageValues;
        targets.forEach((storageValue) => {
          byStorage[storageValue] = amount;
        });
      }
    });

  if (grouped.size) return [...grouped.values()];

  return product.planIds.map((planId, index) => ({
    id: `entry-${index}`,
    carrierCode: "",
    planId,
    discountType: "public_support" as const,
    subscriptionTypes: product.subscriptionTypes.filter(
      isSelectableSubscriptionType
    ),
    publicSupportBySubType: {},
    rebateBySubType: {},
  }));
}
