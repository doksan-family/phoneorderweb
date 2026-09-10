import { queryOptions } from "@tanstack/react-query";
import { fetchPublicProductQuote } from "../api/quote.ts";
import type { ProductQuoteRequest } from "../api/quoteTypes";
import { availableDiscountTypes } from "./discountTypes.ts";
import { mapConsultationPayload, mapQuoteToEstimate } from "./publicProductQuoteMapper.ts";

/** 견적은 사용자 선택 후 클라이언트에서만 조회하며 모든 선택값을 캐시 키에 포함한다. */
export const productQuoteQueryOptions = (request: ProductQuoteRequest | null) => queryOptions({
  queryKey: ["public-product-quote", request] as const,
  enabled: request !== null,
  staleTime: 30_000,
  queryFn: async () => {
    if (!request) throw new Error("견적 조건을 선택해 주세요.");
    const data = await fetchPublicProductQuote(request);
    if (!availableDiscountTypes(data.available_discount_types).includes(request.discount_type) || data.discount_type !== request.discount_type) {
      throw new Error("선택한 할인 방식을 사용할 수 없습니다. 상품 조건을 다시 선택해 주세요.");
    }
    const quote = data.quote ?? data;
    return {
      estimate: mapQuoteToEstimate({ ...quote, discount_type: data.discount_type }),
      consultationPayload: mapConsultationPayload({
        product_id: data.product_id, pricing_id: data.pricing_id,
        variant_id: data.variant_id ?? data.product_variant_id,
        plan_id: data.plan_id, subscription_type: data.subscription_type,
        discount_type: data.discount_type,
        installment_months: quote.installment_months ?? request.installment_months,
      }),
    };
  },
});
