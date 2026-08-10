import { apiFetch } from "@/shared/api/client";
import { createClient } from "@/shared/lib/supabase/client";
import type {
  AdminDashboardApiResponse,
  AdminDashboardData,
} from "../model/types";

export const DASHBOARD_DEFAULT_DAYS = 30;

/** GET /functions/v1/admin-dashboard?days= */
export async function fetchAdminDashboard(
  days: number = DASHBOARD_DEFAULT_DAYS
): Promise<AdminDashboardData> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  const search = new URLSearchParams({ days: String(days) });
  const response = await apiFetch<AdminDashboardApiResponse>(
    `/functions/v1/admin-dashboard?${search.toString()}`,
    undefined,
    data.session?.access_token
  );
  return response.data;
}
