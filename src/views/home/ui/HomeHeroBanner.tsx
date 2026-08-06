"use client";

import { useQuery } from "@tanstack/react-query";
import { bannerQueryOptions } from "@/entities/banner/model/queries";
import { HeroBannerSlider } from "@/features/hero-banner/ui/HeroBannerSlider";
import { Skeleton } from "@/shared/ui/Skeleton";

export function HomeHeroBanner() {
  const { data: banners = [], isPending } = useQuery(
    bannerQueryOptions.list("main")
  );

  if (isPending) {
    return (
      <Skeleton className="aspect-[16/7] w-full rounded-[20px] max-[560px]:aspect-[4/3]" />
    );
  }

  if (!banners.length) return null;

  return (
    <div className="overflow-hidden rounded-[20px] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
      <HeroBannerSlider banners={banners} />
    </div>
  );
}
