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
        <div className="grid gap-3 max-[560px]:gap-2.5">
          <p className="m-0 text-[0.8rem] font-bold tracking-[0.02em] text-[var(--brand-primary)]">
            실시간 최저가 상담
          </p>
          <h1 className="m-0 text-[clamp(1.7rem,4vw,2.6rem)] font-extrabold leading-[1.2] tracking-[-0.02em] text-white">
            핸드폰도 인터넷도, 핵 싸게
          </h1>
          <p className="m-0 max-w-[560px] text-[0.95rem] leading-[1.6] text-slate-300">
            삼성·애플 최신폰부터 키즈폰, 인터넷+TV 결합까지 — 결제 없이 상담으로
            실구매가를 확인하세요.
          </p>
        </div>
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
