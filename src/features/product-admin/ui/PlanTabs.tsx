type PlanTab = { key: string; label: string; carrier?: string };

type PlanTabsProps = {
  tabs: PlanTab[];
  value: string;
  onChange: (key: string) => void;
};

/**
 * 통신사(SKT/KT/LG U+)를 모두 세로로 나열하고 그 아래 요금제를 한 줄씩 쌓는다.
 * 요금제는 전체에서 하나만 선택된다. 항목이 많으면 목록이 내부 스크롤한다.
 */
export function PlanTabs({ tabs, value, onChange }: PlanTabsProps) {
  if (tabs.length <= 1) return null;

  const groups = new Map<string, PlanTab[]>();
  for (const tab of tabs) {
    const carrier = tab.carrier ?? "";
    const bucket = groups.get(carrier);
    if (bucket) bucket.push(tab);
    else groups.set(carrier, [tab]);
  }

  return (
    <div className="grid max-h-[10.5rem] gap-2 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50/60 p-2">
      {[...groups.entries()].map(([carrier, items]) => (
        <div className="grid gap-1" key={carrier || "_"}>
          {carrier ? (
            <span className="px-1 text-[0.72rem] font-extrabold tracking-wide text-slate-400">
              {carrier}
            </span>
          ) : null}
          {items.map((tab) => (
            <button
              aria-pressed={value === tab.key}
              className={`min-h-9 rounded-md border px-3 text-left text-[0.8rem] font-bold transition ${
                value === tab.key
                  ? "border-[var(--brand-primary-strong)] bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
