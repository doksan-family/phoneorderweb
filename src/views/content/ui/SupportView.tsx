import { faqs } from "@/entities/content/model/mock-content";
import { FaqAccordion } from "@/features/faq/ui/FaqAccordion";
import { PageHeader } from "@/shared/ui/PageHeader";

export function SupportView() {
  return (
    <main className="w-[min(1120px,calc(100%-40px))] mx-auto pt-14 pb-20 max-[560px]:w-[calc(100%-28px)]">
      <PageHeader eyebrow="Support" title="고객센터 및 FAQ" description="상담 운영 방식과 자주 묻는 질문을 확인합니다." />
      <section className="grid grid-cols-[0.8fr_1.2fr] gap-6 items-start max-[900px]:grid-cols-1">
        <div className="border border-slate-200 rounded-xl bg-white p-6">
          <h2 className="m-0 text-[clamp(1.4rem,3vw,2.1rem)] tracking-[-0.5px]">고객센터</h2>
          <p className="text-slate-500 text-[0.88rem] leading-[1.65]">전화 02-0000-0000</p>
          <p className="text-slate-500 text-[0.88rem] leading-[1.65]">운영 시간 평일 10:00 - 19:00</p>
        </div>
        <FaqAccordion items={faqs.filter((faq) => faq.visible)} />
      </section>
    </main>
  );
}
