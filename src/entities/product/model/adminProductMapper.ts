import type {
  AdminProductImage,
  AdminProductSummary,
} from "@/entities/product/api/adminProductTypes";
import { mapAdminProductOptions } from "./adminProductOptionMapper";
import {
  getBoolean,
  getNumber,
  getRecord,
  getString,
  getStringArray,
  toRecord,
} from "./adminProductValue";

/** 목록 응답은 { ok, data: [...] } 형태를 쓰지만 배열 그대로도 받아들인다. */
export function mapAdminProductList(value: unknown): AdminProductSummary[] {
  const rows = Array.isArray(value) ? value : unwrapData(value);
  if (!Array.isArray(rows)) return [];

  return rows
    .map(mapAdminProduct)
    .filter((item): item is AdminProductSummary => item !== null);
}

export function mapAdminProduct(value: unknown): AdminProductSummary | null {
  const item = toRecord(value);
  if (!item) return null;

  const id = getString(item.id);
  if (!id) return null;

  const productImages = mapImages(item.product_images);
  const variant = getFirstVariant(item);

  return {
    id,
    name: getString(item.name),
    brand: getString(item.brand),
    summary: getString(item.summary),
    categoryCode: getString(item.category_code) || getString(item.category),
    categoryName: getString(item.category_name),
    badges: getStringArray(item.badges),
    productImages,
    descriptionImages: mapImages(item.description_images),
    thumbnailUrl:
      productImages[0]?.url ?? (getString(item.representative_image_url) || null),
    releasePrice:
      getNumber(item.release_price) ??
      (variant
        ? getNumber(variant.release_price) ?? getNumber(variant.original_price)
        : null),
    isActive: getBoolean(item.is_active) ?? true,
    isFeatured: getBoolean(item.is_featured) ?? false,
    displayOrder: getNumber(item.display_order) ?? 0,
    ...mapAdminProductOptions(item),
  };
}

function unwrapData(value: unknown): unknown {
  return toRecord(value)?.data;
}

/** 가격은 상품이 아니라 용량(variant)에 붙어 있어 대표 용량에서 읽는다. */
function getFirstVariant(item: Record<string, unknown>) {
  const defaultVariant = getRecord(item.default_variant);
  if (defaultVariant) return defaultVariant;

  const variants = Array.isArray(item.variants) ? item.variants : [];
  const rows = variants
    .map(toRecord)
    .filter((row): row is Record<string, unknown> => row !== null);

  return (
    [...rows].sort(
      (first, second) =>
        (getNumber(first.display_order) ?? 0) - (getNumber(second.display_order) ?? 0)
    )[0] ?? null
  );
}

function mapImages(value: unknown): AdminProductImage[] {
  if (!Array.isArray(value)) return [];

  return value
    .map(toRecord)
    .filter((row): row is Record<string, unknown> => row !== null)
    .map((row, index) => ({
      url: getString(row.url),
      alt: getString(row.alt) || null,
      displayOrder: getNumber(row.display_order) ?? index,
    }))
    .filter((image) => image.url !== "")
    .sort((first, second) => first.displayOrder - second.displayOrder);
}
