"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { productCategoryQueryOptions } from "@/entities/product/model/categoryQueries";

type NavigationItem = {
  href: string;
  label: string;
  pathname: string;
  category?: string;
  /** 삼성·애플은 카테고리가 아니라 제조사로 고른다. */
  brand?: string;
};

/**
 * 삼성·애플은 카테고리 테이블에도 code로 존재하지만, 메뉴에서는 항상
 * brand 필터로 고정한다. 카테고리 관리 화면에서 이 두 code를 메인메뉴로
 * 켜도 메뉴에 중복으로 뜨지 않게 여기서 제외한다.
 */
const brandCodes = new Set(["samsung", "apple"]);

const brandItems: NavigationItem[] = [
  { href: "/products?brand=samsung", label: "삼성", pathname: "/products", brand: "samsung" },
  { href: "/products?brand=apple", label: "애플", pathname: "/products", brand: "apple" },
];

const staticItems: NavigationItem[] = [
  { href: "/consultation", label: "상담신청", pathname: "/consultation" },
  { href: "/applications", label: "신청조회", pathname: "/applications" },
  { href: "/reviews", label: "후기", pathname: "/reviews" },
  { href: "/support", label: "고객센터", pathname: "/support" },
];

/**
 * FAQ 분류 선택지처럼 메뉴와 같은 기준이 필요한 곳에서 쓰는 정적 라벨 목록이다.
 * 카테고리는 관리자가 자유롭게 추가/삭제하므로 여기에는 포함하지 않는다.
 */
export const navigationLabels = [...brandItems, ...staticItems].map(
  (item) => item.label
);

const itemBaseClass =
  "inline-flex shrink-0 items-center whitespace-nowrap rounded-[10px] px-[13px] py-[9px] text-[0.84rem] font-bold transition";

const activeClass = "bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]";

const inactiveClass = "text-slate-700 hover:bg-slate-100 hover:text-slate-950";

export function SiteNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const activeItemRef = useRef<HTMLAnchorElement>(null);

  const { data: categories } = useQuery(
    productCategoryQueryOptions.publicList("main_menu")
  );
  const categoryItems: NavigationItem[] = (categories ?? [])
    .filter((item) => !brandCodes.has(item.code))
    .map((item) => ({
      href: `/products?category=${item.code}`,
      label: item.name,
      pathname: "/products",
      category: item.code,
    }));
  // 삼성·애플 메뉴는 위치를 하드코딩하지 않고, "특가" 카테고리 바로 뒤에 끼워 넣는다.
  // "특가"가 없으면(또는 관리자가 삭제하면) 카테고리 뒤에 붙인다.
  const dealIndex = categoryItems.findIndex((item) => item.label === "특가");
  const navigationItems =
    dealIndex === -1
      ? [...categoryItems, ...brandItems, ...staticItems]
      : [
          ...categoryItems.slice(0, dealIndex + 1),
          ...brandItems,
          ...categoryItems.slice(dealIndex + 1),
          ...staticItems,
        ];

  // 가로 스크롤 메뉴에서 현재 메뉴가 화면 밖에 있으면 보이도록 맞춘다.
  useEffect(() => {
    activeItemRef.current?.scrollIntoView({ behavior: "instant", block: "nearest", inline: "center" });
  }, [pathname, category, brand]);

  return (
    <div className="site-container flex items-center gap-0.5 overflow-x-auto pb-2.5 max-[900px]:justify-start min-[901px]:justify-center">
      {navigationItems.map((item) => {
        const isActive =
          pathname === item.pathname &&
          (item.brand
            ? brand === item.brand
            : item.category
              ? category === item.category
              : !brand && !category);

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={`${itemBaseClass} ${isActive ? activeClass : inactiveClass}`}
            href={item.href}
            key={item.href}
            ref={isActive ? activeItemRef : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

export function SiteNavFallback() {
  const navigationItems = [...brandItems, ...staticItems];

  return (
    <div className="site-container flex items-center gap-0.5 overflow-x-auto pb-2.5 max-[900px]:justify-start min-[901px]:justify-center">
      {navigationItems.map((item) => (
        <span className={`${itemBaseClass} ${inactiveClass}`} key={item.href}>
          {item.label}
        </span>
      ))}
    </div>
  );
}
