"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

type NavigationItem = {
  href: string;
  label: string;
  pathname: string;
  category?: string;
  /** 삼성·애플은 카테고리가 아니라 제조사로 고른다. */
  brand?: string;
};

const navigationItems: NavigationItem[] = [
  { href: "/products?category=special", label: "특가", pathname: "/products", category: "special" },
  { href: "/products?brand=samsung", label: "삼성", pathname: "/products", brand: "samsung" },
  { href: "/products?brand=apple", label: "애플", pathname: "/products", brand: "apple" },
  { href: "/products?category=kids_free", label: "키즈폰/공짜폰", pathname: "/products", category: "kids_free" },
  { href: "/products?category=internet_tv", label: "인터넷/TV", pathname: "/products", category: "internet_tv" },
  { href: "/consultation", label: "상담신청", pathname: "/consultation" },
  { href: "/applications", label: "신청조회", pathname: "/applications" },
  { href: "/reviews", label: "후기", pathname: "/reviews" },
  { href: "/support", label: "고객센터", pathname: "/support" }
];

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
