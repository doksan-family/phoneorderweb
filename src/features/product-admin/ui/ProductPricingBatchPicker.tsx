import { useState } from "react";
import type { AdminPlan } from "@/entities/plan/api/admin";
import type { DiscountType, ProductPricingEntryDraft } from "../model/types";
import { pricingDiscountLabels } from "../model/pricingEntryCollection";

type ProductPricingBatchPickerProps = {
  plans: AdminPlan[];
  entries: ProductPricingEntryDraft[];
  template?: ProductPricingEntryDraft;
  onAdd: (plans: AdminPlan[], discounts: DiscountType[]) => void;
  onClose: () => void;
};

export function ProductPricingBatchPicker({ plans, entries, template, onAdd, onClose }: ProductPricingBatchPickerProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [discounts, setDiscounts] = useState<DiscountType[]>(template?.availableDiscountTypes ?? ["public_support", "contract_discount"]);
  const [search, setSearch] = useState("");
  const available = plans.filter((plan) => plan.is_active !== false && !entries.some((entry) => entry.planId === plan.id));
  const filtered = available.filter((plan) => plan.name.toLowerCase().includes(search.toLowerCase()));
  const targets = available.filter((plan) => selected.includes(plan.id));
  const count = discounts.length ? targets.length : 0;

  return (
    <section aria-label={template ? "조건 복제" : "요금제 여러 개 추가"} className="grid gap-3 rounded-xl border border-slate-300 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-2">
        <h4 className="m-0 text-sm font-bold">{template ? "선택 조건을 다른 요금제에 복제" : "요금제 여러 개 추가"}</h4>
        <button type="button" onClick={onClose} className="px-3 py-2 text-sm font-bold">닫기</button>
      </div>
      <p className="m-0 text-xs leading-relaxed text-slate-500">
        {template ? "가입유형·허용 할인 방식·용량별 지원금·추가 지원금을 복사합니다. 복제 후 요금제에 맞는 금액인지 확인하세요." : "요금제와 고객에게 제공할 할인 방식을 선택하세요. 지원금은 추가 후 각 조건에서 입력합니다."}
        {" "}이미 등록된 요금제는 제외됩니다. 두 할인 방식을 허용해도 고객은 하나만 선택합니다.
      </p>
      <div className="flex flex-wrap gap-3">
        {(Object.keys(pricingDiscountLabels) as DiscountType[]).map((discount) => (
          <label key={discount} className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="h-4 w-4" checked={discounts.includes(discount)} disabled={Boolean(template)}
              onChange={() => setDiscounts((current) => current.includes(discount) ? current.filter((item) => item !== discount) : [...current, discount])} />
            {pricingDiscountLabels[discount]}
          </label>
        ))}
      </div>
      <input aria-label="추가할 요금제 검색" placeholder="요금제 검색" value={search} onChange={(event) => setSearch(event.target.value)} />
      <div className="flex gap-4 text-xs font-bold underline">
        <button type="button" onClick={() => setSelected([...new Set([...selected, ...filtered.map((plan) => plan.id)])])}>검색 결과 모두 선택</button>
        <button type="button" onClick={() => setSelected([])}>선택 해제</button>
      </div>
      <div className="grid max-h-60 gap-2 overflow-y-auto">
        {filtered.map((plan) => (
          <label key={plan.id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm">
            <input className="h-4 w-4 shrink-0" type="checkbox" checked={selected.includes(plan.id)}
              onChange={() => setSelected((current) => current.includes(plan.id) ? current.filter((id) => id !== plan.id) : [...current, plan.id])} />
            <span className="min-w-0 break-words">{plan.name}<span className="block text-xs text-slate-500">월 {plan.monthly_fee.toLocaleString("ko-KR")}원</span></span>
          </label>
        ))}
        {!filtered.length ? <p className="m-0 text-sm text-slate-500">추가할 요금제가 없습니다. 검색어와 할인 방식, 요금제 등록 상태를 확인하세요.</p> : null}
      </div>
      <button type="button" disabled={!count} onClick={() => onAdd(targets, discounts)} className="min-h-11 rounded-lg bg-slate-900 px-4 text-sm font-bold text-white disabled:opacity-40">
        {count}개 요금제 {template ? "복제" : "추가"}
      </button>
    </section>
  );
}
