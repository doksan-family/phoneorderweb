type PlanNumberFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

const fieldClass = "grid gap-2 text-sm font-bold text-slate-700";

export function PlanNumberField({
  label,
  value,
  onChange,
}: PlanNumberFieldProps) {
  return (
    <label className={fieldClass}>
      {label}
      <input
        inputMode="numeric"
        pattern="[0-9]*"
        value={String(value)}
        onChange={(event) => onChange(toNumber(event.target.value))}
      />
    </label>
  );
}

function toNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}
