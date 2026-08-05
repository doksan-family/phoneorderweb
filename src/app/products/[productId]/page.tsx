import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getProductById } from "@/entities/product/model/mock-products";
import { productQueryOptions } from "@/entities/product/model/queries";
import { makeQueryClient } from "@/shared/lib/react-query";
import { ProductDetailView } from "@/views/products/ui/ProductDetailView";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = getProductById(productId);

  // 대표 이미지가 첫 HTML에 포함되도록 상세도 서버에서 미리 받는다.
  const queryClient = makeQueryClient();
  await queryClient.prefetchQuery(productQueryOptions.publicDetail(productId));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailView initialProduct={product ?? null} productId={productId} />
    </HydrationBoundary>
  );
}
