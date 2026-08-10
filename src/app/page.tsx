import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { makeQueryClient } from "@/shared/lib/react-query";
import { bannerQueryOptions } from "@/entities/banner/model/queries";
import { productQueryOptions } from "@/entities/product/model/queries";
import {
  HOME_REVIEW_PARAMS,
  reviewQueryOptions,
} from "@/entities/review/model/queries";
import { HomeView } from "@/views/home";

export default async function Page() {
  const queryClient = makeQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(bannerQueryOptions.list("main")),
    queryClient.prefetchQuery(bannerQueryOptions.list("event")),
    // 홈 상품 그리드도 서버에서 채워야 카드 이미지가 즉시 로딩된다.
    queryClient.prefetchQuery(productQueryOptions.publicList({})),
    queryClient.prefetchQuery(reviewQueryOptions.publicList(HOME_REVIEW_PARAMS)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeView />
    </HydrationBoundary>
  );
}
