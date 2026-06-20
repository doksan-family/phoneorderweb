"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { HeroBanner } from "@/entities/content/model/types";

type HeroBannerSliderProps = {
  banners: HeroBanner[];
};

export function HeroBannerSlider({ banners }: HeroBannerSliderProps) {
  const visible = banners
    .filter((b) => b.visible)
    .sort((a, b) => a.order - b.order);

  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent((i) => (i + 1) % visible.length);
  }, [visible.length]);

  useEffect(() => {
    if (visible.length <= 1) return;
    const timer = window.setInterval(goNext, 4500);
    return () => window.clearInterval(timer);
  }, [visible.length, goNext]);

  if (!visible.length) return null;

  const banner = visible[current];

  return (
    <section
      className="hero"
      aria-label="홈 배너"
      style={{ background: banner.bgColor }}
    >
      <div className="hero-slider__content">
        <h1 className="hero-slider__title">{banner.title}</h1>
        {banner.subtitle && (
          <p className="hero-slider__subtitle">{banner.subtitle}</p>
        )}
        <Link className="button button--primary hero-slider__cta" href="/consultation">
          상담 신청하기
        </Link>
      </div>

      {visible.length > 1 && (
        <>
          <button
            aria-label="이전 배너"
            className="hero-slider__arrow hero-slider__arrow--prev"
            type="button"
            onClick={() => setCurrent((i) => (i - 1 + visible.length) % visible.length)}
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
            {visible.map((_, i) => (
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
