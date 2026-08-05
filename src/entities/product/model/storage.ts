import { productCategories, products } from "./mock-products";
import type { Product } from "./types";

const STORAGE_KEY = "phone-order-products";
const LEGACY_MOCK_PRODUCT_IDS = new Set([
  "aurora-pro",
  "core-lite",
  "flex-fold",
]);

export function getDefaultProducts(): Product[] {
  return sortProducts(products);
}

export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") {
    return getDefaultProducts();
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return getDefaultProducts();
  }

  try {
    const parsed = JSON.parse(rawValue) as Product[];
    return Array.isArray(parsed)
      ? sortProducts(removeLegacyMockProducts(parsed))
      : getDefaultProducts();
  } catch {
    return getDefaultProducts();
  }
}

export function saveStoredProducts(items: Product[]) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(sortProducts(removeLegacyMockProducts(items)))
  );
}

export function findProductCategory(categoryId: string) {
  return productCategories.find((category) => category.id === categoryId);
}

export function sortProducts(items: Product[]) {
  return [...items].sort((first, second) => first.order - second.order);
}

function removeLegacyMockProducts(items: Product[]) {
  return items.filter((item) => !LEGACY_MOCK_PRODUCT_IDS.has(item.id));
}
