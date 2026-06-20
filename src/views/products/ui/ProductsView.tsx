import { getVisibleProducts } from "@/entities/product/model/mock-products";
import { ProductCard } from "@/shared/ui/ProductCard";

type ProductsViewProps = {
  categoryId?: string;
};

export function ProductsView({ categoryId }: ProductsViewProps) {
  const products = getVisibleProducts().filter((product) => {
    return categoryId ? product.categoryId === categoryId : true;
  });

  return (
    <main className="page-main">
      <section className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
