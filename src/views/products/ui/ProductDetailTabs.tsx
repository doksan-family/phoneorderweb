import type { ProductDetailProfile } from "@/entities/product/model/types";

type ProductDetailTabsProps = {
  profile: ProductDetailProfile;
};

export function ProductDetailTabs({ profile }: ProductDetailTabsProps) {
  return (
    <div className="mt-12 grid grid-cols-2 gap-8 max-[900px]:grid-cols-1 max-[900px]:gap-7">
      <CheckList title="주요 특징" items={profile.detailTabs.modelInfo} />
      <CheckList title="상담 유의사항" items={profile.detailTabs.cautions} />
    </div>
  );
}

function CheckList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;

  return (
    <section>
      <h2 className="m-0 mb-3 text-[1rem] font-extrabold tracking-[-0.02em] text-slate-950">
        {title}
      </h2>
      <ul className="m-0 grid list-none gap-2.5 p-0">
        {items.map((item) => (
          <li className="flex items-start gap-2 text-[0.86rem] leading-[1.5] text-slate-700" key={item}>
            <span aria-hidden className="shrink-0 text-[var(--brand-primary-strong)]">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
