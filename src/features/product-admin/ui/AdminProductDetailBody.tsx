import Image from "next/image";
import type {
  AdminProductImage,
  AdminProductSummary,
} from "@/entities/product/api/admin";

type AdminProductDetailBodyProps = {
  product: AdminProductSummary;
};

export function AdminProductDetailBody({ product }: AdminProductDetailBodyProps) {
  return (
    <div className="grid gap-5">
      <ImageStrip images={product.productImages} label="상품 이미지" />

      <div className="grid gap-1">
        <h3 className="m-0 text-lg font-extrabold text-slate-950">
          {product.name || "이름 없음"}
        </h3>
        {product.summary ? (
          <p className="m-0 text-sm leading-relaxed text-slate-500">{product.summary}</p>
        ) : null}
      </div>

      {product.badges.length ? (
        <div className="flex flex-wrap gap-1.5">
          {product.badges.map((badge) => (
            <span
              className="brand-pill bg-[var(--brand-primary-soft)] px-2.5 py-1 text-[0.72rem] text-[var(--brand-primary-strong)]"
              key={badge}
            >
              {badge}
            </span>
          ))}
        </div>
      ) : null}

      <dl className="m-0 grid grid-cols-2 gap-x-4 gap-y-2.5 max-[560px]:grid-cols-1">
        <Row label="상품 ID" value={product.id} />
        <Row label="브랜드" value={product.brand} />
        <Row label="카테고리" value={product.categoryName || product.categoryCode} />
        <Row label="노출 상태" value={product.isActive ? "노출 중" : "숨김"} />
        <Row label="추천 상품" value={product.isFeatured ? "예" : "아니오"} />
        <Row label="노출 순서" value={String(product.displayOrder)} />
        <Row label="출고가" value={formatPrice(product.releasePrice)} />
      </dl>

      <ImageStrip images={product.descriptionImages} label="설명 이미지" />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5 border-b border-slate-100 pb-2">
      <dt className="text-xs font-bold text-slate-500">{label}</dt>
      <dd className="m-0 min-w-0 overflow-hidden text-ellipsis text-sm font-semibold text-slate-950">
        {value || "—"}
      </dd>
    </div>
  );
}

function ImageStrip({
  images,
  label,
}: {
  images: AdminProductImage[];
  label: string;
}) {
  if (!images.length) return null;

  return (
    <section className="grid gap-2">
      <span className="text-xs font-bold text-slate-500">
        {label} ({images.length})
      </span>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((image, index) => (
          <div
            className="relative aspect-square w-24 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
            key={`${image.url}-${index}`}
          >
            <Image
              alt={image.alt ?? ""}
              className="object-cover"
              fill
              sizes="96px"
              src={image.url}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function formatPrice(price: number | null) {
  return price === null ? "" : `${price.toLocaleString("ko-KR")}원`;
}
