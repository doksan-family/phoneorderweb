import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { reviewQueryOptions } from "@/entities/review/model/queries";
import { makeQueryClient } from "@/shared/lib/react-query";
import { ReviewsView } from "@/views/content/ui/ReviewsView";

export default async function ReviewsPage() {
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery(reviewQueryOptions.publicList());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReviewsView />
    </HydrationBoundary>
  );
}
