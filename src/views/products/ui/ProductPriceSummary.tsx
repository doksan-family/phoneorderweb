import type { Product } from "@/entities/product/model/types";

type ProductPriceSummaryProps = {
  product: Product;
};

export function ProductPriceSummary({ product }: ProductPriceSummaryProps) {
  return (
    <div className="rounded-2xl bg-slate-100 p-[18px]">
      <p className="m-0 text-[0.82rem] text-slate-400">출고가</p>
      <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
        <strong className="text-[1.65rem] font-extrabold tracking-[-0.02em] text-slate-950">
          {product.releasePrice.toLocaleString("ko-KR")}원
        </strong>
      </div>
      {product.monthlyEstimate > 0 ? (
        <p className="m-0 mt-1 text-[0.85rem] font-bold text-[var(--brand-primary-strong)]">
          월 예상 {product.monthlyEstimate.toLocaleString("ko-KR")}원~
        </p>
      ) : null}
    </div>
  );
}
