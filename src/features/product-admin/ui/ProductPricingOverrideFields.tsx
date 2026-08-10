import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { planQueryOptions } from "@/entities/plan/model/queries";
import { createEmptyPricingOverride } from "../model/productDraft";
import type { ProductPricingOverrideDraft } from "../model/types";
import { ProductPricingOverrideRow } from "./ProductPricingOverrideRow";

type ProductPricingOverrideFieldsProps = {
  planIds: string[];
  values: ProductPricingOverrideDraft[];
  storageValues: string[];
  onChange: (values: ProductPricingOverrideDraft[]) => void;
};

const iconButtonClass =
  "grid h-11 w-11 place-items-center rounded-lg bg-zinc-50 text-slate-500 transition hover:bg-zinc-100 hover:text-slate-950";

export function ProductPricingOverrideFields({
  planIds,
  values,
  storageValues,
  onChange,
}: ProductPricingOverrideFieldsProps) {
  const { data: plans = [] } = useQuery(planQueryOptions.adminList());
  const selectedPlans = plans.filter((plan) => planIds.includes(plan.id));

  function addOverride() {
    onChange([...values, createEmptyPricingOverride()]);
  }

  function updateOverride(id: string, next: Partial<ProductPricingOverrideDraft>) {
    onChange(values.map((item) => (item.id === id ? { ...item, ...next } : item)));
  }

  function deleteOverride(id: string) {
    onChange(values.filter((item) => item.id !== id));
  }

  return (
    <section className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-slate-700">가격 예외조건</span>
        <button className={iconButtonClass} type="button" onClick={addOverride}>
          <Plus size={18} aria-hidden="true" />
          <span className="sr-only">가격 예외조건 추가</span>
        </button>
      </div>
      <div className="grid gap-2.5">
        {values.map((override) => (
          <ProductPricingOverrideRow
            key={override.id}
            override={override}
            plans={selectedPlans}
            storageValues={storageValues}
            onDelete={deleteOverride}
            onUpdate={updateOverride}
          />
        ))}
      </div>
    </section>
  );
}
