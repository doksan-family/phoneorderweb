type ProductStatusFieldsProps = {
  isFeatured: boolean;
  onFeaturedChange: (value: boolean) => void;
};

export function ProductStatusFields({
  isFeatured,
  onFeaturedChange,
}: ProductStatusFieldsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusCheckbox
        checked={isFeatured}
        label="추천 상품"
        onChange={onFeaturedChange}
      />
    </div>
  );
}

type StatusCheckboxProps = {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
};

function StatusCheckbox({ checked, label, onChange }: StatusCheckboxProps) {
  const className = [
    "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-3.5 text-sm font-bold transition",
    checked ? "bg-[var(--brand-primary-soft)] text-slate-950" : "bg-zinc-50 text-slate-600",
  ].join(" ");

  return (
    <label className={className}>
      <input
        checked={checked}
        className="h-4 w-4 accent-slate-900"
        type="checkbox"
        onChange={(event) => onChange(event.target.checked)}
      />
      {label}
    </label>
  );
}
