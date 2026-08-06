"use client";

import type { AdminProductSummary } from "@/entities/product/api/admin";
import type { Product } from "@/entities/product/model/types";
import { AdminCreateDialog } from "@/shared/ui/AdminCreateDialog";
import { ProductForm } from "./ProductForm";

type ProductFormModalProps = {
  /** 있으면 수정 모드 */
  product?: AdminProductSummary;
  order?: number;
  onClose: () => void;
  onCreate?: (product: Product) => void;
  onUpdate?: () => void;
};

export function ProductFormModal({
  product,
  order,
  onClose,
  onCreate,
  onUpdate,
}: ProductFormModalProps) {
  return (
    <AdminCreateDialog
      title={product ? "상품 수정" : "상품 등록"}
      onClose={onClose}
    >
      <ProductForm
        order={order}
        product={product}
        onCancel={onClose}
        onCreate={onCreate}
        onUpdate={onUpdate}
      />
    </AdminCreateDialog>
  );
}
