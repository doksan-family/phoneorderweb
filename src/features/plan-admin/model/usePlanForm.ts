"use client";

import { useQueryClient } from "@tanstack/react-query";
import { FormEvent, useRef, useState } from "react";
import {
  createAdminPlan,
  updateAdminPlan,
  type AdminPlan,
  type CarrierCode,
} from "@/entities/plan/api/admin";
import {
  createEmptyPlanDraft,
  createPlanDraftFromPlan,
  createPlanPayload,
} from "./planDraft";
import type { AdminPlanDraft } from "./types";

type UsePlanFormParams = {
  /** 있으면 수정 모드(PATCH), 없으면 등록 모드(POST) */
  plan?: AdminPlan;
  /** 등록 모드에서 미리 선택해 둘 통신사 */
  carrierCode?: CarrierCode;
  onSaved?: (plan: AdminPlan) => void;
};

export function usePlanForm({ plan, carrierCode, onSaved }: UsePlanFormParams = {}) {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<AdminPlanDraft>(() =>
    plan ? createPlanDraftFromPlan(plan) : createEmptyPlanDraft(carrierCode)
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // mouseup과 click이 연달아 제출을 걸어도 한 번만 보낸다.
  const lastSubmitAtRef = useRef(0);

  function update<K extends keyof AdminPlanDraft>(key: K, value: AdminPlanDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (Date.now() - lastSubmitAtRef.current < 400) return;
    lastSubmitAtRef.current = Date.now();

    const payload = createPlanPayload(draft);
    if (!payload.name) {
      setError("요금제명은 필수입니다.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const saved = plan
        ? await updateAdminPlan(plan.id, payload)
        : await createAdminPlan(payload);
      await queryClient.invalidateQueries({ queryKey: ["admin-plans"] });
      if (!plan) setDraft(createEmptyPlanDraft(carrierCode));
      onSaved?.(saved);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : plan
            ? "요금제 수정에 실패했습니다."
            : "요금제 등록에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  }

  return { draft, error, isEdit: Boolean(plan), loading, submit, update };
}
