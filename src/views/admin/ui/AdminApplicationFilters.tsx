import type { ConsultationRequest } from "@/entities/consultation/model/types";
import { statusFilters, type StatusFilter } from "./adminApplicationStatus";

type AdminApplicationFiltersProps = {
  items: ConsultationRequest[];
  keyword: string;
  status: StatusFilter;
  onKeywordChange: (keyword: string) => void;
  onStatusChange: (status: StatusFilter) => void;
};

const chipClass =
  "inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg border px-3 text-sm font-bold transition";
const activeChipClass =
  "border-[var(--brand-primary-strong)] bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]";
const idleChipClass =
  "border-slate-200 bg-white text-slate-600 hover:bg-[var(--brand-primary-soft)]";

export function AdminApplicationFilters({
  items,
  keyword,
  status,
  onKeywordChange,
  onStatusChange,
}: AdminApplicationFiltersProps) {
  return (
    <div className="grid gap-2.5">
      <input
        placeholder="이름, 연락처, 상품으로 검색"
        value={keyword}
        onChange={(event) => onKeywordChange(event.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((filter) => {
          const count =
            filter === "전체"
              ? items.length
              : items.filter((item) => item.status === filter).length;

          return (
            <button
              aria-pressed={status === filter}
              className={`${chipClass} ${status === filter ? activeChipClass : idleChipClass}`}
              key={filter}
              type="button"
              onClick={() => onStatusChange(filter)}
            >
              {filter}
              <span className="text-[0.78rem] opacity-70">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
