import type { ProductEstimate, ProductPricingOption } from "./pricingTypes";

export type ProductCategory = {
  id: string;
  name: string;
  description: string;
  order: number;
  visible: boolean;
};

export type ProductSaleType = "번호이동" | "기기변경" | "신규가입";

export type ProductImage = {
  url: string;
  alt: string;
  displayOrder: number;
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  imageUrl: string;
  imageAlt: string;
  summary: string;
  detail: string;
  productImages?: ProductImage[];
  descriptionImages?: ProductImage[];
  originalPrice: number;
  salePrice: number;
  planName: string;
  planMonthlyPrice: number;
  monthlyEstimate: number;
  priceGuide: string;
  planGuide: string;
  discountGuide: string;
  saleTypes: ProductSaleType[];
  badges?: string[];
  cardTag: string;
  discountRate: number;
  visible: boolean;
  order: number;
};

export type ProductOption = {
  id: string;
  label: string;
  description?: string;
};

export type ProductColorOption = ProductOption & {
  hexCode: string;
};

export type ProductPlanOption = ProductOption & {
  monthlyPrice: number;
  benefits: string[];
};

export type ProductDiscountOption = ProductOption & {
  totalBenefit: number;
};

export type ProductDetailProfile = {
  colors: ProductColorOption[];
  capacities: ProductOption[];
  currentCarriers: ProductOption[];
  joiningCarriers: ProductOption[];
  plans: ProductPlanOption[];
  discounts: ProductDiscountOption[];
  subscriptionTypes?: ProductOption[];
  pricingOptions?: ProductPricingOption[];
  estimate: ProductEstimate;
  detailTabs: {
    modelInfo: string[];
    cautions: string[];
  };
};

export type {
  ProductConsultationPayload,
  ProductEstimate,
  ProductInstallmentOption,
  ProductPricingOption,
} from "./pricingTypes";
