import type { AdminPricingOption } from "@/entities/product/api/adminProductPricingTypes";
import type { PricingPolicy } from "@/entities/pricing-policy/api/types";
import { resolveAdminPricingDiscounts } from "../model/adminPricingFallback";

type AdminProductPricingOptionCardProps = {
  option: AdminPricingOption;
  months: number[];
  policy?: PricingPolicy;
};

const won = (value: number) => `${value.toLocaleString("ko-KR")}원`;

export function AdminProductPricingOptionCard({
  option,
  months,
  policy,
}: AdminProductPricingOptionCardProps) {
  const discounts = resolveAdminPricingDiscounts(option, months, policy);

  return (
    <div className="grid gap-3 rounded-lg border border-slate-200 p-3">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <strong className="font-extrabold text-slate-950">{option.storageValue || "용량 미지정"}</strong>
        <span className="text-slate-400">·</span>
        <span className="font-semibold text-slate-700">{option.subscriptionTypeLabel || option.subscriptionType}</span>
        <span className="text-slate-400">·</span>
        <span className="text-slate-500">출고가 {won(option.releasePrice)}</span>
        {!option.isActive ? (
          <span className="brand-pill bg-slate-100 px-2 py-0.5 text-[0.7rem] text-slate-500">비활성</span>
        ) : null}
      </div>

      {option.summary ? (
        <div className="flex flex-wrap gap-1.5 text-[0.72rem]">
          <Chip label="공시지원금" value={won(option.summary.publicSupportAmount)} />
          <Chip label="약정 할인율" value={`${option.summary.contractDiscountRate}%`} />
          <Chip label="월 약정할인" value={won(option.summary.monthlyContractDiscountAmount)} />
          <Chip label="리베이트" value={won(option.summary.rebateAmount)} />
        </div>
      ) : null}

      <div className="grid gap-3 min-[560px]:grid-cols-2">
        {discounts.map((discount) => (
          <div key={discount.discountType} className="grid gap-1.5">
            <span className="text-[0.78rem] font-bold text-slate-700">
              {discount.discountTypeLabel}
              {discount.installments.some((item) => !item.fromServer) ? (
                <span className="ml-1 font-normal text-amber-600">추정</span>
              ) : null}
            </span>
            {discount.installments.length ? (
              <table className="w-full border-collapse text-[0.74rem] tabular-nums">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th scope="col" className="py-1 text-left font-medium">할부</th>
                    <th scope="col" className="py-1 text-right font-medium">월 납부</th>
                    <th scope="col" className="py-1 text-right font-medium">총 이자</th>
                    <th scope="col" className="py-1 text-right font-medium">총 혜택</th>
                  </tr>
                </thead>
                <tbody>
                  {discount.installments.map((item) => (
                    <tr key={item.months} className="border-b border-slate-100">
                      <th scope="row" className="py-1 text-left font-medium text-slate-600">{item.months}개월</th>
                      <td className="py-1 text-right font-bold text-slate-950">{won(item.estimate.estimatedMonthlyPayment)}</td>
                      <td className="py-1 text-right text-slate-500">{won(item.estimate.totalInstallmentInterest)}</td>
                      <td className="py-1 text-right text-emerald-700">{won(item.estimate.totalBenefitAmount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="m-0 text-[0.74rem] text-slate-400">가격 정책이 없어 계산할 수 없습니다.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
      {label} <strong className="font-bold text-slate-900">{value}</strong>
    </span>
  );
}
