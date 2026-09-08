import type {
  PublicConsultationPayload,
  PublicJsonObject,
  PublicProductCard,
  PublicSubscriptionType,
} from "./publicBaseTypes";
import type { DiscountType } from "./types";

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
  /** 기존 호환 필드. pricing_id와 같은 값. */
  id?: string;
  pricing_id: string;
  product_id?: string;
  /** 기존 호환 필드. variant_id와 같은 값. */
  product_variant_id?: string;
  variant_id: string;
  storage_value?: string;
  release_price?: number;
  carrier_id: string;
  carrier_code?: string;
  carrier_name: string;
  plan_id: string;
  plan_name: string;
  plan_monthly_fee: number;
  subscription_type: PublicSubscriptionType;
  subscription_type_label: string;
  installment_months?: number;
  installment_options?: PublicInstallmentOption[];
  public_support_amount?: number;
  rebate_amount?: number;
  /** 공시지원금·선택약정 각각의 할부개월별 계산 결과 */
  discount_options?: PublicDiscountOption[];
  quote: PublicProductQuoteCalculation;
  consultation_payload?: PublicConsultationPayload;
};

export type PublicInstallmentOption = {
  installment_months: number;
  quote: PublicProductQuoteCalculation;
  consultation_payload?: PublicConsultationPayload;
};

export type PublicDiscountOption = {
  discount_type: DiscountType;
  discount_type_label: string;
  quote: PublicProductQuoteCalculation;
  installment_options?: PublicInstallmentOption[];
};

/** ProductQuoteCalculation. 응답에 없는 금액은 매퍼에서 0으로 좁힌다. */
export type PublicProductQuoteCalculation = {
  discount_type?: DiscountType;
  discount_type_label?: string;
  release_price?: number;
  public_support_amount?: number;
  applied_public_support_amount?: number;
  rebate_amount?: number;
  applied_rebate_amount?: number;
  device_installment_principal?: number;
  plan_monthly_fee?: number;
  contract_discount_rate?: number;
  monthly_plan_discount?: number;
  discounted_plan_monthly_fee?: number;
  installment_months?: number;
  installment_annual_rate?: number;
  installment_calculation_method?: string;
  monthly_device_payment?: number;
  total_installment_payment?: number;
  total_installment_interest?: number;
  estimated_monthly_payment?: number;
  total_benefit_amount?: number;
};

export type PublicProductDetailResponse = {
  data: PublicProductDetail;
};
