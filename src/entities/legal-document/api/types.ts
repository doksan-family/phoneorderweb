export type LegalDocumentType =
  | "privacy_policy"
  | "terms_of_service"
  | "privacy_collection_consent"
  | "marketing_consent";

export type LegalDocument = {
  document_type: LegalDocumentType;
  title: string;
  content_markdown: string;
  version: string;
  effective_date: string | null;
  updated_at: string;
};

export type LegalDocumentsResponse = {
  ok: boolean;
  data: { items: LegalDocument[] };
};

export type AdminLegalDocument = {
  id: string;
  document_type: LegalDocumentType;
  title: string;
  content_markdown: string;
  version: string;
  effective_date: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminLegalDocumentsResponse = {
  ok: boolean;
  data: AdminLegalDocument[];
};

export type AdminLegalDocumentResponse = {
  ok: boolean;
  data: AdminLegalDocument;
};

export type LegalDocumentCreatePayload = {
  document_type: LegalDocumentType;
  title: string;
  content_markdown?: string;
  version: string;
  effective_date?: string | null;
  is_published?: boolean;
};

export type LegalDocumentUpdatePayload = Partial<LegalDocumentCreatePayload>;

export type AdminLegalDocumentDeleteResponse = {
  ok: boolean;
  data: { id: string; document_type: LegalDocumentType; title: string };
};
