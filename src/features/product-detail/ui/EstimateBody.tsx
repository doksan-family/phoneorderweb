import type { ProductEstimate } from "@/entities/product/model/types";
import { equalPaymentMonthly } from "@/shared/lib/installment";

type EstimateBodyProps = {
  estimate: ProductEstimate;
};

/**
 * 상세 견적은 "리베이트 제외" 결과를 기본으로 보여주고,
 * 리베이트가 있으면 그 아래에 별도 카드로 리베이트를 강조하며
 * 리베이트를 포함한 월 결제 금액을 함께 보여준다.
 */
export function EstimateBody({ estimate }: EstimateBodyProps) {
  const months = estimate.installmentMonths;
  const rebate = estimate.appliedRebateAmount;
  const isContractDiscount =
    estimate.discountType === "contract_discount" ||
    estimate.contractDiscountRate > 0;
  const methodLabel = isContractDiscount
    ? `선택약정 · 월 요금 ${estimate.contractDiscountRate || 25}% 할인`
    : "공시지원금 할인";

  // 서버 견적은 리베이트가 이미 할부 원금에서 차감된 값이라 되돌려 재계산한다.
  const principalNoRebate = estimate.deviceInstallmentPrincipal + rebate;
  const monthlyDeviceNoRebate =
    rebate > 0
      ? equalPaymentMonthly(
          principalNoRebate,
          estimate.installmentAnnualRate,
          months
        )
      : estimate.monthlyDevicePayment;
  const monthlyPaymentNoRebate =
    monthlyDeviceNoRebate + estimate.discountedPlanMonthlyFee;
  const interestNoRebate = Math.max(
    0,
    monthlyDeviceNoRebate * Math.max(0, months) - principalNoRebate
  );
  const monthlySaving = monthlyPaymentNoRebate - estimate.estimatedMonthlyPayment;

  return (
    <>
      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-primary-soft)] px-3 py-1 text-[0.78rem] font-extrabold text-[var(--brand-primary-strong)]">
        {methodLabel}
      </div>

      <dl className="m-0 grid gap-[9px]">
        <EstimateLine label="출고가" value={estimate.releasePrice} />
        {isContractDiscount ? (
          <EstimateLine
            label="월 요금 할인"
            value={estimate.monthlyPlanDiscount}
            negative
            hideZero
          />
        ) : (
          <EstimateLine
            label="공시지원금"
            value={estimate.appliedPublicSupportAmount}
            negative
            hideZero
          />
        )}
        <EstimateLine label="할부 원금" value={principalNoRebate} />
        <EstimateLine label="요금제 월정액" value={estimate.planMonthlyFee} />
        <EstimateLine label="월 통신 요금" value={estimate.discountedPlanMonthlyFee} />
        <EstimateLine
          label={months > 0 ? `월 할부금 (${months}개월)` : "월 할부금"}
          value={monthlyDeviceNoRebate}
        />
        <EstimateLine
          label="할부 수수료 총액"
          value={interestNoRebate}
          hideZero
        />
      </dl>

      <div className="mt-3.5 flex items-baseline justify-between gap-3 rounded-xl bg-[var(--brand-primary-soft)] px-3.5 py-3">
        <span className="text-[0.85rem] font-bold text-slate-700">
          월 예상 납부 금액
        </span>
        <strong className="text-[1.35rem] font-extrabold text-[var(--brand-primary-strong)]">
          {monthlyPaymentNoRebate.toLocaleString("ko-KR")}원
        </strong>
      </div>
      <p className="m-0 mt-1 text-right text-[0.72rem] text-slate-400">
        핵폰 추가 할인 적용 전 기준입니다.
      </p>

      {rebate > 0 ? (
        <div className="mt-3 grid gap-2 rounded-xl border-2 border-[var(--brand-hot)] bg-[var(--brand-hot-soft,#fff5f5)] p-3.5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[0.85rem] font-extrabold text-[var(--brand-hot)]">
              핵폰이 드리는 추가 할인
            </span>
            <strong className="text-[1.1rem] font-extrabold text-[var(--brand-hot)]">
              -{rebate.toLocaleString("ko-KR")}원
            </strong>
          </div>
          <div className="flex items-baseline justify-between gap-3 border-t border-[var(--brand-hot)] pt-2">
            <span className="text-[0.82rem] font-bold text-slate-700">
              추가 할인 적용 시 월 납부 금액
            </span>
            <strong className="text-[1.25rem] font-extrabold text-slate-950">
              {estimate.estimatedMonthlyPayment.toLocaleString("ko-KR")}원
            </strong>
          </div>
          {monthlySaving > 0 ? (
            <p className="m-0 text-right text-[0.76rem] font-bold text-[var(--brand-hot)]">
              매달 {monthlySaving.toLocaleString("ko-KR")}원 더 저렴하게
            </p>
          ) : null}
        </div>
      ) : null}

      {estimate.totalBenefitAmount > 0 ? (
        <p className="m-0 mt-2 text-right text-[0.78rem] font-bold text-[var(--brand-hot)]">
          총 할인 혜택 {estimate.totalBenefitAmount.toLocaleString("ko-KR")}원
        </p>
      ) : null}
    </>
  );
}

function EstimateLine({
  label,
  value,
  negative = false,
  hideZero = false,
}: {
  label: string;
  value: number;
  negative?: boolean;
  hideZero?: boolean;
}) {
  if (hideZero && value <= 0) return null;

  return (
    <div className="flex justify-between gap-3 text-[0.78rem] text-slate-500">
      <dt>{label}</dt>
      <dd className="m-0 font-semibold text-slate-950">
        {negative && value > 0 ? "-" : ""}
        {value.toLocaleString("ko-KR")}원
      </dd>
    </div>
  );
}
