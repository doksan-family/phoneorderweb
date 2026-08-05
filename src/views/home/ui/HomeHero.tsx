import Link from "next/link";
import { HomeHeroBanner } from "./HomeHeroBanner";

const trustChips = ["무료상담", "사은품 증정", "전국 당일발송"];

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
      <div className="site-container relative z-[1] grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-12 py-14 max-[900px]:grid-cols-1 max-[900px]:gap-8 max-[900px]:py-10">
        <div>
          <span className="brand-pill border border-[rgba(173,255,79,0.45)] bg-[rgba(173,255,79,0.14)] px-[13px] py-1.5 text-[0.76rem] text-[var(--brand-accent)]">
            역대급 특가 이벤트 진행중
          </span>
          <h1 className="m-0 mt-[18px] text-[clamp(1.9rem,4vw,2.9rem)] font-extrabold leading-[1.25] tracking-[-0.02em] text-white">
            핸드폰도 인터넷도
            <br />핵 싸게, <span className="text-[var(--brand-accent)]">핵 쉽게</span>
          </h1>
          <p className="mt-3.5 text-[0.95rem] leading-[1.6] text-slate-400">
            삼성·애플 최신폰부터 키즈폰, 인터넷+TV 결합까지
            <br />
            실시간 최저가를 바로 확인하세요
          </p>
          <div className="mt-6 flex gap-2.5 max-[560px]:flex-col">
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
          <ul className="m-0 mt-[22px] flex list-none flex-wrap gap-4 p-0">
            {trustChips.map((chip) => (
              <li className="flex items-center gap-1.5 text-[0.8rem] font-semibold text-slate-400" key={chip}>
                <span aria-hidden className="text-[var(--brand-accent)]">✓</span>
                {chip}
              </li>
            ))}
          </ul>
        </div>
        <HomeHeroBanner />
      </div>
    </section>
  );
}
