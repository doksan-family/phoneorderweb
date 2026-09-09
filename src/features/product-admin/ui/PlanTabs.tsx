type PlanTab = { key: string; label: string; carrier?: string };

type PlanTabsProps = {
  tabs: PlanTab[];
  value: string;
  onChange: (key: string) => void;
};

/**
 * 위: 통신사 탭(SKT/KT/LG U+), 아래: 선택한 통신사의 요금제 세로 목록.
 * 요금제가 많으면 목록만 내부 스크롤한다. 통신사가 하나면 탭을 감춘다.
 */
export function PlanTabs({ tabs, value, onChange }: PlanTabsProps) {
  if (tabs.length <= 1) return null;

  const carriers = [
    ...new Set(tabs.map((tab) => tab.carrier ?? "")),
  ].filter(Boolean);
  const activeTab = tabs.find((tab) => tab.key === value) ?? tabs[0];
  const activeCarrier = activeTab?.carrier ?? carriers[0] ?? "";
  const carrierPlans = tabs.filter(
    (tab) => (tab.carrier ?? "") === activeCarrier
  );

  return (
    <div className="grid gap-2">
      {carriers.length > 1 ? (
        <div className="flex flex-wrap gap-1.5">
          {carriers.map((carrier) => (
            <button
              aria-pressed={carrier === activeCarrier}
              className={`min-h-8 rounded-md border px-3 text-[0.76rem] font-bold uppercase transition ${
                carrier === activeCarrier
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
              key={carrier}
              type="button"
              onClick={() => {
                const first = tabs.find(
                  (tab) => (tab.carrier ?? "") === carrier
                );
                if (first && first.key !== value) onChange(first.key);
              }}
            >
              {carrier}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid max-h-[9.5rem] gap-1 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50/60 p-2">
        {carrierPlans.map((tab) => (
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
    </div>
  );
}
