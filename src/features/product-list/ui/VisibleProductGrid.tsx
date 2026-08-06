"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { findProductBrand } from "@/entities/product/model/mock-products";
import { productQueryOptions } from "@/entities/product/model/queries";
import { useStoredProducts } from "@/entities/product/model/useStoredProducts";
import { ProductCard } from "@/shared/ui/ProductCard";
import { ProductCardSkeleton } from "@/shared/ui/ProductCardSkeleton";

type VisibleProductGridProps = {
  /** 브랜드 메뉴는 카테고리와 무관하게 제조사로 고른다. */
  brandId?: string;
  categoryId?: string;
  featured?: boolean;
  firstRowCardCount?: number;
  limit?: number;
};

const gridClass =
  "grid grid-cols-4 gap-4 max-[1100px]:grid-cols-3 max-[900px]:grid-cols-2 max-[900px]:gap-2.5";

export function VisibleProductGrid({
  brandId,
  categoryId,
  featured,
  firstRowCardCount = 4,
  limit,
}: VisibleProductGridProps) {
  const { products } = useStoredProducts();
  const brandName = findProductBrand(brandId)?.name;
  const { data: apiProducts, isPending } = useQuery(
    productQueryOptions.publicList({
      category: categoryId,
      featured,
      // 브랜드는 클라이언트에서 거르므로 서버에서 미리 자르면 안 된다.
      limit: brandName ? undefined : limit,
    })
  );
  const sourceProducts = apiProducts ?? products;
  const visibleProducts = useMemo(
    () =>
      sourceProducts.filter((product) => {
        if (!product.visible) return false;
        if (categoryId && product.categoryId !== categoryId) return false;
        return brandName ? product.brand === brandName : true;
      }).slice(0, brandName && limit ? limit : undefined),
    [brandName, categoryId, limit, sourceProducts]
  );

  if (isPending && !visibleProducts.length) {
    return (
      <div className={gridClass}>
        {Array.from({ length: firstRowCardCount }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!visibleProducts.length) {
    return (
      <div className="grid min-h-[260px] place-items-center rounded-2xl border border-dashed border-[var(--brand-primary)] bg-[var(--brand-primary-soft)] px-6 text-center text-[0.9rem] font-bold text-[var(--brand-primary-strong)] max-[900px]:min-h-[180px]">
        등록된 상품이 없습니다
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {visibleProducts.map((product, index) => (
        <ProductCard
          key={product.id}
          priority={index < firstRowCardCount}
          product={product}
        />
      ))}
    </div>
  );
}
