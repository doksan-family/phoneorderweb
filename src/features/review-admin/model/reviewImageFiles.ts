import type { AdminReviewUpdatePayload } from "@/entities/review/api/admin";
import type { PublicReviewImage } from "@/entities/review/model/types";

/**
 * PATCH는 이미지 부분 삭제를 지원하지 않고 image_files로 전체 교체만 한다.
 * 그래서 남겨 둔 기존 이미지는 다시 내려받아 새 파일과 함께 올린다.
 */
export async function toReviewImagePayload(
  originalImages: PublicReviewImage[],
  keptImages: PublicReviewImage[],
  addedFiles: File[]
): Promise<Pick<AdminReviewUpdatePayload, "image_files" | "replace_images">> {
  const isKeptIntact =
    keptImages.length === originalImages.length &&
    keptImages.every((image, index) => image.id === originalImages[index]?.id);
  // 손대지 않았으면 아무것도 보내지 않아 기존 이미지를 그대로 둔다
  if (isKeptIntact && !addedFiles.length) return {};
  if (!keptImages.length && !addedFiles.length) return { replace_images: true };

  const keptFiles = await Promise.all(keptImages.map(downloadImageFile));
  return { image_files: [...keptFiles, ...addedFiles] };
}

async function downloadImageFile(image: PublicReviewImage): Promise<File> {
  const response = await fetch(image.image_url);
  if (!response.ok) {
    throw new Error("기존 이미지를 불러오지 못해 저장을 중단했습니다.");
  }

  const blob = await response.blob();
  return new File([blob], getFileName(image.image_path), { type: blob.type });
}

function getFileName(imagePath: string) {
  return imagePath.slice(imagePath.lastIndexOf("/") + 1) || "review-image";
}
