import { createAdminProduct } from "@/entities/product/api/admin";
import type { Product } from "@/entities/product/model/types";
import { createLocalProductFromDraft } from "./productLocal";
import { createPayloadFromDraft } from "./productPayload";
import { validateProductPayload } from "./productValidate";
import type { ProductDraft } from "./types";

type SubmitProductParams = {
  descriptionImages: File[];
  draft: ProductDraft;
  onCreate: (product: Product) => void;
  order: number;
  productImages: File[];
};

export async function submitProduct({
  descriptionImages,
  draft,
  onCreate,
  order,
  productImages,
}: SubmitProductParams) {
  const nextDraft = { ...draft };
  const payload = createPayloadFromDraft(nextDraft);

  validateProductPayload(payload);

  if (!productImages.length) {
    throw new Error("상품 이미지는 1개 이상 필요합니다.");
  }

  const response = await createAdminProduct({
    payload,
    productImages,
    descriptionImages,
  });
  const localProduct = createLocalProductFromDraft(nextDraft, response, order);
  if (localProduct) onCreate(localProduct);
}
