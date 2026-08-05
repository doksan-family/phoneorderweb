"use client";

import type { Product } from "@/entities/product/model/types";
import { AdminCreateDialog } from "@/shared/ui/AdminCreateDialog";
import { ProductCreateForm } from "./ProductCreateForm";

type ProductCreateModalProps = {
  order: number;
  onClose: () => void;
  onCreate: (product: Product) => void;
};

export function ProductCreateModal({
  order,
  onClose,
  onCreate,
}: ProductCreateModalProps) {
  return (
    <AdminCreateDialog title="상품 등록" onClose={onClose}>
      <ProductCreateForm order={order} onCancel={onClose} onCreate={onCreate} />
    </AdminCreateDialog>
  );
}
