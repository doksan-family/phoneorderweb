import { apiFetch } from "@/shared/api/client";
import type {
  PublicProductDetailResponse,
  PublicProductListResponse,
  PublicProductsParams,
} from "./publicTypes";

export type {
  PublicCarrierOption,
  PublicConsultationPayload,
  PublicInstallmentOption,
  PublicProductCard,
  PublicProductColor,
  PublicProductDetail,
  PublicProductImage,
  PublicProductPricingOption,
  PublicProductQuote,
  PublicProductVariant,
  PublicProductsParams,
  PublicSubscriptionOption,
  PublicSubscriptionType,
} from "./publicTypes";

export async function fetchPublicProducts(params: PublicProductsParams = {}) {
  const response = await apiFetch<PublicProductListResponse>(
    `/functions/v1/public-products${toPublicProductsSearch(params)}`
  );
  return response.data;
}

export async function fetchPublicProductDetail(id: string) {
  const search = new URLSearchParams({ id });
  const response = await apiFetch<PublicProductDetailResponse>(
    `/functions/v1/public-product-detail?${search.toString()}`
  );
  return response.data;
}

function toPublicProductsSearch(params: PublicProductsParams) {
  const search = new URLSearchParams();
  if (params.category) search.set("category", params.category);
  if (params.featured !== undefined) search.set("featured", String(params.featured));
  if (params.limit !== undefined) search.set("limit", String(params.limit));

  const query = search.toString();
  return query ? `?${query}` : "";
}
