import type { ProductOption } from "@/entities/product/model/types";
import { chipGroupLabelClass } from "./choiceChipStyles";

type DetailSelectProps = {
  label: string;
  options: ProductOption[];
  value: string;
  onChange: (value: string) => void;
};

export function DetailSelect({ label, options, value, onChange }: DetailSelectProps) {
  return (
    <label className="block">
      <span className={chipGroupLabelClass}>{label}</span>
      <select
        className="min-h-[46px] rounded-[10px] border-slate-300 bg-white py-2.5 text-[0.85rem] font-bold text-slate-700"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
