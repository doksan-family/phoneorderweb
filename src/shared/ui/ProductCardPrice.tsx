import type { Product } from "@/entities/product/model/types";

export function ProductCardPrice({ product }: { product: Product }) {
  const price = product.discountedDevicePrice;
  const hasQuote = product.canApplyForConsultation !== false && price != null;
  const hasDiscount = hasQuote && price < product.releasePrice;
  const showMonthly =
    product.canApplyForConsultation !== false && product.monthlyEstimate > 0;

  return (
    <div className="mt-auto grid min-w-0 gap-0.5 border-t border-slate-100 pt-2">
      {hasDiscount ? (
        <p className="m-0 text-[0.68rem] text-slate-400 line-through">
          {product.releasePrice.toLocaleString("ko-KR")}원
        </p>
      ) : null}
      <strong className="text-[1.1rem] font-extrabold text-[var(--brand-primary-strong)]">
        {hasQuote ? `${price.toLocaleString("ko-KR")}원` : "가격 상담"}
      </strong>
      {showMonthly ? (
        <p className="m-0 text-[0.7rem] font-semibold text-slate-600">
          월 {product.monthlyEstimate.toLocaleString("ko-KR")}원~
        </p>
      ) : null}
    </div>
  );
}
