import Link from "next/link";

const navigationItems = [
  { href: "/products?deal=hot", label: "특가", isBrand: true },
  { href: "/products?brand=samsung", label: "삼성", isBrand: true },
  { href: "/products?brand=apple", label: "애플", isBrand: true },
  { href: "/products?category=kids", label: "키즈폰/공짜폰", isBrand: true },
  { href: "/products?category=internet", label: "인터넷/TV", isBrand: true },
  { href: "/consultation", label: "상담신청", isCta: true },
  { href: "/applications", label: "신청조회" },
  { href: "/reviews", label: "후기" },
  { href: "/support", label: "고객센터" }
];

export function SiteHeader() {
  return (
    <>
      <header className="site-shell-header">
        <div className="site-header">
          <Link className="site-header__brand" href="/">
            Phone<em>Order</em>
          </Link>
        </div>
        <nav className="site-header__nav" aria-label="주요 메뉴">
          {navigationItems.map((item) => (
            <Link
              className={[
                "site-header__link",
                item.isBrand ? "site-header__link--brand" : "",
                item.isCta ? "site-header__link--cta" : ""
              ].filter(Boolean).join(" ")}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="float-actions" role="complementary" aria-label="빠른 상담">
        <a className="float-btn float-btn--kakao" href="/consultation">
          💬 <span>카카오 상담</span>
        </a>
        <a className="float-btn float-btn--phone" href="tel:02-0000-0000">
          📞 <span>전화 상담</span>
        </a>
      </div>
    </>
  );
}
