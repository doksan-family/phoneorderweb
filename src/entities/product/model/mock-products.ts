import type { Product, ProductCategory } from "./types";

export const productCategories: ProductCategory[] = [
  {
    id: "special",
    name: "특가",
    description: "추천 특가 상품",
    order: 0,
    visible: true
  },
  {
    id: "samsung",
    name: "삼성",
    description: "갤럭시 시리즈 특가 상담",
    order: 1,
    visible: true
  },
  {
    id: "apple",
    name: "애플",
    description: "아이폰 시리즈 특가 상담",
    order: 2,
    visible: true
  },
  {
    id: "kids_free",
    name: "키즈폰/공짜폰",
    description: "어린이 전용 및 0원 특가",
    order: 3,
    visible: true
  },
  {
    id: "internet_tv",
    name: "인터넷/TV",
    description: "인터넷·IPTV 결합 상담",
    order: 4,
    visible: true
  }
];

export const products: Product[] = [];

export function getVisibleProducts() {
  return products.filter((product) => product.visible).sort(sortByOrder);
}

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId);
}

function sortByOrder(first: Product, second: Product) {
  return first.order - second.order;
}

/**
 * 브랜드는 카테고리와 별개다.
 * 카테고리가 "특가"인 갤럭시도 브랜드는 삼성이라 삼성 메뉴에 노출된다.
 */
export const productBrands = [
  { id: "samsung", name: "삼성" },
  { id: "apple", name: "애플" },
  { id: "etc", name: "기타" },
];

export function findProductBrand(brandId?: string) {
  return productBrands.find((brand) => brand.id === brandId);
}
