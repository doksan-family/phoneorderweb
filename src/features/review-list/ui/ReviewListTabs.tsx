import type { PublicReview } from "@/entities/review/model/types";
import {
  countReviewsByTab,
  reviewListTabLabel,
  reviewListTabs,
  type ReviewListTab,
} from "../model/reviewListTab";

type ReviewListTabsProps = {
  reviews: PublicReview[];
  value: ReviewListTab;
  onChange: (tab: ReviewListTab) => void;
};

const chipClass =
  "inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-bold transition";
const activeChipClass =
  "border-[var(--brand-primary-strong)] bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]";
const idleChipClass =
  "border-slate-200 bg-white text-slate-600 hover:bg-[var(--brand-primary-soft)]";

/** 구매 후기 목록 상단의 사진 유무 필터 탭. */
export function ReviewListTabs({ reviews, value, onChange }: ReviewListTabsProps) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {reviewListTabs.map((tab) => (
        <button
          aria-pressed={value === tab}
          className={`${chipClass} ${value === tab ? activeChipClass : idleChipClass}`}
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
        >
          {reviewListTabLabel[tab]}
          <span className="text-[0.78rem] opacity-70">
            {countReviewsByTab(reviews, tab)}
          </span>
        </button>
      ))}
    </div>
  );
}
