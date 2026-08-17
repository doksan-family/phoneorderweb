export type SiteSettings = {
  site_name: string;
  company_name: string | null;
  representative_name: string | null;
  business_registration_number: string | null;
  ecommerce_registration_number: string | null;
  address: string | null;
  representative_phone: string | null;
  customer_service_hours: string | null;
  email: string | null;
  kakao_channel_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  copyright_text: string | null;
  maintenance_enabled: boolean;
  maintenance_message: string | null;
  updated_at: string;
};

export type SiteSettingsResponse = {
  ok: boolean;
  data: SiteSettings;
};

export type AdminSiteSettings = SiteSettings & {
  privacy_cleanup_enabled: boolean;
  consultation_retention_days: number;
  privacy_cleanup_batch_limit: number;
  privacy_disposal_method: "anonymize";
  privacy_cleanup_schedule: string;
};

export type AdminSiteSettingsResponse = {
  ok: boolean;
  data: AdminSiteSettings;
};

export type SiteSettingsUpdatePayload = Partial<
  Omit<
    AdminSiteSettings,
    "privacy_disposal_method" | "privacy_cleanup_schedule" | "updated_at"
  >
>;
