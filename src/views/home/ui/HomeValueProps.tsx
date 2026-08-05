const valueProps = [
  {
    icon: "💰",
    title: "투명한 실구매가",
    desc: "공시지원금·선택약정 조건을 상담사가 비교해서 안내해드려요"
  },
  {
    icon: "⚡",
    title: "빠른 개통",
    desc: "신청부터 개통까지 최대한 빠르게 진행해드립니다"
  },
  {
    icon: "🛡️",
    title: "안심 사후관리",
    desc: "개통 후 궁금한 점도 고객센터에서 끝까지 챙겨드려요"
  }
];

export function HomeValueProps() {
  return (
    <section className="mt-[72px] bg-slate-100 py-12 max-[560px]:mt-10 max-[560px]:py-8">
      <div className="site-container grid grid-cols-3 gap-3.5 max-[900px]:grid-cols-1">
        {valueProps.map((prop) => (
          <article
            className="flex items-center gap-4 rounded-2xl bg-white p-5"
            key={prop.title}
          >
            <span aria-hidden className="shrink-0 text-[1.65rem]">
              {prop.icon}
            </span>
            <div>
              <strong className="block text-[0.98rem] font-extrabold text-slate-950">
                {prop.title}
              </strong>
              <p className="m-0 mt-1 text-[0.82rem] leading-[1.5] text-slate-500">
                {prop.desc}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
