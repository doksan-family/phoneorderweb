import {
  auditFieldNames,
  describeAuditAction,
  formatAuditTime,
} from "@/entities/audit-log/model/labels";
import { auditActionClass } from "@/entities/audit-log/model/types";
import { statusLabel, statusToneClass } from "@/entities/consultation/model/status";
import type {
  DashboardRecentAdminAction,
  DashboardRecentConsultation,
  DashboardTopProduct,
} from "@/entities/dashboard/model/types";
import { AdminOverviewCard } from "./AdminOverviewCard";

const listClass = "grid gap-0.5";
const rowClass =
  "flex items-center justify-between gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-50";
const subClass = "shrink-0 text-[0.75rem] text-slate-400";

export function AdminRecentConsultationList({
  items,
}: {
  items: DashboardRecentConsultation[];
}) {
  return (
    <AdminOverviewCard
      emptyMessage="접수된 상담이 없습니다."
      isEmpty={!items.length}
      meta={items.length ? `최근 ${items.length}건` : undefined}
      title="최근 상담"
    >
      <div className={listClass}>
        {items.map((item) => (
          <div className={rowClass} key={item.id}>
            <div className="grid min-w-0 gap-0.5">
              <div className="flex items-center gap-2">
                <strong className="truncate text-[0.85rem] text-slate-950">
                  {item.name}
                </strong>
                <span
                  className={`brand-pill px-2 py-0.5 text-[0.7rem] ${statusToneClass[item.status]}`}
                >
                  {statusLabel[item.status]}
                </span>
              </div>
              <span className="truncate text-[0.78rem] text-slate-500">
                {item.product_name ?? "상품 미지정"} · {item.application_number}
              </span>
            </div>
            <span className={subClass}>{item.created_at}</span>
          </div>
        ))}
      </div>
    </AdminOverviewCard>
  );
}

export function AdminTopProductList({ items }: { items: DashboardTopProduct[] }) {
  const max = Math.max(1, ...items.map((item) => item.consultation_count));

  return (
    <AdminOverviewCard
      emptyMessage="기간 내 상담 신청이 없습니다."
      isEmpty={!items.length}
      title="상담 많은 상품"
    >
      <div className="grid gap-2.5">
        {items.map((item, index) => (
          <div className="grid gap-1.5" key={item.product_id}>
            <div className="flex items-center justify-between gap-3 text-[0.82rem]">
              <span className="truncate text-slate-600">
                <span className="mr-1.5 font-bold text-slate-400">{index + 1}</span>
                {item.product_name ?? "이름 없는 상품"}
              </span>
              <strong className="shrink-0 text-slate-950">
                {item.consultation_count.toLocaleString()}건
              </strong>
            </div>
            <div aria-hidden className="h-1.5 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[var(--brand-primary-strong)]"
                style={{ width: `${(item.consultation_count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </AdminOverviewCard>
  );
}

export function AdminRecentActionList({
  items,
}: {
  items: DashboardRecentAdminAction[];
}) {
  return (
    <AdminOverviewCard
      emptyMessage="기록된 관리자 작업이 없습니다."
      isEmpty={!items.length}
      meta={items.length ? `최근 ${items.length}건` : undefined}
      title="최근 관리자 작업"
    >
      <div className={listClass}>
        {items.map((item) => (
          <div className={rowClass} key={item.id}>
            <div className="flex min-w-0 items-center gap-2">
              <span
                className={`brand-pill shrink-0 px-2 py-0.5 text-[0.7rem] ${auditActionClass(item.action)}`}
              >
                {describeAuditAction(item.action, item.resource_type)}
              </span>
              {item.changed_fields.length ? (
                <span className="truncate text-[0.78rem] text-slate-500">
                  {auditFieldNames(item.changed_fields)}
                </span>
              ) : null}
            </div>
            <span className={subClass}>
              {item.admin_email ?? "관리자"} · {formatAuditTime(item.created_at)}
            </span>
          </div>
        ))}
      </div>
    </AdminOverviewCard>
  );
}
