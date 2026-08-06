import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { productQueryOptions } from "@/entities/product/model/queries";
import { makeQueryClient } from "@/shared/lib/react-query";
import { ProductsView } from "@/views/products/ui/ProductsView";

type ProductsPageProps = {
  searchParams: Promise<{
    brand?: string;
    category?: string;
    deal?: string;
    featured?: string;
    limit?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const categoryId = params.category;
  const brandId = params.brand;
  const featured = getFeaturedParam(params.featured, params.deal);
  const limit = getLimitParam(params.limit);

  // 목록을 서버에서 미리 받아둬야 첫 HTML에 <img>가 담기고 이미지 로딩이 바로 시작된다.
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery(
    productQueryOptions.publicList({ category: categoryId, featured, limit })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsView
        brandId={brandId}
        categoryId={categoryId}
        featured={featured}
        limit={limit}
      />
    </HydrationBoundary>
  );
}

function getFeaturedParam(featured?: string, deal?: string) {
  if (deal === "hot") return true;
  if (featured === "true") return true;
  if (featured === "false") return false;
  return undefined;
}

function getLimitParam(limit?: string) {
  if (!limit) return undefined;
  const parsedLimit = Number.parseInt(limit, 10);
  return Number.isFinite(parsedLimit) && parsedLimit > 0
    ? parsedLimit
    : undefined;
}

