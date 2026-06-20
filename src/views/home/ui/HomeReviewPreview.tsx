import { reviews } from "@/entities/content/model/mock-content";

export function HomeReviewPreview() {
  return (
    <div className="simple-list">
      {reviews.filter((review) => review.visible).map((review) => (
        <article key={review.id}>
          <strong>{review.title}</strong>
          <p>{review.content}</p>
        </article>
      ))}
    </div>
  );
}
