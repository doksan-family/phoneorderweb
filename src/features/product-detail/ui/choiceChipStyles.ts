export const chipBaseClass =
  "inline-flex cursor-pointer items-center gap-2 rounded-[10px] border px-[15px] py-[9px] text-[0.82rem] font-bold transition";

/* 헤더 메뉴 활성 상태와 같은 톤. 형광 라임을 넓게 깔면 눈이 부신다. */
export const chipSelectedClass =
  "border-[var(--brand-primary-strong)] bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]";

// 호버에 보더를 넣으면 선택 상태와 헷갈려서 불투명도만 조절한다.
export const chipIdleClass =
  "border-slate-300 bg-white text-slate-700 opacity-100 hover:opacity-60";

export function chipClass(selected: boolean) {
  return `${chipBaseClass} ${selected ? chipSelectedClass : chipIdleClass}`;
}

export const chipGroupLabelClass =
  "mb-2 block text-[0.75rem] font-bold text-slate-500";

export const chipRowClass = "flex flex-wrap gap-2";
