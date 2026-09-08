import type {
  ProductCreateColorInput,
  ProductCreatePricingOverrideInput,
  ProductCreateVariantInput,
} from "./types";

/** GET /functions/v1/admin-products 쿼리 파라미터 */
export type AdminProductsParams = {
  id?: string;
  category?: string;
  include_inactive?: boolean;
};

/** 업로드 순서대로 정렬된 이미지. product_images의 첫 항목이 대표 이미지다. */
export type AdminProductImage = {
  url: string;
  alt: string | null;
  displayOrder: number;
};

/**
 * 어드민 목록 화면이 쓰는 상품 요약.
 *
 * 명세상 AdminProductResponse는 additionalProperties: true라 id/badges/
 * product_images/description_images 외 필드가 문서화되어 있지 않다.
 * 그래서 나머지는 있으면 읽고 없으면 비우는 방식으로 파싱한다.
 */
export type AdminProductSummary = {
  id: string;
  name: string;
  brand: string;
  summary: string;
  categoryCode: string;
  categoryName: string;
  badges: string[];
  productImages: AdminProductImage[];
  descriptionImages: AdminProductImage[];
  thumbnailUrl: string | null;
  /** 대표 저장용량 출고가. 목록 응답에 없으면 null. */
  releasePrice: number | null;
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
  /** 수정 폼 prefill용. 목록 응답에 없으면 빈 배열이다. */
  variants: ProductCreateVariantInput[];
  colors: ProductCreateColorInput[];
  planIds: string[];
  subscriptionTypes: string[];
  installmentMonthOptions: number[];
  pricingOverrides: ProductCreatePricingOverrideInput[];
};

/**
 * PATCH /functions/v1/admin-products?id= 본문 (multipart/form-data, 부분 수정).
 * 배열 필드는 부분 수정이 아니라 기존 전체를 교체한다.
 */
export type AdminProductUpdatePayload = {
  category_code?: string;
  brand?: string;
  name?: string;
  summary?: string | null;
  badges?: string[];
  is_active?: boolean;
  is_featured?: boolean;
  display_order?: number;
  variants?: ProductCreateVariantInput[];
  colors?: ProductCreateColorInput[];
  plan_ids?: string[];
  subscription_types?: string[];
  installment_month_options?: number[];
  pricing_overrides?: ProductCreatePricingOverrideInput[];
};
