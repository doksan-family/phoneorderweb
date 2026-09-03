import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { planQueryOptions } from "@/entities/plan/model/queries";
import { createEmptyPricingEntry } from "../model/productDraft";
import { usePricingPreview } from "../model/usePricingPreview";
import type {
  ProductPricingEntryDraft,
  ProductVariantDraft,
} from "../model/types";
import { ProductPricingEntryCard } from "./ProductPricingEntryCard";

type ProductPricingEntryListProps = {
  entries: ProductPricingEntryDraft[];
  variants: ProductVariantDraft[];
  installmentMonths: number[];
  onChange: (entries: ProductPricingEntryDraft[]) => void;
};

const addButtonClass =
  "inline-flex h-11 items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-4 text-sm font-bold text-slate-600 transition hover:border-[var(--brand-primary-strong)] hover:text-[var(--brand-primary-strong)]";

/**
 * 요금 조건을 하나씩 추가한다. 같은 요금제라도 공시지원금 항목과
 * 선택약정 항목을 따로 추가할 수 있다.
 */
export function ProductPricingEntryList({
  entries,
  variants,
  installmentMonths,
  onChange,
}: ProductPricingEntryListProps) {
  const { data: plans = [] } = useQuery(planQueryOptions.adminList());
  const preview = usePricingPreview();

  function updateEntry(id: string, next: Partial<ProductPricingEntryDraft>) {
    onChange(
      entries.map((entry) => (entry.id === id ? { ...entry, ...next } : entry))
    );
  }

  function deleteEntry(id: string) {
    onChange(entries.filter((entry) => entry.id !== id));
  }

  function addEntry() {
    onChange([...entries, createEmptyPricingEntry()]);
  }

  return (
    <section className="grid gap-3">
      <div className="grid gap-0.5">
        <span className="text-sm font-bold text-slate-700">요금 조건</span>
        <span className="text-[0.78rem] text-slate-400">
          통신사 → 요금제 → 가입유형 → 할인 방식 순으로 채우면 아래에 월 예상
          납부금이 나옵니다. 통신사·요금제·할인 방식별로 조건을 각각 추가하세요.
        </span>
      </div>

      <div className="grid gap-2.5">
        {entries.map((entry, index) => (
          <ProductPricingEntryCard
            key={entry.id}
            entry={entry}
            index={index}
            plans={plans}
            variants={variants}
            installmentMonths={installmentMonths}
            preview={preview}
            onUpdate={updateEntry}
            onDelete={deleteEntry}
          />
        ))}
      </div>

      <button className={addButtonClass} type="button" onClick={addEntry}>
        <Plus size={16} aria-hidden="true" />
        요금 조건 추가
      </button>
    </section>
  );
}
