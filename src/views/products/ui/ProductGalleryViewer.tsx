"use client";

import Image from "next/image";
import type { ProductImage } from "@/entities/product/model/types";
import { resistEdgeDrag, useSwipe } from "@/shared/lib/useSwipe";
import { badgeGlassLargeClass, badgeHotClass } from "@/shared/ui/badgeStyles";

type ProductGalleryViewerProps = {
  images: ProductImage[];
  activeIndex: number;
  tag?: string;
  onChange: (index: number) => void;
};

/** 대표 이미지 뷰어. 이미지를 가로로 이어 붙여 스와이프로 밀어 넘긴다. */
export function ProductGalleryViewer({
  images,
  activeIndex,
  tag,
  onChange,
}: ProductGalleryViewerProps) {
  const { dragX, isDragging, handlers } = useSwipe((direction) => {
    onChange(Math.min(Math.max(activeIndex + direction, 0), images.length - 1));
  });
  const offsetX = resistEdgeDrag(dragX, activeIndex, images.length);

  return (
    <div
      className="relative aspect-square touch-pan-y overflow-hidden rounded-2xl bg-slate-100"
      {...(images.length > 1 ? handlers : null)}
    >
      <div
        className={`flex h-full ${isDragging ? "" : "transition-transform duration-300 ease-out"}`}
        style={{
          transform: `translateX(calc(${-activeIndex * 100}% + ${offsetX}px))`,
        }}
      >
        {images.map((image, index) => (
          <div
            className="relative h-full w-full shrink-0"
            key={`${image.url}-${index}`}
          >
            <Image
              alt={image.alt}
              className="object-cover"
              fill
              priority={index === 0}
              sizes="(max-width: 900px) 100vw, 420px"
              src={image.url}
            />
          </div>
        ))}
      </div>
      {tag ? (
        <span
          className={`${badgeGlassLargeClass} ${badgeHotClass} absolute left-3.5 top-3.5`}
        >
          {tag}
        </span>
      ) : null}
    </div>
  );
}
