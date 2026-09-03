import { apiFetch } from "@/shared/api/client";
import type { PublicBanner } from "@/entities/banner/model/types";
import type { PublicApiBootstrapData, PublicApiBootstrapResponse } from "./types";

export type { PublicApiBootstrapData } from "./types";

export type PublicApiBootstrapParams = {
  category?: string;
  limit?: number;
  offset?: number;
};

/**
 * 초기 화면(홈)에 필요한 배너·상품·카테고리·사이트설정을 한 번에 받는다.
 * Edge Function 내부에서 기존 공개 컨트롤러를 병렬 실행하므로
 * 개별 API를 따로 부르는 것보다 왕복 횟수가 줄어든다.
 */
export async function fetchPublicApiBootstrap(
  params: PublicApiBootstrapParams = {}
): Promise<PublicApiBootstrapData> {
  const search = new URLSearchParams();
  if (params.category) search.set("category", params.category);
  if (params.limit !== undefined) search.set("limit", String(params.limit));
  if (params.offset !== undefined) search.set("offset", String(params.offset));
  const query = search.toString();

  const response = await apiFetch<PublicApiBootstrapResponse>(
    `/functions/v1/public-api/bootstrap${query ? `?${query}` : ""}`,
    { next: { revalidate: 60 } }
  );
  const data = response.data;

  return {
    banners: {
      main: normalizeBannerList(data.banners?.main),
      event: normalizeBannerList(data.banners?.event),
    },
    products: data.products ?? [],
    categories: { items: data.categories?.items ?? [] },
    site_settings: data.site_settings,
  };
}

/** 명세상 불투명한 banners 항목을 PublicBanner 배열로 좁힌다. */
function normalizeBannerList(value: unknown): PublicBanner[] {
  if (Array.isArray(value)) return value as PublicBanner[];
  if (value && typeof value === "object") {
    const nested = (value as { data?: unknown; items?: unknown }).data ??
      (value as { items?: unknown }).items;
    if (Array.isArray(nested)) return nested as PublicBanner[];
  }
  return [];
}
