import { Plus } from "lucide-react";
import type { AdminPlan, CarrierCode } from "@/entities/plan/api/admin";
import { carrierOptions } from "../model/planDraft";
import { AdminPlanCard } from "./AdminPlanCard";

type AdminPlanListProps = {
  items: AdminPlan[];
  togglingId?: string;
  onCreate: (carrierCode: CarrierCode) => void;
  onEdit: (plan: AdminPlan) => void;
  onToggleActive: (plan: AdminPlan) => void;
};

const addButtonClass =
  "inline-flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-[var(--brand-primary-soft)]";

export function AdminPlanList({
  items,
  togglingId,
  onCreate,
  onEdit,
  onToggleActive,
}: AdminPlanListProps) {
  return (
    <div className="grid grid-cols-3 items-start gap-3 max-[900px]:grid-cols-1">
      {carrierOptions.map((carrier) => {
        const carrierPlans = items.filter(
          (plan) => plan.carrier_code === carrier.value,
        );

        return (
          <section className="grid content-start gap-2.5" key={carrier.value}>
            <header className="flex items-baseline justify-between gap-2 border-b border-slate-200 pb-2">
              <strong className="text-[0.95rem]">{carrier.label}</strong>
              <span className="flex items-center gap-2 text-[0.82rem] text-slate-500">
                {carrierPlans.length}개
                <button
                  aria-label={`${carrier.label} 요금제 등록`}
                  className={addButtonClass}
                  title={`${carrier.label} 요금제 등록`}
                  type="button"
                  onClick={() => onCreate(carrier.value)}
                >
                  <Plus size={16} />
                </button>
              </span>
            </header>
            {carrierPlans.length ? (
              carrierPlans.map((plan) => (
                <AdminPlanCard
                  key={plan.id}
                  plan={plan}
                  toggling={togglingId === plan.id}
                  onEdit={onEdit}
                  onToggleActive={onToggleActive}
                />
              ))
            ) : (
              <p className="m-0 text-[0.85rem] text-slate-400">요금제 없음</p>
            )}
          </section>
        );
      })}
    </div>
  );
}
