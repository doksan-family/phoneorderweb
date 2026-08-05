import { productCategories } from "@/entities/product/model/mock-products";
import type { ProductDraft } from "./types";

export { badgeOptionGroups, badgeOptions } from "./badgeOptions";
export const variantStorageOptions = ["128GB", "256GB", "512GB", "1TB", "2TB"];
export const subscriptionTypeOptions = [
  { label: "번호이동", value: "number_transfer" },
  { label: "기기변경", value: "device_change" },
  { label: "신규가입", value: "new_signup" },
];
export const installmentMonthOptions = [
  { label: "12개월", value: 12 },
  { label: "24개월", value: 24 },
  { label: "36개월", value: 36 },
];

export function createEmptyProductDraft(): ProductDraft {
  const category = productCategories[0];

  return {
    category_code: category?.id ?? "samsung",
    brand: category?.name ?? "삼성",
    name: "",
    summary: "",
    badges: ["NEW"],
    is_featured: false,
    variants: [createEmptyVariant("variant-default")],
    colors: [],
    planIds: [],
    subscriptionTypes: [subscriptionTypeOptions[0].value],
    installmentMonthOptions: [24],
    pricingOverrides: [],
  };
}

export function createEmptyVariant(id = `variant-${Date.now()}`) {
  return {
    id,
    storageValue: variantStorageOptions[0],
    originalPrice: 0,
    salePrice: 0,
  };
}

export function createEmptyPricingOverride(id = `override-${Date.now()}`) {
  return {
    id,
    storageValue: "",
    planId: "",
    subscriptionType: "",
    devicePrice: null,
    supportAmount: null,
    extraSupportAmount: null,
    monthlyPlanDiscount: null,
    calculationMethod: "default_v1",
    priority: 100,
  };
}
