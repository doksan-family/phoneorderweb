"use client";

import {
  updateAdminProduct,
  type AdminProductSummary,
} from "@/entities/product/api/admin";
import { productQueryOptions } from "@/entities/product/model/queries";
import { useListReorder } from "@/shared/lib/useListReorder";

export function useProductReorder(onSettled: () => void) {
  return useListReorder<AdminProductSummary>({
    queryKey: productQueryOptions.adminList().queryKey,
    getId: (item) => item.id,
    applyOrder: (item, order) => ({ ...item, displayOrder: order }),
    save: (id, order) => updateAdminProduct(id, { display_order: order }),
    onSettled,
  });
}
