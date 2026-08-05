"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type NavigationItem = {
  href: string;
  label: string;
  pathname: string;
  category?: string;
};

const navigationItems: NavigationItem[] = [
  { href: "/products?category=special", label: "특가", pathname: "/products", category: "special" },
  { href: "/products?category=samsung", label: "삼성", pathname: "/products", category: "samsung" },
  { href: "/products?category=apple", label: "애플", pathname: "/products", category: "apple" },
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
  const category = useSearchParams().get("category");

  return (
    <div className="site-container flex items-center gap-0.5 overflow-x-auto pb-2.5 max-[900px]:justify-start min-[901px]:justify-center">
      {navigationItems.map((item) => {
        const isActive =
          pathname === item.pathname &&
          (item.category ? category === item.category : true);

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={`${itemBaseClass} ${isActive ? activeClass : inactiveClass}`}
            href={item.href}
            key={item.href}
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
