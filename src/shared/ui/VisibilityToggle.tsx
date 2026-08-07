"use client";

type VisibilityToggleProps = {
  active: boolean;
  /** 스크린리더용 설명. 예: "갤럭시 Z 폴드 8 노출" */
  label: string;
  disabled?: boolean;
  onChange: (next: boolean) => void;
};

/** 노출 상태를 보여주면서 그대로 바꾸는 스위치. 뱃지 + 버튼 조합을 대체한다. */
export function VisibilityToggle({
  active,
  label,
  disabled,
  onChange,
}: VisibilityToggleProps) {
  return (
    <button
      aria-checked={active}
      aria-label={label}
      className="group inline-flex shrink-0 cursor-pointer items-center gap-2 border-0 bg-transparent p-0 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={disabled}
      role="switch"
      type="button"
      onClick={() => onChange(!active)}
    >
      <span
        className={`relative h-6 w-11 rounded-full transition-colors ${
          active ? "bg-[var(--brand-primary-strong)]" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-all ${
            active ? "left-[22px]" : "left-0.5"
          }`}
        />
      </span>
      <span
        className={`text-[0.8rem] font-bold ${
          active ? "text-slate-700" : "text-slate-400"
        }`}
      >
        {active ? "노출" : "숨김"}
      </span>
    </button>
  );
}
