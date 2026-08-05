import type { ProductColorOption } from "@/entities/product/model/types";
import {
  chipClass,
  chipGroupLabelClass,
  chipRowClass
} from "./choiceChipStyles";

type ColorChoiceListProps = {
  options: ProductColorOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

export function ColorChoiceList({
  options,
  value,
  onChange,
  label = "색상 선택"
}: ColorChoiceListProps) {
  return (
    <div>
      <span className={chipGroupLabelClass}>{label}</span>
      <div className={chipRowClass}>
        {options.map((color) => (
          <button
            className={chipClass(color.id === value)}
            key={color.id}
            onClick={() => onChange(color.id)}
            type="button"
          >
            <i
              aria-hidden
              className="h-4 w-4 rounded-full border border-black/15"
              style={{ backgroundColor: color.hexCode }}
            />
            {color.label}
          </button>
        ))}
      </div>
    </div>
  );
}
