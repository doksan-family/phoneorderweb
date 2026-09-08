import {
  createAdminProduct,
  updateAdminProduct,
  type AdminProductImage,
} from "@/entities/product/api/admin";
import type { Product } from "@/entities/product/model/types";
import { fetchImageAsFile } from "@/shared/lib/imageFile";
import { createLocalProductFromDraft } from "./productLocal";
import { createPayloadFromDraft } from "./productPayload";
import { validateDraft } from "./productValidate";
import type { ProductDraft } from "./types";

type CreateParams = {
  draft: ProductDraft;
  productImages: File[];
  descriptionImages: File[];
  order: number;
};

/** POST /admin-products. 성공하면 목록에 바로 꽂을 낙관적 Product를 돌려준다. */
export async function submitCreate({
  draft,
  productImages,
  descriptionImages,
  order,
}: CreateParams): Promise<Product | null> {
  validateDraft(draft);
  if (!productImages.length) {
    throw new Error("상품 이미지는 1개 이상 필요합니다.");
  }

  const response = await createAdminProduct({
    payload: createPayloadFromDraft(draft),
    productImages,
    descriptionImages,
  });

  return createLocalProductFromDraft(draft, response, order);
}

type UpdateParams = {
  productId: string;
  draft: ProductDraft;
  productImages: File[];
  descriptionImages: File[];
  /** 화면에 남겨 둔 기존 이미지 */
  keptProductImages: AdminProductImage[];
  keptDescriptionImages: AdminProductImage[];
  /** 수정 시작 시점의 기존 이미지. 개수가 그대로면 이미지 필드를 아예 안 보낸다. */
  originalProductImages: AdminProductImage[];
  originalDescriptionImages: AdminProductImage[];
};

/**
 * PATCH /admin-products?id=. 배열 필드는 서버에서 전체 교체된다.
 * display_order·is_active는 목록 화면에서 관리하므로 여기서 보내지 않는다.
 */
export async function submitUpdate({
  productId,
  draft,
  productImages,
  descriptionImages,
  keptProductImages,
  keptDescriptionImages,
  originalProductImages,
  originalDescriptionImages,
}: UpdateParams): Promise<void> {
  validateDraft(draft);
  const payload = createPayloadFromDraft(draft);

  const nextProductImages = await buildReplacementFiles(
    keptProductImages,
    productImages,
    originalProductImages.length
  );
  const nextDescriptionImages = await buildReplacementFiles(
    keptDescriptionImages,
    descriptionImages,
    originalDescriptionImages.length
  );

  await updateAdminProduct(
    productId,
    {
      category_code: payload.category_code,
      brand: payload.brand,
      name: payload.name,
      summary: payload.summary,
      badges: payload.badges,
      is_featured: payload.is_featured,
      variants: payload.variants,
      colors: payload.colors,
      plan_ids: payload.plan_ids,
      subscription_types: payload.subscription_types,
      installment_month_options: payload.installment_month_options,
      pricing_overrides: payload.pricing_overrides,
    },
    { productImages: nextProductImages, descriptionImages: nextDescriptionImages }
  );
}

/**
 * 이미지 필드는 전체 교체라 남겨 둔 기존 이미지도 File로 다시 올린다.
 * 바뀐 게 없으면 undefined를 돌려 필드 자체를 보내지 않는다.
 */
async function buildReplacementFiles(
  kept: AdminProductImage[],
  added: File[],
  originalCount: number
): Promise<File[] | undefined> {
  if (!added.length && kept.length === originalCount) return undefined;

  const keptFiles = await Promise.all(
    kept.map((image) => fetchImageAsFile(image.url))
  );
  return [...keptFiles, ...added];
}
