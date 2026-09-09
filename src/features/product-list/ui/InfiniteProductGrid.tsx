"use client";

import { useEffect, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { findProductBrand } from "@/entities/product/model/mock-products";
import { productQueryOptions } from "@/entities/product/model/queries";
import { dedupeById } from "@/shared/api/pagination";
import { ProductCard } from "@/shared/ui/ProductCard";
import { ProductCardSkeleton } from "@/shared/ui/ProductCardSkeleton";
import { InfiniteScrollSentinel } from "@/shared/ui/InfiniteScrollSentinel";

type InfiniteProductGridProps = {
  brandId?: string;
  categoryId?: string;
  featured?: boolean;
};

const gridClass =
  "grid grid-cols-4 gap-4 max-[1100px]:grid-cols-3 max-[900px]:grid-cols-2 max-[900px]:gap-2.5";
const FIRST_ROW = 4;

export function InfiniteProductGrid({
  brandId,
  categoryId,
  featured,
}: InfiniteProductGridProps) {
  const brandName = findProductBrand(brandId)?.name;
  const {
    data,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    // 브랜드는 서버 필터가 없어 category/featured만 서버로 넘긴다.
    productQueryOptions.publicInfiniteList({ category: categoryId, featured })
  );

  const products = useMemo(() => {
    const all = dedupeById(data?.pages.flatMap((page) => page.products) ?? []);
    return all.filter((product) => {
      if (!product.visible) return false;
      if (categoryId && product.categoryId !== categoryId) return false;
      return brandName ? product.brand === brandName : true;
    });
  }, [data, brandName, categoryId]);

  const total = data?.pages[0]?.pagination?.total ?? products.length;

  // 브랜드가 걸리면 화면에서 거르므로, 원하는 만큼 보이도록 다음 페이지를 끝까지 당겨 온다.
  useEffect(() => {
    if (brandName && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [brandName, hasNextPage, isFetchingNextPage, fetchNextPage, products.length]);

  if (isPending) {
    return (
      <div className={gridClass}>
        {Array.from({ length: FIRST_ROW }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="grid min-h-[260px] place-items-center rounded-2xl border border-dashed border-[var(--brand-primary)] bg-[var(--brand-primary-soft)] px-6 text-center text-[0.9rem] font-bold text-[var(--brand-primary-strong)] max-[900px]:min-h-[180px]">
        등록된 상품이 없습니다
      </div>
    );
  }

  return (
    <>
      <h1 className="m-0 mb-5 text-[clamp(1.2rem,2.4vw,1.6rem)] font-extrabold tracking-[-0.02em] text-slate-950">
        전체 상품 {brandName ? products.length : total}개
      </h1>
      <div className={gridClass}>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            priority={index < FIRST_ROW}
            product={product}
          />
        ))}
      </div>
      <InfiniteScrollSentinel
        onReach={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? (
          <p className="m-0 pt-6 text-center text-[0.85rem] text-slate-400">
            더 불러오는 중…
          </p>
        ) : null}
      </InfiniteScrollSentinel>
    </>
  );
}
