import type { DiscountType } from "./types";
import type { PublicConsultationPayload, PublicSubscriptionType } from "./publicBaseTypes";
import type { PublicProductQuoteCalculation } from "./publicDetailTypes";

type QuoteSelection = {
  discount_type: DiscountType;
  installment_months?: number;
};
export type ProductQuoteRequest = QuoteSelection & (
  | { pricing_id: string }
  | { product_id: string; plan_id: string; variant_id: string; subscription_type: PublicSubscriptionType }
);
export type ProductQuoteData = PublicProductQuoteCalculation & {
  pricing_id: string;
  product_id: string;
  product_variant_id: string;
  variant_id?: string;
  plan_id: string;
  subscription_type: PublicSubscriptionType;
  available_discount_types?: DiscountType[];
  discount_type: DiscountType;
  quote?: PublicProductQuoteCalculation;
  consultation_payload?: PublicConsultationPayload;
};
export type ProductQuoteResponse = { ok: boolean; data: ProductQuoteData };
