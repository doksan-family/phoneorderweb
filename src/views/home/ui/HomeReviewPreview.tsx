import { reviews } from "@/entities/content/model/mock-content";

export function HomeReviewPreview() {
  return (
    <div className="grid grid-cols-2 gap-3 max-[900px]:grid-cols-1">
      {reviews.filter((review) => review.visible).map((review) => (
        <article
          className="rounded-2xl border border-slate-200 bg-slate-50 p-[18px] transition hover:bg-[var(--brand-primary-soft)]"
          key={review.id}
        >
          <strong className="block text-[1rem] font-extrabold tracking-[-0.02em] text-slate-950">
            {review.title}
          </strong>
          <p className="m-0 mt-2 text-[0.86rem] leading-[1.55] text-slate-700">
            {review.content}
          </p>
          <p className="m-0 mt-3 text-[0.75rem] font-bold text-[var(--brand-primary-strong)]">
            {review.createdAt}
          </p>
        </article>
      ))}
    </div>
  );
}
