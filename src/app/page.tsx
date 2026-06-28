import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { makeQueryClient } from "@/shared/lib/react-query";
import { bannerQueryOptions } from "@/entities/banner/model/queries";
import { HomeView } from "@/views/home";

export default async function Page() {
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery(bannerQueryOptions.list("main"));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeView />
    </HydrationBoundary>
  );
}
