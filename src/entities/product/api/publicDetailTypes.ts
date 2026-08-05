import type {
  PublicConsultationPayload,
  PublicJsonObject,
  PublicProductCard,
  PublicSubscriptionType,
} from "./publicBaseTypes";

export type PublicProductDetail = PublicProductCard & {
  colors?: PublicProductColor[];
  carriers?: PublicCarrierOption[];
  subscription_types?: PublicSubscriptionOption[];
  pricing_options?: PublicProductPricingOption[];
  default_selection?: PublicJsonObject | null;
};

export type PublicProductColor = {
  id?: string;
  label?: string;
  name?: string;
  value?: string;
  color_name?: string;
  color_value?: string;
  color_hex?: string | null;
  colorHex?: string | null;
  hex?: string | null;
  hex_code?: string | null;
  display_order?: number;
  displayOrder?: number;
};

export type PublicSubscriptionOption = {
  value: PublicSubscriptionType;
  label: string;
};

export type PublicCarrierOption = {
  id?: string;
  carrier_id?: string;
  carrier_code?: string;
  carrier_name?: string;
  label?: string;
  display_order?: number;
};

export type PublicProductPricingOption = {
  id?: string;
  pricing_id: string;
  product_id?: string;
  product_variant_id?: string;
  variant_id: string;
  storage_value?: string;
  original_price?: number;
  sale_price?: number;
  discount_rate?: number;
  carrier_id: string;
  carrier_code?: string;
  carrier_name: string;
  plan_id: string;
  plan_name: string;
  plan_monthly_fee: number;
  subscription_type: PublicSubscriptionType;
  subscription_type_label: string;
  device_price?: number;
  installment_months?: number;
  installment_options?: PublicInstallmentOption[];
  support_amount?: number;
  extra_support_amount?: number;
  monthly_plan_discount?: number;
  calculation_method?: string;
  quote: PublicProductQuote;
  consultation_payload?: PublicConsultationPayload;
};

export type PublicInstallmentOption = {
  installment_months: number;
  quote: PublicProductQuote;
  consultation_payload?: PublicConsultationPayload;
};

export type PublicProductQuote = {
  original_price?: number;
  sale_price?: number;
  plan_monthly_fee?: number;
  monthly_plan_discount?: number;
  discounted_plan_monthly_fee: number;
  device_price: number;
  installment_months: number;
  monthly_device_payment: number;
  estimated_monthly_payment: number;
  support_amount: number;
  extra_support_amount: number;
  total_benefit_amount?: number;
};

export type PublicProductDetailResponse = {
  data: PublicProductDetail;
};
