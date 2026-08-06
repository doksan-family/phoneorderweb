"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { productQueryOptions } from "@/entities/product/model/queries";
import { useStoredProducts } from "@/entities/product/model/useStoredProducts";
import { ProductCard } from "@/shared/ui/ProductCard";
import { ProductCardSkeleton } from "@/shared/ui/ProductCardSkeleton";

type VisibleProductGridProps = {
  categoryId?: string;
  featured?: boolean;
  firstRowCardCount?: number;
  limit?: number;
};

const gridClass =
  "grid grid-cols-4 gap-4 max-[1100px]:grid-cols-3 max-[900px]:grid-cols-2 max-[900px]:gap-2.5";

export function VisibleProductGrid({
  categoryId,
  featured,
  firstRowCardCount = 4,
  limit,
}: VisibleProductGridProps) {
  const { products } = useStoredProducts();
  const { data: apiProducts, isPending } = useQuery(
    productQueryOptions.publicList({ category: categoryId, featured, limit })
  );
  const sourceProducts = apiProducts ?? products;
  const visibleProducts = useMemo(
    () =>
      sourceProducts.filter((product) => {
        if (!product.visible) return false;
        return categoryId ? product.categoryId === categoryId : true;
      }),
    [categoryId, sourceProducts]
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
