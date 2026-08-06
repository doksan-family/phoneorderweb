"use client";
import { Images } from "lucide-react";
import { useRef } from "react";
import type { AdminProductImage } from "@/entities/product/api/admin";
import { useFilePreviews } from "../model/useFilePreviews";
import { ProductImagePickerSection } from "./ProductImagePickerSection";
type ProductImageFieldsProps = {
  /** 등록은 상품 이미지가 필수, 수정은 새로 고를 때만 교체하므로 선택이다. */
  required?: boolean;
  /** 수정 모드에서 서버에 이미 올라가 있는 이미지 중 유지할 것 */
  existingProductImages?: AdminProductImage[];
  existingDescriptionImages?: AdminProductImage[];
  descriptionImages: File[];
  productImages: File[];
  onDescriptionImagesChange: (files: File[]) => void;
  onProductImagesChange: (files: File[]) => void;
  onExistingDescriptionImagesChange?: (images: AdminProductImage[]) => void;
  onExistingProductImagesChange?: (images: AdminProductImage[]) => void;
};
const ACCEPT = "image/webp,image/jpeg,image/png";
export function ProductImageFields({
  required = true,
  existingProductImages = [],
  existingDescriptionImages = [],
  descriptionImages,
  productImages,
  onDescriptionImagesChange,
  onProductImagesChange,
  onExistingDescriptionImagesChange,
  onExistingProductImagesChange,
}: ProductImageFieldsProps) {
  const productImagesInputRef = useRef<HTMLInputElement>(null);
  const descriptionImagesInputRef = useRef<HTMLInputElement>(null);
  const productImagePreviews = useFilePreviews(productImages);
  const descriptionImagePreviews = useFilePreviews(descriptionImages);
  function addProductImages(files: File[]) {
    onProductImagesChange([...productImages, ...files]);
    if (productImagesInputRef.current) productImagesInputRef.current.value = "";
  }
  function removeProductImage(index: number) {
    onProductImagesChange(productImages.filter((_, i) => i !== index));
  }
  function addImages(files: File[]) {
    onDescriptionImagesChange([...descriptionImages, ...files]);
    if (descriptionImagesInputRef.current) {
      descriptionImagesInputRef.current.value = "";
    }
  }
  function removeImage(index: number) {
    onDescriptionImagesChange(descriptionImages.filter((_, i) => i !== index));
  }
  function removeExistingProductImage(index: number) {
    onExistingProductImagesChange?.(
      existingProductImages.filter((_, i) => i !== index)
    );
  }
  function removeExistingDescriptionImage(index: number) {
    onExistingDescriptionImagesChange?.(
      existingDescriptionImages.filter((_, i) => i !== index)
    );
  }
  return (
    <div className="grid gap-3">
      <input
        ref={productImagesInputRef}
        accept={ACCEPT}
        className="sr-only"
        multiple
        required={required && !productImages.length && !existingProductImages.length}
        type="file"
        onChange={(event) => addProductImages(Array.from(event.target.files ?? []))}
      />
      <input
        ref={descriptionImagesInputRef}
        accept={ACCEPT}
        className="sr-only"
        multiple
        type="file"
        onChange={(event) => addImages(Array.from(event.target.files ?? []))}
      />
      <div className="grid gap-4">
        <ProductImagePickerSection
          dropIcon={<Images size={23} />}
          dropLabel="상품 이미지 추가"
          existingImages={existingProductImages}
          featuredFirst
          label="상품 이미지"
          previewAltPrefix="상품 이미지"
          previews={productImagePreviews}
          onAdd={() => productImagesInputRef.current?.click()}
          onRemove={removeProductImage}
          onRemoveExisting={removeExistingProductImage}
        />
        <ProductImagePickerSection
          dropIcon={<Images size={23} />}
          dropLabel="설명 이미지 추가"
          label="설명용 이미지"
          previewAltPrefix="설명용 이미지"
          existingImages={existingDescriptionImages}
          previews={descriptionImagePreviews}
          onAdd={() => descriptionImagesInputRef.current?.click()}
          onRemove={removeImage}
          onRemoveExisting={removeExistingDescriptionImage}
        />
      </div>
    </div>
  );
}
