import type { ReactNode } from "react";
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
  onAdd: () => void;
  onRemove: (index: number) => void;
};

export function ProductImagePickerSection({
  dropIcon,
  dropLabel,
  featuredFirst,
  label,
  previewAltPrefix,
  previews,
  onAdd,
  onRemove,
}: ProductImagePickerSectionProps) {
  return (
    <section className="grid gap-2">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <div className={PRODUCT_IMAGE_TILE_GRID_CLASS}>
        {previews.map((preview, index) => (
          <ProductImagePreviewTile
            alt={`${previewAltPrefix} ${index + 1} 미리보기`}
            badgeLabel={featuredFirst && index === 0 ? "대표" : undefined}
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
