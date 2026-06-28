"use client";

import { useQuery } from "@tanstack/react-query";
import { bannerQueryOptions } from "@/entities/banner/model/queries";
import { HeroBannerSlider } from "@/features/hero-banner/ui/HeroBannerSlider";

export function HomeHero() {
  const { data: banners = [] } = useQuery(bannerQueryOptions.list("main"));
  return <HeroBannerSlider banners={banners} />;
}
