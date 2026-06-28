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
      className="hero"
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
          className="hero-slider__link"
          href={banner.link_url}
          aria-label={banner.title}
        />
      )}

      {banner.link_url && !isExternalHref(banner.link_url) && (
        <Link
          className="hero-slider__link"
          href={banner.link_url}
          aria-label={banner.title}
        />
      )}

      {banners.length > 1 && (
        <>
          <button
            aria-label="이전 배너"
            className="hero-slider__arrow hero-slider__arrow--prev"
            type="button"
            onClick={() =>
              setCurrent((i) => (i - 1 + banners.length) % banners.length)
            }
          >
            ‹
          </button>
          <button
            aria-label="다음 배너"
            className="hero-slider__arrow hero-slider__arrow--next"
            type="button"
            onClick={goNext}
          >
            ›
          </button>
          <div className="hero-slider__dots">
            {banners.map((_, i) => (
              <button
                aria-label={`${i + 1}번째 배너`}
                className={`hero-slider__dot${i === current ? " is-active" : ""}`}
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
