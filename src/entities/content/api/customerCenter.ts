import { apiFetch } from "@/shared/api/client";
import type {
  CustomerCenterListResponse,
  CustomerCenterPage,
  PublicFaq,
  PublicNotice,
} from "../model/customerCenterTypes";

export type CustomerCenterParams = {
  /** FAQ 분류 필터. 공지사항에서는 무시된다. */
  category?: string;
  limit?: number;
  offset?: number;
};

/** 공지·FAQ도 다른 공개 API처럼 60초 지연 반영을 허용한다. */
const publicCacheInit: RequestInit = { next: { revalidate: 60 } };

export function fetchPublicNotices(
  params: CustomerCenterParams = {}
): Promise<CustomerCenterPage<PublicNotice>> {
  return fetchCustomerCenter<PublicNotice>("notices", params);
}

export function fetchPublicFaqs(
  params: CustomerCenterParams = {}
): Promise<CustomerCenterPage<PublicFaq>> {
  return fetchCustomerCenter<PublicFaq>("faqs", params);
}

async function fetchCustomerCenter<T>(
  resource: "notices" | "faqs",
  params: CustomerCenterParams
): Promise<CustomerCenterPage<T>> {
  const response = await apiFetch<CustomerCenterListResponse<T>>(
    `/functions/v1/public-customer-center/${resource}${toCustomerCenterSearch(params)}`,
    publicCacheInit
  );
  return response.data;
}

/** 공개·관리자 엔드포인트가 같은 필터를 받으므로 쿼리 조립도 공유한다. */
export function toCustomerCenterSearch(params: CustomerCenterParams) {
  const search = new URLSearchParams();
  if (params.category) search.set("category", params.category);
  if (params.limit !== undefined) search.set("limit", String(params.limit));
  if (params.offset !== undefined) search.set("offset", String(params.offset));

  const query = search.toString();
  return query ? `?${query}` : "";
}
