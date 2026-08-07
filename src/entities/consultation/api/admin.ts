import { apiFetch } from "@/shared/api/client";
import { createClient } from "@/shared/lib/supabase/client";
import { mapConsultations } from "../model/mapper";
import type {
  ConsultationApiResponse,
  ConsultationUpdatePayload,
  FetchAdminConsultationsParams,
} from "./types";

export type {
  ConsultationUpdatePayload,
  FetchAdminConsultationsParams,
} from "./types";

/** GET /functions/v1/admin-consultations (id 없이 = 목록) */
export async function fetchAdminConsultations(
  params: FetchAdminConsultationsParams = {}
) {
  const accessToken = await getAccessToken();
  const response = await apiFetch<ConsultationApiResponse>(
    `/functions/v1/admin-consultations${toConsultationsSearch(params)}`,
    undefined,
    accessToken
  );
  return mapConsultations(response);
}

/** GET /functions/v1/admin-consultations?id= (단건 상세) */
export async function fetchAdminConsultation(id: string) {
  const accessToken = await getAccessToken();
  const response = await apiFetch<ConsultationApiResponse>(
    `/functions/v1/admin-consultations?id=${encodeURIComponent(id)}`,
    undefined,
    accessToken
  );
  return mapConsultations(response)[0] ?? null;
}

/** PATCH /functions/v1/admin-consultations?id= (상태·메모 부분 수정) */
export async function updateAdminConsultation(
  id: string,
  payload: ConsultationUpdatePayload
) {
  const accessToken = await getAccessToken();
  const response = await apiFetch<ConsultationApiResponse>(
    `/functions/v1/admin-consultations?id=${encodeURIComponent(id)}`,
    { method: "PATCH", body: JSON.stringify(payload) },
    accessToken
  );
  return mapConsultations(response)[0] ?? null;
}

function toConsultationsSearch(params: FetchAdminConsultationsParams) {
  const search = new URLSearchParams();
  if (params.status) search.set("status", params.status);
  if (params.phone) search.set("phone", params.phone);
  search.set("limit", String(params.limit ?? 100));
  if (params.offset !== undefined) search.set("offset", String(params.offset));

  return `?${search.toString()}`;
}

async function getAccessToken(): Promise<string | undefined> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}
