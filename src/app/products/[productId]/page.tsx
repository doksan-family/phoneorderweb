import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import { fetchPublicProductDetail } from "@/entities/product/api/public";
import { getProductById } from "@/entities/product/model/mock-products";
import { productQueryOptions } from "@/entities/product/model/queries";
import { makeQueryClient } from "@/shared/lib/react-query";
import { SITE_URL } from "@/shared/config/site";
import { ProductDetailView } from "@/views/products/ui/ProductDetailView";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { productId } = await params;
  const detail = await fetchPublicProductDetail(productId).catch(() => null);
  if (!detail) return {};

  const title = `${detail.brand} ${detail.name}`;
  const description =
    detail.summary ?? `${detail.brand} ${detail.name} 최저가 상담을 확인하세요.`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${productId}` },
    openGraph: {
      title,
      description,
      images: detail.representative_image_url
        ? [{ url: detail.representative_image_url }]
        : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = getProductById(productId);

  // 대표 이미지가 첫 HTML에 포함되도록 상세도 서버에서 미리 받는다.
  const queryClient = makeQueryClient();
  const detail = await queryClient.fetchQuery(
    productQueryOptions.publicDetail(productId)
  );

  const price = detail.product.salePrice;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {price > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: `${detail.product.brand} ${detail.product.name}`,
              image: [detail.product.imageUrl],
              description: detail.product.summary,
              brand: { "@type": "Brand", name: detail.product.brand },
              offers: {
                "@type": "Offer",
                url: `${SITE_URL}/products/${productId}`,
                priceCurrency: "KRW",
                price,
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
      ) : null}
      <ProductDetailView initialProduct={product ?? null} productId={productId} />
    </HydrationBoundary>
  );
}
