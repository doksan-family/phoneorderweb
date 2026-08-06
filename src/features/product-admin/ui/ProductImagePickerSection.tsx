import type { ReactNode } from "react";
import type { AdminProductImage } from "@/entities/product/api/admin";
import type { FilePreview } from "../model/useFilePreviews";
import { ProductImageDropButton } from "./ProductImageDropButton";
import { ProductImagePreviewTile } from "./ProductImagePreviewTile";
import { PRODUCT_IMAGE_TILE_GRID_CLASS } from "./productImageTileStyles";

type ProductImagePickerSectionProps = {
  dropIcon: ReactNode;
  dropLabel: string;
  featuredFirst?: boolean;
  label: string;
  previewAltPrefix: string;
  previews: FilePreview[];
  /** 서버에 이미 올라가 있어 그대로 유지할 이미지 */
  existingImages?: AdminProductImage[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onRemoveExisting?: (index: number) => void;
};

export function ProductImagePickerSection({
  dropIcon,
  dropLabel,
  featuredFirst,
  label,
  previewAltPrefix,
  previews,
  existingImages = [],
  onAdd,
  onRemove,
  onRemoveExisting,
}: ProductImagePickerSectionProps) {
  return (
    <section className="grid gap-2">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <div className={PRODUCT_IMAGE_TILE_GRID_CLASS}>
        {existingImages.map((image, index) => (
          <ProductImagePreviewTile
            alt={image.alt ?? `${previewAltPrefix} ${index + 1}`}
            badgeLabel={featuredFirst && index === 0 ? "대표" : undefined}
            key={`${image.url}-${index}`}
            label={getFileName(image.url)}
            url={image.url}
            onRemove={() => onRemoveExisting?.(index)}
          />
        ))}
        {previews.map((preview, index) => (
          <ProductImagePreviewTile
            alt={`${previewAltPrefix} ${existingImages.length + index + 1} 미리보기`}
            badgeLabel={
              featuredFirst && !existingImages.length && index === 0
                ? "대표"
                : undefined
            }
            key={`${preview.file.name}-${index}`}
            label={preview.file.name}
            url={preview.url}
            onRemove={() => onRemove(index)}
          />
        ))}
        <ProductImageDropButton
          icon={dropIcon}
          label={dropLabel}
          onClick={onAdd}
        />
      </div>
    </section>
  );
}

function getFileName(url: string) {
  const path = url.split("?")[0];
  return path.slice(path.lastIndexOf("/") + 1) || url;
}
