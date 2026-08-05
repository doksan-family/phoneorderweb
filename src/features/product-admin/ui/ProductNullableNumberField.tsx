type ProductNullableNumberFieldProps = {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
};

const fieldClass = "grid gap-2 text-sm font-bold text-slate-700";

export function ProductNullableNumberField({
  label,
  value,
  onChange,
}: ProductNullableNumberFieldProps) {
  return (
    <label className={fieldClass}>
      {label}
      <input
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="기본값"
        value={value === null ? "" : String(value)}
        onChange={(event) => onChange(toNullableNumber(event.target.value))}
      />
    </label>
  );
}

function toNullableNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : null;
}
