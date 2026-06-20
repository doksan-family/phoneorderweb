import { notices } from "@/entities/content/model/mock-content";
import { PageHeader } from "@/shared/ui/PageHeader";

export function NoticesView() {
  return (
    <main className="page-main">
      <PageHeader eyebrow="Notice" title="공지사항" description="운영 안내와 상품 상담 관련 공지를 확인합니다." />
      <section className="simple-list simple-list--wide">
        {notices.filter((notice) => notice.visible).map((notice) => (
          <article key={notice.id}>
            <span>{notice.createdAt}</span>
            <strong>{notice.title}</strong>
            <p>{notice.content}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
