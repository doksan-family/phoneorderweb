import type { DashboardDailyConsultation } from "@/entities/dashboard/model/types";

type AdminDailyConsultationChartProps = {
  items: DashboardDailyConsultation[];
};

/** "2026-08-09" -> "08-09" */
function toDayLabel(date: string) {
  return date.slice(5);
}

/**
 * 단일 계열 막대 추이. 높이로만 크기를 보여주고 정확한 값은 hover 툴팁으로 준다.
 * 날짜 라벨은 5개 안팎만 남겨 30·90일에서도 겹치지 않게 한다.
 */
export function AdminDailyConsultationChart({
  items,
}: AdminDailyConsultationChartProps) {
  const max = Math.max(1, ...items.map((item) => item.count));
  const total = items.reduce((sum, item) => sum + item.count, 0);
  const tickStep = Math.max(1, Math.ceil(items.length / 5));

  return (
    <div className="grid gap-2.5">
      <div className="flex items-baseline gap-2 text-[0.78rem] text-slate-400">
        <span>
          기간 합계{" "}
          <strong className="text-slate-600">{total.toLocaleString()}건</strong>
        </span>
        <span>·</span>
        <span>
          최대 <strong className="text-slate-600">{max.toLocaleString()}건</strong>
        </span>
      </div>

      <div className="relative flex h-44 items-end gap-[3px] border-b border-slate-200 pt-6">
        <div
          aria-hidden
          className="absolute inset-x-0 top-6 border-t border-dashed border-slate-200"
        />
        {items.map((item) => (
          <div
            className="group relative flex h-full min-w-[3px] flex-1 items-end"
            key={item.date}
          >
            <div
              className="w-full rounded-t-[4px] bg-[var(--brand-primary-strong)] transition group-hover:bg-slate-900"
              style={{ height: `${Math.max((item.count / max) * 100, 2)}%` }}
            />
            <span className="brand-pill pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full bg-slate-900 px-2.5 py-1 text-[0.72rem] text-white opacity-0 transition group-hover:opacity-100">
              {toDayLabel(item.date)} · {item.count.toLocaleString()}건
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[0.72rem] text-slate-400">
        {items
          .filter((_, index) => index % tickStep === 0 || index === items.length - 1)
          .map((item) => (
            <span key={item.date}>{toDayLabel(item.date)}</span>
          ))}
      </div>
    </div>
  );
}
