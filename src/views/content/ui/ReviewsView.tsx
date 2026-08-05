import Image from "next/image";
import { reviews } from "@/entities/content/model/mock-content";
import { PageHeader } from "@/shared/ui/PageHeader";

export function ReviewsView() {
  return (
    <main className="site-container pt-14 pb-20">
      <PageHeader eyebrow="구매 후기" title="먼저 개통한 고객님들 이야기" description="실제 상담을 통해 개통한 고객분들이 남겨주신 후기입니다." />
      <section className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-1">
        {reviews.filter((review) => review.visible).map((review) => (
          <article className="brand-card grid overflow-hidden" key={review.id}>
            <Image
              alt=""
              height={160}
              src={review.imageUrl}
              width={220}
              className="h-[170px] w-full bg-slate-100 object-cover"
            />
            <div className="p-[18px]">
              <span className="text-[0.72rem] font-bold text-[var(--brand-primary-strong)]">
                {review.createdAt}
              </span>
              <h2 className="m-0 mt-1 text-[1rem] font-extrabold tracking-[-0.02em] text-slate-950">
                {review.title}
              </h2>
              <p className="m-0 mt-1.5 text-[0.86rem] leading-[1.6] text-slate-500">
                {review.content}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
