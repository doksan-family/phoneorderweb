import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { makeQueryClient } from "@/shared/lib/react-query";
import { bannerQueryOptions } from "@/entities/banner/model/queries";
import { mapPublicProductsToProducts } from "@/entities/product/model/publicProductMapper";
import { productQueryOptions } from "@/entities/product/model/queries";
import { fetchPublicApiBootstrap } from "@/entities/public-api/api/public";
import {
  HOME_REVIEW_PARAMS,
  reviewQueryOptions,
} from "@/entities/review/model/queries";
import { HomeView } from "@/views/home";

export default async function Page() {
  const queryClient = makeQueryClient();

  // 배너·상품을 bootstrap 한 번으로 받아 캐시를 미리 채운다.
  // 카테고리·사이트설정은 모든 라우트에 공통인 layout.tsx가 이미 prefetch하므로
  // 여기서 다시 요청하면 같은 데이터를 중복으로 받게 된다.
  const [bootstrap] = await Promise.all([
    fetchPublicApiBootstrap(),
    queryClient.prefetchQuery(reviewQueryOptions.publicList(HOME_REVIEW_PARAMS)),
  ]);

  queryClient.setQueryData(
    bannerQueryOptions.list("main").queryKey,
    bootstrap.banners.main
  );
  queryClient.setQueryData(
    bannerQueryOptions.list("event").queryKey,
    bootstrap.banners.event
  );
  queryClient.setQueryData(
    productQueryOptions.publicList({}).queryKey,
    mapPublicProductsToProducts(bootstrap.products)
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeView />
    </HydrationBoundary>
  );
}
