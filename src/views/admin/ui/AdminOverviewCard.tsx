import type { ReactNode } from "react";

type AdminOverviewCardProps = {
  title: string;
  /** 제목 오른쪽 보조 문구(건수, 기간 등) */
  meta?: string;
  /** 항목이 하나도 없을 때 대신 보여줄 문구 */
  emptyMessage?: string;
  isEmpty?: boolean;
  children: ReactNode;
};

export function AdminOverviewCard({
  title,
  meta,
  emptyMessage,
  isEmpty = false,
  children,
}: AdminOverviewCardProps) {
  return (
    <section className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5">
      <header className="mb-3.5 flex items-baseline justify-between gap-3">
        <h3 className="m-0 text-sm font-extrabold tracking-[-0.01em] text-slate-950">
          {title}
        </h3>
        {meta ? (
          <span className="shrink-0 text-[0.75rem] font-bold text-slate-400">
            {meta}
          </span>
        ) : null}
      </header>
      {isEmpty ? (
        <p className="m-0 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-[0.82rem] font-bold text-slate-400">
          {emptyMessage}
        </p>
      ) : (
        children
      )}
    </section>
  );
}
