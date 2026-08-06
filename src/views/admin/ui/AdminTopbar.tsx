import Link from "next/link";

type AdminTopbarProps = {
  onLogout: () => void;
};

const secondaryActionClass =
  "inline-flex min-h-9 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-bold text-slate-700 transition hover:bg-[var(--brand-primary-soft)] hover:text-slate-950";

export function AdminTopbar({ onLogout }: AdminTopbarProps) {
  return (
    <header className="flex min-h-[78px] items-center justify-between gap-6 border-b border-slate-200 bg-white px-8 max-[900px]:min-h-0 max-[900px]:px-5 max-[900px]:py-4 max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-3.5">
      <div />
      <div className="flex items-center gap-3 max-[560px]:w-full max-[560px]:flex-wrap max-[560px]:justify-between">
        <Link className={secondaryActionClass} href="/">
          사이트 보기
        </Link>
        <button className={secondaryActionClass} onClick={onLogout} type="button">
          로그아웃
        </button>
        <div className="grid gap-0.5 text-right max-[560px]:hidden">
          <span className="text-sm font-extrabold text-slate-950">관리자</span>
          <strong className="text-[0.68rem] tracking-[0.04em] text-slate-400">
            ADMIN
          </strong>
        </div>
        <span
          className="inline-flex h-9.5 w-9.5 items-center justify-center rounded-full bg-zinc-800 text-sm font-black text-white"
          aria-hidden="true"
        >
          관
        </span>
      </div>
    </header>
  );
}
