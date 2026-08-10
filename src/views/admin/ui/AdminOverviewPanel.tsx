"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DASHBOARD_DEFAULT_DAYS } from "@/entities/dashboard/api/admin";
import { dashboardQueryOptions } from "@/entities/dashboard/model/queries";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";
import { AdminDailyConsultationChart } from "./AdminDailyConsultationChart";
import { AdminOverviewCard } from "./AdminOverviewCard";
import {
  AdminRecentActionList,
  AdminRecentConsultationList,
  AdminTopProductList,
} from "./AdminOverviewLists";
import { AdminOverviewSkeleton } from "./AdminOverviewSkeleton";
import { AdminOverviewSummary } from "./AdminOverviewSummary";

const dayOptions = [7, DASHBOARD_DEFAULT_DAYS, 90];

export function AdminOverviewPanel() {
  const [days, setDays] = useState(DASHBOARD_DEFAULT_DAYS);
  const { data, error, isPending, isFetching } = useQuery(
    dashboardQueryOptions.admin(days)
  );

  // 다른 탭과 달리 카드 격자라 흰 패널로 감싸지 않는다.
  return (
    <section className="min-h-[calc(100vh_-_112px)] pb-6">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="m-0 text-lg font-extrabold tracking-[-0.02em] text-slate-950">
            대시보드
          </h2>
          <p className="m-0 mt-1 text-[0.78rem] text-slate-400">
            {data ? `${data.generated_at} 기준` : "집계 시각을 불러오는 중"}
            {isFetching && data ? " · 새로고침 중" : ""}
          </p>
        </div>

        <div
          aria-label="집계 기간"
          className="inline-flex gap-1 rounded-xl bg-slate-100 p-1"
          role="group"
        >
          {dayOptions.map((option) => (
            <button
              aria-pressed={option === days}
              className={`cursor-pointer rounded-lg px-3.5 py-2 text-[0.8rem] font-bold transition ${
                option === days
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              key={option}
              type="button"
              onClick={() => setDays(option)}
            >
              {option}일
            </button>
          ))}
        </div>
      </header>

      {isPending ? <AdminOverviewSkeleton /> : null}
      {error ? (
        <AdminEmptyState message="대시보드를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요." />
      ) : null}

      {data ? (
        <div className="grid gap-3.5">
          <AdminOverviewSummary
            statusCounts={data.consultation_status_counts}
            summary={data.summary}
          />

          <AdminOverviewCard
            emptyMessage="기간 내 접수된 상담이 없습니다."
            isEmpty={!data.daily_consultations.length}
            meta={`최근 ${data.period_days}일`}
            title="일별 상담 접수"
          >
            <AdminDailyConsultationChart items={data.daily_consultations} />
          </AdminOverviewCard>

          <div className="grid grid-cols-2 gap-3.5 max-[900px]:grid-cols-1">
            <AdminRecentConsultationList items={data.recent_consultations} />
            <AdminTopProductList items={data.top_products} />
          </div>
          <AdminRecentActionList items={data.recent_admin_actions} />
        </div>
      ) : null}
    </section>
  );
}
