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
