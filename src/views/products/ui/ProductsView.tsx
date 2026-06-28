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
    <main className="w-[min(1120px,calc(100%-40px))] mx-auto pt-14 pb-20 max-[560px]:w-[calc(100%-28px)]">
      <section className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[900px]:gap-2.5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
