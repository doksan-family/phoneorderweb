import { statusToneClass } from "@/entities/consultation/model/status";
import type {
  AdminDashboardSummary,
  DashboardConsultationStatusCount,
} from "@/entities/dashboard/model/types";
import { AdminOverviewCard } from "./AdminOverviewCard";
import { AdminSummaryTile } from "./AdminSummaryTile";

type AdminOverviewSummaryProps = {
  summary: AdminDashboardSummary;
  statusCounts: DashboardConsultationStatusCount[];
};

export function AdminOverviewSummary({
  summary,
  statusCounts,
}: AdminOverviewSummaryProps) {
  const statusTotal = statusCounts.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="grid gap-3.5">
      <div className="grid grid-cols-4 gap-3.5 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
        <AdminSummaryTile
          accent
          hint={`이번 달 ${summary.consultations_month.toLocaleString()}건 접수`}
          label="오늘 상담"
          value={summary.consultations_today}
        />
        <AdminSummaryTile
          label="판매 중 상품"
          off={summary.products_inactive}
          offLabel="비활성"
          on={summary.products_active}
          onLabel="활성"
          value={summary.products_active}
        />
        <AdminSummaryTile
          label="공개 후기"
          off={summary.reviews_unpublished}
          offLabel="비공개"
          on={summary.reviews_published}
          onLabel="공개"
          value={summary.reviews_published}
        />
        <AdminSummaryTile
          hint={`공지 ${summary.notices_published}건 · FAQ ${summary.faqs_published}건 공개 중`}
          label="고객센터 글"
          value={summary.notices_published + summary.faqs_published}
        />
      </div>

      <AdminOverviewCard
        emptyMessage="집계된 상담이 없습니다."
        isEmpty={!statusCounts.length}
        meta={`전체 ${statusTotal.toLocaleString()}건`}
        title="상담 상태"
      >
        <div className="flex flex-wrap gap-2">
          {statusCounts.map((item) => (
            <span
              className={`brand-pill gap-1.5 px-3 py-1.5 text-[0.8rem] ${statusToneClass[item.status]}`}
              key={item.status}
            >
              {item.status_label}
              <strong className="text-[0.85rem]">
                {item.count.toLocaleString()}
              </strong>
            </span>
          ))}
        </div>
      </AdminOverviewCard>
    </div>
  );
}
