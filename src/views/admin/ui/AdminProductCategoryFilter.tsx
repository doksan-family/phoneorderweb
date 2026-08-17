import type { AdminProductCategory } from "@/entities/product/api/categoryTypes";

type AdminProductCategoryFilterProps = {
  categories: AdminProductCategory[];
  totalCount: number;
  selected: string;
  onSelect: (code: string) => void;
};

const chipClass =
  "inline-flex min-h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-bold transition";
const activeChipClass =
  "border-[var(--brand-primary-strong)] bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]";
const idleChipClass =
  "border-slate-200 bg-white text-slate-600 hover:bg-[var(--brand-primary-soft)]";

/** 카테고리별로 상품 목록을 걸러 보는 탭. "전체"가 항상 맨 앞이다. */
export function AdminProductCategoryFilter({
  categories,
  totalCount,
  selected,
  onSelect,
}: AdminProductCategoryFilterProps) {
  const sortedCategories = [...categories].sort(
    (first, second) => first.display_order - second.display_order
  );

  return (
    <div className="flex flex-wrap gap-2">
      <button
        aria-pressed={selected === ""}
        className={`${chipClass} ${selected === "" ? activeChipClass : idleChipClass}`}
        type="button"
        onClick={() => onSelect("")}
      >
        전체
        <span className="text-[0.78rem] opacity-70">{totalCount}</span>
      </button>
      {sortedCategories.map((category) => (
        <button
          aria-pressed={selected === category.code}
          className={`${chipClass} ${selected === category.code ? activeChipClass : idleChipClass}`}
          key={category.code}
          type="button"
          onClick={() => onSelect(category.code)}
        >
          {category.name}
          <span className="text-[0.78rem] opacity-70">{category.product_count}</span>
        </button>
      ))}
    </div>
  );
}
