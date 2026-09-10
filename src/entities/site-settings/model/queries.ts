import { queryOptions } from "@tanstack/react-query";
import {
  fetchAdminSiteSettings,
  fetchPrivacyRetentionPreview,
} from "@/entities/site-settings/api/admin";
import { fetchPublicSiteSettings } from "@/entities/site-settings/api/public";

export const siteSettingsQueryOptions = {
  public: () =>
    queryOptions({
      queryKey: ["public-site-settings"] as const,
      queryFn: () => fetchPublicSiteSettings(),
      staleTime: 300_000,
    }),
  admin: () =>
    queryOptions({
      queryKey: ["admin-site-settings"] as const,
      queryFn: () => fetchAdminSiteSettings(),
      staleTime: 30_000,
    }),
  privacyRetentionPreview: () =>
    queryOptions({
      queryKey: ["privacy-retention-preview"] as const,
      queryFn: () => fetchPrivacyRetentionPreview(),
      staleTime: 30_000,
    }),
};

export const adminSiteSettingsQueryKey = ["admin-site-settings"] as const;
