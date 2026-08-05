import type { Product } from "@/entities/product/model/types";

type ProductPriceSummaryProps = {
  product: Product;
};

export function ProductPriceSummary({ product }: ProductPriceSummaryProps) {
  return (
    <div className="rounded-2xl bg-slate-100 p-[18px]">
      <p className="m-0 text-[0.82rem] text-slate-400 line-through">
        {product.originalPrice.toLocaleString("ko-KR")}원
      </p>
      <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
        <strong className="text-[1.65rem] font-extrabold tracking-[-0.02em] text-slate-950">
          {product.salePrice.toLocaleString("ko-KR")}원
        </strong>
        {product.discountRate > 0 ? (
          <span className="text-[0.85rem] font-bold text-[var(--brand-hot)]">
            {product.discountRate}%↓
          </span>
        ) : null}
      </div>
    </div>
  );
}
