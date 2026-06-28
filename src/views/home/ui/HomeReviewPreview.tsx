import { reviews } from "@/entities/content/model/mock-content";

export function HomeReviewPreview() {
  return (
    <div className="grid gap-2.5">
      {reviews.filter((review) => review.visible).map((review) => (
        <article className="border border-slate-200 rounded-[10px] p-[18px] bg-white transition hover:border-blue-700" key={review.id}>
          <strong className="block text-[1.08rem] font-extrabold tracking-[-0.3px]">{review.title}</strong>
          <p className="text-slate-500 text-[0.88rem] leading-[1.65]">{review.content}</p>
        </article>
      ))}
    </div>
  );
}
