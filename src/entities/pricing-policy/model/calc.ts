import type { DiscountType } from "@/entities/product/api/public";
import type { ProductEstimate } from "@/entities/product/model/types";
import type { PricingPolicy } from "@/entities/pricing-policy/api/admin";
import { equalPaymentMonthly } from "@/shared/lib/installment";

export { equalPaymentMonthly };

export type PricingCalcInput = {
  /** 저장용량 출고가 */
  releasePrice: number;
  /** 요금제 월 기본요금 */
  planMonthlyFee: number;
  discountType: DiscountType;
  /** 공시지원금 방식일 때 출고가에서 차감할 금액 */
  publicSupportAmount: number | null;
  /** 해당 가입조건의 리베이트 금액 */
  rebateAmount: number | null;
  installmentMonths: number;
};

const DISCOUNT_TYPE_LABELS: Record<DiscountType, string> = {
  public_support: "공시지원금",
  contract_discount: "선택약정",
};

export function discountTypeLabel(type: DiscountType): string {
  return DISCOUNT_TYPE_LABELS[type];
}

/**
 * 가격 계산 정책을 적용해 한 조건의 월 예상 납부금을 계산한다.
 * 서버 ProductQuoteCalculation과 같은 규칙을 관리자 미리보기에서 재현한다.
 */
export function calcEstimate(
  input: PricingCalcInput,
  policy: PricingPolicy
): ProductEstimate {
  const isPublicSupport = input.discountType === "public_support";

  const appliedPublicSupportAmount = isPublicSupport
    ? Math.max(0, input.publicSupportAmount ?? 0)
    : 0;

  const rebateApplies = isPublicSupport
    ? policy.rebate_applies_to_public_support
    : policy.rebate_applies_to_contract_discount;
  const rebateAmount = Math.max(0, input.rebateAmount ?? 0);
  const appliedRebateAmount = rebateApplies ? rebateAmount : 0;

  const deviceInstallmentPrincipal = Math.max(
    0,
    input.releasePrice - appliedPublicSupportAmount - appliedRebateAmount
  );

  const contractDiscountRate = isPublicSupport
    ? 0
    : policy.contract_discount_rate;
  const monthlyPlanDiscount = Math.round(
    (input.planMonthlyFee * contractDiscountRate) / 100
  );
  const discountedPlanMonthlyFee = input.planMonthlyFee - monthlyPlanDiscount;

  const months = input.installmentMonths;
  const monthlyDevicePayment = equalPaymentMonthly(
    deviceInstallmentPrincipal,
    policy.installment_annual_rate,
    months
  );
  const totalInstallmentPayment = monthlyDevicePayment * Math.max(0, months);
  const totalInstallmentInterest = Math.max(
    0,
    totalInstallmentPayment - deviceInstallmentPrincipal
  );

  const estimatedMonthlyPayment = monthlyDevicePayment + discountedPlanMonthlyFee;
  const totalBenefitAmount =
    appliedPublicSupportAmount +
    appliedRebateAmount +
    monthlyPlanDiscount * Math.max(0, months);

  return {
    discountType: input.discountType,
    discountTypeLabel: discountTypeLabel(input.discountType),
    releasePrice: input.releasePrice,
    publicSupportAmount: input.publicSupportAmount ?? 0,
    appliedPublicSupportAmount,
    rebateAmount,
    appliedRebateAmount,
    deviceInstallmentPrincipal,
    planMonthlyFee: input.planMonthlyFee,
    contractDiscountRate,
    monthlyPlanDiscount,
    discountedPlanMonthlyFee,
    installmentMonths: months,
    installmentAnnualRate: policy.installment_annual_rate,
    monthlyDevicePayment,
    totalInstallmentPayment,
    totalInstallmentInterest,
    estimatedMonthlyPayment,
    totalBenefitAmount,
    note: "관리자 미리보기 값입니다. 실제 견적은 저장 후 서버 계산 결과를 따릅니다.",
  };
}
