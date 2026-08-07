"use client";

import type { AdminPlan } from "@/entities/plan/api/admin";
import { VisibilityToggle } from "@/shared/ui/VisibilityToggle";

type AdminPlanCardProps = {
  plan: AdminPlan;
  toggling: boolean;
  onEdit: (plan: AdminPlan) => void;
  onToggleActive: (plan: AdminPlan) => void;
};

export function AdminPlanCard({
  plan,
  toggling,
  onEdit,
  onToggleActive,
}: AdminPlanCardProps) {
  const isActive = plan.is_active !== false;

  return (
    <article
      className={`grid gap-1 rounded-[10px] border p-3.5 ${
        isActive ? "border-slate-200 bg-white" : "border-dashed border-slate-300 bg-slate-50"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <button
          className="min-w-0 cursor-pointer overflow-x-auto whitespace-nowrap text-left font-bold hover:underline"
          type="button"
          onClick={() => onEdit(plan)}
        >
          {plan.name}
        </button>
        <VisibilityToggle
          active={isActive}
          disabled={toggling}
          label={`${plan.name} 노출`}
          onChange={() => onToggleActive(plan)}
        />
      </div>
      <span className="overflow-x-auto whitespace-nowrap text-[0.88rem] leading-[1.65] text-slate-500">
        {plan.monthly_fee.toLocaleString("ko-KR")}원
        {plan.data_amount ? ` · ${plan.data_amount}` : ""}
        {plan.call_text_description ? ` · ${plan.call_text_description}` : ""}
      </span>
    </article>
  );
}
