import { apiFetch } from "@/shared/api/client";
import type { LegalDocumentsResponse, LegalDocumentType } from "./types";

export type { LegalDocument, LegalDocumentType } from "./types";

export async function fetchPublicLegalDocuments(type?: LegalDocumentType) {
  const search = type ? `?type=${type}` : "";
  const response = await apiFetch<LegalDocumentsResponse>(
    `/functions/v1/public-site-settings/legal-documents${search}`,
    { next: { revalidate: 300 } }
  );
  return response.data.items;
}
