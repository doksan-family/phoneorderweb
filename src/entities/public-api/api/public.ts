import { apiFetch } from "@/shared/api/client";
import type { PublicApiBootstrapResponse } from "./types";

export type { PublicApiBootstrapData } from "./types";

export type PublicApiBootstrapParams = {
  category?: string;
  limit?: number;
  offset?: number;
};

/**
 * 초기 화면(홈)에 필요한 배너·상품·카테고리·사이트설정을 한 번에 받는다.
 * Edge Function 내부에서 기존 공개 컨트롤러를 병렬 실행하므로
 * 개별 API를 따로 부르는 것보다 왕복 횟수가 줄어든다.
 */
export async function fetchPublicApiBootstrap(
  params: PublicApiBootstrapParams = {}
) {
  const search = new URLSearchParams();
  if (params.category) search.set("category", params.category);
  if (params.limit !== undefined) search.set("limit", String(params.limit));
  if (params.offset !== undefined) search.set("offset", String(params.offset));
  const query = search.toString();

  const response = await apiFetch<PublicApiBootstrapResponse>(
    `/functions/v1/public-api/bootstrap${query ? `?${query}` : ""}`,
    { next: { revalidate: 60 } }
  );
  return response.data;
}
