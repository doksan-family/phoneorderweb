"use client";
import { Images } from "lucide-react";
import { useRef } from "react";
import { useFilePreviews } from "../model/useFilePreviews";
import { ProductImagePickerSection } from "./ProductImagePickerSection";
type ProductImageFieldsProps = {
  descriptionImages: File[];
  productImages: File[];
  onDescriptionImagesChange: (files: File[]) => void;
  onProductImagesChange: (files: File[]) => void;
};
const ACCEPT = "image/webp,image/jpeg,image/png";
export function ProductImageFields({
  descriptionImages,
  productImages,
  onDescriptionImagesChange,
  onProductImagesChange,
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
  return (
    <div className="grid gap-3">
      <input
        ref={productImagesInputRef}
        accept={ACCEPT}
        className="sr-only"
        multiple
        required={!productImages.length}
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
          featuredFirst
          label="상품 이미지"
          previewAltPrefix="상품 이미지"
          previews={productImagePreviews}
          onAdd={() => productImagesInputRef.current?.click()}
          onRemove={removeProductImage}
        />
        <ProductImagePickerSection
          dropIcon={<Images size={23} />}
          dropLabel="설명 이미지 추가"
          label="설명용 이미지"
          previewAltPrefix="설명용 이미지"
          previews={descriptionImagePreviews}
          onAdd={() => descriptionImagesInputRef.current?.click()}
          onRemove={removeImage}
        />
      </div>
    </div>
  );
}
