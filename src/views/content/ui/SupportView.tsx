import { PageHeader } from "@/shared/ui/PageHeader";
import { SupportContactCards } from "./SupportContactCards";
import { SupportFaqSection } from "./SupportFaqSection";

export function SupportView() {
  return (
    <main className="site-container pt-14 pb-20">
      <PageHeader eyebrow="고객센터" title="무엇을 도와드릴까요?" description="상담 운영 방식과 자주 묻는 질문을 확인하세요." />
      <section className="grid grid-cols-[0.8fr_1.2fr] items-start gap-6 max-[900px]:grid-cols-1">
        <SupportContactCards />
        <SupportFaqSection />
      </section>
    </main>
  );
}
