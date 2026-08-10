import { queryOptions } from "@tanstack/react-query";
import {
  DASHBOARD_DEFAULT_DAYS,
  fetchAdminDashboard,
} from "../api/admin";

export const dashboardQueryOptions = {
  admin: (days: number = DASHBOARD_DEFAULT_DAYS) =>
    queryOptions({
      queryKey: ["admin-dashboard", days] as const,
      queryFn: () => fetchAdminDashboard(days),
      retry: false,
      staleTime: 60_000,
    }),
};
