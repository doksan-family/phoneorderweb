import type { ProductOption } from "@/entities/product/model/types";

type DetailSelectProps = {
  label: string;
  options: ProductOption[];
  value: string;
  onChange: (value: string) => void;
};

export function DetailSelect({ label, options, value, onChange }: DetailSelectProps) {
  return (
    <label className="grid gap-2">
      <span className="text-slate-500 text-[0.88rem] font-bold">{label}</span>
      <select
        className="min-h-[48px] border-slate-200 bg-[#fbfcfc] font-bold"
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
