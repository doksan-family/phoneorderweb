"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product, ProductImage } from "@/entities/product/model/types";
import { ProductGalleryViewer } from "./ProductGalleryViewer";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = getProductGalleryImages(product);
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = Math.min(activeIndex, images.length - 1);
  const tag = product.cardTag;

  return (
    <div className="sticky top-[124px] grid w-[420px] grid-cols-1 gap-3 max-[900px]:static max-[900px]:w-full">
      <ProductGalleryViewer
        activeIndex={safeIndex}
        images={images}
        tag={tag}
        onChange={setActiveIndex}
      />
      {images.length > 1 ? (
        <div
          className="flex flex-row gap-2.5 overflow-x-auto pb-0.5"
          aria-label="상품 이미지 썸네일"
          role="tablist"
        >
          {images.map((image, index) => {
            const isActive = index === safeIndex;

            return (
              <button
                aria-label={`${image.alt} 보기`}
                aria-selected={isActive}
                className={`relative aspect-square w-[74px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[10px] border-2 bg-slate-100 transition ${
                  isActive
                    ? "border-[var(--brand-primary)]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                key={`${image.url}-${index}`}
                onClick={() => setActiveIndex(index)}
                role="tab"
                type="button"
              >
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="74px"
                  src={image.url}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function getProductGalleryImages(product: Product): ProductImage[] {
  if (product.productImages?.length) {
    const images = product.productImages
      .filter((image) => image.url)
      .map((image, index) => ({
        alt: image.alt || `${product.name} 상품 이미지 ${index + 1}`,
        displayOrder: image.displayOrder ?? index + 1,
        url: image.url,
      }))
      .sort((first, second) => first.displayOrder - second.displayOrder);

    if (images.length) return images;
  }

  return [
    {
      alt: product.imageAlt || `${product.name} 대표 이미지`,
      displayOrder: 0,
      url: product.imageUrl,
    },
  ];
}
