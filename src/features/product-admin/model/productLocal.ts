import { findProductCategory } from "@/entities/product/model/storage";
import type {
  AdminProductCreateResponse,
  ProductCreateImage,
} from "@/entities/product/api/admin";
import type { Product, ProductSaleType } from "@/entities/product/model/types";
import type { ProductDraft } from "./types";

/** 등록 직후 목록에 바로 보여줄 낙관적 Product. 서버 재조회 전까지만 쓴다. */
export function createLocalProductFromDraft(
  draft: ProductDraft,
  response?: AdminProductCreateResponse,
  localOrder = 0
): Product | null {
  const category = findProductCategory(draft.categoryCode);
  if (!draft.name.trim() || !category) return null;

  const productImages = mapResponseImages(response?.product_images);
  const badges = (response?.badges ?? draft.badges)
    .map((badge) => badge.trim())
    .filter(Boolean);

  return {
    id: response?.id ?? createProductId(draft.name),
    name: draft.name.trim(),
    categoryId: category.id,
    categoryName: category.name,
    brand: draft.brand.trim() || category.name,
    imageUrl:
      productImages?.[0]?.url ??
      response?.thumbnail_image_url ??
      getFallbackImage(category.id),
    imageAlt: `${draft.name.trim()} 대표 이미지`,
    summary: draft.summary.trim() || "관리자가 등록한 상품입니다.",
    detail: draft.summary.trim() || "상담을 통해 상세 안내합니다.",
    productImages,
    descriptionImages: mapResponseImages(response?.description_images),
    releasePrice: representativeReleasePrice(draft),
    planName: "",
    planMonthlyPrice: 0,
    monthlyEstimate: 0,
    priceGuide: "상담 후 안내",
    planGuide: "요금제는 상담 후 확정됩니다.",
    discountGuide: "프로모션과 결합 할인은 상담 시점 기준으로 안내합니다.",
    saleTypes: defaultSaleTypes(),
    badges,
    cardTag: badges[0] ?? "",
    visible: true,
    order: localOrder,
  };
}

function mapResponseImages(images?: ProductCreateImage[]) {
  if (!images?.length) return undefined;
  return images.map((image) => ({
    alt: image.alt ?? "",
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

function defaultSaleTypes(): ProductSaleType[] {
  return ["번호이동", "기기변경"];
}

function representativeReleasePrice(draft: ProductDraft) {
  const prices = draft.variants
    .map((variant) => variant.releasePrice)
    .filter((price) => Number.isFinite(price) && price > 0);
  return prices.length ? Math.min(...prices) : 0;
}
