import type { ReactNode } from "react";
import { PRODUCT_IMAGE_DROP_BUTTON_CLASS } from "./productImageTileStyles";

type ProductImageDropButtonProps = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

export function ProductImageDropButton({
  icon,
  label,
  onClick,
}: ProductImageDropButtonProps) {
  return (
    <button
      className={PRODUCT_IMAGE_DROP_BUTTON_CLASS}
      type="button"
      onClick={onClick}
    >
      <span className="grid justify-items-center gap-2">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-slate-950 text-[var(--brand-accent)]">
          {icon}
        </span>
        <strong className="text-sm font-black text-slate-950">{label}</strong>
      </span>
    </button>
  );
}
