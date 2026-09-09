import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import {
  ADMIN_CONSULTATION_PAGE_SIZE,
  fetchAdminConsultations,
  fetchAdminConsultationsPage,
  type FetchAdminConsultationsParams,
} from "../api/admin";

export const adminConsultationsQueryKey = ["admin-consultations"] as const;

export const consultationQueryOptions = {
  /** 상태 필터·검색은 화면에서 처리하므로 목록은 한 번만 받아 둔다. */
  adminList: (params: FetchAdminConsultationsParams = {}) =>
    queryOptions({
      queryKey: [...adminConsultationsQueryKey, params] as const,
      queryFn: () => fetchAdminConsultations(params),
      retry: false,
      staleTime: 30_000,
    }),
  /** 상담 신청 목록 무한 스크롤. 키워드·상태 필터는 화면에서 로드된 페이지에만 적용된다. */
  adminInfiniteList: (params: FetchAdminConsultationsParams = {}) =>
    infiniteQueryOptions({
      queryKey: [...adminConsultationsQueryKey, "infinite", params] as const,
      queryFn: ({ pageParam }) =>
        fetchAdminConsultationsPage({
          ...params,
          page: pageParam,
          page_size: ADMIN_CONSULTATION_PAGE_SIZE,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.hasNext !== undefined) {
          return lastPage.hasNext ? allPages.length + 1 : undefined;
        }
        const loaded = allPages.reduce((sum, page) => sum + page.items.length, 0);
        return loaded < lastPage.total ? allPages.length + 1 : undefined;
      },
      retry: false,
      staleTime: 30_000,
    }),
};
