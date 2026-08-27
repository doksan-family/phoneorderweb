"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div className="grid max-w-md gap-3 justify-items-center">
        <p className="m-0 text-2xl font-black text-slate-950">
          일시적인 오류가 발생했습니다
        </p>
        <p className="m-0 text-sm leading-relaxed text-slate-500">
          잠시 후 다시 시도해 주세요. 문제가 계속되면 고객센터로 문의해 주세요.
        </p>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center min-h-[48px] rounded-[10px] px-[22px] font-bold text-[0.95rem] transition-all bg-[var(--brand-cta)] text-white shadow-[0_2px_8px_var(--brand-cta-shadow)] hover:bg-[var(--brand-cta-hover)]"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center min-h-[48px] rounded-[10px] px-[22px] font-bold text-[0.95rem] transition-all border border-slate-200 bg-white text-slate-700 hover:bg-[var(--brand-primary-soft)]"
          >
            홈으로 가기
          </Link>
        </div>
      </div>
    </main>
  );
}
