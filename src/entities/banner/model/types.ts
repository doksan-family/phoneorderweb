export type BannerType = "main" | "event";

export type PublicBanner = {
  id: string;
  type: BannerType;
  title: string;
  image_url: string | null;
  link_url: string | null;
  cta_label: string | null;
  display_order: number;
};

export type PublicBannerListResponse = {
  ok: boolean;
  data: PublicBanner[];
};

export type AdminBanner = {
  id: string;
  type: BannerType;
  title: string;
  image_path: string | null;
  link_url: string | null;
  cta_label: string | null;
  display_order: number;
  is_active: boolean;
  start_at: string | null;
  end_at: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type AdminBannerListResponse = {
  ok: boolean;
  data: AdminBanner[];
};

export type AdminBannerCreateResponse = {
  ok: boolean;
  data: AdminBanner;
};

export type AdminBannerDeleteResponse = {
  ok: boolean;
  data: { id: string; image_path: string };
};
