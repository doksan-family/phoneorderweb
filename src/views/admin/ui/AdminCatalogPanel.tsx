"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
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

export function AdminCatalogPanel() {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data, error, isPending } = useQuery(productQueryOptions.adminList());
  const { data: categories } = useQuery(productCategoryQueryOptions.adminList());
  // 드래그 순서와 화면 순서를 맞추려면 목록이 항상 display_order 순이어야 한다.
  const products = [...(data ?? [])].sort(
    (first, second) => first.displayOrder - second.displayOrder
  );
  const visibleProducts = selectedCategory
    ? products.filter((item) => item.categoryCode === selectedCategory)
    : products;

  function refetchProducts() {
    return queryClient.invalidateQueries({ queryKey: adminProductsQueryKey });
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

      <AdminProductCategoryFilter
        categories={categories ?? []}
        selected={selectedCategory}
        totalCount={products.length}
        onSelect={setSelectedCategory}
      />

      <AdminProductList
        canReorder={selectedCategory === ""}
        error={error}
        isPending={isPending}
        isMutating={toggleActive.isPending || deactivate.isPending}
        items={visibleProducts}
        onDeactivate={(id) => deactivate.mutate(id)}
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
