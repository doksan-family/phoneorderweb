import type { ProductPlanOption } from "@/entities/product/model/types";

type PlanBoxProps = {
  plan: ProductPlanOption;
};

export function PlanBox({ plan }: PlanBoxProps) {
  return (
    <div className="grid gap-2.5 rounded-xl bg-[var(--brand-primary-soft)] p-[14px]">
      <div className="flex justify-between gap-3">
        <strong className="text-[0.86rem] font-extrabold text-slate-950">{plan.label}</strong>
        <span className="text-[0.86rem] font-extrabold text-slate-950">
          월 {plan.monthlyPrice.toLocaleString("ko-KR")}원
        </span>
      </div>
      <ul className="m-0 grid list-none gap-1.5 p-0">
        {plan.benefits.map((benefit) => (
          <li className="flex items-start gap-2 text-[0.8rem] leading-[1.5] text-slate-700" key={benefit}>
            <span aria-hidden className="shrink-0 text-[var(--brand-primary-strong)]">
              ✓
            </span>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}
