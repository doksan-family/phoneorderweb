import type { ProductColorOption } from "@/entities/product/model/types";

type ColorChoiceListProps = {
  options: ProductColorOption[];
  value: string;
  onChange: (value: string) => void;
};

const choiceBase =
  "inline-flex gap-2 items-center min-h-[40px] border-[1.5px] rounded-[8px] px-3 cursor-pointer font-bold transition";

export function ColorChoiceList({ options, value, onChange }: ColorChoiceListProps) {
  return (
    <div className="grid gap-2 border border-slate-200 rounded-[10px] p-[14px] bg-[#fbfcfc]">
      <span className="text-slate-500 text-[0.88rem] font-bold">색상</span>
      <div className="flex flex-nowrap gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
        {options.map((color) => (
          <button
            className={`${choiceBase} ${color.id === value ? "border-blue-700 bg-blue-50 text-blue-900" : "border-slate-200 bg-white text-slate-950"}`}
            key={color.id}
            onClick={() => onChange(color.id)}
            type="button"
          >
            <i className="w-4 h-4 border border-[#cbd5d5] rounded-full" style={{ backgroundColor: color.hexCode }} />
            {color.label}
          </button>
        ))}
      </div>
    </div>
  );
}
