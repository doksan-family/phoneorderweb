import { X } from "lucide-react";
import Image from "next/image";
import { PRODUCT_IMAGE_PREVIEW_TILE_CLASS } from "./productImageTileStyles";

type ProductImagePreviewTileProps = {
  alt: string;
  badgeLabel?: string;
  label: string;
  onRemove: () => void;
  url: string;
};

export function ProductImagePreviewTile({
  alt,
  badgeLabel,
  label,
  onRemove,
  url,
}: ProductImagePreviewTileProps) {
  return (
    <div className={PRODUCT_IMAGE_PREVIEW_TILE_CLASS}>
      <div className="relative h-[136px] shrink-0">
        <Image alt={alt} className="object-cover" fill src={url} unoptimized />
      </div>
      {badgeLabel ? (
        <span className="absolute left-2 top-2 rounded-full bg-[var(--brand-cta)] px-2 py-1 text-[11px] font-black text-white">
          {badgeLabel}
        </span>
      ) : null}
      <button
        aria-label={`${label} 제거`}
        className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full border-0 bg-slate-950/75 text-white transition hover:bg-slate-950"
        type="button"
        onClick={onRemove}
      >
        <X size={15} />
      </button>
      <span
        className="flex h-12 items-center truncate bg-white px-3 text-xs font-bold text-slate-600"
        title={label}
      >
        {label}
      </span>
    </div>
  );
}
