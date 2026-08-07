import { ApiError, apiFetch } from "@/shared/api/client";
import { mapConsultations } from "../model/mapper";
import type {
  ConsultationApiResponse,
  ConsultationCreatePayload,
  ConsultationLookupPayload,
} from "./types";

export type {
  ConsultationCreatePayload,
  ConsultationLookupPayload,
} from "./types";

/** POST /functions/v1/public-consultations (비회원 상담 접수) */
export async function createConsultation(payload: ConsultationCreatePayload) {
  const response = await apiFetch<ConsultationApiResponse>(
    "/functions/v1/public-consultations",
    { method: "POST", body: JSON.stringify(payload) }
  );
  return mapConsultations(response)[0] ?? null;
}

/**
 * POST /functions/v1/public-consultation-lookup (이름·번호·비밀번호로 조회)
 * 일치 내역이 없으면 서버가 404를 주므로 빈 목록으로 바꿔 돌려준다.
 */
export async function lookupConsultations(payload: ConsultationLookupPayload) {
  try {
    const response = await apiFetch<ConsultationApiResponse>(
      "/functions/v1/public-consultation-lookup",
      { method: "POST", body: JSON.stringify(payload) }
    );
    return mapConsultations(response);
  } catch (cause) {
    if (cause instanceof ApiError && cause.status === 404) return [];
    throw cause;
  }
}
