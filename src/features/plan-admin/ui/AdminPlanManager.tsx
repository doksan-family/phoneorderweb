"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { planQueryOptions } from "@/entities/plan/model/queries";
import { FloatingActionButton } from "@/shared/ui/FloatingActionButton";
import { adminFullPanelWithFabClass } from "@/shared/ui/adminPanelStyles";
import { carrierOptions } from "../model/planDraft";
import { AdminPlanList } from "./AdminPlanList";
import { PlanCreateModal } from "./PlanCreateModal";

export function AdminPlanManager() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const {
    data: plans = [],
    isError,
    isPending,
  } = useQuery(planQueryOptions.adminList());

  return (
    <section className={`grid content-start gap-5 ${adminFullPanelWithFabClass}`}>
      {isPending ? (
        <p className="m-0 text-sm font-bold text-slate-500">
          요금제를 불러오는 중입니다.
        </p>
      ) : null}
      {isError ? (
        <p className="m-0 text-sm font-bold text-red-600">
          요금제 목록을 불러오지 못했습니다.
        </p>
      ) : null}
      {!isPending && !isError ? <AdminPlanList items={plans} /> : null}

      <div className="text-[0.88rem] leading-[1.65] text-slate-500">
        요금제 {plans.length}개 · 통신사 {carrierOptions.length}개
      </div>

      <FloatingActionButton
        label="요금제 등록"
        onClick={() => setIsCreateOpen(true)}
      />

      {isCreateOpen ? (
        <PlanCreateModal onClose={() => setIsCreateOpen(false)} />
      ) : null}
    </section>
  );
}
