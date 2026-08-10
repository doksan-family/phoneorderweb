import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { customerCenterQueryOptions } from "@/entities/content/model/queries";
import { makeQueryClient } from "@/shared/lib/react-query";
import { SupportView } from "@/views/content/ui/SupportView";

export default async function SupportPage() {
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery(customerCenterQueryOptions.faqs());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SupportView />
    </HydrationBoundary>
  );
}
