"use client";

type ToggleCardProps = {
  checked: boolean;
  description: string;
  title: string;
  onChange: (checked: boolean) => void;
};

/** 어드민 폼에서 쓰는 설명 달린 체크박스 카드. */
export function ToggleCard({
  checked,
  description,
  title,
  onChange,
}: ToggleCardProps) {
  return (
    <label
      className={`flex items-start gap-2.5 rounded-lg border p-3 transition-colors ${
        checked ? "border-slate-900 bg-slate-50" : "border-slate-200"
      }`}
    >
      <input
        checked={checked}
        className="mt-0.5 size-4 shrink-0"
        type="checkbox"
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="grid gap-1">
        <span className="text-sm font-bold text-slate-800">{title}</span>
        <span className="text-xs font-normal leading-snug text-slate-500">
          {description}
        </span>
      </span>
    </label>
  );
}
