import { Check } from "lucide-react";
import type { AdminPlan } from "@/entities/plan/api/admin";

type ProductPlanOptionProps = {
  plan: AdminPlan;
  selected: boolean;
  onToggle: (planId: string) => void;
};

const baseClass =
  "flex w-full items-center gap-2 rounded-md border px-2.5 py-2 text-left text-[0.82rem] font-bold transition";
const selectedClass =
  "border-[var(--brand-primary-strong)] bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]";
const idleClass =
  "border-slate-200 bg-white text-slate-600 hover:bg-[var(--brand-primary-soft)]";

export function ProductPlanOption({
  plan,
  selected,
  onToggle,
}: ProductPlanOptionProps) {
  return (
    <button
      aria-pressed={selected}
      className={`${baseClass} ${selected ? selectedClass : idleClass}`}
      type="button"
      onClick={() => onToggle(plan.id)}
    >
      <span
        className={`grid size-4 shrink-0 place-items-center rounded-full border ${
          selected
            ? "border-[var(--brand-primary-strong)] bg-white"
            : "border-slate-300"
        }`}
      >
        {selected ? <Check size={11} aria-hidden /> : null}
      </span>
      <span className="min-w-0 flex-1 truncate">{plan.name}</span>
      <span className="shrink-0 text-[0.75rem] opacity-70">
        {plan.monthly_fee.toLocaleString("ko-KR")}원
      </span>
    </button>
  );
}
