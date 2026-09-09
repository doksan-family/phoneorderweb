const steps = [
  { title: "기본 정보", description: "상품명 · 이미지" },
  { title: "판매 옵션", description: "용량 · 색상 · 할부" },
  { title: "요금 조건", description: "지원금 · 월 납부금" },
];

type ProductFormStepsProps = {
  step: number;
  disabled: boolean;
  onChange: (step: number) => void;
};

export function ProductFormSteps({ step, disabled, onChange }: ProductFormStepsProps) {
  return (
    <nav aria-label="상품 입력 단계" className="sticky -top-5 z-10 -mx-5 grid grid-cols-3 gap-2 border-b border-slate-200 bg-white p-3 sm:p-5">
      {steps.map((item, index) => (
        <button
          key={item.title}
          type="button"
          data-step-button={index}
          aria-current={step === index ? "step" : undefined}
          disabled={disabled}
          onClick={() => onChange(index)}
          className={`min-w-0 rounded-lg border p-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${step === index ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"}`}
        >
          <span className="block text-sm font-bold">{index + 1}. {item.title}</span>
          <span className="mt-1 hidden text-xs opacity-75 sm:block">{item.description}</span>
        </button>
      ))}
    </nav>
  );
}
