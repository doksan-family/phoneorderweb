import { createClient } from "@/shared/lib/supabase/client";
import { apiFetch, apiFetchMultipart } from "@/shared/api/client";
import type {
  AdminBanner,
  AdminBannerCreateResponse,
  AdminBannerDeleteResponse,
  AdminBannerImageUploadResponse,
  AdminBannerListResponse,
  BannerType,
} from "../model/types";

async function getAccessToken(): Promise<string | undefined> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}

type FetchAdminBannersParams = {
  id?: string;
  type?: BannerType;
};

export async function fetchAdminBanners(
  params: FetchAdminBannersParams = {}
): Promise<AdminBanner[]> {
  const searchParams = new URLSearchParams();
  if (params.id) searchParams.set("id", params.id);
  if (params.type) searchParams.set("type", params.type);

  const query = searchParams.toString();
  const path = `/functions/v1/admin-banners${query ? `?${query}` : ""}`;

  const accessToken = await getAccessToken();
  const result = await apiFetch<AdminBannerListResponse>(path, undefined, accessToken);
  return result.data;
}

type CreateAdminBannerParams = {
  file: File;
  type: BannerType;
  title: string;
  link_url?: string;
  cta_label?: string;
  display_order?: number;
  is_active?: boolean;
  start_at?: string;
  end_at?: string;
};

export async function createAdminBanner(
  params: CreateAdminBannerParams
): Promise<AdminBanner> {
  const formData = new FormData();
  formData.append("file", params.file);
  formData.append("type", params.type);
  formData.append("title", params.title);
  if (params.link_url) formData.append("link_url", params.link_url);
  if (params.cta_label) formData.append("cta_label", params.cta_label);
  if (params.display_order !== undefined)
    formData.append("display_order", String(params.display_order));
  if (params.is_active !== undefined)
    formData.append("is_active", String(params.is_active));
  if (params.start_at) formData.append("start_at", params.start_at);
  if (params.end_at) formData.append("end_at", params.end_at);

  const accessToken = await getAccessToken();
  const result = await apiFetchMultipart<AdminBannerCreateResponse>(
    "/functions/v1/admin-banners",
    formData,
    accessToken
  );
  return result.data;
}

export async function uploadAdminBannerImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const accessToken = await getAccessToken();
  const result = await apiFetchMultipart<AdminBannerImageUploadResponse>(
    "/functions/v1/admin-banners/image",
    formData,
    accessToken
  );
  return result.data.image_path;
}

export type UpdateAdminBannerParams = {
  title?: string;
  image_path?: string;
  link_url?: string | null;
  cta_label?: string | null;
  display_order?: number;
  is_active?: boolean;
  start_at?: string | null;
  end_at?: string | null;
};

export async function updateAdminBanner(
  id: string,
  params: UpdateAdminBannerParams
): Promise<AdminBanner> {
  const accessToken = await getAccessToken();
  const result = await apiFetch<AdminBannerCreateResponse>(
    `/functions/v1/admin-banners?id=${id}`,
    { method: "PATCH", body: JSON.stringify(params) },
    accessToken
  );
  return result.data;
}

export async function deleteAdminBanner(id: string): Promise<string> {
  const accessToken = await getAccessToken();
  const result = await apiFetch<AdminBannerDeleteResponse>(
    `/functions/v1/admin-banners?id=${id}`,
    { method: "DELETE" },
    accessToken
  );
  return result.data.id;
}
