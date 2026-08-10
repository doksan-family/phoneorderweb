import { queryOptions } from "@tanstack/react-query";
import {
  fetchAdminAuditLog,
  fetchAdminAuditLogs,
  type AdminAuditLogsParams,
} from "../api/admin";

export const auditLogQueryOptions = {
  list: (params: AdminAuditLogsParams = {}) =>
    queryOptions({
      queryKey: ["admin-audit-logs", params] as const,
      queryFn: () => fetchAdminAuditLogs(params),
      retry: false,
      staleTime: 30_000,
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: ["admin-audit-log", id] as const,
      queryFn: () => fetchAdminAuditLog(id),
      retry: false,
      staleTime: 30_000,
    }),
};
