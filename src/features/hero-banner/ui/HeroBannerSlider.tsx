"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { PublicBanner } from "@/entities/banner/model/types";
import { isExternalHref } from "@/shared/lib/url";

type HeroBannerSliderProps = {
  banners: PublicBanner[];
};

const DEFAULT_BG = "linear-gradient(130deg, #eff6ff 0%, #dbeafe 100%)";

const arrowBase =
  "absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 border-0 text-2xl cursor-pointer transition hover:bg-white opacity-0 group-hover:opacity-100";

export function HeroBannerSlider({ banners }: HeroBannerSliderProps) {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent((i) => (i + 1) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = window.setInterval(goNext, 4500);
    return () => window.clearInterval(timer);
  }, [banners.length, goNext]);

  if (!banners.length) return null;

  const banner = banners[current];

  return (
    <section
      className="relative w-full aspect-[12/5] min-h-[140px] overflow-hidden bg-slate-100 group"
      aria-label="홈 배너"
      style={banner.image_url ? undefined : { background: DEFAULT_BG }}
    >
      {banner.image_url && (
        <Image
          key={banner.id}
          src={banner.image_url}
          alt={banner.title}
          fill
          priority={current === 0}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      )}

      {banner.link_url && isExternalHref(banner.link_url) && (
        <a
          className="absolute inset-0 z-10"
          href={banner.link_url}
          aria-label={banner.title}
        />
      )}

      {banner.link_url && !isExternalHref(banner.link_url) && (
        <Link
          className="absolute inset-0 z-10"
          href={banner.link_url}
          aria-label={banner.title}
        />
      )}

      {banners.length > 1 && (
        <>
          <button
            aria-label="이전 배너"
            className={`${arrowBase} left-4`}
            type="button"
            onClick={() =>
              setCurrent((i) => (i - 1 + banners.length) % banners.length)
            }
          >
            ‹
          </button>
          <button
            aria-label="다음 배너"
            className={`${arrowBase} right-4`}
            type="button"
            onClick={goNext}
          >
            ›
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {banners.map((_, i) => (
              <button
                aria-label={`${i + 1}번째 배너`}
                className={`w-2 h-2 rounded-full border-0 cursor-pointer transition p-0 ${i === current ? "bg-white" : "bg-white/50"}`}
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
