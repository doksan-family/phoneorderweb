type AdminSummaryTileProps = {
  label: string;
  value: number;
  /** 값 아래 한 줄 보조 설명 */
  hint?: string;
  /** 공개/비공개처럼 비율 막대로 보여줄 두 값 */
  on?: number;
  off?: number;
  onLabel?: string;
  offLabel?: string;
  /** 가장 중요한 지표 하나에만 브랜드 색을 준다. */
  accent?: boolean;
};

export function AdminSummaryTile({
  label,
  value,
  hint,
  on,
  off,
  onLabel,
  offLabel,
  accent = false,
}: AdminSummaryTileProps) {
  const total = (on ?? 0) + (off ?? 0);
  const ratio = total ? Math.round(((on ?? 0) / total) * 100) : 0;

  return (
    <div
      className={`grid content-start gap-1.5 rounded-2xl border p-5 ${
        accent
          ? "border-[var(--brand-primary)] bg-[var(--brand-primary-soft)]"
          : "border-slate-200 bg-white"
      }`}
    >
      <span
        className={`text-[0.78rem] font-bold ${
          accent ? "text-[var(--brand-primary-strong)]" : "text-slate-500"
        }`}
      >
        {label}
      </span>
      <strong className="text-[1.9rem] leading-none tracking-[-0.03em] text-slate-950">
        {value.toLocaleString()}
      </strong>

      {hint ? (
        <span className="text-[0.76rem] text-slate-500">{hint}</span>
      ) : null}

      {on !== undefined && off !== undefined ? (
        <div className="mt-1 grid gap-1.5">
          <div
            aria-hidden
            className="h-1.5 overflow-hidden rounded-full bg-slate-100"
          >
            <div
              className="h-full rounded-full bg-[var(--brand-primary-strong)]"
              style={{ width: `${ratio}%` }}
            />
          </div>
          <span className="text-[0.76rem] text-slate-500">
            {onLabel} {on.toLocaleString()} · {offLabel} {off.toLocaleString()}
          </span>
        </div>
      ) : null}
    </div>
  );
}
