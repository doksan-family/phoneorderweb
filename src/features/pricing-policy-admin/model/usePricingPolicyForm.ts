"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useRef, useState } from "react";
import {
  updatePricingPolicy,
  type PricingPolicy,
  type PricingPolicyUpdatePayload,
} from "@/entities/pricing-policy/api/admin";
import {
  pricingPolicyQueryKey,
  pricingPolicyQueryOptions,
} from "@/entities/pricing-policy/model/queries";

type PricingPolicyDraft = Required<PricingPolicyUpdatePayload>;

function draftFromPolicy(policy: PricingPolicy): PricingPolicyDraft {
  return {
    contract_discount_rate: policy.contract_discount_rate,
    installment_annual_rate: policy.installment_annual_rate,
    rebate_applies_to_public_support: policy.rebate_applies_to_public_support,
    rebate_applies_to_contract_discount:
      policy.rebate_applies_to_contract_discount,
  };
}

/** 변경된 필드만 담아 PATCH 본문(minProperties 1)을 만든다. */
function diffPayload(
  base: PricingPolicyDraft,
  next: PricingPolicyDraft
): PricingPolicyUpdatePayload {
  const payload: PricingPolicyUpdatePayload = {};
  (Object.keys(next) as (keyof PricingPolicyDraft)[]).forEach((key) => {
    if (base[key] !== next[key]) {
      Object.assign(payload, { [key]: next[key] });
    }
  });
  return payload;
}

export function usePricingPolicyForm() {
  const queryClient = useQueryClient();
  const query = useQuery(pricingPolicyQueryOptions.admin());
  const serverDraft = query.data ? draftFromPolicy(query.data) : null;
  const [editedDraft, setEditedDraft] = useState<PricingPolicyDraft | null>(null);
  const draft = editedDraft ?? serverDraft;
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const lastSubmitAtRef = useRef(0);

  function update<K extends keyof PricingPolicyDraft>(
    key: K,
    value: PricingPolicyDraft[K]
  ) {
    setEditedDraft(draft ? { ...draft, [key]: value } : null);
    setSaved(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft || !serverDraft) return;
    if (Date.now() - lastSubmitAtRef.current < 400) return;
    lastSubmitAtRef.current = Date.now();

    const payload = diffPayload(serverDraft, draft);
    if (!Object.keys(payload).length) {
      setSaved(true);
      return;
    }

    setLoading(true);
    setError("");
    setSaved(false);
    try {
      await updatePricingPolicy(payload);
      await queryClient.invalidateQueries({ queryKey: pricingPolicyQueryKey });
      setEditedDraft(null);
      setSaved(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "가격 정책 저장에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    calculationMethod: query.data?.installment_calculation_method ?? "equal_payment",
    draft,
    error,
    isPending: query.isPending,
    loadError: query.error,
    loading,
    saved,
    submit,
    update,
    updatedAt: query.data?.updated_at ?? "",
  };
}
