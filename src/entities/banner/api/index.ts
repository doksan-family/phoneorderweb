import { apiFetch } from "@/shared/api/client";
import type { BannerType, PublicBanner, PublicBannerListResponse } from "../model/types";

export async function fetchBanners(type: BannerType): Promise<PublicBanner[]> {
  try {
    const result = await apiFetch<PublicBannerListResponse>(
      `/functions/v1/public-banners?type=${type}`
    );
    return result.data;
  } catch {
    return [];
  }
}
