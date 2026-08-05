import type { AdminPlan } from "@/entities/plan/api/admin";
import { ProductMultiChoiceField } from "./ProductMultiChoiceField";

type ProductPlanSelectProps = {
  plans: AdminPlan[];
  values: string[];
  onChange: (values: string[]) => void;
};

export function ProductPlanSelect({
  plans,
  values,
  onChange,
}: ProductPlanSelectProps) {
  if (!plans.length) {
    return (
      <div className="grid gap-2 text-sm font-bold text-slate-700">
        <span>요금제</span>
        <span className="rounded-lg border border-dashed border-slate-200 px-3 py-2 text-slate-400">
          등록된 요금제가 없습니다.
        </span>
      </div>
    );
  }

  return (
    <ProductMultiChoiceField
      label="요금제"
      options={plans.map((plan) => ({
        label: getPlanLabel(plan),
        value: plan.id,
      }))}
      values={values}
      onChange={onChange}
    />
  );
}

function getPlanLabel(plan: AdminPlan) {
  return `${plan.carrier_code} · ${plan.name} · ${plan.monthly_fee.toLocaleString("ko-KR")}원`;
}
