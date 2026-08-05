export type ProductConsultationPayload = {
  productId: string;
  pricingId: string;
  variantId: string;
  planId: string;
  subscriptionType: string;
  installmentMonths?: number;
  colorValue?: string | null;
};

export type ProductEstimate = {
  originalPrice: number;
  salePrice: number;
  devicePrice: number;
  planMonthlyFee: number;
  monthlyPlanDiscount: number;
  carrierSupport: number;
  storeSupport: number;
  totalBenefit: number;
  installmentMonths: number;
  monthlyPlanPrice: number;
  monthlyInstallment: number;
  monthlyTotal: number;
  note: string;
};

export type ProductInstallmentOption = {
  months: number;
  estimate: ProductEstimate;
  consultationPayload?: ProductConsultationPayload;
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
  estimate: ProductEstimate;
  installmentOptions: ProductInstallmentOption[];
  consultationPayload?: ProductConsultationPayload;
};
