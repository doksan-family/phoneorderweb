import { queryOptions } from "@tanstack/react-query";
import {
  fetchAdminProductCategories,
  fetchPublicProductCategories,
} from "@/entities/product/api/categories";

export const productCategoryQueryOptions = {
  adminList: () =>
    queryOptions({
      queryKey: ["admin-product-categories"] as const,
      queryFn: () => fetchAdminProductCategories(),
      retry: false,
      staleTime: 30_000,
    }),
  publicList: (placement?: "main_menu") =>
    queryOptions({
      queryKey: ["public-product-categories", placement ?? "all"] as const,
      queryFn: () => fetchPublicProductCategories({ placement }),
      retry: false,
      staleTime: 30_000,
    }),
};

export const adminProductCategoriesQueryKey = [
  "admin-product-categories",
] as const;
