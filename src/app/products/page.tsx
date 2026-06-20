import { ProductsView } from "@/views/products/ui/ProductsView";

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  return <ProductsView categoryId={params.category} />;
}
