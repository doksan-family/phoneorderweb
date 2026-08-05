"use client";

import { useState } from "react";
import { sortProducts } from "@/entities/product/model/storage";
import { useStoredProducts } from "@/entities/product/model/useStoredProducts";
import { ProductCreateModal } from "@/features/product-admin/ui/ProductCreateModal";
import { FloatingActionButton } from "@/shared/ui/FloatingActionButton";
import { adminFullPanelWithFabClass } from "@/shared/ui/adminPanelStyles";
import { AdminProductList } from "./AdminProductList";

export function AdminCatalogPanel() {
  const { products, replaceProducts } = useStoredProducts();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const nextOrder = products.length + 1;

  function addProduct(product: (typeof products)[number]) {
    replaceProducts(sortProducts([...products, product]));
    setIsCreateOpen(false);
  }

  function toggleVisible(id: string) {
    replaceProducts(
      products.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  }

  function deleteProduct(id: string) {
    replaceProducts(products.filter((product) => product.id !== id));
  }

  return (
    <section className={`grid content-start gap-5 ${adminFullPanelWithFabClass}`}>
      <AdminProductList
        items={products}
        onDelete={deleteProduct}
        onToggleVisible={toggleVisible}
      />

      <FloatingActionButton
        label="상품 등록"
        onClick={() => setIsCreateOpen(true)}
      />

      {isCreateOpen ? (
        <ProductCreateModal
          order={nextOrder}
          onClose={() => setIsCreateOpen(false)}
          onCreate={addProduct}
        />
      ) : null}
    </section>
  );
}
