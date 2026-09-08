import type { DiscountType } from "./types";

export type PublicProductsParams = {
  category?: string;
  featured?: boolean;
  limit?: number;
};

export type PublicJsonValue =
  | string
  | number
  | boolean
  | null
  | PublicJsonValue[]
  | { [key: string]: PublicJsonValue };

export type PublicJsonObject = { [key: string]: PublicJsonValue };

export type PublicSubscriptionType =
  | "number_transfer"
  | "device_change"
  | "new_signup";

export type PublicProductImage = {
  url: string;
  alt: string | null;
  display_order: number;
};

export type PublicProductVariant = {
  id: string;
  storage_value: string;
  /** 저장용량별 단말기 출고가 */
  release_price: number;
  display_order?: number;
  available_pricing_count?: number;
  is_default?: boolean;
};

export type PublicConsultationPayload = {
  product_id: string;
  pricing_id: string;
  variant_id: string;
  plan_id: string;
  subscription_type: PublicSubscriptionType;
  discount_type?: DiscountType;
  installment_months?: number;
  color_value?: string | null;
};

export type PublicProductCard = {
  id: string;
  category: string;
  category_code: string;
  category_name: string;
  brand: string;
  name: string;
  summary: string | null;
  badges?: string[];
  representative_image_url: string | null;
  product_images?: PublicProductImage[];
  description_images?: PublicProductImage[];
  variants?: PublicProductVariant[];
  default_variant?: PublicProductVariant | null;
  /** 기본 요금 조건 견적. 명세상 구조가 열려 있어 낙관적으로 받는다. */
  default_pricing?: PublicJsonObject | null;
  consultation_payload?: PublicConsultationPayload | null;
  can_apply_for_consultation?: boolean;
};

export type PublicProductListResponse = {
  data: PublicProductCard[];
};
