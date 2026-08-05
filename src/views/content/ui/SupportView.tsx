import { faqs } from "@/entities/content/model/mock-content";
import { FaqAccordion } from "@/features/faq/ui/FaqAccordion";
import { PageHeader } from "@/shared/ui/PageHeader";
import { SupportContactCards } from "./SupportContactCards";

export function SupportView() {
  return (
    <main className="site-container pt-14 pb-20">
      <PageHeader eyebrow="고객센터" title="무엇을 도와드릴까요?" description="상담 운영 방식과 자주 묻는 질문을 확인하세요." />
      <section className="grid grid-cols-[0.8fr_1.2fr] items-start gap-6 max-[900px]:grid-cols-1">
        <SupportContactCards />
        <div>
          <h2 className="m-0 mb-4 text-[1.05rem] font-extrabold tracking-[-0.02em] text-slate-950">
            자주 묻는 질문
          </h2>
          <FaqAccordion items={faqs.filter((faq) => faq.visible)} />
        </div>
      </section>
    </main>
  );
}
