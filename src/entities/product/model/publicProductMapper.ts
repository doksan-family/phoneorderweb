import type {
  PublicProductCard,
  PublicProductImage,
  PublicProductVariant,
} from "@/entities/product/api/public";
import type { PublicJsonObject } from "@/entities/product/api/publicBaseTypes";
import { findProductCategory, sortProducts } from "./storage";
import type { Product, ProductImage } from "./types";

export function mapPublicProductsToProducts(items: PublicProductCard[]) {
  return sortProducts(items.map(mapPublicProductToProduct));
}

export function mapPublicProductToProduct(item: PublicProductCard): Product {
  const categoryCode = item.category_code || item.category;
  const category = findProductCategory(categoryCode);
  const productImages = mapPublicImages(item.product_images, `${item.name} 상품 이미지`);
  const variant = getRepresentativeVariant(item);
  const pricing = toRecord(item.default_pricing);
  const releasePrice = variant?.release_price ?? readNumber(pricing, "release_price");
  const representativeImageUrl =
    item.representative_image_url ??
    productImages?.[0]?.url ??
    getFallbackImage(categoryCode);
  const summary = item.summary?.trim() || "상담을 통해 상세 안내합니다.";
  const badges = getBadges(item.badges);

  return {
    id: item.id,
    name: item.name,
    categoryId: categoryCode,
    categoryName: item.category_name || category?.name || item.brand,
    brand: item.brand ?? "",
    imageUrl: representativeImageUrl,
    imageAlt: productImages?.[0]?.alt ?? `${item.name} 대표 이미지`,
    summary,
    detail: summary,
    productImages,
    descriptionImages: mapPublicImages(item.description_images, `${item.name} 상세 이미지`),
    releasePrice,
    planName: readString(pricing, "plan_name"),
    planMonthlyPrice: readNumber(pricing, "plan_monthly_fee"),
    monthlyEstimate: readNumber(pricing, "estimated_monthly_payment"),
    priceGuide: "상담 후 안내",
    planGuide: "요금제는 상담 후 확정됩니다.",
    discountGuide: "프로모션과 결합 할인은 상담 시점 기준으로 안내합니다.",
    // 목록 API는 가입 유형을 내려주지 않는다. 임의로 채우지 않고 비워 둔다.
    saleTypes: [],
    badges,
    cardTag: badges[0] ?? "",
    visible: true,
    order: 0,
  };
}

function getBadges(badges: string[] | undefined) {
  return badges?.map((badge) => badge.trim()).filter(Boolean) ?? [];
}

export function mapPublicImages(
  images: PublicProductImage[] | undefined,
  fallbackAlt: string
): ProductImage[] | undefined {
  if (!images?.length) return undefined;

  const mappedImages = images
    .filter((image) => image.url)
    .map((image, index) => ({
      alt: image.alt?.trim() || `${fallbackAlt} ${index + 1}`,
      displayOrder: image.display_order,
      url: image.url,
    }))
    .sort((first, second) => first.displayOrder - second.displayOrder);

  return mappedImages.length ? mappedImages : undefined;
}

function getRepresentativeVariant(item: PublicProductCard) {
  return item.default_variant ?? getFirstVariant(item.variants);
}

function getFirstVariant(variants: PublicProductVariant[] | undefined) {
  if (!variants?.length) return undefined;

  return [...variants].sort((first, second) => getOrder(first) - getOrder(second))[0];
}

function getOrder(item: { display_order?: number }) {
  return item.display_order ?? 0;
}

function getFallbackImage(categoryCode: string) {
  if (categoryCode === "samsung") return "/images/phone-aurora.svg";
  if (categoryCode === "apple") return "/images/phone-core.svg";
  return "/images/phone-fold.svg";
}

function toRecord(value: PublicJsonObject | null | undefined): PublicJsonObject | null {
  return value && typeof value === "object" ? value : null;
}

function readNumber(record: PublicJsonObject | null, key: string): number {
  const value = record?.[key];
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function readString(record: PublicJsonObject | null, key: string): string {
  const value = record?.[key];
  return typeof value === "string" ? value.trim() : "";
}
