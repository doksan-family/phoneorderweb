import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/entities/product/model/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link href={`/products/${product.id}`} className="product-card__image">
        <Image
          alt={product.imageAlt}
          height={280}
          src={product.imageUrl}
          width={240}
        />
        <span className="product-card__tag">{product.cardTag}</span>
        <span className="product-card__discount">{product.discountRate}%</span>
      </Link>
      <div className="product-card__body">
        <p className="product-card__category">{product.categoryName}</p>
        <h2>{product.name}</h2>
        <p>{product.summary}</p>
        <div className="product-card__pricing">
          <span className="product-card__original">
            {product.originalPrice.toLocaleString("ko-KR")}원
          </span>
          <strong className="product-card__sale">
            {product.salePrice.toLocaleString("ko-KR")}원
          </strong>
        </div>
        <div className="product-card__plan">
          <span className="product-card__plan-name">
            {product.planName} · 월 {product.planMonthlyPrice.toLocaleString("ko-KR")}원
          </span>
          <span className="product-card__plan-total">
            월 납부 예상 <strong>{product.monthlyEstimate.toLocaleString("ko-KR")}원</strong>
          </span>
        </div>
        <Link className="button button--primary" href={`/products/${product.id}`}>
          자세히 보기
        </Link>
      </div>
    </article>
  );
}
