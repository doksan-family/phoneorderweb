import type {
  PublicConsultationPayload,
  PublicProductQuote,
} from "@/entities/product/api/public";
import type {
  ProductDetailProfile,
  ProductEstimate,
} from "@/entities/product/model/types";

export function mapQuoteToEstimate(
  quote: PublicProductQuote,
  fallback: ProductDetailProfile
): ProductEstimate {
  const carrierSupport = quote.support_amount ?? 0;
  const storeSupport = quote.extra_support_amount ?? 0;

  return {
    ...fallback.estimate,
    carrierSupport,
    devicePrice: quote.device_price ?? fallback.estimate.devicePrice,
    installmentMonths:
      quote.installment_months ?? fallback.estimate.installmentMonths,
    monthlyInstallment:
      quote.monthly_device_payment ?? fallback.estimate.monthlyInstallment,
    monthlyPlanDiscount:
      quote.monthly_plan_discount ?? fallback.estimate.monthlyPlanDiscount,
    monthlyPlanPrice:
      quote.discounted_plan_monthly_fee ?? fallback.estimate.monthlyPlanPrice,
    monthlyTotal:
      quote.estimated_monthly_payment ?? fallback.estimate.monthlyTotal,
    originalPrice: quote.original_price ?? fallback.estimate.originalPrice,
    planMonthlyFee: quote.plan_monthly_fee ?? fallback.estimate.planMonthlyFee,
    salePrice: quote.sale_price ?? fallback.estimate.salePrice,
    storeSupport,
    totalBenefit: quote.total_benefit_amount ?? carrierSupport + storeSupport,
  };
}

export function mapConsultationPayload(payload?: PublicConsultationPayload) {
  if (!payload) return undefined;

  return {
    colorValue: payload.color_value,
    installmentMonths: payload.installment_months,
    planId: payload.plan_id,
    pricingId: payload.pricing_id,
    productId: payload.product_id,
    subscriptionType: payload.subscription_type,
    variantId: payload.variant_id,
  };
}
