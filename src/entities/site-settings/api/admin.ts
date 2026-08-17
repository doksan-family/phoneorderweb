import { apiFetch } from "@/shared/api/client";
import { createClient } from "@/shared/lib/supabase/client";
import type { PrivacyRetentionPreviewResponse } from "./privacyRetentionTypes";
import type {
  AdminSiteSettingsResponse,
  SiteSettingsUpdatePayload,
} from "./types";

export type { AdminSiteSettings, SiteSettingsUpdatePayload } from "./types";
export type {
  PrivacyCleanupRun,
  PrivacyRetentionPreview,
} from "./privacyRetentionTypes";

export async function fetchPrivacyRetentionPreview() {
  const accessToken = await getAccessToken();
  const response = await apiFetch<PrivacyRetentionPreviewResponse>(
    "/functions/v1/admin-site-settings/privacy-retention/preview",
    undefined,
    accessToken
  );
  return response.data;
}

export async function fetchAdminSiteSettings() {
  const accessToken = await getAccessToken();
  const response = await apiFetch<AdminSiteSettingsResponse>(
    "/functions/v1/admin-site-settings",
    undefined,
    accessToken
  );
  return response.data;
}

/** 전달한 필드만 수정된다. */
export async function updateAdminSiteSettings(
  payload: SiteSettingsUpdatePayload
) {
  const accessToken = await getAccessToken();
  const response = await apiFetch<AdminSiteSettingsResponse>(
    "/functions/v1/admin-site-settings",
    { method: "PATCH", body: JSON.stringify(payload) },
    accessToken
  );
  return response.data;
}

async function getAccessToken(): Promise<string | undefined> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}
