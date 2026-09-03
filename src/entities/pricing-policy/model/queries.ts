import { queryOptions } from "@tanstack/react-query";
import { fetchPricingPolicy } from "@/entities/pricing-policy/api/admin";

export const pricingPolicyQueryKey = ["admin-pricing-policy"] as const;

export const pricingPolicyQueryOptions = {
  admin: (accessToken?: string) =>
    queryOptions({
      queryKey: pricingPolicyQueryKey,
      queryFn: () => fetchPricingPolicy(accessToken),
      retry: false,
      staleTime: 30_000,
    }),
};
