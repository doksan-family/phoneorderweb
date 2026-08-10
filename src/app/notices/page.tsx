import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { customerCenterQueryOptions } from "@/entities/content/model/queries";
import { makeQueryClient } from "@/shared/lib/react-query";
import { NoticesView } from "@/views/content/ui/NoticesView";

export default async function NoticesPage() {
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery(customerCenterQueryOptions.notices());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoticesView />
    </HydrationBoundary>
  );
}
