import type { BannerType, PublicBanner, PublicBannerListResponse } from "../model/types";
import { apiFetch } from "@/shared/api/client";

export async function fetchBanners(type: BannerType): Promise<PublicBanner[]> {
  try {
    if (typeof window === "undefined") {
      // 서버: Supabase 직접 호출 (CORS 없음)
      const result = await apiFetch<PublicBannerListResponse>(
        `/functions/v1/public-banners?type=${type}`
      );
      return result.data;
    }

    // 브라우저: Next.js 프록시 경유 (CORS 방지)
    const res = await fetch(`/api/banners?type=${type}`);
    if (!res.ok) return [];
    const result = await res.json() as PublicBannerListResponse;
    return result.data;
  } catch {
    return [];
  }
}
