import { subscriptionTypeLabel } from "@/shared/config/subscription";

type SubscriptionToggleProps = {
  options: string[];
  value: string;
  onChange: (next: string) => void;
};

/** 요금제 카드 상단에서 번호이동/기기변경 등 가입유형 하나를 고르는 세그먼트 토글. */
export function SubscriptionToggle({
  options,
  value,
  onChange,
}: SubscriptionToggleProps) {
  if (options.length <= 1) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((option) => (
        <button
          aria-pressed={value === option}
          className={`min-h-8 rounded-md border px-3 text-[0.76rem] font-bold transition ${
            value === option
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
          key={option}
          type="button"
          onClick={() => onChange(option)}
        >
          {subscriptionTypeLabel(option)}
        </button>
      ))}
    </div>
  );
}
