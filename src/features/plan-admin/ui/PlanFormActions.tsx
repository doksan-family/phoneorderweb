type PlanFormActionsProps = {
  isEdit?: boolean;
  loading: boolean;
  onCancel?: () => void;
};

const btnPrimary =
  "inline-flex min-h-12 items-center justify-center rounded-[10px] border border-transparent bg-[var(--brand-cta)] px-5 text-sm font-extrabold text-white shadow-[0_2px_8px_var(--brand-cta-shadow)] transition hover:bg-[var(--brand-cta-hover)] disabled:cursor-not-allowed disabled:opacity-60";
const btnSecondary =
  "inline-flex min-h-12 items-center justify-center rounded-[10px] border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-700 transition hover:bg-[var(--brand-primary-soft)]";

export function PlanFormActions({
  isEdit,
  loading,
  onCancel,
}: PlanFormActionsProps) {
  const submitLabel = isEdit ? "요금제 수정" : "요금제 등록";

  return (
    <div className="flex justify-end gap-2 max-[560px]:grid">
      {onCancel ? (
        <button className={btnSecondary} type="button" onClick={onCancel}>
          취소
        </button>
      ) : null}
      {/*
        한글 입력 도중 버튼을 누르면 macOS IME가 조합을 확정하며 mousedown을 삼켜
        click 이벤트가 아예 안 뜬다. 살아남는 mouseup으로도 제출을 건다.
        정상 클릭에서는 mouseup과 click이 연달아 오는데, 중복 제출은 훅이 막는다.
      */}
      <button
        className={btnPrimary}
        disabled={loading}
        type="submit"
        onMouseUp={(event) => event.currentTarget.form?.requestSubmit()}
      >
        {loading ? "저장 중..." : submitLabel}
      </button>
    </div>
  );
}
