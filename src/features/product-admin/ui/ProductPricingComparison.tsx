import { Fragment } from "react";
import type { pricingPreviewComparison } from "../model/pricingPreviewComparison";

type ProductPricingComparisonProps = {
  rows: { month: number; comparison: ReturnType<typeof pricingPreviewComparison> | null }[];
};

export function ProductPricingComparison({ rows }: ProductPricingComparisonProps) {
  const first = rows.find((row) => row.comparison)?.comparison;
  if (!first) return null;
  return (
    <div className="grid gap-2">
      <table className="w-full border-collapse text-xs tabular-nums">
        <caption className="sr-only">추가 지원금 제외와 적용 견적 비교</caption>
        <thead>
          <tr className="border-b border-slate-200">
            <th scope="col" className="py-3 text-left font-medium">항목</th>
            <th scope="col" className="px-2 py-3 text-right text-slate-700">추가 지원금 제외</th>
            <th scope="col" className="px-2 py-3 text-right text-emerald-700">추가 지원금 적용</th>
          </tr>
        </thead>
        <tbody>
          <ComparisonRow label="적용 추가 지원금" without={0} withValue={first.withRebate.appliedRebateAmount} />
          <ComparisonRow label="할부 원금" without={first.withoutRebate.deviceInstallmentPrincipal} withValue={first.withRebate.deviceInstallmentPrincipal} />
          <ComparisonRow label="월 통신요금" without={first.withoutRebate.discountedPlanMonthlyFee} withValue={first.withRebate.discountedPlanMonthlyFee} />
          {rows.map(({ month, comparison }) => comparison ? (
            <Fragment key={month}>
              <ComparisonRow label={`${month}개월 · 총 할인금액`} without={comparison.withoutRebate.totalBenefitAmount} withValue={comparison.withRebate.totalBenefitAmount} />
              <ComparisonRow label={`${month}개월 · 월 납부금`} without={comparison.withoutRebate.estimatedMonthlyPayment} withValue={comparison.withRebate.estimatedMonthlyPayment} emphasis />
            </Fragment>
          ) : null)}
        </tbody>
      </table>
      <p className="m-0 text-xs leading-relaxed text-slate-500">
        제외 금액은 추가 지원금을 0원으로 두고 할부 이자까지 다시 계산합니다. 적용 금액은 현재 가격 정책을 따릅니다.
      </p>
      {first.withRebate.rebateAmount > 0 && first.withRebate.appliedRebateAmount === 0 ? (
        <p className="m-0 text-xs text-amber-700">현재 가격 정책에서는 이 할인 방식에 추가 지원금을 적용하지 않아 두 금액이 같습니다.</p>
      ) : null}
    </div>
  );
}

type ComparisonRowProps = { label: string; without: number; withValue: number; emphasis?: boolean };

function ComparisonRow({ label, without, withValue, emphasis }: ComparisonRowProps) {
  return (
    <tr className={emphasis ? "border-b border-slate-200 bg-white font-bold" : "border-b border-slate-100"}>
      <th scope="row" className="py-2 text-left font-medium">{label}</th>
      <td className="whitespace-nowrap px-2 py-2 text-right text-slate-700">{without.toLocaleString("ko-KR")}원</td>
      <td className="whitespace-nowrap px-2 py-2 text-right text-emerald-700">{withValue.toLocaleString("ko-KR")}원</td>
    </tr>
  );
}
