import type { AdminPlan, CarrierCode } from "@/entities/plan/api/admin";
import { carrierOptions } from "../model/planDraft";
import { AdminPlanCarrierColumn } from "./AdminPlanCarrierColumn";

type AdminPlanListProps = {
  items: AdminPlan[];
  togglingId?: string;
  onCreate: (carrierCode: CarrierCode) => void;
  onEdit: (plan: AdminPlan) => void;
  onToggleActive: (plan: AdminPlan) => void;
  /** 드래그로 바뀐 한 통신사의 전체 순서 */
  onReorder: (items: AdminPlan[]) => void;
};

export function AdminPlanList({
  items,
  togglingId,
  onCreate,
  onEdit,
  onToggleActive,
  onReorder,
}: AdminPlanListProps) {
  return (
    <div className="grid grid-cols-3 items-start gap-3 max-[900px]:grid-cols-1">
      {carrierOptions.map((carrier) => (
        <AdminPlanCarrierColumn
          carrier={carrier}
          items={items
            .filter((plan) => plan.carrier_code === carrier.value)
            // 드래그 순서와 화면 순서를 맞추려면 열이 항상 display_order 순이어야 한다.
            .sort((first, second) => (first.display_order ?? 0) - (second.display_order ?? 0))}
          key={carrier.value}
          togglingId={togglingId}
          onCreate={onCreate}
          onEdit={onEdit}
          onReorder={onReorder}
          onToggleActive={onToggleActive}
        />
      ))}
    </div>
  );
}
