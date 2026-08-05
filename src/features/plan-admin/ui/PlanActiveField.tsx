type PlanActiveFieldProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function PlanActiveField({
  checked,
  onChange,
}: PlanActiveFieldProps) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-slate-700">
      <input
        checked={checked}
        type="checkbox"
        onChange={(event) => onChange(event.target.checked)}
      />
      활성
    </label>
  );
}
