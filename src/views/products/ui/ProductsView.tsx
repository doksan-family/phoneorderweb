import { productCategories } from "@/entities/product/model/mock-products";
import { VisibleProductGrid } from "@/features/product-list/ui/VisibleProductGrid";
import { PageHeader } from "@/shared/ui/PageHeader";

type ProductsViewProps = {
  categoryId?: string;
  featured?: boolean;
  limit?: number;
};

const FIRST_ROW_CARD_COUNT = 4;

export function ProductsView({ categoryId, featured, limit }: ProductsViewProps) {
  const category = productCategories.find((item) => item.id === categoryId);

  return (
    <main className="site-container pt-14 pb-20">
      <PageHeader
        eyebrow={category?.name ?? "전체 상품"}
        title={category ? `${category.name} 전체 상품` : "오늘의 특가 상품"}
        description={
          category?.description ??
          "가장 조건 좋은 상품만 모았습니다. 상담으로 실구매가를 확인하세요."
        }
      />
      <VisibleProductGrid
        categoryId={categoryId}
        featured={featured}
        firstRowCardCount={FIRST_ROW_CARD_COUNT}
        limit={limit}
      />
    </main>
  );
}
