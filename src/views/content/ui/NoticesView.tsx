import { notices } from "@/entities/content/model/mock-content";
import { PageHeader } from "@/shared/ui/PageHeader";

export function NoticesView() {
  return (
    <main className="w-[min(1120px,calc(100%-40px))] mx-auto pt-14 pb-20 max-[560px]:w-[calc(100%-28px)]">
      <PageHeader eyebrow="Notice" title="공지사항" description="운영 안내와 상품 상담 관련 공지를 확인합니다." />
      <section className="grid gap-2.5 max-w-[820px]">
        {notices.filter((notice) => notice.visible).map((notice) => (
          <article className="border border-slate-200 rounded-[10px] p-[18px] bg-white transition hover:border-blue-700" key={notice.id}>
            <span className="text-blue-700 text-[0.75rem] font-bold uppercase tracking-[0.5px]">{notice.createdAt}</span>
            <strong className="block mt-1 text-[1.08rem] font-extrabold tracking-[-0.3px]">{notice.title}</strong>
            <p className="text-slate-500 text-[0.88rem] leading-[1.65]">{notice.content}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
