import { apiFetch } from "@/shared/api/client";
import { createClient } from "@/shared/lib/supabase/client";
import type {
  AdminAuditLog,
  AdminAuditLogApiResponse,
  AdminAuditLogPage,
  AuditLogAction,
  AuditLogResourceType,
} from "../model/types";

export type AdminAuditLogsParams = {
  admin_user_id?: string;
  action?: AuditLogAction;
  resource_type?: AuditLogResourceType;
  resource_id?: string;
  /** ISO 8601 (예: 2026-08-01T00:00:00+09:00) */
  date_from?: string;
  limit?: number;
  offset?: number;
};

/** GET /functions/v1/admin-audit-logs (id 없이 = 목록) */
export async function fetchAdminAuditLogs(
  params: AdminAuditLogsParams = {}
): Promise<AdminAuditLogPage> {
  const response = await requestAuditLogs(toAuditLogSearch(params));
  return response.data as AdminAuditLogPage;
}

/** GET /functions/v1/admin-audit-logs?id= (단건) */
export async function fetchAdminAuditLog(id: string): Promise<AdminAuditLog> {
  const response = await requestAuditLogs(`?${new URLSearchParams({ id })}`);
  return response.data as AdminAuditLog;
}

async function requestAuditLogs(query: string) {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return apiFetch<AdminAuditLogApiResponse>(
    `/functions/v1/admin-audit-logs${query}`,
    undefined,
    data.session?.access_token
  );
}

function toAuditLogSearch(params: AdminAuditLogsParams) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") search.set(key, String(value));
  }

  const query = search.toString();
  return query ? `?${query}` : "";
}
