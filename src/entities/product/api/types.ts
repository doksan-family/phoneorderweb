/** 공시지원금 또는 선택약정. 두 할인은 동시에 적용되지 않는다. */
export type DiscountType = "public_support" | "contract_discount";

export type ProductCreateVariantInput = {
  storage_value: string;
  /** 저장용량별 단말기 출고가. 판매가는 서버가 정책으로 계산한다. */
  release_price: number;
  display_order: number;
  is_active: boolean;
};

export type ProductCreateColorInput = {
  label: string;
  value: string;
  color_hex: string | null;
  display_order: number;
  is_active: boolean;
};

/**
 * 기본 가격과 다른 조건만 덮어쓰는 규칙. storage_value/plan_id/subscription_type을
 * 생략하면 해당 차원 전체에 적용된다.
 * available_discount_types는 고객이 선택할 수 있는 방식이며 동시 적용을 뜻하지 않는다.
 */
export type ProductCreatePricingOverrideInput = {
  storage_value?: string | null;
  plan_id?: string | null;
  subscription_type?: string | null;
  available_discount_types?: DiscountType[];
  /** 공시지원금 선택 시 출고가에서 차감할 금액. 0 이상의 정수. */
  public_support_amount?: number;
  /** 해당 가입조건의 리베이트 금액. 0 이상의 정수. */
  rebate_amount?: number;
  priority?: number;
  display_order?: number;
  is_active?: boolean;
};

export type ProductCreatePayload = {
  category_code: string;
  brand: string;
  name: string;
  summary: string | null;
  badges: string[];
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  variants: ProductCreateVariantInput[];
  colors: ProductCreateColorInput[];
  plan_ids: string[];
  subscription_types: string[];
  installment_month_options: number[];
  pricing_overrides: ProductCreatePricingOverrideInput[];
};

export type ProductCreateImage = {
  url: string;
  alt: string | null;
  display_order: number;
};

export type AdminProductCreateResponse = {
  id: string;
  thumbnail_image_url?: string;
  product_images?: ProductCreateImage[];
  badges?: string[];
  description_images?: ProductCreateImage[];
};
