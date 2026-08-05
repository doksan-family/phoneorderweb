"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import type { PublicBanner } from "@/entities/banner/model/types";
import { useHeroBannerAutoplay } from "@/features/hero-banner/model/useHeroBannerAutoplay";
import { HeroBannerControls } from "./HeroBannerControls";
import { HeroBannerLink } from "./HeroBannerLink";

type HeroBannerSliderProps = {
  banners: PublicBanner[];
};

const DEFAULT_BG = "linear-gradient(130deg, #15180F 0%, #3A5210 55%, #ADFF4F 100%)";
const AUTOPLAY_DELAY_MS = 4500;

export function HeroBannerSlider({ banners }: HeroBannerSliderProps) {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    if (banners.length === 0) return;
    setCurrent((i) => (i + 1) % banners.length);
  }, [banners.length]);

  useHeroBannerAutoplay({
    delayMs: AUTOPLAY_DELAY_MS,
    enabled: banners.length > 1,
    onTick: goNext,
  });

  if (!banners.length) return null;

  const safeCurrent = Math.min(current, banners.length - 1);
  const currentBanner = banners[safeCurrent];
  const goPrevious = () => {
    setCurrent((i) => (i - 1 + banners.length) % banners.length);
  };

  return (
    <section
      className="relative w-full aspect-[12/5] min-h-[140px] overflow-hidden bg-slate-100 group"
      aria-label="홈 배너"
      style={!currentBanner.image_url ? { background: DEFAULT_BG } : undefined}
    >
      {currentBanner.image_url && (
        <Image
          key={currentBanner.id}
          src={currentBanner.image_url}
          alt={currentBanner.title}
          fill
          priority={safeCurrent === 0}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      )}

      <HeroBannerLink banner={currentBanner} />
      <HeroBannerControls
        bannersLength={banners.length}
        current={safeCurrent}
        onNext={goNext}
        onPrevious={goPrevious}
        onSelect={setCurrent}
      />
    </section>
  );
}
