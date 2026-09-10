import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { ADMIN_LIST_PAGE_SIZE, MAX_PAGE_LOOP } from "@/shared/api/pagination";
import {
  fetchAdminReview,
  fetchAdminReviews,
  fetchAdminReviewsPage,
  type AdminReviewsParams,
} from "../api/admin";
import {
  fetchPublicReview,
  fetchPublicReviews,
  type PublicReviewsParams,
} from "../api/public";

/** 홈 미리보기는 서버 prefetch와 클라이언트 useQuery가 같은 키를 써야 한다. */
export const HOME_REVIEW_PARAMS: PublicReviewsParams = { featured: true, limit: 4 };

/** 후기 목록 무한 스크롤 페이지 크기. */
export const PUBLIC_REVIEW_PAGE_SIZE = 12;

export const reviewQueryOptions = {
  publicList: (params: PublicReviewsParams = {}) =>
    queryOptions({
      queryKey: ["public-reviews", params] as const,
      queryFn: () => fetchPublicReviews(params),
      staleTime: 30_000,
    }),
  /** 후기 목록 무한 스크롤. page/page_size 기반이며 total로 다음 페이지 유무를 판단한다. */
  publicInfiniteList: (params: PublicReviewsParams = {}) =>
    infiniteQueryOptions({
      queryKey: ["public-reviews-infinite", params] as const,
      queryFn: ({ pageParam }) =>
        fetchPublicReviews({
          ...params,
          page: pageParam,
          page_size: PUBLIC_REVIEW_PAGE_SIZE,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        // 짧은 페이지·빈 페이지·과다 루프는 끝으로 본다(서버가 page를 무시하는 경우 방어).
        if (lastPage.items.length < PUBLIC_REVIEW_PAGE_SIZE) return undefined;
        if (allPages.length >= MAX_PAGE_LOOP) return undefined;
        const loaded = allPages.reduce((sum, page) => sum + page.items.length, 0);
        return loaded < lastPage.total ? allPages.length + 1 : undefined;
      },
      staleTime: 30_000,
    }),
  publicDetail: (id: string) =>
    queryOptions({
      queryKey: ["public-review-detail", id] as const,
      queryFn: () => fetchPublicReview(id),
      staleTime: 30_000,
    }),
  /** 어드민 목록. 비공개 후기까지 내려온다. */
  adminList: (params: AdminReviewsParams = {}) =>
    queryOptions({
      queryKey: ["admin-reviews", params] as const,
      queryFn: () => fetchAdminReviews(params),
      staleTime: 30_000,
    }),
  /** 어드민 목록 무한 스크롤. 드래그 정렬은 로드된 항목 기준으로만 저장된다. */
  adminInfiniteList: (params: AdminReviewsParams = {}) =>
    infiniteQueryOptions({
      queryKey: ["admin-reviews-infinite", params] as const,
      queryFn: ({ pageParam }) =>
        fetchAdminReviewsPage({
          ...params,
          page: pageParam,
          page_size: ADMIN_LIST_PAGE_SIZE,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.items.length) return undefined;
        if (lastPage.items.length < ADMIN_LIST_PAGE_SIZE) return undefined;
        if (allPages.length >= MAX_PAGE_LOOP) return undefined;
        if (lastPage.pagination) {
          return lastPage.pagination.hasNext ? allPages.length + 1 : undefined;
        }
        const loaded = allPages.reduce((sum, page) => sum + page.items.length, 0);
        return loaded < lastPage.total ? allPages.length + 1 : undefined;
      },
      staleTime: 30_000,
    }),
  adminDetail: (id: string) =>
    queryOptions({
      queryKey: ["admin-review-detail", id] as const,
      queryFn: () => fetchAdminReview(id),
      enabled: id !== "",
      staleTime: 30_000,
    }),
};

export const adminReviewsQueryKey = ["admin-reviews"] as const;
