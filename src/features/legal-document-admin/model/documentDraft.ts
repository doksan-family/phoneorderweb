import type {
  AdminLegalDocument,
  LegalDocumentCreatePayload,
  LegalDocumentUpdatePayload,
} from "@/entities/legal-document/api/admin";
import { legalDocumentTypeOptions } from "./documentTypeLabels";
import type { AdminDocumentDraft } from "./types";

export function createEmptyDocumentDraft(): AdminDocumentDraft {
  return {
    documentType: legalDocumentTypeOptions[0].value,
    title: "",
    contentMarkdown: "",
    version: "",
    effectiveDate: "",
    isPublished: false,
  };
}

export function createDocumentDraftFromDocument(
  document: AdminLegalDocument
): AdminDocumentDraft {
  return {
    documentType: document.document_type,
    title: document.title,
    contentMarkdown: document.content_markdown,
    version: document.version,
    effectiveDate: document.effective_date ?? "",
    isPublished: document.is_published,
  };
}

export function createDocumentCreatePayload(
  draft: AdminDocumentDraft
): LegalDocumentCreatePayload {
  return {
    document_type: draft.documentType,
    title: draft.title.trim(),
    content_markdown: draft.contentMarkdown,
    version: draft.version.trim(),
    effective_date: draft.effectiveDate || null,
    is_published: draft.isPublished,
  };
}

export function createDocumentUpdatePayload(
  draft: AdminDocumentDraft
): LegalDocumentUpdatePayload {
  return {
    document_type: draft.documentType,
    title: draft.title.trim(),
    content_markdown: draft.contentMarkdown,
    version: draft.version.trim(),
    effective_date: draft.effectiveDate || null,
    is_published: draft.isPublished,
  };
}
