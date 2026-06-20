import Link from "next/link";
import type { Product } from "@/entities/product/model/types";
import { productDetailProfile } from "@/entities/product/model/mock-detail";
import { ProductDetailConfigurator } from "@/features/product-detail/ui/ProductDetailConfigurator";
import { ProductDetailTabs } from "./ProductDetailTabs";
import { ProductGallery } from "./ProductGallery";

type ProductDetailViewProps = {
  product: Product;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  return (
    <main className="product-detail-page">
      <section className="product-detail-head">
        <div>
          <p className="eyebrow">{product.categoryName}</p>
          <h1>{product.name}</h1>
          <p>{product.detail}</p>
        </div>
        <Link className="button button--secondary" href="/products">
          목록으로
        </Link>
      </section>
      <section className="product-detail-layout">
        <ProductGallery product={product} />
        <div className="product-detail-main">
          <div className="detail-badge-row">
            <span className="network-chip">5G</span>
            <span className="hot-tag">{product.cardTag}</span>
            <span className="discount-tag">{product.discountRate}% 상담 혜택</span>
          </div>
          <ProductDetailConfigurator productId={product.id} profile={productDetailProfile} />
        </div>
      </section>
      <ProductDetailTabs profile={productDetailProfile} />
      <div className="detail-sticky-cta">
        <span>결제 없이 상담 신청으로 조건 확인</span>
        <Link className="button button--primary" href={`/consultation?productId=${product.id}`}>
          상담 신청하기
        </Link>
      </div>
    </main>
  );
}
