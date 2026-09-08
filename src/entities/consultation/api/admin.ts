import { ApiError, apiFetch } from "@/shared/api/client";
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

export type ExportAdminConsultationsParams = {
  status?: FetchAdminConsultationsParams["status"];
  phone?: string;
  fromDate?: string;
  toDate?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * CSV는 JSON이 아니라 apiFetch를 못 쓴다. Blob과 파일명을 함께 돌려주고
 * 호출부에서 다운로드를 트리거하게 한다.
 */
export async function exportAdminConsultationsCsv(
  params: ExportAdminConsultationsParams = {}
) {
  const accessToken = await getAccessToken();
  if (!accessToken) throw new ApiError("관리자 로그인이 필요합니다.", 401);
  const search = new URLSearchParams();
  if (params.status) search.set("status", params.status);
  if (params.phone) search.set("phone", params.phone);
  if (params.fromDate) search.set("from_date", params.fromDate);
  if (params.toDate) search.set("to_date", params.toDate);

  const query = search.toString();
  const res = await fetch(
    `${BASE_URL}/functions/v1/admin-consultations/export.csv${query ? `?${query}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: ANON_KEY,
      },
    }
  );

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      typeof body.message === "string" ? body.message : `HTTP ${res.status}`
    );
  }

  const disposition = res.headers.get("Content-Disposition") ?? "";
  const filenameMatch = disposition.match(/filename="?([^";]+)"?/);
  const filename = filenameMatch?.[1] ?? "consultations.csv";

  return { blob: await res.blob(), filename };
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
