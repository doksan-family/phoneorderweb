import type { DiscountType } from "@/entities/product/api/public";

export type { DiscountType };

export type ProductConsultationPayload = {
  productId: string;
  pricingId: string;
  variantId: string;
  planId: string;
  subscriptionType: string;
  discountType?: DiscountType;
  installmentMonths?: number;
  colorValue?: string | null;
};

/** ProductQuoteCalculation의 camelCase 대응. 응답에 없는 값은 0으로 둔다. */
export type ProductEstimate = {
  discountType: DiscountType | null;
  discountTypeLabel: string;
  /** 단말기 출고가 */
  releasePrice: number;
  /** 등록된 공시지원금 */
  publicSupportAmount: number;
  /** 선택한 할인방식에 실제 적용된 공시지원금 */
  appliedPublicSupportAmount: number;
  /** 등록된 리베이트 */
  rebateAmount: number;
  /** 가격 정책에 따라 실제 적용된 리베이트 */
  appliedRebateAmount: number;
  /** 지원금 차감 후 할부 원금 */
  deviceInstallmentPrincipal: number;
  planMonthlyFee: number;
  /** 선택약정 할인율(%) */
  contractDiscountRate: number;
  monthlyPlanDiscount: number;
  discountedPlanMonthlyFee: number;
  installmentMonths: number;
  /** 할부 연이율(%) */
  installmentAnnualRate: number;
  monthlyDevicePayment: number;
  totalInstallmentPayment: number;
  totalInstallmentInterest: number;
  estimatedMonthlyPayment: number;
  totalBenefitAmount: number;
  note: string;
};

export type ProductInstallmentOption = {
  months: number;
  estimate: ProductEstimate;
  consultationPayload?: ProductConsultationPayload;
};

export type ProductQuoteDiscountOption = {
  discountType: DiscountType;
  discountTypeLabel: string;
  estimate: ProductEstimate;
  installmentOptions: ProductInstallmentOption[];
};

export type ProductPricingOption = {
  id: string;
  variantId: string;
  carrierId: string;
  planId: string;
  planName: string;
  planMonthlyPrice: number;
  subscriptionType: string;
  subscriptionTypeLabel: string;
  publicSupportAmount: number;
  rebateAmount: number;
  estimate: ProductEstimate;
  installmentOptions: ProductInstallmentOption[];
  discountOptions: ProductQuoteDiscountOption[];
  consultationPayload?: ProductConsultationPayload;
};
