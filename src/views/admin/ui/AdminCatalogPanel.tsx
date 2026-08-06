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
import { AdminProductDetailModal } from "@/features/product-admin/ui/AdminProductDetailModal";
import { ProductFormModal } from "@/features/product-admin/ui/ProductFormModal";
import { FloatingActionButton } from "@/shared/ui/FloatingActionButton";
import { adminFullPanelWithFabClass } from "@/shared/ui/adminPanelStyles";
import { AdminProductList } from "./AdminProductList";

export function AdminCatalogPanel() {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const { data: products = [], error, isPending } = useQuery(
    productQueryOptions.adminList()
  );

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

  const mutationError = toggleActive.error ?? deactivate.error;

  return (
    <section className={`grid content-start gap-5 ${adminFullPanelWithFabClass}`}>
      {mutationError ? (
        <p className="m-0 text-sm font-bold text-red-600">
          {mutationError.message}
        </p>
      ) : null}

      <AdminProductList
        error={error}
        isPending={isPending}
        isMutating={toggleActive.isPending || deactivate.isPending}
        items={products}
        onDeactivate={(id) => deactivate.mutate(id)}
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
