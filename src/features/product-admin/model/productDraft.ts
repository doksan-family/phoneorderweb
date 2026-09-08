import { productBrands } from "@/entities/product/model/mock-products";
import { carrierOptions } from "@/entities/plan/model/carriers";
import {
  SELECTABLE_SUBSCRIPTION_OPTIONS,
  SELECTABLE_SUBSCRIPTION_TYPES,
} from "@/shared/config/subscription";
import type {
  ProductColorDraft,
  ProductDraft,
  ProductPricingEntryDraft,
  ProductVariantDraft,
} from "./types";

export { badgeOptionGroups, badgeOptions } from "./badgeOptions";

export const storageOptions = ["128GB", "256GB", "512GB", "1TB", "2TB"];
export const installmentOptions = [
  { label: "12개월", value: 12 },
  { label: "24개월", value: 24 },
  { label: "36개월", value: 36 },
];
/** 신규가입은 앱 전체에서 숨기므로 번호이동·기기변경만 노출한다. */
export const subscriptionOptions = SELECTABLE_SUBSCRIPTION_OPTIONS;
export { carrierOptions };

let seq = 0;
function nextId(prefix: string) {
  seq += 1;
  return `${prefix}-${Date.now().toString(36)}-${seq}`;
}

export function createEmptyProductDraft(): ProductDraft {
  return {
    // ProductBasicFields가 카테고리 목록을 받으면 첫 값으로 채운다.
    categoryCode: "",
    brand: productBrands[0].name,
    name: "",
    summary: "",
    badges: ["NEW"],
    isFeatured: false,
    colors: [createEmptyColor()],
    variants: [createEmptyVariant()],
    installmentMonths: [24],
    pricingEntries: [],
  };
}

export function createEmptyColor(): ProductColorDraft {
  return { id: nextId("color"), label: "", colorHex: "" };
}

export function createEmptyVariant(): ProductVariantDraft {
  return { id: nextId("variant"), storageValue: storageOptions[0], releasePrice: 0 };
}

export function createEmptyPricingEntry(): ProductPricingEntryDraft {
  return {
    id: nextId("entry"),
    carrierCode: "",
    planId: "",
    discountType: "public_support",
    // 기본은 번호이동·기기변경 모두. 카드에서 해제할 수 있다.
    subscriptionTypes: [...SELECTABLE_SUBSCRIPTION_TYPES],
    publicSupportBySubType: {},
    rebateBySubType: {},
  };
}

/** payload로 보낼 요금제·가입유형 목록은 추가된 요금 조건에서 뽑아낸다. */
export function planIdsFromEntries(entries: ProductPricingEntryDraft[]): string[] {
  return [...new Set(entries.map((entry) => entry.planId).filter(Boolean))];
}

export function subscriptionTypesFromEntries(
  entries: ProductPricingEntryDraft[]
): string[] {
  return [
    ...new Set(entries.flatMap((entry) => entry.subscriptionTypes)),
  ].filter((value) =>
    (SELECTABLE_SUBSCRIPTION_TYPES as readonly string[]).includes(value)
  );
}
