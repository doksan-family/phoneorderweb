import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Product } from "@/entities/product/model/types";
import { badgeGlassClass, badgeHotClass, badgeInkClass } from "./badgeStyles";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

const SPECIAL_CATEGORY_ID = "special";

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const isSpecial = product.categoryId === SPECIAL_CATEGORY_ID;
  // 뱃지가 많으면 카드가 밀리므로 cardTag 포함 앞 3개까지만 보여준다.
  const badges = (product.badges ?? [])
    .filter((badge) => badge !== product.cardTag)
    .slice(0, product.cardTag ? 2 : 3);
  const saleTypeLabel = product.saleTypes.join(" · ") || product.categoryName;
  // API가 대표 요금제/월 예상 납부금액을 안 준 상품은 이 줄을 아예 그리지 않는다.
  const planLine = [
    product.planName,
    product.monthlyEstimate > 0
      ? `월 ${product.monthlyEstimate.toLocaleString("ko-KR")}원`
      : ""
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="h-full min-w-0">
      <Link
        className={`flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-white transition-[background-color,box-shadow] duration-200 hover:bg-[var(--brand-primary-soft)] hover:shadow-[0_14px_36px_rgba(21,24,15,0.09)] ${
          isSpecial
            ? "border-[var(--brand-primary-strong)] shadow-[0_0_0_3px_var(--brand-primary-soft)]"
            : "border-slate-200"
        }`}
        href={`/products/${product.id}`}
      >
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <Image
            alt={product.imageAlt}
            fill
            src={product.imageUrl}
            priority={priority}
            sizes="(max-width: 900px) 45vw, (max-width: 1100px) 27vw, 20vw"
            className="object-cover"
          />
          {isSpecial ? (
            <span className="absolute right-2 top-2 rounded-full bg-[var(--brand-primary)] px-2.5 py-1 text-[0.68rem] font-black text-[var(--brand-on-primary)] shadow-[0_4px_12px_var(--brand-primary-shadow)]">
              특가
            </span>
          ) : null}
          {product.cardTag || badges.length ? (
            <div className="absolute left-2 top-2 flex max-w-[calc(100%-16px)] flex-wrap gap-1.5">
              {product.cardTag ? (
                <span className={`${badgeGlassClass} ${badgeHotClass}`}>
                  {product.cardTag}
                </span>
              ) : null}
              {badges.map((badge) => (
                <span className={`${badgeGlassClass} ${badgeInkClass}`} key={badge}>
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1 p-3">
          {saleTypeLabel ? (
            <ScrollLine className="text-[0.68rem] font-bold text-[var(--brand-primary-strong)]">
              {saleTypeLabel}
            </ScrollLine>
          ) : null}
          <h2 className="m-0 line-clamp-2 text-[0.88rem] font-bold leading-[1.3] tracking-[-0.01em] text-slate-950">
            {product.name}
          </h2>
          <ScrollLine className="text-[0.74rem] text-slate-500">
            {product.summary}
          </ScrollLine>

          <div className="mt-auto min-w-0 border-t border-slate-100 pt-2">
            {planLine ? (
              <ScrollLine className="text-[0.68rem] text-slate-500">{planLine}</ScrollLine>
            ) : null}
            <ScrollLine className="text-[0.72rem] text-slate-400 line-through">
              {product.originalPrice.toLocaleString("ko-KR")}원
            </ScrollLine>
            <div className="flex min-w-0 flex-wrap items-baseline gap-1">
              <span className="text-[1rem] font-extrabold text-slate-950">
                {product.salePrice.toLocaleString("ko-KR")}원
              </span>
              {product.discountRate > 0 ? (
                <span className="text-[0.72rem] font-bold text-[var(--brand-hot)]">
                  {product.discountRate}%↓
                </span>
              ) : null}
            </div>
          </div>

          <span className="mt-2.5 block rounded-[10px] bg-[var(--brand-primary-soft)] py-2.5 text-center text-[0.78rem] font-bold text-[var(--brand-primary-strong)]">
            상담 신청
          </span>
        </div>
      </Link>
    </article>
  );
}

function ScrollLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
}
