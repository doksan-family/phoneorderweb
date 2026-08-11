"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  deactivateAdminPlan,
  updateAdminPlan,
  type AdminPlan,
  type CarrierCode,
} from "@/entities/plan/api/admin";
import { planQueryOptions } from "@/entities/plan/model/queries";
import { adminFullPanelClass } from "@/shared/ui/adminPanelStyles";
import { carrierOptions } from "../model/planDraft";
import { usePlanReorder } from "../model/usePlanReorder";
import { AdminPlanList } from "./AdminPlanList";
import { PlanFormModal } from "./PlanFormModal";
import { AdminPlanListSkeleton } from "./AdminPlanListSkeleton";

/** null=닫힘, CarrierCode=해당 통신사 등록, AdminPlan=수정 */
type EditorState = null | CarrierCode | AdminPlan;

export function AdminPlanManager() {
  const [editor, setEditor] = useState<EditorState>(null);
  const queryClient = useQueryClient();
  const {
    data: plans = [],
    isError,
    isPending,
  } = useQuery(planQueryOptions.adminList({ includeInactive: true }));

  const toggleActive = useMutation({
    mutationFn: async (plan: AdminPlan) => {
      if (plan.is_active === false) {
        await updateAdminPlan(plan.id, { is_active: true });
        return;
      }
      await deactivateAdminPlan(plan.id);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-plans"] }),
  });

  const reorder = usePlanReorder();

  return (
    <section className={`grid content-start gap-5 ${adminFullPanelClass}`}>
      {isPending ? (
        <AdminPlanListSkeleton />
      ) : null}
      {isError ? (
        <p className="m-0 text-sm font-bold text-red-600">
          요금제 목록을 불러오지 못했습니다.
        </p>
      ) : null}
      {toggleActive.isError ? (
        <p className="m-0 text-sm font-bold text-red-600">
          활성 상태 변경에 실패했습니다.
        </p>
      ) : null}
      {!isPending && !isError ? (
        <AdminPlanList
          items={plans}
          togglingId={
            toggleActive.isPending ? toggleActive.variables?.id : undefined
          }
          onCreate={setEditor}
          onEdit={setEditor}
          onReorder={(next) =>
            reorder.mutate(
              next.map((plan) => ({ id: plan.id, order: plan.display_order ?? 0 }))
            )
          }
          onToggleActive={toggleActive.mutate}
        />
      ) : null}

      <div className="text-[0.88rem] leading-[1.65] text-slate-500">
        요금제 {plans.length}개 · 통신사 {carrierOptions.length}개
      </div>

      {editor ? (
        <PlanFormModal
          carrierCode={typeof editor === "string" ? editor : undefined}
          plan={typeof editor === "string" ? undefined : editor}
          onClose={() => setEditor(null)}
        />
      ) : null}
    </section>
  );
}
