"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { PublicReviewImage } from "@/entities/review/model/types";
import { ReviewImagePlaceholder } from "@/shared/ui/ReviewImagePlaceholder";

type ReviewImageGalleryProps = {
  images: PublicReviewImage[];
};

export function ReviewImageGallery({ images }: ReviewImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];
  const hasMultipleImages = images.length > 1;

  function selectPrevious() {
    setSelectedIndex((current) => (current - 1 + images.length) % images.length);
  }

  function selectNext() {
    setSelectedIndex((current) => (current + 1) % images.length);
  }

  return (
    <div>
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl bg-slate-900/40"
        style={{ clipPath: "inset(0 round 1.5rem 1.5rem 0 0)" }}
      >
        {selectedImage ? (
          <Image
            alt={selectedImage.alt ?? ""}
            className="object-cover"
            fill
            sizes="560px"
            src={selectedImage.image_url}
          />
        ) : (
          <ReviewImagePlaceholder className="absolute inset-0" tone="dark" />
        )}

        {hasMultipleImages ? (
          <>
            <GalleryButton ariaLabel="이전 이미지" className="left-4" onClick={selectPrevious}>
              <ChevronLeft size={18} />
            </GalleryButton>
            <GalleryButton ariaLabel="다음 이미지" className="right-4" onClick={selectNext}>
              <ChevronRight size={18} />
            </GalleryButton>
          </>
        ) : null}
      </div>

      {hasMultipleImages ? (
        <div className="flex overflow-x-auto border-t border-white/15 bg-slate-950/65">
          {images.map((image, index) => (
            <button
              aria-label={`${index + 1}번째 후기 이미지 보기`}
              aria-pressed={index === selectedIndex}
              className={`relative size-20 shrink-0 overflow-hidden border-2 transition ${
                index === selectedIndex ? "border-amber-400" : "border-transparent opacity-60 hover:opacity-100"
              }`}
              key={image.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
            >
              <Image alt="" className="object-cover" fill sizes="72px" src={image.image_url} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

type GalleryButtonProps = {
  ariaLabel: string;
  children: React.ReactNode;
  className: string;
  onClick: () => void;
};

function GalleryButton({ ariaLabel, children, className, onClick }: GalleryButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      className={`absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-slate-950/70 text-white shadow-md backdrop-blur-md transition hover:bg-slate-950/85 ${className}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
