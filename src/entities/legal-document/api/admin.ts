import { apiFetch } from "@/shared/api/client";
import { createClient } from "@/shared/lib/supabase/client";
import type {
  AdminLegalDocumentDeleteResponse,
  AdminLegalDocumentResponse,
  AdminLegalDocumentsResponse,
  LegalDocumentCreatePayload,
  LegalDocumentUpdatePayload,
} from "./types";

export type {
  AdminLegalDocument,
  LegalDocumentCreatePayload,
  LegalDocumentType,
  LegalDocumentUpdatePayload,
} from "./types";

export async function fetchAdminLegalDocuments() {
  const accessToken = await getAccessToken();
  const response = await apiFetch<AdminLegalDocumentsResponse>(
    "/functions/v1/admin-site-settings/legal-documents",
    undefined,
    accessToken
  );
  return response.data;
}

export async function createAdminLegalDocument(
  payload: LegalDocumentCreatePayload
) {
  const accessToken = await getAccessToken();
  const response = await apiFetch<AdminLegalDocumentResponse>(
    "/functions/v1/admin-site-settings/legal-documents",
    { method: "POST", body: JSON.stringify(payload) },
    accessToken
  );
  return response.data;
}

export async function updateAdminLegalDocument(
  id: string,
  payload: LegalDocumentUpdatePayload
) {
  const accessToken = await getAccessToken();
  const response = await apiFetch<AdminLegalDocumentResponse>(
    `/functions/v1/admin-site-settings/legal-documents?id=${encodeURIComponent(id)}`,
    { method: "PATCH", body: JSON.stringify(payload) },
    accessToken
  );
  return response.data;
}

export async function deleteAdminLegalDocument(id: string) {
  const accessToken = await getAccessToken();
  const response = await apiFetch<AdminLegalDocumentDeleteResponse>(
    `/functions/v1/admin-site-settings/legal-documents?id=${encodeURIComponent(id)}`,
    { method: "DELETE" },
    accessToken
  );
  return response.data;
}

async function getAccessToken(): Promise<string | undefined> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}
