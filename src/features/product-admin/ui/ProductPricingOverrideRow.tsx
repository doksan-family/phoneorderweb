import { Trash2 } from "lucide-react";
import type { AdminPlan } from "@/entities/plan/api/admin";
import type { ProductPricingOverrideDraft } from "../model/types";
import {
  PlanField,
  SubscriptionField,
} from "./ProductPricingOverrideChoiceFields";
import { OverrideNumberFields } from "./ProductPricingOverrideNumberFields";

type ProductPricingOverrideRowProps = {
  override: ProductPricingOverrideDraft;
  plans: AdminPlan[];
  storageValues: string[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, next: Partial<ProductPricingOverrideDraft>) => void;
};

const fieldClass = "grid gap-2 text-sm font-bold text-slate-700";
const iconButtonClass =
  "grid h-11 w-11 place-items-center rounded-lg bg-zinc-50 text-slate-500 transition hover:bg-zinc-100 hover:text-slate-950";

export function ProductPricingOverrideRow({
  override,
  plans,
  storageValues,
  onDelete,
  onUpdate,
}: ProductPricingOverrideRowProps) {
  return (
    <div className="grid gap-2.5 rounded-lg border border-slate-200 p-3">
      <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2.5 max-[900px]:grid-cols-1">
        <SelectField
          label="저장용량"
          value={override.storageValue}
          options={storageValues}
          onChange={(value) => onUpdate(override.id, { storageValue: value })}
        />
        <PlanField
          plans={plans}
          value={override.planId}
          onChange={(value) => onUpdate(override.id, { planId: value })}
        />
        <SubscriptionField
          value={override.subscriptionType}
          onChange={(value) => onUpdate(override.id, { subscriptionType: value })}
        />
        <button className={`${iconButtonClass} self-end`} type="button" onClick={() => onDelete(override.id)}>
          <Trash2 size={17} aria-hidden="true" />
          <span className="sr-only">가격 예외조건 삭제</span>
        </button>
      </div>
      <OverrideNumberFields override={override} onUpdate={onUpdate} />
    </div>
  );
}

function SelectField(props: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={fieldClass}>
      {props.label}
      <select value={props.value} onChange={(event) => props.onChange(event.target.value)}>
        <option value="">전체</option>
        {props.options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
