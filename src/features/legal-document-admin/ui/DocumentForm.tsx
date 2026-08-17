"use client";

import type { AdminLegalDocument } from "@/entities/legal-document/api/admin";
import {
  adminCheckboxClass,
  adminErrorClass,
  adminFieldClass,
  adminInlineFieldClass,
  primaryButtonClass,
  secondaryButtonClass,
  twoColumnFieldGridClass,
} from "@/features/admin/ui/adminStyles";
import { LoadingOverlay } from "@/shared/ui/LoadingOverlay";
import { legalDocumentTypeOptions } from "../model/documentTypeLabels";
import { useDocumentForm } from "../model/useDocumentForm";

type DocumentFormProps = {
  document?: AdminLegalDocument;
  onCancel?: () => void;
  onSaved?: (document: AdminLegalDocument) => void;
};

export function DocumentForm({ document, onCancel, onSaved }: DocumentFormProps) {
  const form = useDocumentForm({ document, onSaved });

  return (
    <form className="grid gap-4" onSubmit={form.submit}>
      <div className={twoColumnFieldGridClass}>
        <label className={adminFieldClass}>
          문서 종류
          <select
            value={form.draft.documentType}
            onChange={(event) =>
              form.update(
                "documentType",
                event.target.value as typeof form.draft.documentType
              )
            }
          >
            {legalDocumentTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className={adminFieldClass}>
          제목
          <input
            required
            value={form.draft.title}
            onChange={(event) => form.update("title", event.target.value)}
          />
        </label>
      </div>
      <div className={twoColumnFieldGridClass}>
        <label className={adminFieldClass}>
          버전
          <input
            placeholder="2026.08.10"
            required
            value={form.draft.version}
            onChange={(event) => form.update("version", event.target.value)}
          />
        </label>
        <label className={adminFieldClass}>
          시행일
          <input
            type="date"
            value={form.draft.effectiveDate}
            onChange={(event) => form.update("effectiveDate", event.target.value)}
          />
        </label>
      </div>
      <label className={adminFieldClass}>
        본문 (Markdown)
        <textarea
          rows={12}
          value={form.draft.contentMarkdown}
          onChange={(event) =>
            form.update("contentMarkdown", event.target.value)
          }
        />
      </label>
      <label className={adminInlineFieldClass}>
        <input
          checked={form.draft.isPublished}
          className={adminCheckboxClass}
          type="checkbox"
          onChange={(event) => form.update("isPublished", event.target.checked)}
        />
        공개 (같은 종류의 기존 공개 문서는 자동 비공개됩니다)
      </label>
      {form.error ? <p className={adminErrorClass}>{form.error}</p> : null}
      <div className="flex justify-end gap-2 max-[560px]:grid">
        {onCancel ? (
          <button className={secondaryButtonClass} type="button" onClick={onCancel}>
            취소
          </button>
        ) : null}
        <button
          className={primaryButtonClass}
          disabled={form.loading}
          type="submit"
          onMouseUp={(event) => event.currentTarget.form?.requestSubmit()}
        >
          {form.loading ? "저장 중..." : form.isEdit ? "약관 수정" : "약관 등록"}
        </button>
      </div>
      {form.loading ? <LoadingOverlay /> : null}
    </form>
  );
}
