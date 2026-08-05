export const chipBaseClass =
  "inline-flex cursor-pointer items-center gap-2 rounded-[10px] border px-[15px] py-[9px] text-[0.82rem] font-bold transition";

export const chipSelectedClass = "border-slate-950 bg-slate-950 text-white";

// 호버에 보더를 넣으면 선택 상태와 헷갈려서 불투명도만 조절한다.
export const chipIdleClass =
  "border-slate-300 bg-white text-slate-700 opacity-100 hover:opacity-60";

export function chipClass(selected: boolean) {
  return `${chipBaseClass} ${selected ? chipSelectedClass : chipIdleClass}`;
}

export const chipGroupLabelClass =
  "mb-2 block text-[0.75rem] font-bold text-slate-500";

export const chipRowClass = "flex flex-wrap gap-2";
