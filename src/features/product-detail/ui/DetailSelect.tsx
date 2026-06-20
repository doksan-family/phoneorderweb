import type { ProductOption } from "@/entities/product/model/types";

type DetailSelectProps = {
  label: string;
  options: ProductOption[];
  value: string;
  onChange: (value: string) => void;
};

export function DetailSelect({ label, options, value, onChange }: DetailSelectProps) {
  return (
    <label className="detail-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
