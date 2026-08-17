"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import type { PublicProductCategory } from "@/entities/product/api/categories";
import { productQueryOptions } from "@/entities/product/model/queries";
import { ProductCardSkeleton } from "@/shared/ui/ProductCardSkeleton";

type ProductPickerListProps = {
  categories: PublicProductCategory[];
  categoryId: string;
  onCategoryChange: (categoryId: string) => void;
  onSelect: (productId: string) => void;
};

const chipClass =
  "inline-flex min-h-9 items-center rounded-lg border px-3 text-sm font-bold transition";
const activeChipClass =
  "border-[var(--brand-primary-strong)] bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]";
const idleChipClass =
  "border-slate-200 bg-white text-slate-600 hover:bg-[var(--brand-primary-soft)]";

export function ProductPickerList({
  categories,
  categoryId,
  onCategoryChange,
  onSelect,
}: ProductPickerListProps) {
  const { data: products = [], isPending } = useQuery(
    productQueryOptions.publicList({ category: categoryId })
  );
  const visibleProducts = products.filter((product) => product.visible);

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            aria-pressed={categoryId === category.code}
            className={`${chipClass} ${categoryId === category.code ? activeChipClass : idleChipClass}`}
            key={category.code}
            type="button"
            onClick={() => onCategoryChange(category.code)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 max-[720px]:grid-cols-2">
        {isPending
          ? Array.from({ length: 6 }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : visibleProducts.map((product) => (
              <button
                className="grid content-start gap-2 overflow-hidden rounded-xl border border-slate-200 bg-white p-0 text-left transition hover:bg-[var(--brand-primary-soft)]"
                key={product.id}
                type="button"
                onClick={() => onSelect(product.id)}
              >
                <span className="relative block aspect-square w-full bg-slate-100">
                  <Image
                    alt={product.imageAlt}
                    className="object-cover"
                    fill
                    sizes="(max-width: 720px) 45vw, 220px"
                    src={product.imageUrl}
                  />
                </span>
                <span className="grid gap-1 p-3 pt-0">
                  <span className="line-clamp-2 text-[0.85rem] font-bold text-slate-950">
                    {product.name}
                  </span>
                  <span className="text-[0.8rem] font-extrabold text-slate-950">
                    {product.salePrice.toLocaleString("ko-KR")}원
                  </span>
                </span>
              </button>
            ))}
      </div>

      {!isPending && !visibleProducts.length ? (
        <p className="m-0 py-8 text-center text-sm font-bold text-slate-400">
          이 카테고리에는 상품이 없습니다.
        </p>
      ) : null}
    </div>
  );
}
