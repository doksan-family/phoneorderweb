import { findProductCategory } from "@/entities/product/model/storage";
import type {
  AdminProductCreateResponse,
  ProductCreateImage,
} from "@/entities/product/api/admin";
import type { Product, ProductSaleType } from "@/entities/product/model/types";
import type { ProductDraft } from "./types";

export function createLocalProductFromDraft(
  draft: ProductDraft,
  response?: AdminProductCreateResponse,
  localOrder = 0
): Product | null {
  const category = findProductCategory(draft.category_code);

  if (!draft.name.trim() || !category) return null;

  const productImages = mapResponseImages(response?.product_images);
  const representativeImageUrl =
    productImages?.[0]?.url ??
    response?.thumbnail_image_url ??
    getFallbackImage(category.id);
  const salePrice = getRepresentativePrice(draft);
  const originalPrice = salePrice;
  const badges = getBadges(response?.badges ?? draft.badges);

  return {
    id: response?.id ?? createProductId(draft.name),
    name: draft.name.trim(),
    categoryId: category.id,
    categoryName: category.name,
    imageUrl: representativeImageUrl,
    imageAlt: `${draft.name.trim()} 대표 이미지`,
    summary: draft.summary.trim() || "관리자가 등록한 상품입니다.",
    detail: draft.summary.trim() || "상담을 통해 상세 안내합니다.",
    productImages,
    descriptionImages: mapResponseImages(response?.description_images),
    originalPrice,
    salePrice,
    planName: "상담 요금제",
    planMonthlyPrice: 0,
    monthlyEstimate: salePrice,
    priceGuide: "상담 후 안내",
    planGuide: "요금제는 상담 후 확정됩니다.",
    discountGuide: "프로모션과 결합 할인은 상담 시점 기준으로 안내합니다.",
    saleTypes: getDefaultSaleTypes(),
    badges,
    cardTag: badges[0] ?? "",
    discountRate: getDiscountRate(originalPrice, salePrice),
    visible: true,
    order: localOrder,
  };
}

function getBadges(badges: string[]) {
  return badges.map((badge) => badge.trim()).filter(Boolean);
}

function mapResponseImages(images?: ProductCreateImage[]) {
  if (!images?.length) return undefined;

  return images.map((image) => ({
    alt: image.alt,
    displayOrder: image.display_order,
    url: image.url,
  }));
}

function getFallbackImage(categoryCode: string) {
  if (categoryCode === "samsung") return "/images/phone-aurora.svg";
  if (categoryCode === "apple") return "/images/phone-core.svg";
  return "/images/phone-fold.svg";
}

function createProductId(name: string) {
  const slug = name.trim().toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-");
  return `product-${slug || Date.now()}-${Date.now()}`;
}

function getDefaultSaleTypes(): ProductSaleType[] {
  return ["번호이동", "기기변경", "신규가입"];
}

function getRepresentativePrice(draft: ProductDraft) {
  const prices = draft.variants
    .map((variant) => variant.salePrice)
    .filter((price) => Number.isFinite(price) && price > 0);

  return prices.length ? Math.min(...prices) : 0;
}

function getDiscountRate(originalPrice: number, salePrice: number) {
  if (originalPrice <= 0 || salePrice <= 0) return 0;
  return Math.max(0, Math.round(((originalPrice - salePrice) / originalPrice) * 100));
}
