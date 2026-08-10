import {
  auditFieldNames,
  describeAuditAction,
  formatAuditTime,
} from "@/entities/audit-log/model/labels";
import {
  auditActionClass,
  type AdminAuditLog,
} from "@/entities/audit-log/model/types";

export function AdminAuditLogRow({ log }: { log: AdminAuditLog }) {
  return (
    <article className="grid gap-1.5 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`brand-pill px-2.5 py-1 text-[0.75rem] ${auditActionClass(log.action)}`}
        >
          {describeAuditAction(log.action, log.resource_type)}
        </span>
        {!log.success ? (
          <span className="brand-pill bg-rose-50 px-2.5 py-1 text-[0.75rem] text-rose-700">
            실패
          </span>
        ) : null}
        {log.changed_fields.length ? (
          <span className="truncate text-[0.82rem] text-slate-600">
            바꾼 항목: {auditFieldNames(log.changed_fields)}
          </span>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.78rem] text-slate-400">
        <span>{formatAuditTime(log.created_at)}</span>
        <span aria-hidden>·</span>
        <span>{log.admin_email ?? "관리자"}</span>
      </div>
    </article>
  );
}
