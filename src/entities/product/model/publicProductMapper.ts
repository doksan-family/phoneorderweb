import type { PublicProductCard, PublicProductImage, PublicProductVariant } from "@/entities/product/api/public";
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
  const salePrice = variant?.sale_price ?? 0;
  const originalPrice = variant?.original_price ?? salePrice;
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
    imageUrl: representativeImageUrl,
    imageAlt: productImages?.[0]?.alt ?? `${item.name} 대표 이미지`,
    summary,
    detail: summary,
    productImages,
    descriptionImages: mapPublicImages(item.description_images, `${item.name} 상세 이미지`),
    originalPrice,
    salePrice,
    planName: item.plan_name?.trim() ?? "",
    planMonthlyPrice: item.plan_monthly_fee ?? 0,
    monthlyEstimate: item.estimated_monthly_payment ?? 0,
    priceGuide: "상담 후 안내",
    planGuide: "요금제는 상담 후 확정됩니다.",
    discountGuide: "프로모션과 결합 할인은 상담 시점 기준으로 안내합니다.",
    // 목록 API는 가입 유형을 내려주지 않는다. 임의로 채우지 않고 비워 둔다.
    saleTypes: [],
    badges,
    cardTag: badges[0] ?? "",
    discountRate: variant?.discount_rate ?? getDiscountRate(originalPrice, salePrice),
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

function getDiscountRate(originalPrice: number, salePrice: number) {
  if (originalPrice <= 0 || salePrice <= 0) return 0;
  return Math.max(0, Math.round(((originalPrice - salePrice) / originalPrice) * 100));
}
