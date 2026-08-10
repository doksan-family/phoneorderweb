"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  auditActionLabel,
  auditResourceLabel,
} from "@/entities/audit-log/model/labels";
import { auditLogQueryOptions } from "@/entities/audit-log/model/queries";
import {
  AUDIT_LOG_ACTIONS,
  AUDIT_LOG_RESOURCE_TYPES,
  type AuditLogAction,
  type AuditLogResourceType,
} from "@/entities/audit-log/model/types";
import { adminFieldClass } from "@/features/admin/ui/adminStyles";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";
import { SkeletonRows } from "@/shared/ui/SkeletonRows";
import { adminFullPanelClass } from "@/shared/ui/adminPanelStyles";
import { AdminAuditLogRow } from "./AdminAuditLogRow";

const PAGE_SIZE = 50;

export function AdminAuditLogPanel() {
  const [action, setAction] = useState<AuditLogAction | "">("");
  const [resourceType, setResourceType] = useState<AuditLogResourceType | "">("");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const { data, error, isPending } = useQuery(
    auditLogQueryOptions.list({
      action: action || undefined,
      resource_type: resourceType || undefined,
      limit,
    })
  );
  const items = data?.items ?? [];

  function changeFilter(next: () => void) {
    next();
    setLimit(PAGE_SIZE);
  }

  return (
    <section className={adminFullPanelClass}>
      <div className="mb-5 grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
        <label className={adminFieldClass}>
          무슨 작업
          <select
            value={action}
            onChange={(event) =>
              changeFilter(() => setAction(event.target.value as AuditLogAction | ""))
            }
          >
            <option value="">전체</option>
            {AUDIT_LOG_ACTIONS.map((option) => (
              <option key={option} value={option}>
                {auditActionLabel[option]}
              </option>
            ))}
          </select>
        </label>
        <label className={adminFieldClass}>
          어디에서
          <select
            value={resourceType}
            onChange={(event) =>
              changeFilter(() =>
                setResourceType(event.target.value as AuditLogResourceType | "")
              )
            }
          >
            <option value="">전체</option>
            {AUDIT_LOG_RESOURCE_TYPES.map((option) => (
              <option key={option} value={option}>
                {auditResourceLabel[option]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mb-5 text-[0.82rem] text-slate-400">
        관리자가 무엇을 바꿨는지 최신순으로 보여줍니다.
        {data ? ` 총 ${data.total.toLocaleString()}건` : ""}
      </p>

      {isPending ? <SkeletonRows count={3} /> : null}
      {error ? (
        <AdminEmptyState message="작업 기록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요." />
      ) : null}
      {!isPending && !error && !items.length ? (
        <AdminEmptyState message="조건에 맞는 작업 기록이 없습니다." />
      ) : null}

      <div className="grid gap-2.5">
        {items.map((log) => (
          <AdminAuditLogRow key={log.id} log={log} />
        ))}
      </div>

      {data && items.length < data.total ? (
        <button
          className="mt-5 w-full rounded-[10px] border border-slate-200 bg-white py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50"
          type="button"
          onClick={() => setLimit((current) => current + PAGE_SIZE)}
        >
          더 보기
        </button>
      ) : null}
    </section>
  );
}
