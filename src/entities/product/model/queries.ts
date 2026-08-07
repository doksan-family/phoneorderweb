import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import {
  fetchAdminProduct,
  fetchAdminProducts,
  type AdminProductsParams,
} from "@/entities/product/api/admin";
import {
  fetchPublicProductDetail,
  fetchPublicProducts,
  type PublicProductsParams,
} from "@/entities/product/api/public";
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
      // 카테고리를 바꿀 때 빈 스켈레톤 대신 직전 목록을 두고 교체한다.
      placeholderData: keepPreviousData,
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
          profile: mapPublicProductDetailToProfile(response),
        };
      },
      retry: false,
      staleTime: 30_000,
    }),
  /**
   * 어드민 목록. 비활성 상품도 관리해야 하므로 기본으로 포함한다.
   * accessToken은 서버 prefetch 전용이며 query key에는 넣지 않는다.
   * (키가 달라지면 클라이언트가 hydrate된 캐시를 못 찾는다)
   */
  adminList: (params: AdminProductsParams = {}, accessToken?: string) =>
    queryOptions({
      queryKey: ["admin-products", params] as const,
      queryFn: () =>
        fetchAdminProducts({ include_inactive: true, ...params }, accessToken),
      retry: false,
      staleTime: 30_000,
    }),
  /** 어드민 상세. 모달이 열릴 때만 요청한다. */
  adminDetail: (id: string, accessToken?: string) =>
    queryOptions({
      queryKey: ["admin-product-detail", id] as const,
      queryFn: () => fetchAdminProduct(id, accessToken),
      enabled: id !== "",
      retry: false,
      staleTime: 30_000,
    }),
};

export const adminProductsQueryKey = ["admin-products"] as const;
