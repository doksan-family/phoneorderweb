import type { ProductOption } from "@/entities/product/model/types";
import {
  chipClass,
  chipGroupLabelClass,
  chipRowClass
} from "./choiceChipStyles";

type OptionChoiceListProps = {
  label: string;
  options: ProductOption[];
  value: string;
  onChange: (value: string) => void;
};

export function OptionChoiceList({ label, options, value, onChange }: OptionChoiceListProps) {
  return (
    <div>
      <span className={chipGroupLabelClass}>{label}</span>
      <div className={chipRowClass}>
        {options.map((option) => (
          <button
            className={chipClass(option.id === value)}
            key={option.id}
            onClick={() => onChange(option.id)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
