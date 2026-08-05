import { Trash2 } from "lucide-react";
import type { ProductColorDraft } from "../model/types";

type ProductColorRowProps = {
  color: ProductColorDraft;
  onDelete: (id: string) => void;
  onUpdate: (id: string, nextColor: Partial<ProductColorDraft>) => void;
};

const fieldClass = "grid gap-2 text-sm font-bold text-slate-700";
const iconButtonClass =
  "grid h-11 w-11 cursor-pointer place-items-center rounded-lg bg-zinc-50 text-slate-500 transition hover:bg-zinc-100 hover:text-slate-950 disabled:opacity-40";

export function ProductColorRow({
  color,
  onDelete,
  onUpdate,
}: ProductColorRowProps) {
  return (
    <div className="grid grid-cols-[1fr_170px_auto] gap-2.5 max-[900px]:grid-cols-1">
      <label className={fieldClass}>
        컬러 이름
        <input
          required
          value={color.label}
          onChange={(event) => onUpdate(color.id, { label: event.target.value })}
        />
      </label>
      <label className={fieldClass}>
        HEX
        <span className="grid grid-cols-[32px_1fr] items-center gap-2">
          <span
            className="h-8 w-8 rounded-full bg-zinc-200"
            style={{ backgroundColor: getPreviewColor(color.colorHex) }}
            aria-hidden="true"
          />
          <input
            maxLength={7}
            pattern="#[0-9A-Fa-f]{6}"
            placeholder="#111827"
            value={color.colorHex}
            onChange={(event) =>
              onUpdate(color.id, { colorHex: normalizeHex(event.target.value) })
            }
          />
        </span>
      </label>
      <button
        className={`${iconButtonClass} self-end`}
        type="button"
        onClick={() => onDelete(color.id)}
      >
        <Trash2 size={17} aria-hidden="true" />
        <span className="sr-only">색상 삭제</span>
      </button>
    </div>
  );
}

function normalizeHex(value: string) {
  const digits = value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);
  return digits ? `#${digits.toUpperCase()}` : "";
}

function getPreviewColor(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : "#e4e4e7";
}
