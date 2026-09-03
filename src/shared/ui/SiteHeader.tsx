import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { FloatingConsultButton } from "./FloatingConsultButton";
import { SiteNav, SiteNavFallback } from "./SiteNav";

export function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-[100] border-b border-white/15 bg-slate-950/90 shadow-[0_1px_0_rgba(255,255,255,0.08),0_10px_32px_rgba(2,6,23,0.22)] backdrop-blur-xl backdrop-saturate-[1.8] supports-[backdrop-filter]:bg-slate-950/72">
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

      <FloatingConsultButton />
    </>
  );
}
