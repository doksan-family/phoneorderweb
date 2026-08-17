"use client";

import {
  updateAdminProductCategory,
  type AdminProductCategory,
} from "@/entities/product/api/categories";
import { productCategoryQueryOptions } from "@/entities/product/model/categoryQueries";
import { useListReorder } from "@/shared/lib/useListReorder";

export function useCategoryReorder(onSettled: () => void) {
  return useListReorder<AdminProductCategory>({
    queryKey: productCategoryQueryOptions.adminList().queryKey,
    getId: (item) => item.code,
    applyOrder: (item, order) => ({ ...item, display_order: order }),
    save: (code, order) =>
      updateAdminProductCategory(code, { display_order: order }),
    onSettled,
  });
}
