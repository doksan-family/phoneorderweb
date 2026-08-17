"use client";

import { useQuery } from "@tanstack/react-query";
import { productCategoryQueryOptions } from "@/entities/product/model/categoryQueries";
import { badgeOptionGroups } from "../model/badgeOptions";
import type { ProductBadge } from "../model/types";

type ProductBadgeFieldsProps = {
  values: ProductBadge[];
  onChange: (values: ProductBadge[]) => void;
};

export function ProductBadgeFields({
  values,
  onChange,
}: ProductBadgeFieldsProps) {
  const { data: categories } = useQuery(productCategoryQueryOptions.adminList());
  const categoryGroup = {
    label: "카테고리",
    badges: (categories ?? [])
      .filter((category) => category.is_active)
      .sort((first, second) => first.display_order - second.display_order)
      .map((category) => category.name),
  };
  const groups = categoryGroup.badges.length
    ? [categoryGroup, ...badgeOptionGroups]
    : badgeOptionGroups;

  return (
    <section className="grid gap-3">
      <span className="text-sm font-bold text-slate-700">
        배지
        {values.length ? (
          <span className="ml-2 font-medium text-slate-500">{values.length}개 선택됨</span>
        ) : null}
      </span>
      {groups.map((group) => (
        <div className="grid gap-1.5" key={group.label}>
          <span className="text-xs font-bold text-slate-500">{group.label}</span>
          <div className="flex flex-wrap gap-2">
            {group.badges.map((badge) => (
              <button
                aria-pressed={values.includes(badge)}
                className={getBadgeClass(values.includes(badge))}
                key={badge}
                type="button"
                onClick={() => onChange(toggleBadge(values, badge))}
              >
                {badge}
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function toggleBadge(values: ProductBadge[], badge: ProductBadge) {
  if (values.includes(badge)) {
    return values.filter((item) => item !== badge);
  }

  return [...values, badge];
}

function getBadgeClass(active: boolean) {
  const base = "rounded-lg border px-3 py-1.5 text-sm font-bold transition";

  return active
    ? `${base} border-[var(--brand-primary-strong)] bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]`
    : `${base} border-slate-200 bg-white text-slate-500 hover:bg-[var(--brand-primary-soft)] hover:text-slate-950`;
}
