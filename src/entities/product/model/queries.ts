import { queryOptions } from "@tanstack/react-query";
import {
  fetchPublicProductDetail,
  fetchPublicProducts,
  type PublicProductsParams,
} from "@/entities/product/api/public";
import { productDetailProfile } from "./mock-detail";
import {
  mapPublicProductToProduct,
  mapPublicProductsToProducts,
} from "./publicProductMapper";
import { mapPublicProductDetailToProfile } from "./publicProductProfile";

export const productQueryOptions = {
  publicList: (params: PublicProductsParams = {}) =>
    queryOptions({
      queryKey: ["public-products", params] as const,
      queryFn: async () => {
        const response = await fetchPublicProducts(params);
        return mapPublicProductsToProducts(response);
      },
      retry: false,
      staleTime: 30_000,
    }),
  publicDetail: (id: string) =>
    queryOptions({
      queryKey: ["public-product-detail", id] as const,
      queryFn: async () => {
        const response = await fetchPublicProductDetail(id);
        return {
          product: mapPublicProductToProduct(response),
          profile: mapPublicProductDetailToProfile(response, productDetailProfile),
        };
      },
      retry: false,
      staleTime: 30_000,
    }),
};
