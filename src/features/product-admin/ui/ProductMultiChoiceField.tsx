import { Check } from "lucide-react";

type ChoiceValue = string | number;

type ProductMultiChoiceFieldProps<T extends ChoiceValue> = {
  label: string;
  options: { label: string; value: T }[];
  values: T[];
  onChange: (values: T[]) => void;
};

const fieldClass = "grid gap-2 text-sm font-bold text-slate-700";
const optionClass =
  "inline-flex h-10 min-w-[88px] cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md border px-3 text-sm font-bold transition";
const selectedClass =
  "border-[var(--brand-primary-strong)] bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]";
const idleClass =
  "border-slate-200 bg-white text-slate-600 hover:bg-[var(--brand-primary-soft)]";

export function ProductMultiChoiceField<T extends ChoiceValue>({
  label,
  options,
  values,
  onChange,
}: ProductMultiChoiceFieldProps<T>) {
  function toggle(value: T) {
    onChange(
      values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value]
    );
  }

  return (
    <div className={fieldClass}>
      <span>{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = values.includes(option.value);

          return (
            <button
              aria-pressed={isSelected}
              className={`${optionClass} ${
                isSelected ? selectedClass : idleClass
              }`}
              key={String(option.value)}
              type="button"
              onClick={() => toggle(option.value)}
            >
              <span
                className={`grid h-4 w-4 place-items-center rounded-full border ${
                  isSelected
                    ? "border-[var(--brand-primary-strong)] bg-white"
                    : "border-slate-300"
                }`}
              >
                {isSelected ? <Check size={12} aria-hidden="true" /> : null}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
