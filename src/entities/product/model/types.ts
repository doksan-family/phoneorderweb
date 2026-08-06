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
  /** 제조사. 카테고리(특가 등)와 별개로 브랜드 메뉴 필터에 쓴다. */
  brand: string;
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
  /** API가 견적을 못 주면 null. 화면은 "견적 준비 중"으로 처리한다. */
  estimate: ProductEstimate | null;
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
