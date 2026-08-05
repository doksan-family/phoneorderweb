export type ProductBadge = string;

export type ProductColorDraft = {
  id: string;
  label: string;
  colorHex: string;
};

export type ProductVariantDraft = {
  id: string;
  storageValue: string;
  originalPrice: number;
  salePrice: number;
};

export type ProductPricingOverrideDraft = {
  id: string;
  storageValue: string;
  planId: string;
  subscriptionType: string;
  devicePrice: number | null;
  supportAmount: number | null;
  extraSupportAmount: number | null;
  monthlyPlanDiscount: number | null;
  calculationMethod: string;
  priority: number;
};

export type ProductDraft = {
  category_code: string;
  brand: string;
  name: string;
  summary: string;
  badges: ProductBadge[];
  is_featured: boolean;
  variants: ProductVariantDraft[];
  colors: ProductColorDraft[];
  planIds: string[];
  subscriptionTypes: string[];
  installmentMonthOptions: number[];
  pricingOverrides: ProductPricingOverrideDraft[];
};
