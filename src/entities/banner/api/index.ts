import type { BannerType, PublicBanner, PublicBannerListResponse } from "../model/types";

export async function fetchBanners(type: BannerType): Promise<PublicBanner[]> {
  try {
    const baseUrl =
      typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
        : "";
    const res = await fetch(`${baseUrl}/api/banners?type=${type}`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) return [];
    const result: PublicBannerListResponse = await res.json() as PublicBannerListResponse;
    return result.data;
  } catch {
    return [];
  }
}
