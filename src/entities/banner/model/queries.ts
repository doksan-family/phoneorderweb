import { queryOptions } from "@tanstack/react-query";
import { fetchBanners } from "../api";
import type { BannerType } from "./types";

export const bannerQueryOptions = {
  list: (type: BannerType) =>
    queryOptions({
      queryKey: ["banners", type] as const,
      queryFn: () => fetchBanners(type),
      staleTime: 60_000,
    }),
};
