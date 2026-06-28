import type { ProductPlanOption } from "@/entities/product/model/types";

type PlanChoiceListProps = {
  options: ProductPlanOption[];
  value: string;
  onChange: (value: string) => void;
};

const choiceBase =
  "inline-flex flex-col items-start gap-0.5 min-h-[56px] border-[1.5px] rounded-[8px] px-[14px] py-[10px] cursor-pointer font-bold transition whitespace-nowrap";

export function PlanChoiceList({ options, value, onChange }: PlanChoiceListProps) {
  return (
    <div className="grid gap-2 border border-slate-200 rounded-[10px] p-[14px] bg-[#fbfcfc]">
      <span className="text-slate-500 text-[0.88rem] font-bold">요금제</span>
      <div className="flex flex-nowrap gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-0.5">
        {options.map((plan) => {
          const isActive = plan.id === value;
          return (
            <button
              className={`${choiceBase} ${isActive ? "border-blue-700 bg-blue-50 text-blue-900" : "border-slate-200 bg-white text-slate-950"}`}
              key={plan.id}
              onClick={() => onChange(plan.id)}
              type="button"
            >
              <strong className="text-[0.88rem] font-bold leading-[1.2]">{plan.label}</strong>
              <em className={`not-italic text-[0.78rem] font-normal ${isActive ? "text-blue-700" : "text-slate-500"}`}>
                {plan.monthlyPrice.toLocaleString("ko-KR")}원/월
              </em>
            </button>
          );
        })}
      </div>
    </div>
  );
}
