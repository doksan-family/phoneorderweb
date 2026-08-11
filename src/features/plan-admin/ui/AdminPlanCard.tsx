"use client";

import type { AdminPlan } from "@/entities/plan/api/admin";
import type { DragRowProps } from "@/shared/lib/useDragReorder";
import { DragHandle } from "@/shared/ui/DragHandle";
import { VisibilityToggle } from "@/shared/ui/VisibilityToggle";

type AdminPlanCardProps = {
  plan: AdminPlan;
  toggling: boolean;
  drag: DragRowProps;
  onEdit: (plan: AdminPlan) => void;
  onToggleActive: (plan: AdminPlan) => void;
};

export function AdminPlanCard({
  plan,
  toggling,
  drag,
  onEdit,
  onToggleActive,
}: AdminPlanCardProps) {
  const isActive = plan.is_active !== false;

  return (
    <article
      className={`grid gap-1 rounded-[10px] border p-3.5 ${
        isActive ? "border-slate-200 bg-white" : "border-dashed border-slate-300 bg-slate-50"
      } ${drag.isDropTarget ? "border-(--brand-primary) shadow-[0_0_0_3px_var(--brand-primary-shadow)]" : ""} ${
        drag.isDragging ? "opacity-40" : ""
      }`}
      draggable={drag.draggable}
      onDragEnd={drag.onDragEnd}
      onDragOver={drag.onDragOver}
      onDragStart={drag.onDragStart}
      onDrop={drag.onDrop}
    >
      <div className="flex items-center gap-2">
        <DragHandle label={plan.name} onGrab={drag.onHandleGrab} />
        <button
          className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-left font-bold hover:underline"
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
