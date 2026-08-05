import { queryOptions } from "@tanstack/react-query";
import {
  fetchAdminPlans,
  type FetchAdminPlansParams,
} from "@/entities/plan/api/admin";

export const planQueryOptions = {
  adminList: (params: FetchAdminPlansParams = {}) =>
    queryOptions({
      queryKey: ["admin-plans", params] as const,
      queryFn: () => fetchAdminPlans(params),
      retry: false,
      staleTime: 30_000,
    }),
};
