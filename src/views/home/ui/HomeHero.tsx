import Link from "next/link";
import { HomeHeroBanner } from "./HomeHeroBanner";

export function HomeHero() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-56 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(173,255,79,0.2), transparent 70%)"
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-56 -left-40 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(173,255,79,0.22), transparent 70%)"
        }}
      />
      <div className="site-container relative z-[1] grid gap-8 py-14 max-[900px]:gap-6 max-[900px]:py-10">
        <HomeHeroBanner />
        {/* 히어로 문구(이벤트 뱃지, 제목, 설명, 신뢰 칩)는 확정 전까지 비워 둔다. */}
        <div className="flex gap-2.5 max-[560px]:flex-col">
          <Link
            className="inline-flex flex-1 items-center justify-center rounded-[14px] bg-[var(--brand-primary)] px-6 py-[15px] text-[0.95rem] font-bold text-slate-950 transition hover:bg-[var(--brand-primary-hover)]"
            href="/consultation"
          >
            실시간 특가 상담받기
          </Link>
          <Link
            className="inline-flex flex-1 items-center justify-center rounded-[14px] border border-white/30 px-6 py-[15px] text-[0.95rem] font-bold text-white transition hover:bg-white/10"
            href="/products?category=special"
          >
            특가 상품 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
