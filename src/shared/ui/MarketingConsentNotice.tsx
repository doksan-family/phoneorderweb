export function MarketingConsentNotice() {
  return (
    <section className="border border-slate-200 rounded-xl bg-white p-6" aria-labelledby="marketing-title">
      <h2 id="marketing-title" className="m-0 text-[clamp(1.4rem,3vw,2.1rem)] tracking-[-0.5px]">마케팅 수신동의 안내</h2>
      <p className="text-slate-500 text-[0.88rem] leading-[1.65]">
        선택 동의 시 이벤트, 할인, 상담 혜택 안내를 받을 수 있습니다. 동의하지
        않아도 상담 신청과 기본 서비스 이용에는 제한이 없습니다.
      </p>
    </section>
  );
}
