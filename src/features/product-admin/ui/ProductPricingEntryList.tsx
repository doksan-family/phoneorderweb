import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { planQueryOptions } from "@/entities/plan/model/queries";
import { entryCarrier, groupPricingEntries } from "../model/pricingEntryCollection";
import { usePricingEntryManager } from "../model/usePricingEntryManager";
import { usePricingPreview } from "../model/usePricingPreview";
import type { ProductPricingEntryDraft, ProductVariantDraft } from "../model/types";
import { ProductPricingEntryCard } from "./ProductPricingEntryCard";
import { ProductPricingBatchPicker } from "./ProductPricingBatchPicker";
import { ProductPricingNavigation } from "./ProductPricingNavigation";

type ProductPricingEntryListProps = {
  entries: ProductPricingEntryDraft[];
  variants: ProductVariantDraft[];
  installmentMonths: number[];
  onChange: (entries: ProductPricingEntryDraft[]) => void;
};
const buttonClass = "min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 disabled:opacity-40";

export function ProductPricingEntryList({ entries, variants, installmentMonths, onChange }: ProductPricingEntryListProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const query = useQuery(planQueryOptions.adminList());
  const plans = query.data ?? [];
  const preview = usePricingPreview();
  const manager = usePricingEntryManager(entries, plans, onChange);
  const selected = manager.selected;
  const carrierPlans = plans.filter((plan) => plan.carrier_code === manager.activeCarrier);

  function selectEntry(entry: ProductPricingEntryDraft) {
    manager.select(entry);
    requestAnimationFrame(() => {
      sectionRef.current?.querySelector("[data-pricing-subscriptions]")?.scrollIntoView({ block: "start" });
    });
  }

  return (
    <section ref={sectionRef} className="grid min-w-0 gap-4">
      <div className="flex flex-wrap gap-2" aria-label="통신사별 요금 조건">
        {manager.carriers.map((carrier) => (
          <button key={carrier.value} type="button" aria-pressed={manager.activeCarrier === carrier.value}
            onClick={() => manager.changeCarrier(carrier.value)}
            className={`min-h-11 rounded-lg border px-4 text-sm font-bold ${manager.activeCarrier === carrier.value ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-600"}`}>
            {carrier.label} · {groupPricingEntries(entries, plans, carrier.value).length}개 요금제
            <span className="ml-2 text-xs font-normal opacity-70">{entries.filter((entry) => entryCarrier(entry, plans) === carrier.value).length}개 조건</span>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button className={buttonClass} type="button" disabled={query.isPending || query.isError} onClick={() => manager.setPicker({})}>요금제 여러 개 추가</button>
        <button className={buttonClass} type="button" disabled={!selected || query.isPending || query.isError} onClick={() => manager.setPicker({ template: selected })}>선택 조건 복제</button>
        <span className="text-xs text-slate-500">요금제를 선택해 허용 할인 방식과 지원금을 편집하세요.</span>
      </div>
      {query.isPending ? <p role="status" className="m-0 text-sm text-slate-500">요금제를 불러오는 중…</p> : null}
      {query.isError ? <p role="alert" className="m-0 text-sm text-red-600">요금제를 불러오지 못했습니다. <button type="button" className="underline" onClick={() => query.refetch()}>다시 시도</button></p> : null}
      {manager.picker ? (
        <ProductPricingBatchPicker key={`${manager.activeCarrier}:${manager.picker.template?.id ?? "new"}`}
          plans={carrierPlans} entries={entries} template={manager.picker.template}
          onAdd={manager.add} onClose={() => manager.setPicker(null)} />
      ) : null}
      <div className="grid min-w-0 items-start gap-4 min-[900px]:grid-cols-[260px_minmax(0,1fr)]">
        <ProductPricingNavigation entries={entries} plans={plans} variants={variants} carriers={manager.carriers}
          activeCarrier={manager.activeCarrier} selectedId={selected?.id} onSelect={selectEntry} />
        <div className="min-w-0">
          {selected ? (
            <ProductPricingEntryCard key={selected.id} entry={selected} index={entries.indexOf(selected)}
              plans={plans} variants={variants} installmentMonths={installmentMonths} preview={preview}
              onUpdate={manager.update} onDelete={manager.remove} />
          ) : <p className="m-0 rounded-lg border border-dashed border-slate-300 p-6 text-sm leading-relaxed text-slate-500">위의 ‘요금제 여러 개 추가’에서 이 통신사에 판매할 요금제를 선택하세요.</p>}
        </div>
      </div>
    </section>
  );
}
