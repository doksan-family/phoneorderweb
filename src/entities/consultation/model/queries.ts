import { queryOptions } from "@tanstack/react-query";
import {
  fetchAdminConsultations,
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
};
