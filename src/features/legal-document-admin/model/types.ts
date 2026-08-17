import type { LegalDocumentType } from "@/entities/legal-document/api/admin";

export type AdminDocumentDraft = {
  documentType: LegalDocumentType;
  title: string;
  contentMarkdown: string;
  version: string;
  effectiveDate: string;
  isPublished: boolean;
};
