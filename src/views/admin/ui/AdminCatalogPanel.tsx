"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { dedupeById } from "@/shared/api/pagination";
import {
  deactivateAdminProduct,
  updateAdminProduct,
} from "@/entities/product/api/admin";
import {
  adminProductsQueryKey,
  productQueryOptions,
} from "@/entities/product/model/queries";
import { productCategoryQueryOptions } from "@/entities/product/model/categoryQueries";
import { AdminProductDetailModal } from "@/features/product-admin/ui/AdminProductDetailModal";
import { ProductFormModal } from "@/features/product-admin/ui/ProductFormModal";
import { FloatingActionButton } from "@/shared/ui/FloatingActionButton";
import { adminFullPanelWithFabClass } from "@/shared/ui/adminPanelStyles";
import { useProductReorder } from "../model/useProductReorder";
import { AdminProductCategoryFilter } from "./AdminProductCategoryFilter";
import { AdminProductList } from "./AdminProductList";

const chipBase =
  "inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-bold transition";

function visibilityChipClass(active: boolean) {
  return `${chipBase} ${
    active
      ? "border-[var(--brand-primary-strong)] bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]"
      : "border-slate-200 bg-white text-slate-600 hover:bg-[var(--brand-primary-soft)]"
  }`;
}

export function AdminCatalogPanel() {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showHiddenOnly, setShowHiddenOnly] = useState(false);
  const {
    data,
    error,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(productQueryOptions.adminInfiniteList());
  const { data: categories } = useQuery(productCategoryQueryOptions.adminList());
  // 드래그 순서와 화면 순서를 맞추려면 목록이 항상 display_order 순이어야 한다.
  const products = useMemo(() => {
    const flat = dedupeById(data?.pages.flatMap((page) => page.items) ?? []);
    return [...flat].sort(
      (first, second) => first.displayOrder - second.displayOrder
    );
  }, [data]);
  const hiddenCount = products.filter((item) => !item.isActive).length;
  const visibleProducts = products.filter((item) => {
    if (selectedCategory && item.categoryCode !== selectedCategory) return false;
    if (showHiddenOnly && item.isActive) return false;
    return true;
  });
  // 숨김만 보기 상태에서는 순서 변경 의미가 없다.
  const canReorder = selectedCategory === "" && !showHiddenOnly;

  function refetchProducts() {
    return queryClient.invalidateQueries({
      predicate: (query) => {
        const key = query.queryKey[0];
        return key === adminProductsQueryKey[0] || key === "admin-products-infinite";
      },
    });
  }

  const toggleActive = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      updateAdminProduct(id, { is_active: !isActive }),
    onSuccess: refetchProducts,
  });

  const deactivate = useMutation({
    mutationFn: (id: string) => deactivateAdminProduct(id),
    onSuccess: refetchProducts,
  });

  const reorder = useProductReorder(refetchProducts);

  const mutationError = toggleActive.error ?? deactivate.error ?? reorder.error;

  return (
    <section className={`grid content-start gap-5 ${adminFullPanelWithFabClass}`}>
      {mutationError ? (
        <p className="m-0 text-sm font-bold text-red-600">
          {mutationError.message}
        </p>
      ) : null}

      <div className="grid gap-2">
        <AdminProductCategoryFilter
          categories={categories ?? []}
          selected={selectedCategory}
          totalCount={products.length}
          onSelect={setSelectedCategory}
        />
        <div className="flex flex-wrap gap-2">
          <button
            aria-pressed={!showHiddenOnly}
            className={visibilityChipClass(!showHiddenOnly)}
            type="button"
            onClick={() => setShowHiddenOnly(false)}
          >
            전체
          </button>
          <button
            aria-pressed={showHiddenOnly}
            className={visibilityChipClass(showHiddenOnly)}
            type="button"
            onClick={() => setShowHiddenOnly(true)}
          >
            숨김
            <span className="text-[0.78rem] opacity-70">{hiddenCount}</span>
          </button>
        </div>
      </div>

      <AdminProductList
        canReorder={canReorder}
        error={error}
        hasMore={hasNextPage}
        isFetchingMore={isFetchingNextPage}
        isPending={isPending}
        isMutating={toggleActive.isPending || deactivate.isPending}
        items={visibleProducts}
        onDeactivate={(id) => deactivate.mutate(id)}
        onLoadMore={() => fetchNextPage()}
        onReorder={(next) =>
          reorder.mutate(
            next.map((item) => ({ id: item.id, order: item.displayOrder }))
          )
        }
        onSelect={setSelectedProductId}
        onToggleActive={(id, isActive) => toggleActive.mutate({ id, isActive })}
      />

      {selectedProductId ? (
        <AdminProductDetailModal
          fallback={products.find((item) => item.id === selectedProductId)}
          productId={selectedProductId}
          onClose={() => setSelectedProductId("")}
        />
      ) : null}

      <FloatingActionButton
        label="상품 등록"
        onClick={() => setIsCreateOpen(true)}
      />

      {isCreateOpen ? (
        <ProductFormModal
          order={products.length + 1}
          onClose={() => setIsCreateOpen(false)}
          onCreate={() => {
            void refetchProducts();
            setIsCreateOpen(false);
          }}
        />
      ) : null}
    </section>
  );
}
