import type {
  PublicConsultationPayload,
  PublicProductQuoteCalculation,
} from "@/entities/product/api/public";
import type { ProductEstimate } from "@/entities/product/model/types";

export const ESTIMATE_NOTE =
  "실제 조건은 상담 시점의 통신사 정책과 재고에 따라 달라질 수 있습니다.";

/** 응답에 없는 금액은 0으로 둔다. 목업 값으로 채우지 않는다. */
export function mapQuoteToEstimate(
  quote: PublicProductQuoteCalculation
): ProductEstimate {
  return {
    discountType: quote.discount_type ?? null,
    discountTypeLabel: quote.discount_type_label ?? "",
    releasePrice: quote.release_price ?? 0,
    publicSupportAmount: quote.public_support_amount ?? 0,
    // 공시지원금 방식인데 "applied" 값이 비어 있으면 등록된 공시지원금을 적용액으로 본다.
    appliedPublicSupportAmount:
      quote.applied_public_support_amount ??
      (quote.discount_type === "public_support"
        ? quote.public_support_amount ?? 0
        : 0),
    rebateAmount: quote.rebate_amount ?? 0,
    appliedRebateAmount: quote.applied_rebate_amount ?? 0,
    deviceInstallmentPrincipal: quote.device_installment_principal ?? 0,
    planMonthlyFee: quote.plan_monthly_fee ?? 0,
    contractDiscountRate: quote.contract_discount_rate ?? 0,
    monthlyPlanDiscount: quote.monthly_plan_discount ?? 0,
    discountedPlanMonthlyFee: quote.discounted_plan_monthly_fee ?? 0,
    installmentMonths: quote.installment_months ?? 0,
    installmentAnnualRate: quote.installment_annual_rate ?? 0,
    monthlyDevicePayment: quote.monthly_device_payment ?? 0,
    totalInstallmentPayment: quote.total_installment_payment ?? 0,
    totalInstallmentInterest: quote.total_installment_interest ?? 0,
    estimatedMonthlyPayment: quote.estimated_monthly_payment ?? 0,
    totalBenefitAmount: quote.total_benefit_amount ?? 0,
    note: ESTIMATE_NOTE,
  };
}

export function mapConsultationPayload(payload?: PublicConsultationPayload) {
  if (!payload) return undefined;

  return {
    colorValue: payload.color_value,
    discountType: payload.discount_type,
    installmentMonths: payload.installment_months,
    planId: payload.plan_id,
    pricingId: payload.pricing_id,
    productId: payload.product_id,
    subscriptionType: payload.subscription_type,
    variantId: payload.variant_id,
  };
}
