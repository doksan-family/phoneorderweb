import type {
  ProductEstimate,
  ProductConsultationPayload,
  ProductPricingOption,
  ProductQuoteDiscountOption,
} from "./pricingTypes";

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
  canApplyForConsultation?: boolean;
  consultationPayload?: ProductConsultationPayload;
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
  /** 대표 저장용량 출고가. 판매가·할인율은 스펙에서 제거됨. */
  releasePrice: number;
  /** 기본 견적의 할인 적용 후 단말 할부 원금. 견적이 없으면 null. */
  discountedDevicePrice?: number | null;
  planName: string;
  planMonthlyPrice: number;
  /** 대표 요금 조건의 월 예상 납부금. 없으면 0. */
  monthlyEstimate: number;
  priceGuide: string;
  planGuide: string;
  discountGuide: string;
  saleTypes: ProductSaleType[];
  badges?: string[];
  cardTag: string;
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
  canApplyForConsultation?: boolean;
  defaultSelection?: ProductConsultationPayload;
  colors: ProductColorOption[];
  capacities: ProductOption[];
  currentCarriers: ProductOption[];
  joiningCarriers: ProductOption[];
  plans: ProductPlanOption[];
  discounts: ProductDiscountOption[];
  subscriptionTypes?: ProductOption[];
  pricingOptions?: ProductPricingOption[];
  /** 대표 요금 조건의 공시지원금/선택약정 선택지 */
  discountOptions?: ProductQuoteDiscountOption[];
  /** API가 견적을 못 주면 null. 화면은 "견적 준비 중"으로 처리한다. */
  estimate: ProductEstimate | null;
  detailTabs: {
    modelInfo: string[];
    cautions: string[];
  };
};

export type {
  DiscountType,
  ProductConsultationPayload,
  ProductEstimate,
  ProductInstallmentOption,
  ProductPricingOption,
  ProductQuoteDiscountOption,
} from "./pricingTypes";
