"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdminReview, updateAdminReview } from "@/entities/review/api/admin";
import { adminReviewsQueryKey } from "@/entities/review/model/queries";
import type { AdminReview } from "@/entities/review/model/types";
import {
  emptyReviewFormValue,
  findOversizedImage,
  toReviewCreatePayload,
  toReviewFormValue,
  toReviewUpdatePayload,
  type AdminReviewFormValue,
} from "./reviewFormValue";
import { toReviewImagePayload } from "./reviewImageFiles";

type UseReviewFormParams = {
  /** 있으면 수정 모드(PATCH), 없으면 등록 모드(POST) */
  review?: AdminReview;
  onSaved: () => void;
};

export function useReviewForm({ review, onSaved }: UseReviewFormParams) {
  const [value, setValue] = useState(() =>
    review ? toReviewFormValue(review) : emptyReviewFormValue
  );
  const [existingImages, setExistingImages] = useState(() => review?.images ?? []);
  const [fileError, setFileError] = useState("");
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!review) return createAdminReview(toReviewCreatePayload(value));

      const imagePayload = await toReviewImagePayload(
        review.images,
        existingImages,
        value.imageFiles
      );
      return updateAdminReview(review.id, {
        ...toReviewUpdatePayload(value),
        ...imagePayload,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: adminReviewsQueryKey });
      if (!review) setValue(emptyReviewFormValue);
      onSaved();
    },
  });

  function update<K extends keyof AdminReviewFormValue>(
    key: K,
    next: AdminReviewFormValue[K]
  ) {
    setValue((current) => ({ ...current, [key]: next }));
  }

  function addImages(files: File[]) {
    const oversized = findOversizedImage(files);
    if (oversized) {
      setFileError(`${oversized.name}은(는) 10MB를 넘어 등록할 수 없습니다.`);
      return;
    }

    setFileError("");
    update("imageFiles", [...value.imageFiles, ...files]);
  }

  function removeImage(index: number) {
    update(
      "imageFiles",
      value.imageFiles.filter((_, fileIndex) => fileIndex !== index)
    );
  }

  function removeExistingImage(index: number) {
    setExistingImages((current) =>
      current.filter((_, imageIndex) => imageIndex !== index)
    );
  }

  return {
    addImages,
    existingImages,
    fileError,
    isEdit: Boolean(review),
    removeExistingImage,
    removeImage,
    saveMutation,
    update,
    value,
  };
}
