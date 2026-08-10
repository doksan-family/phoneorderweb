import { queryOptions } from "@tanstack/react-query";
import {
  fetchAdminReview,
  fetchAdminReviews,
  type AdminReviewsParams,
} from "../api/admin";
import {
  fetchPublicReview,
  fetchPublicReviews,
  type PublicReviewsParams,
} from "../api/public";

/** 홈 미리보기는 서버 prefetch와 클라이언트 useQuery가 같은 키를 써야 한다. */
export const HOME_REVIEW_PARAMS: PublicReviewsParams = { featured: true, limit: 4 };

export const reviewQueryOptions = {
  publicList: (params: PublicReviewsParams = {}) =>
    queryOptions({
      queryKey: ["public-reviews", params] as const,
      queryFn: () => fetchPublicReviews(params),
      retry: false,
      staleTime: 30_000,
    }),
  publicDetail: (id: string) =>
    queryOptions({
      queryKey: ["public-review-detail", id] as const,
      queryFn: () => fetchPublicReview(id),
      retry: false,
      staleTime: 30_000,
    }),
  /** 어드민 목록. 비공개 후기까지 내려온다. */
  adminList: (params: AdminReviewsParams = {}) =>
    queryOptions({
      queryKey: ["admin-reviews", params] as const,
      queryFn: () => fetchAdminReviews(params),
      retry: false,
      staleTime: 30_000,
    }),
  adminDetail: (id: string) =>
    queryOptions({
      queryKey: ["admin-review-detail", id] as const,
      queryFn: () => fetchAdminReview(id),
      enabled: id !== "",
      retry: false,
      staleTime: 30_000,
    }),
};

export const adminReviewsQueryKey = ["admin-reviews"] as const;
