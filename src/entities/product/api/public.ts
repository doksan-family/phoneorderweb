import { apiFetch } from "@/shared/api/client";
import type {
  PublicProductDetailResponse,
  PublicProductListResponse,
  PublicProductsParams,
} from "./publicTypes";

export type {
  DiscountType,
  PublicCarrierOption,
  PublicConsultationPayload,
  PublicDiscountOption,
  PublicInstallmentOption,
  PublicProductCard,
  PublicProductColor,
  PublicProductDetail,
  PublicProductImage,
  PublicProductPricingOption,
  PublicProductQuoteCalculation,
  PublicProductVariant,
  PublicProductsParams,
  PublicSubscriptionOption,
  PublicSubscriptionType,
} from "./publicTypes";

/**
 * 서버 prefetch가 매 요청 Edge Function을 콜드로 부르면 라우팅이 그만큼 늦는다.
 * 공개 상품 데이터는 60초 지연 반영을 허용하고 Next Data Cache를 태운다.
 * (클라이언트 fetch에서는 무시되는 옵션이다)
 */
const publicCacheInit: RequestInit = { next: { revalidate: 60 } };

export async function fetchPublicProducts(params: PublicProductsParams = {}) {
  const response = await apiFetch<PublicProductListResponse>(
    `/functions/v1/public-products${toPublicProductsSearch(params)}`,
    publicCacheInit
  );
  return response.data;
}

export async function fetchPublicProductDetail(id: string) {
  const search = new URLSearchParams({ id });
  const response = await apiFetch<PublicProductDetailResponse>(
    `/functions/v1/public-product-detail?${search.toString()}`,
    publicCacheInit
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
