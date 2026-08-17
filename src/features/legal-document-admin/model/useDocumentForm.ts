"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useRef, useState } from "react";
import {
  createAdminLegalDocument,
  updateAdminLegalDocument,
  type AdminLegalDocument,
} from "@/entities/legal-document/api/admin";
import { adminLegalDocumentsQueryKey } from "@/entities/legal-document/model/queries";
import {
  createDocumentCreatePayload,
  createDocumentDraftFromDocument,
  createDocumentUpdatePayload,
  createEmptyDocumentDraft,
} from "./documentDraft";
import type { AdminDocumentDraft } from "./types";

type UseDocumentFormParams = {
  /** 있으면 수정 모드(PATCH), 없으면 등록 모드(POST) */
  document?: AdminLegalDocument;
  onSaved?: (document: AdminLegalDocument) => void;
};

export function useDocumentForm({ document, onSaved }: UseDocumentFormParams = {}) {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<AdminDocumentDraft>(() =>
    document ? createDocumentDraftFromDocument(document) : createEmptyDocumentDraft()
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const lastSubmitAtRef = useRef(0);

  function update<K extends keyof AdminDocumentDraft>(
    key: K,
    value: AdminDocumentDraft[K]
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (Date.now() - lastSubmitAtRef.current < 400) return;
    lastSubmitAtRef.current = Date.now();

    if (!draft.title.trim() || !draft.version.trim()) {
      setError("제목과 버전은 필수입니다.");
      return;
    }
    if (draft.isPublished && (!draft.contentMarkdown.trim() || !draft.effectiveDate)) {
      setError("공개하려면 본문과 시행일이 필요합니다.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const saved = document
        ? await updateAdminLegalDocument(
            document.id,
            createDocumentUpdatePayload(draft)
          )
        : await createAdminLegalDocument(createDocumentCreatePayload(draft));
      await queryClient.invalidateQueries({
        queryKey: adminLegalDocumentsQueryKey,
      });
      if (!document) setDraft(createEmptyDocumentDraft());
      onSaved?.(saved);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : document
            ? "약관 수정에 실패했습니다."
            : "약관 등록에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  }

  return { draft, error, isEdit: Boolean(document), loading, submit, update };
}
