import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { fetchAdminFaqs, fetchAdminNotices } from "../api/adminCustomerCenter";
import {
  fetchPublicFaqs,
  fetchPublicNotice,
  fetchPublicNotices,
  type CustomerCenterParams,
} from "../api/customerCenter";

const NOTICE_PAGE_SIZE = 15;

export const customerCenterQueryOptions = {
  notices: (params: CustomerCenterParams = {}) =>
    queryOptions({
      queryKey: ["public-notices", params] as const,
      queryFn: () => fetchPublicNotices(params),
      staleTime: 30_000,
    }),
  /** 공지 목록 무한 스크롤. offset 기반이며 total로 다음 페이지 유무를 판단한다. */
  noticesInfinite: () =>
    infiniteQueryOptions({
      queryKey: ["public-notices-infinite"] as const,
      queryFn: ({ pageParam }) =>
        fetchPublicNotices({ limit: NOTICE_PAGE_SIZE, offset: pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const loaded = allPages.reduce((sum, page) => sum + page.items.length, 0);
        return loaded < lastPage.total ? loaded : undefined;
      },
      staleTime: 30_000,
    }),
  noticeDetail: (id: string) =>
    queryOptions({
      queryKey: ["public-notice-detail", id] as const,
      queryFn: () => fetchPublicNotice(id),
      enabled: id !== "",
      staleTime: 30_000,
    }),
  faqs: (params: CustomerCenterParams = {}) =>
    queryOptions({
      queryKey: ["public-faqs", params] as const,
      queryFn: () => fetchPublicFaqs(params),
      staleTime: 30_000,
    }),
  /** 어드민 목록. 비공개 항목까지 내려온다. */
  adminNotices: (params: CustomerCenterParams = {}) =>
    queryOptions({
      queryKey: ["admin-notices", params] as const,
      queryFn: () => fetchAdminNotices(params),
      staleTime: 30_000,
    }),
  adminFaqs: (params: CustomerCenterParams = {}) =>
    queryOptions({
      queryKey: ["admin-faqs", params] as const,
      queryFn: () => fetchAdminFaqs(params),
      staleTime: 30_000,
    }),
};
