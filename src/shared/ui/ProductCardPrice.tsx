import type { Product } from "@/entities/product/model/types";

export function ProductCardPrice({ product }: { product: Product }) {
  const price = product.discountedDevicePrice;
  const hasQuote = product.canApplyForConsultation !== false && price != null;
  const hasDiscount = hasQuote && price < product.releasePrice;

  return (
    <div className="mt-auto grid min-w-0 gap-1 border-t border-slate-100 pt-2">
      <p className="m-0 text-[0.7rem] text-slate-500">
        출고가 <span className={hasDiscount ? "line-through" : undefined}>{product.releasePrice.toLocaleString("ko-KR")}원</span>
      </p>
      <p className="m-0 text-[0.68rem] text-slate-500">할인 적용 단말 가격</p>
      <strong className="text-[1.15rem] font-extrabold text-[var(--brand-primary-strong)]">
        {hasQuote ? `${price.toLocaleString("ko-KR")}원` : "가격 상담"}
      </strong>
      {hasQuote ? (
        <p className="m-0 text-[0.65rem] text-slate-500">기본 조건 기준 · 할부 이자 별도</p>
      ) : null}
      {product.canApplyForConsultation !== false && product.monthlyEstimate > 0 ? (
        <p className="m-0 text-[0.72rem] font-semibold text-slate-700">
          월 예상 {product.monthlyEstimate.toLocaleString("ko-KR")}원
          <span className="block text-[0.65rem] font-normal text-slate-500">통신요금 + 단말 할부금</span>
        </p>
      ) : null}
      {product.planName ? <p className="m-0 truncate text-[0.65rem] text-slate-500">{product.planName} 기준</p> : null}
    </div>
  );
}
