import type { ProductOption } from "@/entities/product/model/types";

type OptionChoiceListProps = {
  label: string;
  options: ProductOption[];
  value: string;
  onChange: (value: string) => void;
};

export function OptionChoiceList({ label, options, value, onChange }: OptionChoiceListProps) {
  return (
    <div className="detail-field detail-field--wide">
      <span>{label}</span>
      <div className="color-choice-list">
        {options.map((option) => (
          <button
            className={option.id === value ? "color-choice is-active" : "color-choice"}
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
