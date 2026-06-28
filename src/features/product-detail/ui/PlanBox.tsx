import type { ProductPlanOption } from "@/entities/product/model/types";

type PlanBoxProps = {
  plan: ProductPlanOption;
};

export function PlanBox({ plan }: PlanBoxProps) {
  return (
    <div className="grid gap-3 border border-slate-200 rounded-[10px] p-[14px] bg-slate-50">
      <div className="flex justify-between gap-3">
        <strong>{plan.label}</strong>
        <span className="text-blue-900 font-extrabold">월 {plan.monthlyPrice.toLocaleString("ko-KR")}원</span>
      </div>
      <ul className="m-0 pl-[18px] text-slate-500 leading-[1.75]">
        {plan.benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
    </div>
  );
}
