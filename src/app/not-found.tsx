import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div className="grid max-w-md gap-3 justify-items-center">
        <p className="m-0 text-sm font-bold text-[var(--brand-primary-strong)]">404</p>
        <p className="m-0 text-2xl font-black text-slate-950">페이지를 찾을 수 없습니다</p>
        <p className="m-0 text-sm leading-relaxed text-slate-500">
          주소가 바뀌었거나 삭제된 페이지일 수 있습니다.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center justify-center min-h-[48px] rounded-[10px] px-[22px] font-bold text-[0.95rem] transition-all bg-[var(--brand-cta)] text-white shadow-[0_2px_8px_var(--brand-cta-shadow)] hover:bg-[var(--brand-cta-hover)]"
        >
          홈으로 가기
        </Link>
      </div>
    </main>
  );
}
