import { notices } from "@/entities/content/model/mock-content";
import { PageHeader } from "@/shared/ui/PageHeader";

export function NoticesView() {
  return (
    <main className="site-container pt-14 pb-20">
      <PageHeader eyebrow="공지사항" title="운영 안내 및 공지" description="운영 안내와 상품 상담 관련 공지를 확인합니다." />
      <section className="grid max-w-[820px] gap-3">
        {notices.filter((notice) => notice.visible).map((notice) => (
          <article
            className="brand-card p-[18px] transition hover:bg-[var(--brand-primary-soft)] hover:shadow-[0_10px_28px_rgba(21,24,15,0.07)]"
            key={notice.id}
          >
            <span className="text-[0.72rem] font-bold text-[var(--brand-primary-strong)]">
              {notice.createdAt}
            </span>
            <strong className="mt-1 block text-[1rem] font-extrabold tracking-[-0.02em] text-slate-950">
              {notice.title}
            </strong>
            <p className="m-0 mt-1.5 text-[0.86rem] leading-[1.6] text-slate-500">
              {notice.content}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
