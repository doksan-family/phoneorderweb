import { apiFetch } from "@/shared/api/client";
import type { SiteSettingsResponse } from "./types";

export type { SiteSettings } from "./types";

/** 응답이 최대 5분 캐시되므로 Next Data Cache도 같은 주기로 맞춘다. */
export async function fetchPublicSiteSettings() {
  const response = await apiFetch<SiteSettingsResponse>(
    "/functions/v1/public-site-settings",
    { next: { revalidate: 300 } }
  );
  return response.data;
}
