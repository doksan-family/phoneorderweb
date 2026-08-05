"use client";

import type { AdminPlan } from "@/entities/plan/api/admin";
import { carrierOptions } from "../model/planDraft";
import { usePlanCreateForm } from "../model/usePlanCreateForm";
import { PlanActiveField } from "./PlanActiveField";
import { PlanFormActions } from "./PlanFormActions";
import { PlanNumberField } from "./PlanNumberField";

type PlanCreateFormProps = {
  onCancel?: () => void;
  onCreated?: (plan: AdminPlan) => void;
};

const fieldClass = "grid gap-2 text-sm font-bold text-slate-700";

export function PlanCreateForm({
  onCancel,
  onCreated,
}: PlanCreateFormProps) {
  const form = usePlanCreateForm({ onCreated });

  return (
    <form className="grid gap-4" onSubmit={form.submit}>
      <div className="grid grid-cols-[1fr_1.4fr_1fr] gap-2.5 max-[900px]:grid-cols-1">
        <label className={fieldClass}>
          통신사
          <select
            value={form.draft.carrierCode}
            onChange={(event) =>
              form.update(
                "carrierCode",
                event.target.value as typeof form.draft.carrierCode
              )
            }
          >
            {carrierOptions.map((carrier) => (
              <option key={carrier.value} value={carrier.value}>
                {carrier.label}
              </option>
            ))}
          </select>
        </label>
        <label className={fieldClass}>
          요금제명
          <input
            required
            value={form.draft.name}
            onChange={(event) => form.update("name", event.target.value)}
          />
        </label>
        <PlanNumberField
          label="월 요금"
          value={form.draft.monthlyFee}
          onChange={(value) => form.update("monthlyFee", value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-2.5 max-[900px]:grid-cols-1">
        <label className={fieldClass}>
          데이터
          <input
            value={form.draft.dataAmount}
            onChange={(event) => form.update("dataAmount", event.target.value)}
          />
        </label>
        <label className={fieldClass}>
          통화/문자
          <input
            value={form.draft.callTextDescription}
            onChange={(event) =>
              form.update("callTextDescription", event.target.value)
            }
          />
        </label>
      </div>
      <label className={fieldClass}>
        설명
        <textarea
          rows={3}
          value={form.draft.descriptionText}
          onChange={(event) => form.update("descriptionText", event.target.value)}
        />
      </label>
      <div className="grid grid-cols-[1fr_auto] items-end gap-3 max-[640px]:grid-cols-1">
        <PlanNumberField
          label="노출 순서"
          value={form.draft.displayOrder}
          onChange={(value) => form.update("displayOrder", value)}
        />
        <PlanActiveField
          checked={form.draft.isActive}
          onChange={(value) => form.update("isActive", value)}
        />
      </div>
      {form.error ? <p className="m-0 text-sm font-bold text-red-600">{form.error}</p> : null}
      <PlanFormActions loading={form.loading} onCancel={onCancel} />
    </form>
  );
}
