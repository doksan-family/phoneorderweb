import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPublicProductDetail } from "@/entities/product/api/public";
import { getProductById } from "@/entities/product/model/mock-products";
import { productQueryOptions } from "@/entities/product/model/queries";
import type {
  Product,
  ProductDetailProfile,
} from "@/entities/product/model/types";
import { ApiError } from "@/shared/api/client";
import { makeQueryClient } from "@/shared/lib/react-query";
import { SITE_URL } from "@/shared/config/site";
import { ProductDetailView } from "@/views/products/ui/ProductDetailView";

/** 없는 상품(404)이거나 잘못된 ID(400)면 진짜 404로 처리한다. */
function isMissing(error: unknown): boolean {
  return (
    error instanceof ApiError && (error.status === 404 || error.status === 400)
  );
}

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
  let detail: { product: Product; profile: ProductDetailProfile } | null = null;
  try {
    detail = await queryClient.fetchQuery(
      productQueryOptions.publicDetail(productId)
    );
  } catch (error) {
    if (isMissing(error) && !product) notFound();
    if (!product) throw error;
  }

  const price = detail?.product.releasePrice ?? 0;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {detail && price > 0 ? (
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
