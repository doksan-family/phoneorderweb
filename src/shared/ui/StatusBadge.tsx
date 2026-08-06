type StatusBadgeProps = {
  active: boolean;
  activeLabel: string;
  inactiveLabel: string;
};

/** 현재 상태만 보여주는 읽기 전용 뱃지. 상태 변경은 옆 버튼이 한다. */
export function StatusBadge({ active, activeLabel, inactiveLabel }: StatusBadgeProps) {
  return (
    <span
      className={`brand-pill gap-1.5 px-2.5 py-1 text-[0.75rem] ${
        active
          ? "bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        aria-hidden
        className={`size-1.5 rounded-full ${active ? "bg-[var(--brand-primary-strong)]" : "bg-slate-400"}`}
      />
      {active ? activeLabel : inactiveLabel}
    </span>
  );
}
