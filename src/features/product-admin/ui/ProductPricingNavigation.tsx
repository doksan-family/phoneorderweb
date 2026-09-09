import type { AdminPlan } from "@/entities/plan/api/admin";
import type { ProductPricingEntryDraft, ProductVariantDraft } from "../model/types";
import { groupPricingEntries, pricingDiscountLabels } from "../model/pricingEntryCollection";
import { validateProductPricing } from "../model/productValidate";

type ProductPricingNavigationProps = {
  entries: ProductPricingEntryDraft[];
  plans: AdminPlan[];
  variants: ProductVariantDraft[];
  carriers: { value: string; label: string }[];
  activeCarrier: string;
  selectedId?: string;
  onSelect: (entry: ProductPricingEntryDraft) => void;
};

export function ProductPricingNavigation({ entries, plans, variants, carriers, activeCarrier, selectedId, onSelect }: ProductPricingNavigationProps) {
  return (
    <nav aria-label="요금 조건 목록" className="max-h-64 min-w-0 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-3 min-[900px]:sticky min-[900px]:top-24 min-[900px]:max-h-[max(120px,calc(100dvh-300px))]">
      {carriers.map((carrier) => (
        <div key={carrier.value} hidden={carrier.value !== activeCarrier}>
          <div className="grid gap-3">
            {groupPricingEntries(entries, plans, carrier.value).map((group) => (
              <div key={group.id} className="grid gap-2">
                <h4 className="m-0 break-words text-sm font-bold text-slate-800">{group.name}</h4>
                {group.entries.map((entry) => (
                  <button key={entry.id} type="button" data-pricing-entry-id={entry.id} aria-pressed={entry.id === selectedId}
                    onClick={() => onSelect(entry)}
                    className={`flex min-h-11 flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-xs ${entry.id === selectedId ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700"}`}>
                    <span>{entries.indexOf(entry) + 1}. {entry.availableDiscountTypes.map((type) => pricingDiscountLabels[type]).join(" · ")}</span>
                    <span>{isComplete(entry, variants) ? "입력 완료" : "입력 필요"}</span>
                  </button>
                ))}
              </div>
            ))}
            {!groupPricingEntries(entries, plans, carrier.value).length ? <p className="m-0 py-4 text-sm text-slate-500">아직 등록된 조건이 없습니다.</p> : null}
          </div>
        </div>
      ))}
    </nav>
  );
}

function isComplete(entry: ProductPricingEntryDraft, variants: ProductVariantDraft[]) {
  try {
    validateProductPricing({ pricingEntries: [entry], variants });
    return true;
  } catch {
    return false;
  }
}
