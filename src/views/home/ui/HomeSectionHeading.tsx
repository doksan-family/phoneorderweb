import Link from "next/link";

type HomeSectionHeadingProps = {
  eyebrow: string;
  title: string;
  moreHref?: string;
  moreLabel?: string;
};

export function HomeSectionHeading({
  eyebrow,
  title,
  moreHref,
  moreLabel = "전체보기"
}: HomeSectionHeadingProps) {
  return (
    <div className="mb-[22px] flex items-end justify-between gap-4">
      <div>
        <p className="brand-eyebrow m-0">{eyebrow}</p>
        <h2 className="brand-title">{title}</h2>
      </div>
      {moreHref ? (
        <Link
          className="shrink-0 whitespace-nowrap text-[0.85rem] font-bold text-[var(--brand-primary-strong)] transition hover:text-slate-950"
          href={moreHref}
        >
          {moreLabel} →
        </Link>
      ) : null}
    </div>
  );
}
