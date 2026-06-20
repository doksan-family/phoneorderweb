import Image from "next/image";
import { reviews } from "@/entities/content/model/mock-content";
import { PageHeader } from "@/shared/ui/PageHeader";

export function ReviewsView() {
  return (
    <main className="page-main">
      <PageHeader eyebrow="Reviews" title="구매후기" description="관리자가 등록한 구매후기를 확인합니다." />
      <section className="content-grid">
        {reviews.filter((review) => review.visible).map((review) => (
          <article className="content-card" key={review.id}>
            <Image alt="" height={160} src={review.imageUrl} width={220} />
            <div>
              <span>{review.createdAt}</span>
              <h2>{review.title}</h2>
              <p>{review.content}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
