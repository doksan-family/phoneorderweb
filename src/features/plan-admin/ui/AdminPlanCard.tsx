"use client";

import { useState } from "react";
import type { AdminPlan } from "@/entities/plan/api/admin";
import { StatusBadge } from "@/shared/ui/StatusBadge";

type AdminPlanCardProps = {
  plan: AdminPlan;
  toggling: boolean;
  onEdit: (plan: AdminPlan) => void;
  onToggleActive: (plan: AdminPlan) => void;
};

const toggleClass =
  "w-full cursor-pointer whitespace-nowrap rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[0.78rem] font-bold text-slate-700 shadow-[0_8px_20px_rgba(21,24,15,0.12)] transition hover:bg-[var(--brand-primary-soft)] disabled:cursor-not-allowed disabled:opacity-60";

export function AdminPlanCard({
  plan,
  toggling,
  onEdit,
  onToggleActive,
}: AdminPlanCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        <div
          className="relative shrink-0"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsMenuOpen(false);
            }
          }}
        >
          <button
            aria-expanded={isMenuOpen}
            className="cursor-pointer"
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <StatusBadge active={isActive} activeLabel="활성" inactiveLabel="비활성" />
          </button>
          {isMenuOpen ? (
            <div className="absolute right-0 top-full z-10 mt-1 min-w-max rounded-lg bg-white p-1">
              <button
                className={toggleClass}
                disabled={toggling}
                type="button"
                onClick={() => {
                  onToggleActive(plan);
                  setIsMenuOpen(false);
                }}
              >
                {toggling ? "처리 중" : isActive ? "비활성화하기" : "활성화하기"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <span className="overflow-x-auto whitespace-nowrap text-[0.88rem] leading-[1.65] text-slate-500">
        {plan.monthly_fee.toLocaleString("ko-KR")}원
        {plan.data_amount ? ` · ${plan.data_amount}` : ""}
        {plan.call_text_description ? ` · ${plan.call_text_description}` : ""}
      </span>
    </article>
  );
}
