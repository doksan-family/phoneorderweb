import {
  findProductBrand,
  productCategories,
} from "@/entities/product/model/mock-products";
import { VisibleProductGrid } from "@/features/product-list/ui/VisibleProductGrid";
import { PageHeader } from "@/shared/ui/PageHeader";

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
  const category = productCategories.find((item) => item.id === categoryId);
  const brand = findProductBrand(brandId);

  return (
    <main className="site-container pt-14 pb-20">
      <PageHeader
        eyebrow={category?.name ?? brand?.name ?? "전체 상품"}
        title={`${category?.name ?? brand?.name ?? "오늘의 특가"} 전체 상품`}
        description={
          category?.description ??
          "가장 조건 좋은 상품만 모았습니다. 상담으로 실구매가를 확인하세요."
        }
      />
      <VisibleProductGrid
        brandId={brandId}
        categoryId={categoryId}
        featured={featured}
        firstRowCardCount={FIRST_ROW_CARD_COUNT}
        limit={limit}
      />
    </main>
  );
}
