import type { ProductColorOption } from "@/entities/product/model/types";

type ColorChoiceListProps = {
  options: ProductColorOption[];
  value: string;
  onChange: (value: string) => void;
};

export function ColorChoiceList({ options, value, onChange }: ColorChoiceListProps) {
  return (
    <div className="detail-field detail-field--wide">
      <span>색상</span>
      <div className="color-choice-list">
        {options.map((color) => (
          <button
            className={color.id === value ? "color-choice is-active" : "color-choice"}
            key={color.id}
            onClick={() => onChange(color.id)}
            type="button"
          >
            <i style={{ backgroundColor: color.hexCode }} />
            {color.label}
          </button>
        ))}
      </div>
    </div>
  );
}
