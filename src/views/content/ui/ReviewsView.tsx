import Image from "next/image";
import { reviews } from "@/entities/content/model/mock-content";
import { PageHeader } from "@/shared/ui/PageHeader";

export function ReviewsView() {
  return (
    <main className="w-[min(1120px,calc(100%-40px))] mx-auto pt-14 pb-20 max-[560px]:w-[calc(100%-28px)]">
      <PageHeader eyebrow="Reviews" title="구매후기" description="관리자가 등록한 구매후기를 확인합니다." />
      <section className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
        {reviews.filter((review) => review.visible).map((review) => (
          <article className="border border-slate-200 rounded-xl bg-white grid overflow-hidden" key={review.id}>
            <Image alt="" height={160} src={review.imageUrl} width={220} className="w-full h-[170px] object-cover bg-slate-100" />
            <div className="p-[18px]">
              <span className="text-blue-700 text-[0.75rem] font-bold uppercase tracking-[0.5px]">{review.createdAt}</span>
              <h2 className="m-0 text-[1.08rem] font-extrabold tracking-[-0.3px]">{review.title}</h2>
              <p className="text-slate-500 text-[0.88rem] leading-[1.65]">{review.content}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
