import type { ProductPricingOverrideDraft } from "../model/types";
import { ProductNullableNumberField } from "./ProductNullableNumberField";
import { ProductNumberField } from "./ProductNumberField";

type OverrideNumberFieldsProps = {
  override: ProductPricingOverrideDraft;
  onUpdate: (id: string, next: Partial<ProductPricingOverrideDraft>) => void;
};

export function OverrideNumberFields({
  override,
  onUpdate,
}: OverrideNumberFieldsProps) {
  return (
    <div className="grid grid-cols-3 gap-2.5 max-[900px]:grid-cols-1">
      {nullableNumberFields.map((field) => (
        <ProductNullableNumberField
          key={field.key}
          label={field.label}
          value={override[field.key]}
          onChange={(value) => onUpdate(override.id, { [field.key]: value })}
        />
      ))}
      <label className="grid gap-2 text-sm font-bold text-slate-700">
        계산 방식
        <input
          value={override.calculationMethod}
          onChange={(event) =>
            onUpdate(override.id, { calculationMethod: event.target.value })
          }
        />
      </label>
      <ProductNumberField
        label="우선순위"
        value={override.priority}
        onChange={(value) => onUpdate(override.id, { priority: value })}
      />
    </div>
  );
}

type NullableNumberKey =
  | "devicePrice"
  | "supportAmount"
  | "extraSupportAmount"
  | "monthlyPlanDiscount";

const nullableNumberFields: { key: NullableNumberKey; label: string }[] = [
  { key: "devicePrice", label: "단말기 가격" },
  { key: "supportAmount", label: "기본 지원금" },
  { key: "extraSupportAmount", label: "추가 지원금" },
  { key: "monthlyPlanDiscount", label: "월 요금 할인" },
];
