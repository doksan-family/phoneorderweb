import Image from "next/image";
import type { Product } from "@/entities/product/model/types";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  return (
    <div className="product-gallery">
      <div className="product-gallery__main">
        <Image alt={product.imageAlt} height={560} src={product.imageUrl} width={480} />
      </div>
      <div className="product-gallery__thumbs" aria-label="상품 이미지 썸네일">
        {[0, 1, 2, 3].map((index) => (
          <div className="product-gallery__thumb" key={index}>
            <Image alt="" height={86} src={product.imageUrl} width={74} />
          </div>
        ))}
      </div>
    </div>
  );
}
