import type { PublicReview } from "@/entities/review/model/types";
import { ReviewRating } from "@/shared/ui/ReviewRating";

type ReviewTextCardProps = {
  review: PublicReview;
  onOpen: (reviewId: string) => void;
};

/**
 * 이미지가 없는 후기 카드. 자리표시 이미지 대신 후기 문구를 전면에 세운다.
 */
export function ReviewTextCard({ review, onOpen }: ReviewTextCardProps) {
  return (
    <button
      className="brand-card grid content-start gap-2 border-l-4 border-l-[var(--brand-primary-strong)] p-6 text-left"
      type="button"
      onClick={() => onOpen(review.id)}
    >
      <span
        aria-hidden
        className="font-serif text-[2.75rem] leading-[0.6] text-[var(--brand-primary-strong)]/25"
      >
        &ldquo;
      </span>
      <div className="flex items-center justify-between gap-2">
        <ReviewRating
          className="text-[var(--brand-primary-strong)]"
          rating={review.rating}
        />
        <span className="text-[0.72rem] font-bold text-slate-400">
          {review.published_at ?? ""}
        </span>
      </div>
      <h2 className="m-0 text-[1rem] font-extrabold tracking-[-0.02em] text-slate-950">
        {review.title}
      </h2>
      <p className="m-0 line-clamp-5 text-[0.92rem] leading-[1.7] text-slate-600">
        {review.content}
      </p>
      <p className="m-0 mt-1 text-[0.78rem] text-slate-400">
        {review.author_name}
        {review.product_name ? ` · ${review.product_name}` : ""}
      </p>
    </button>
  );
}
