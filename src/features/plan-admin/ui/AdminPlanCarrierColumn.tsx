"use client";

import { Plus } from "lucide-react";
import type { AdminPlan, CarrierCode } from "@/entities/plan/api/admin";
import { useDragReorder } from "@/shared/lib/useDragReorder";
import { AdminPlanCard } from "./AdminPlanCard";

type AdminPlanCarrierColumnProps = {
  carrier: { value: CarrierCode; label: string };
  /** 해당 통신사 요금제만. display_order 순으로 정렬돼 들어온다. */
  items: AdminPlan[];
  togglingId?: string;
  onCreate: (carrierCode: CarrierCode) => void;
  onEdit: (plan: AdminPlan) => void;
  onToggleActive: (plan: AdminPlan) => void;
  /** 드래그로 바뀐 이 통신사의 전체 순서 */
  onReorder: (items: AdminPlan[]) => void;
};

const addButtonClass =
  "inline-flex size-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-[var(--brand-primary-soft)]";

export function AdminPlanCarrierColumn({
  carrier,
  items,
  togglingId,
  onCreate,
  onEdit,
  onToggleActive,
  onReorder,
}: AdminPlanCarrierColumnProps) {
  const { getRowProps } = useDragReorder(items, onReorder);

  return (
    <section className="grid content-start gap-2.5">
      <header className="flex items-baseline justify-between gap-2 border-b border-slate-200 pb-2">
        <strong className="text-[0.95rem]">{carrier.label}</strong>
        <span className="flex items-center gap-2 text-[0.82rem] text-slate-500">
          {items.length}개
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
      {items.length ? (
        items.map((plan, index) => (
          <AdminPlanCard
            drag={getRowProps(index)}
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
}
