import { faqs } from "@/entities/content/model/mock-content";
import { FaqAccordion } from "@/features/faq/ui/FaqAccordion";
import { PageHeader } from "@/shared/ui/PageHeader";

export function SupportView() {
  return (
    <main className="page-main">
      <PageHeader eyebrow="Support" title="고객센터 및 FAQ" description="상담 운영 방식과 자주 묻는 질문을 확인합니다." />
      <section className="support-layout">
        <div className="notice-box">
          <h2>고객센터</h2>
          <p>전화 02-0000-0000</p>
          <p>운영 시간 평일 10:00 - 19:00</p>
        </div>
        <FaqAccordion items={faqs.filter((faq) => faq.visible)} />
      </section>
    </main>
  );
}
