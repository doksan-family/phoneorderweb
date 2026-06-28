import Image from "next/image";
import type { Product } from "@/entities/product/model/types";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  return (
    <div className="sticky top-[90px] w-[326px] grid grid-cols-1 gap-3 max-[900px]:static max-[900px]:w-full">
      <div className="grid place-items-center h-[320px] border border-slate-200 rounded-[10px] bg-slate-100 overflow-hidden max-[560px]:min-h-[360px]">
        <Image
          alt={product.imageAlt}
          height={560}
          src={product.imageUrl}
          width={480}
          className="w-[60%] h-[260px] object-contain"
        />
      </div>
      <div
        className="flex flex-row gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5"
        aria-label="상품 이미지 썸네일"
      >
        {[0, 1, 2, 3].map((index) => (
          <div className="grid flex-shrink-0 place-items-center w-[74px] aspect-square border border-slate-200 rounded-[8px] bg-slate-100" key={index}>
            <Image alt="" height={86} src={product.imageUrl} width={74} className="w-[82%] h-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
