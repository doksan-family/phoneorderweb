import Link from "next/link";

export function HomeCtaBand() {
  return (
    <section className="mt-[72px] bg-slate-950 py-14 text-center max-[560px]:mt-10 max-[560px]:py-10">
      <div className="site-container">
        <h2 className="m-0 text-[clamp(1.35rem,3vw,1.9rem)] font-extrabold tracking-[-0.02em] text-white">
          최저가, 지금 상담받고 확인하세요
        </h2>
        <p className="mx-auto mt-2.5 max-w-[520px] text-[0.9rem] leading-[1.55] text-slate-400">
          가입 조건 확인부터 개통까지 상담사가 도와드립니다
        </p>
        <Link
          className="mt-[22px] inline-flex items-center justify-center rounded-[14px] bg-[var(--brand-accent)] px-[30px] py-[15px] text-[0.92rem] font-extrabold text-slate-950 transition hover:brightness-105"
          href="/consultation"
        >
          무료 상담 신청하기
        </Link>
      </div>
    </section>
  );
}
