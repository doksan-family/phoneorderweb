export const PRODUCT_IMAGE_TILE_GRID_CLASS =
  "grid grid-cols-[repeat(auto-fill,minmax(168px,168px))] gap-2 max-[420px]:grid-cols-1";

export const PRODUCT_IMAGE_TILE_SIZE_CLASS = "h-[184px] w-full";

export const PRODUCT_IMAGE_PREVIEW_TILE_CLASS = `${PRODUCT_IMAGE_TILE_SIZE_CLASS} relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-100`;

export const PRODUCT_IMAGE_DROP_BUTTON_CLASS = `${PRODUCT_IMAGE_TILE_SIZE_CLASS} grid cursor-pointer place-items-center rounded-xl border-2 border-dashed border-slate-300 bg-white p-5 text-center transition hover:border-slate-950 hover:bg-[var(--brand-primary-soft)]`;
