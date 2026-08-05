import type { AdminPlan } from "@/entities/plan/api/admin";
import { subscriptionTypeOptions } from "../model/productDraft";

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const fieldClass = "grid gap-2 text-sm font-bold text-slate-700";

export function PlanField({ plans, value, onChange }: SelectProps & { plans: AdminPlan[] }) {
  return (
    <label className={fieldClass}>
      요금제
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">전체</option>
        {plans.map((plan) => (
          <option key={plan.id} value={plan.id}>
            {plan.name}
          </option>
        ))}
      </select>
    </label>
  );
}

export function SubscriptionField({ value, onChange }: SelectProps) {
  return (
    <label className={fieldClass}>
      가입유형
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">전체</option>
        {subscriptionTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
