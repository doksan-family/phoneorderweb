import { VisibleProductGrid } from "@/features/product-list/ui/VisibleProductGrid";

type ProductsViewProps = {
  brandId?: string;
  categoryId?: string;
  featured?: boolean;
  limit?: number;
};

const FIRST_ROW_CARD_COUNT = 4;

export function ProductsView({
  brandId,
  categoryId,
  featured,
  limit,
}: ProductsViewProps) {
  return (
    <main className="site-container pt-14 pb-20">
      <VisibleProductGrid
        brandId={brandId}
        categoryId={categoryId}
        featured={featured}
        firstRowCardCount={FIRST_ROW_CARD_COUNT}
        limit={limit}
        showTotal
      />
    </main>
  );
}
