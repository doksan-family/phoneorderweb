import { ALL_DISCOUNT_TYPES, DISCOUNT_LABELS } from "@/entities/product/model/discountTypes";
import type { DiscountType } from "../model/types";

type ProductDiscountFieldsProps = {
  values: DiscountType[];
  onChange: (values: DiscountType[]) => void;
};

export function ProductDiscountFields({ values, onChange }: ProductDiscountFieldsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {ALL_DISCOUNT_TYPES.map((type) => (
        <label key={type} className="flex min-h-10 items-center gap-2 text-sm font-bold">
          <input className="h-4 w-4" type="checkbox" checked={values.includes(type)}
            onChange={() => onChange(values.includes(type) ? values.filter((value) => value !== type) : [...values, type])} />
          {DISCOUNT_LABELS[type]}
        </label>
      ))}
    </div>
  );
}
