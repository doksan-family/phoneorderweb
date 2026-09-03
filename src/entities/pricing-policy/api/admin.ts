import { apiFetch } from "@/shared/api/client";
import { createClient } from "@/shared/lib/supabase/client";
import type {
  PricingPolicy,
  PricingPolicyResponse,
  PricingPolicyUpdatePayload,
} from "./types";

export type {
  PricingPolicy,
  PricingPolicyUpdatePayload,
} from "./types";

const PRICING_POLICY_PATH = "/functions/v1/admin-products/pricing-policy";

/** GET. 선택약정 할인율·할부 연이율·리베이트 적용 여부를 조회한다. */
export async function fetchPricingPolicy(accessToken?: string) {
  const token = accessToken ?? (await getAccessToken());
  const response = await apiFetch<PricingPolicyResponse>(
    PRICING_POLICY_PATH,
    undefined,
    token
  );
  return response.data;
}

/** PATCH. 전달한 정책 필드만 수정하며 모든 상품 견적에 즉시 공통 적용된다. */
export async function updatePricingPolicy(
  payload: PricingPolicyUpdatePayload
): Promise<PricingPolicy> {
  const token = await getAccessToken();
  const response = await apiFetch<PricingPolicyResponse>(
    PRICING_POLICY_PATH,
    { method: "PATCH", body: JSON.stringify(payload) },
    token
  );
  return response.data;
}

async function getAccessToken(): Promise<string | undefined> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}
