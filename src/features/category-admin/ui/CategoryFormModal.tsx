"use client";

import type { AdminProductCategory } from "@/entities/product/api/categories";
import { AdminCreateDialog } from "@/shared/ui/AdminCreateDialog";
import { CategoryForm } from "./CategoryForm";

type CategoryFormModalProps = {
  category?: AdminProductCategory;
  nextOrder?: number;
  onClose: () => void;
};

export function CategoryFormModal({
  category,
  nextOrder,
  onClose,
}: CategoryFormModalProps) {
  return (
    <AdminCreateDialog
      title={category ? "카테고리 수정" : "카테고리 등록"}
      widthClassName="w-[min(560px,100%)]"
      onClose={onClose}
    >
      <CategoryForm
        category={category}
        nextOrder={nextOrder}
        onCancel={onClose}
        onSaved={onClose}
      />
    </AdminCreateDialog>
  );
}
