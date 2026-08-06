import type {
  PublicConsultationPayload,
  PublicProductQuote,
} from "@/entities/product/api/public";
import type { ProductEstimate } from "@/entities/product/model/types";

export const ESTIMATE_NOTE =
  "실제 조건은 상담 시점의 통신사 정책과 재고에 따라 달라질 수 있습니다.";

/** 응답에 없는 금액은 0으로 둔다. 목업 값으로 채우지 않는다. */
export function mapQuoteToEstimate(quote: PublicProductQuote): ProductEstimate {
  const carrierSupport = quote.support_amount ?? 0;
  const storeSupport = quote.extra_support_amount ?? 0;

  return {
    carrierSupport,
    devicePrice: quote.device_price ?? 0,
    installmentMonths: quote.installment_months ?? 0,
    monthlyInstallment: quote.monthly_device_payment ?? 0,
    monthlyPlanDiscount: quote.monthly_plan_discount ?? 0,
    monthlyPlanPrice: quote.discounted_plan_monthly_fee ?? 0,
    monthlyTotal: quote.estimated_monthly_payment ?? 0,
    note: ESTIMATE_NOTE,
    originalPrice: quote.original_price ?? 0,
    planMonthlyFee: quote.plan_monthly_fee ?? 0,
    salePrice: quote.sale_price ?? 0,
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
