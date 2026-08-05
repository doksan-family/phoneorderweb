import type { AdminPlan } from "@/entities/plan/api/admin";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";
import { carrierOptions } from "../model/planDraft";

type AdminPlanListProps = {
  items: AdminPlan[];
};

export function AdminPlanList({ items }: AdminPlanListProps) {
  if (!items.length) {
    return <AdminEmptyState message="등록된 요금제가 없습니다." />;
  }

  return (
    <div className="grid gap-2.5">
      {items.map((plan) => (
        <article
          className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-[10px] border border-slate-200 bg-white p-[14px] max-[900px]:grid-cols-1"
          key={plan.id}
        >
          <div className="grid min-w-0 gap-1">
            <strong className="overflow-x-auto whitespace-nowrap">
              {plan.name}
            </strong>
            <span className="overflow-x-auto whitespace-nowrap text-[0.88rem] leading-[1.65] text-slate-500">
              {getCarrierLabel(plan.carrier_code)} ·{" "}
              {plan.monthly_fee.toLocaleString("ko-KR")}원
              {plan.data_amount ? ` · ${plan.data_amount}` : ""}
              {plan.call_text_description ? ` · ${plan.call_text_description}` : ""}
            </span>
          </div>
          <span className="inline-flex min-h-10 items-center justify-center rounded-[10px] border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700">
            {plan.is_active === false ? "비활성" : "활성"}
          </span>
        </article>
      ))}
    </div>
  );
}

function getCarrierLabel(value: string) {
  return carrierOptions.find((carrier) => carrier.value === value)?.label ?? value;
}
