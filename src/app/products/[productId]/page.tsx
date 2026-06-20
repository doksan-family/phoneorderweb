import { notFound } from "next/navigation";
import { getProductById } from "@/entities/product/model/mock-products";
import { ProductDetailView } from "@/views/products/ui/ProductDetailView";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
