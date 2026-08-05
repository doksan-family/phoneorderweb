"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { createAdminPlan, type AdminPlan } from "@/entities/plan/api/admin";
import {
  createEmptyPlanDraft,
  createPlanPayload,
} from "./planDraft";
import type { AdminPlanDraft } from "./types";

type UsePlanCreateFormParams = {
  onCreated?: (plan: AdminPlan) => void;
};

export function usePlanCreateForm(params: UsePlanCreateFormParams = {}) {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<AdminPlanDraft>(() => createEmptyPlanDraft());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update<K extends keyof AdminPlanDraft>(key: K, value: AdminPlanDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = createPlanPayload(draft);
    if (!payload.name) {
      setError("요금제명은 필수입니다.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const plan = await createAdminPlan(payload);
      await queryClient.invalidateQueries({ queryKey: ["admin-plans"] });
      setDraft(createEmptyPlanDraft());
      params.onCreated?.(plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : "요금제 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return { draft, error, loading, submit, update };
}
