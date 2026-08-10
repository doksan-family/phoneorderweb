type ReviewRatingProps = {
  className?: string;
  rating: number;
};

const MAX_RATING = 5;

/** 별 색은 currentColor를 따르므로 색상은 호출부 className으로 정한다. */
export function ReviewRating({ className, rating }: ReviewRatingProps) {
  const filled = Math.max(0, Math.min(MAX_RATING, Math.round(rating)));

  return (
    <p
      aria-label={`별점 ${filled}점 (5점 만점)`}
      className={`m-0 text-[0.8rem] tracking-[0.1em] ${className ?? ""}`}
    >
      <span aria-hidden>{"★".repeat(filled)}</span>
      <span aria-hidden className="opacity-30">
        {"★".repeat(MAX_RATING - filled)}
      </span>
    </p>
  );
}
