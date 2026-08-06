import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { SiteNav, SiteNavFallback } from "./SiteNav";

export function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-[100] border-b border-white/50 bg-white/90 shadow-[0_1px_0_rgba(233,236,226,0.9),0_10px_32px_rgba(21,24,15,0.06)] backdrop-blur-xl backdrop-saturate-[1.8] supports-[backdrop-filter]:bg-white/60">
        <div className="site-container flex min-h-[60px] items-center justify-between gap-4 py-2.5">
          <Link className="relative block h-10 w-28 shrink-0" href="/" aria-label="핵폰 홈">
            <Image
              alt="핵폰"
              className="object-contain object-left"
              fill
              priority
              sizes="112px"
              src="/images/logo/hack_phone_logo_2.png"
            />
          </Link>
          <Link
            className="brand-pill shrink-0 px-4 py-2.5 text-[0.82rem] bg-[var(--brand-cta)] text-white shadow-[0_2px_8px_var(--brand-cta-shadow)] transition hover:bg-[var(--brand-cta-hover)]"
            href="/consultation"
          >
            상담 신청
          </Link>
        </div>
        <nav aria-label="주요 메뉴">
          <Suspense fallback={<SiteNavFallback />}>
            <SiteNav />
          </Suspense>
        </nav>
      </header>

      <div
        className="fixed bottom-7 right-5 z-[200] flex flex-col items-end gap-2.5 max-[900px]:bottom-4 max-[900px]:right-3"
        role="complementary"
        aria-label="빠른 상담"
      >
        <a
          className="brand-pill h-[46px] gap-2 bg-[var(--kakao)] px-5 text-[0.85rem] font-extrabold text-[var(--kakao-label)] shadow-[0_10px_28px_rgba(21,24,15,0.28)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(21,24,15,0.38)]"
          href="/consultation"
        >
          <MessageCircle size={18} aria-hidden="true" />
          <span className="max-[560px]:hidden">카카오 상담</span>
        </a>
      </div>
    </>
  );
}
