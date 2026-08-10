"use client";

import { Images } from "lucide-react";
import { type FormEvent, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { productQueryOptions } from "@/entities/product/model/queries";
import type { AdminReview } from "@/entities/review/model/types";
import {
  adminErrorClass,
  adminFieldClass,
  primaryButtonClass,
  twoColumnFieldGridClass,
} from "@/features/admin/ui/adminStyles";
import { useFilePreviews } from "@/features/product-admin/model/useFilePreviews";
import { ProductImagePickerSection } from "@/features/product-admin/ui/ProductImagePickerSection";
import { useReviewForm } from "../model/useReviewForm";
import { ReviewProductSelect } from "./ReviewProductSelect";
import { ReviewRatingInput } from "./ReviewRatingInput";
import { ReviewVisibilityFields } from "./ReviewVisibilityFields";

type AdminReviewFormProps = {
  /** 있으면 수정 모드. 없으면 등록 모드. */
  review?: AdminReview;
  onSaved: () => void;
};

const IMAGE_ACCEPT = "image/png,image/jpeg,image/webp,image/gif";

export function AdminReviewForm({ review, onSaved }: AdminReviewFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: products = [] } = useQuery(productQueryOptions.adminList());
  const {
    addImages,
    existingImages,
    fileError,
    isEdit,
    removeExistingImage,
    removeImage,
    saveMutation,
    update,
    value,
  } = useReviewForm({ review, onSaved });
  const previews = useFilePreviews(value.imageFiles);

  function pickImages(files: File[]) {
    if (fileInputRef.current) fileInputRef.current.value = "";
    addImages(files);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveMutation.mutate();
  }

  return (
    <form className="grid gap-4" onSubmit={submit}>
      <ReviewProductSelect
        products={products}
        value={value.productId}
        onChange={(productId) => update("productId", productId)}
      />

      <ReviewRatingInput
        value={value.rating}
        onChange={(rating) => update("rating", rating)}
      />

      <label className={adminFieldClass}>
        제목 *
        <input
          required
          value={value.title}
          onChange={(event) => update("title", event.target.value)}
        />
      </label>

      <label className={adminFieldClass}>
        본문 *
        <textarea
          required
          rows={5}
          value={value.content}
          onChange={(event) => update("content", event.target.value)}
        />
      </label>

      <div className={twoColumnFieldGridClass}>
        <label className={adminFieldClass}>
          작성자 표시명 *
          <input
            placeholder="김**"
            required
            value={value.authorName}
            onChange={(event) => update("authorName", event.target.value)}
          />
        </label>
        <label className={adminFieldClass}>
          노출 순서
          <input
            min={0}
            type="number"
            value={value.displayOrder}
            onChange={(event) => update("displayOrder", Number(event.target.value))}
          />
        </label>
      </div>

      <input
        ref={fileInputRef}
        accept={IMAGE_ACCEPT}
        className="sr-only"
        multiple
        type="file"
        onChange={(event) => pickImages(Array.from(event.target.files ?? []))}
      />
      <ProductImagePickerSection
        dropIcon={<Images size={20} />}
        dropLabel="이미지 추가"
        existingImages={existingImages.map((image) => ({
          url: image.image_url,
          alt: image.alt,
          displayOrder: image.display_order,
        }))}
        featuredFirst
        label="후기 이미지 (선택, 고른 순서대로 저장)"
        previewAltPrefix="후기 이미지"
        previews={previews}
        onAdd={() => fileInputRef.current?.click()}
        onRemove={removeImage}
        onRemoveExisting={removeExistingImage}
      />
      {fileError ? <p className={adminErrorClass}>{fileError}</p> : null}

      <ReviewVisibilityFields
        isFeatured={value.isFeatured}
        isPublished={value.isPublished}
        onChange={update}
      />

      {saveMutation.error ? (
        <p className={adminErrorClass}>
          {saveMutation.error instanceof Error
            ? saveMutation.error.message
            : isEdit
              ? "수정에 실패했습니다."
              : "등록에 실패했습니다."}
        </p>
      ) : null}

      <button
        className={primaryButtonClass}
        disabled={saveMutation.isPending}
        type="submit"
      >
        {saveMutation.isPending
          ? isEdit
            ? "저장 중…"
            : "등록 중…"
          : isEdit
            ? "후기 저장"
            : "후기 등록"}
      </button>
    </form>
  );
}
