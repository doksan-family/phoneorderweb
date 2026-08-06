import {
  updateAdminProduct,
  type AdminProductImage,
} from "@/entities/product/api/admin";
import { fetchImageAsFile } from "@/shared/lib/imageFile";
import { createPayloadFromDraft } from "./productPayload";
import { validateProductPayload } from "./productValidate";
import type { ProductDraft } from "./types";

type SubmitProductUpdateParams = {
  descriptionImages: File[];
  draft: ProductDraft;
  productId: string;
  productImages: File[];
  /** 화면에 남겨둔 기존 이미지 */
  keptProductImages: AdminProductImage[];
  keptDescriptionImages: AdminProductImage[];
  /** 수정 전 기존 이미지. 개수가 그대로면 이미지를 아예 보내지 않는다. */
  originalProductImages: AdminProductImage[];
  originalDescriptionImages: AdminProductImage[];
};

/**
 * 배열 필드는 서버에서 전체 교체된다.
 * 이미지는 새로 고른 게 있을 때만 보내고, 없으면 기존 이미지를 유지한다.
 * display_order와 is_active는 목록에서 관리하므로 여기서 보내지 않는다.
 */
export async function submitProductUpdate({
  descriptionImages,
  draft,
  productId,
  productImages,
  keptProductImages,
  keptDescriptionImages,
  originalProductImages,
  originalDescriptionImages,
}: SubmitProductUpdateParams) {
  const payload = createPayloadFromDraft(draft);

  validateProductPayload(payload);

  const nextProductImages = await createReplacementFiles(
    keptProductImages,
    productImages,
    originalProductImages.length
  );
  const nextDescriptionImages = await createReplacementFiles(
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
    {
      productImages: nextProductImages,
      descriptionImages: nextDescriptionImages,
    }
  );
}

/**
 * 이미지 필드는 전체 교체라서 남겨둔 기존 이미지도 다시 올린다.
 * 바뀐 게 없으면 undefined를 돌려 필드 자체를 보내지 않는다.
 */
async function createReplacementFiles(
  kept: AdminProductImage[],
  added: File[],
  originalCount: number
) {
  if (!added.length && kept.length === originalCount) return undefined;

  const keptFiles = await Promise.all(
    kept.map((image) => fetchImageAsFile(image.url))
  );

  return [...keptFiles, ...added];
}
