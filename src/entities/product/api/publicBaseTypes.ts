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
  original_price: number;
  sale_price: number;
  discount_rate: number;
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
  default_pricing?: PublicJsonObject | null;
  consultation_payload?: PublicConsultationPayload | null;
  can_apply_for_consultation?: boolean;
  /* 목록 API가 대표 요금제 기준으로 함께 내려주는 값 */
  plan_id?: string;
  plan_name?: string;
  plan_monthly_fee?: number;
  estimated_monthly_payment?: number;
  monthly_device_payment?: number;
  total_benefit_amount?: number;
  installment_month_options?: number[];
  price_summary?: PublicProductPriceSummary | null;
};

export type PublicProductPriceSummary = {
  original_price: number;
  sale_price: number;
  discount_rate: number;
};

export type PublicProductListResponse = {
  data: PublicProductCard[];
};
