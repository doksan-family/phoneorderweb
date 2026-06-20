import type { ProductPlanOption } from "@/entities/product/model/types";

type PlanChoiceListProps = {
  options: ProductPlanOption[];
  value: string;
  onChange: (value: string) => void;
};

export function PlanChoiceList({ options, value, onChange }: PlanChoiceListProps) {
  return (
    <div className="detail-field detail-field--wide">
      <span>요금제</span>
      <div className="color-choice-list">
        {options.map((plan) => (
          <button
            className={plan.id === value ? "color-choice plan-choice is-active" : "color-choice plan-choice"}
            key={plan.id}
            onClick={() => onChange(plan.id)}
            type="button"
          >
            <strong>{plan.label}</strong>
            <em>{plan.monthlyPrice.toLocaleString("ko-KR")}원/월</em>
          </button>
        ))}
      </div>
    </div>
  );
}
