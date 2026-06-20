import type { ProductPlanOption } from "@/entities/product/model/types";

type PlanBoxProps = {
  plan: ProductPlanOption;
};

export function PlanBox({ plan }: PlanBoxProps) {
  return (
    <div className="plan-box">
      <div>
        <strong>{plan.label}</strong>
        <span>월 {plan.monthlyPrice.toLocaleString("ko-KR")}원</span>
      </div>
      <ul>
        {plan.benefits.map((benefit) => (
          <li key={benefit}>{benefit}</li>
        ))}
      </ul>
    </div>
  );
}
