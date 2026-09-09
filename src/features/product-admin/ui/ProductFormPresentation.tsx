import type { useProductForm } from "../model/useProductForm";
import { ProductImageFields } from "./ProductImageFields";
import { ProductFormSection } from "./ProductFormSection";

type ProductFormPresentationProps = {
  form: ReturnType<typeof useProductForm>;
};

export function ProductFormPresentation({ form }: ProductFormPresentationProps) {
  return (
    <div className="grid min-w-0 content-start gap-5">
      <ProductFormSection title="상품 이미지" description="상품 이미지는 1개 이상 필요합니다. 첫 번째 이미지가 대표 이미지로 표시됩니다.">
        <ProductImageFields
          required={!form.isEdit}
          existingProductImages={form.keptProductImages}
          existingDescriptionImages={form.keptDescriptionImages}
          onExistingProductImagesChange={form.setKeptProductImages}
          onExistingDescriptionImagesChange={form.setKeptDescriptionImages}
          productImages={form.productImages}
          descriptionImages={form.descriptionImages}
          onProductImagesChange={form.setProductImages}
          onDescriptionImagesChange={form.setDescriptionImages}
        />
      </ProductFormSection>
    </div>
  );
}
