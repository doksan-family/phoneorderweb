type PlanTab = { key: string; label: string };

type PlanTabsProps = {
  tabs: PlanTab[];
  value: string;
  onChange: (key: string) => void;
};

/** 요금제 목록을 칩으로 늘어놓고 하나만 골라 보게 하는 탭. 요금제가 하나면 감춘다. */
export function PlanTabs({ tabs, value, onChange }: PlanTabsProps) {
  if (tabs.length <= 1) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {tabs.map((tab) => (
        <button
          aria-pressed={value === tab.key}
          className={`min-h-9 rounded-lg border px-3 text-[0.8rem] font-bold transition ${
            value === tab.key
              ? "border-[var(--brand-primary-strong)] bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]"
              : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
