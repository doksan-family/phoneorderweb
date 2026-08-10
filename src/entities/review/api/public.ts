import { apiFetch } from "@/shared/api/client";
import type {
  PublicReview,
  PublicReviewDetailResponse,
  PublicReviewListResponse,
  PublicReviewPage,
} from "../model/types";

export type PublicReviewsParams = {
  product_id?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
};

/** 공개 후기도 상품과 같이 60초 지연 반영을 허용하고 Next Data Cache를 태운다. */
const publicCacheInit: RequestInit = { next: { revalidate: 60 } };

export async function fetchPublicReviews(
  params: PublicReviewsParams = {}
): Promise<PublicReviewPage> {
  const response = await apiFetch<PublicReviewListResponse>(
    `/functions/v1/public-reviews${toPublicReviewsSearch(params)}`,
    publicCacheInit
  );
  return response.data;
}

/** 같은 엔드포인트에 id를 넘기면 목록 대신 단건을 돌려준다. */
export async function fetchPublicReview(id: string): Promise<PublicReview> {
  const search = new URLSearchParams({ id });
  const response = await apiFetch<PublicReviewDetailResponse>(
    `/functions/v1/public-reviews?${search.toString()}`,
    publicCacheInit
  );
  return response.data;
}

/** 공개·관리자 엔드포인트가 같은 필터를 받으므로 쿼리 조립도 공유한다. */
export function toPublicReviewsSearch(params: PublicReviewsParams) {
  const search = new URLSearchParams();
  if (params.product_id) search.set("product_id", params.product_id);
  if (params.featured !== undefined) search.set("featured", String(params.featured));
  if (params.limit !== undefined) search.set("limit", String(params.limit));
  if (params.offset !== undefined) search.set("offset", String(params.offset));

  const query = search.toString();
  return query ? `?${query}` : "";
}
