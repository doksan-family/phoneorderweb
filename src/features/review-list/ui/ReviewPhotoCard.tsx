import Image from "next/image";
import type { PublicReview } from "@/entities/review/model/types";
import { ReviewRating } from "@/shared/ui/ReviewRating";

type ReviewPhotoCardProps = {
  review: PublicReview;
  /** 첫 줄 카드는 화면에 바로 보이므로 이미지를 지연 없이 받는다. */
  priority?: boolean;
  onOpen: (reviewId: string) => void;
};

/** 대표 이미지를 상단에 얹는 포토 후기 카드. */
export function ReviewPhotoCard({
  review,
  priority = false,
  onOpen,
}: ReviewPhotoCardProps) {
  const cover = review.images[0];

  return (
    <button
      className="brand-card grid overflow-hidden text-left"
      type="button"
      onClick={() => onOpen(review.id)}
    >
      <div className="relative h-[170px] w-full bg-slate-100">
        <Image
          alt={cover?.alt ?? ""}
          className="object-cover"
          fill
          priority={priority}
          sizes="(max-width: 900px) 92vw, 30vw"
          src={cover?.image_url ?? ""}
        />
      </div>
      <div className="p-[18px]">
        <span className="text-[0.72rem] font-bold text-[var(--brand-primary-strong)]">
          {review.published_at ?? ""}
        </span>
        <h2 className="m-0 mt-1 text-[1rem] font-extrabold tracking-[-0.02em] text-slate-950">
          {review.title}
        </h2>
        <ReviewRating
          className="mt-1 text-[var(--brand-primary-strong)]"
          rating={review.rating}
        />
        <p className="m-0 mt-1.5 line-clamp-3 text-[0.86rem] leading-[1.6] text-slate-500">
          {review.content}
        </p>
        <p className="m-0 mt-3 text-[0.78rem] text-slate-400">
          {review.author_name}
          {review.product_name ? ` · ${review.product_name}` : ""}
        </p>
      </div>
    </button>
  );
}
