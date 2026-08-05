import Image from "next/image";
import type { ProductImage } from "@/entities/product/model/types";

type ProductDescriptionImagesProps = {
  images: ProductImage[];
};

export function ProductDescriptionImages({
  images,
}: ProductDescriptionImagesProps) {
  if (!images.length) return null;

  const sortedImages = images
    .filter((image) => image.url)
    .map((image, index) => ({
      alt: image.alt || `상품 설명 이미지 ${index + 1}`,
      displayOrder: image.displayOrder ?? index + 1,
      url: image.url,
    }))
    .sort((first, second) => first.displayOrder - second.displayOrder);

  if (!sortedImages.length) return null;

  return (
    <section aria-label="상품 설명 이미지" className="mt-12 grid gap-3">
      {sortedImages.map((image, index) => (
        <Image
          alt={image.alt}
          className="h-auto w-full rounded-lg border border-slate-200 bg-white"
          height={1200}
          key={`${image.url}-${index}`}
          sizes="(max-width: 900px) calc(100vw - 32px), 1280px"
          src={image.url}
          width={1280}
        />
      ))}
    </section>
  );
}
