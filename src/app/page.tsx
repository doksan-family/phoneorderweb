import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { makeQueryClient } from "@/shared/lib/react-query";
import { bannerQueryOptions } from "@/entities/banner/model/queries";
import { mapPublicProductsToProducts } from "@/entities/product/model/publicProductMapper";
import { productQueryOptions } from "@/entities/product/model/queries";
import { productCategoryQueryOptions } from "@/entities/product/model/categoryQueries";
import { fetchPublicApiBootstrap } from "@/entities/public-api/api/public";
import {
  HOME_REVIEW_PARAMS,
  reviewQueryOptions,
} from "@/entities/review/model/queries";
import { siteSettingsQueryOptions } from "@/entities/site-settings/model/queries";
import { HomeView } from "@/views/home";

export default async function Page() {
  const queryClient = makeQueryClient();

  // 배너·상품·카테고리·사이트설정을 bootstrap 한 번으로 받아 캐시를 미리 채운다.
  // Edge Function 내부에서 병렬 실행되므로 4번 따로 부르는 것보다 왕복이 준다.
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
  queryClient.setQueryData(
    productCategoryQueryOptions.publicList("main_menu").queryKey,
    bootstrap.categories.items.filter((category) => category.show_in_main_menu)
  );
  queryClient.setQueryData(
    siteSettingsQueryOptions.public().queryKey,
    bootstrap.site_settings
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeView />
    </HydrationBoundary>
  );
}
