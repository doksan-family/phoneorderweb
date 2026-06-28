"use client";

import { useQuery } from "@tanstack/react-query";
import { bannerQueryOptions } from "@/entities/banner/model/queries";
import { HomeEventBanner } from "./HomeEventBanner";

export function HomeEventBannerSection() {
  const { data: banners = [] } = useQuery(bannerQueryOptions.list("event"));
  const banner = banners[0] ?? null;
  if (!banner) return null;
  return (
    <section className="section">
      <HomeEventBanner banner={banner} />
    </section>
  );
}
