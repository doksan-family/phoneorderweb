"use client";

import { useQuery } from "@tanstack/react-query";
import { bannerQueryOptions } from "@/entities/banner/model/queries";
import { HomeEventBanner } from "./HomeEventBanner";

export function HomeEventBannerSection() {
  const { data: banners = [] } = useQuery(bannerQueryOptions.list("event"));
  const banner = banners[0] ?? null;
  if (!banner) return null;
  return (
    <section className="mx-auto w-[min(1120px,calc(100%_-_40px))] pt-[72px] max-[560px]:w-[min(100%_-_28px,1120px)]">
      <HomeEventBanner banner={banner} />
    </section>
  );
}
