type ProductFormActionsProps = {
  loading: boolean;
  onCancel?: () => void;
};

const btnPrimary =
  "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-[10px] border border-transparent bg-[var(--brand-primary)] px-5 text-sm font-extrabold text-slate-950 shadow-[0_2px_8px_var(--brand-primary-shadow)] transition hover:bg-[var(--brand-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60";
const btnSecondary =
  "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-[10px] border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-700 transition hover:border-slate-950";

export function ProductFormActions({
  loading,
  onCancel,
}: ProductFormActionsProps) {
  return (
    <div className="flex justify-end gap-2 max-[560px]:grid">
      {onCancel ? (
        <button className={btnSecondary} type="button" onClick={onCancel}>
          취소
        </button>
      ) : null}
      <button className={btnPrimary} disabled={loading} type="submit">
        {loading ? "등록 중..." : "상품 등록"}
      </button>
    </div>
  );
}
