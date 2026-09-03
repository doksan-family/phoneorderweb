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

const storageValuesOf = (draft: ProductDraft) =>
  draft.variants.map((variant) => variant.storageValue.trim()).filter(Boolean);

type PricingOverridePayload = {
  plan_id: string;
  subscription_type: string;
  priority: number;
  display_order: number;
  is_active: boolean;
  storage_value?: string;
  public_support_amount?: number;
  rebate_amount?: number;
};

/**
 * 요금 조건 카드를 pricing_overrides로 변환한다.
 * 카드 하나가 (가입유형 × 용량) 조합만큼 행을 만든다.
 * 서버는 값 없는 키에 null을 허용하지 않으므로, 해당 키는 아예 넣지 않는다.
 * - 선택약정: 가입유형마다 storage_value·public_support_amount 없이 1행.
 * - 공시지원금: 가입유형 × 용량마다 storage_value를 채운 행.
 */
function createPricingOverrides(draft: ProductDraft): PricingOverridePayload[] {
  const storages = storageValuesOf(draft);
  const rows: PricingOverridePayload[] = [];

  draft.pricingEntries
    .filter((entry) => entry.planId && entry.subscriptionTypes.length)
    .forEach((entry) => {
      entry.subscriptionTypes.forEach((subscriptionType) => {
        const rebateRaw = entry.rebateBySubType[subscriptionType] ?? null;
        const rebate = rebateRaw === null ? undefined : clampAmount(rebateRaw);

        const base = (): PricingOverridePayload => {
          const row: PricingOverridePayload = {
            plan_id: entry.planId,
            subscription_type: subscriptionType,
            priority: rows.length,
            display_order: rows.length,
            is_active: true,
          };
          if (rebate !== undefined) row.rebate_amount = rebate;
          return row;
        };

        if (entry.discountType === "contract_discount") {
          rows.push(base());
          return;
        }

        const byStorage = entry.publicSupportBySubType[subscriptionType] ?? {};
        storages.forEach((storageValue) => {
          const row = base();
          row.storage_value = storageValue;
          row.public_support_amount = clampAmount(byStorage[storageValue] ?? 0);
          rows.push(row);
        });
      });
    });

  return rows;
}

/** 스펙상 public_support_amount·rebate_amount는 0 이상의 정수여야 한다. */
function clampAmount(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
}
