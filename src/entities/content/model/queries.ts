import { queryOptions } from "@tanstack/react-query";
import { fetchAdminFaqs, fetchAdminNotices } from "../api/adminCustomerCenter";
import {
  fetchPublicFaqs,
  fetchPublicNotices,
  type CustomerCenterParams,
} from "../api/customerCenter";

export const customerCenterQueryOptions = {
  notices: (params: CustomerCenterParams = {}) =>
    queryOptions({
      queryKey: ["public-notices", params] as const,
      queryFn: () => fetchPublicNotices(params),
      retry: false,
      staleTime: 30_000,
    }),
  faqs: (params: CustomerCenterParams = {}) =>
    queryOptions({
      queryKey: ["public-faqs", params] as const,
      queryFn: () => fetchPublicFaqs(params),
      retry: false,
      staleTime: 30_000,
    }),
  /** 어드민 목록. 비공개 항목까지 내려온다. */
  adminNotices: (params: CustomerCenterParams = {}) =>
    queryOptions({
      queryKey: ["admin-notices", params] as const,
      queryFn: () => fetchAdminNotices(params),
      retry: false,
      staleTime: 30_000,
    }),
  adminFaqs: (params: CustomerCenterParams = {}) =>
    queryOptions({
      queryKey: ["admin-faqs", params] as const,
      queryFn: () => fetchAdminFaqs(params),
      retry: false,
      staleTime: 30_000,
    }),
};
