"use client";

import type { AdminLegalDocument } from "@/entities/legal-document/api/admin";
import { legalDocumentTypeLabel } from "@/features/legal-document-admin/model/documentTypeLabels";
import { AdminEmptyState } from "@/shared/ui/AdminEmptyState";
import { SkeletonRows } from "@/shared/ui/SkeletonRows";
import { ghostButtonClass, secondaryButtonClass } from "@/features/admin/ui/adminStyles";

type AdminLegalDocumentListProps = {
  items: AdminLegalDocument[];
  isPending: boolean;
  isMutating: boolean;
  error: Error | null;
  onEdit: (document: AdminLegalDocument) => void;
  onDelete: (document: AdminLegalDocument) => void;
};

export function AdminLegalDocumentList({
  items,
  isPending,
  isMutating,
  error,
  onEdit,
  onDelete,
}: AdminLegalDocumentListProps) {
  if (error) {
    return (
      <AdminEmptyState message={`약관을 불러오지 못했습니다. ${error.message}`} />
    );
  }

  if (isPending) {
    return <SkeletonRows withThumbnail={false} />;
  }

  if (!items.length) {
    return <AdminEmptyState message="등록된 약관이 없습니다." />;
  }

  return (
    <div className="grid gap-2.5">
      {items.map((document) => (
        <article
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[10px] border border-slate-200 bg-white p-[14px]"
          key={document.id}
        >
          <div className="grid min-w-0 gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex shrink-0 items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[0.72rem] font-bold text-slate-600">
                {legalDocumentTypeLabel(document.document_type)}
              </span>
              {document.is_published ? (
                <span className="inline-flex shrink-0 items-center rounded-full bg-[var(--brand-primary-soft)] px-2 py-0.5 text-[0.72rem] font-bold text-[var(--brand-primary-strong)]">
                  공개중
                </span>
              ) : null}
              <strong className="overflow-hidden text-ellipsis whitespace-nowrap">
                {document.title}
              </strong>
            </div>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[0.85rem] text-slate-500">
              v{document.version}
              {document.effective_date ? ` · 시행일 ${document.effective_date}` : ""}
            </span>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              className={secondaryButtonClass}
              disabled={isMutating}
              type="button"
              onClick={() => onEdit(document)}
            >
              수정
            </button>
            <button
              className={ghostButtonClass}
              disabled={isMutating}
              type="button"
              onClick={() => onDelete(document)}
            >
              삭제
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
