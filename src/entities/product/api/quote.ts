import { apiFetch } from "../../../shared/api/client.ts";
import type { ProductQuoteRequest, ProductQuoteResponse } from "./quoteTypes";

export async function fetchPublicProductQuote(payload: ProductQuoteRequest) {
  const response = await apiFetch<ProductQuoteResponse>("/functions/v1/public-product-quote", {
    method: "POST", body: JSON.stringify(payload), cache: "no-store",
  });
  return response.data;
}
