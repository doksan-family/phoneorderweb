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
      <header className="sticky z-[100] top-0 bg-white shadow-[0_1px_0_#e2e8f0,0_4px_24px_rgba(0,0,0,0.06)] max-[900px]:static">
        <div className="flex items-center min-h-[56px] px-8 max-[900px]:grid max-[900px]:grid-cols-1 max-[900px]:gap-3 max-[900px]:px-4 max-[900px]:py-[14px]">
          <Link
            className="text-blue-900 text-[1.35rem] font-black tracking-[-0.5px] [&_em]:text-blue-700 [&_em]:not-italic"
            href="/"
          >
            Phone<em>Order</em>
          </Link>
        </div>
        <nav
          className="flex gap-0 justify-center px-8 border-t border-slate-200 whitespace-nowrap overflow-x-auto max-[900px]:justify-start max-[900px]:px-4 max-[900px]:[scrollbar-width:none] max-[900px]:[&::-webkit-scrollbar]:hidden"
          aria-label="주요 메뉴"
        >
          {navigationItems.map((item) => (
            <Link
              className={[
                "inline-flex items-center py-[11px] px-[14px] text-[0.88rem] border-b-2 border-transparent transition hover:text-blue-700 hover:border-blue-700",
                item.isCta
                  ? "text-blue-700 font-extrabold"
                  : item.isBrand
                  ? "text-slate-950 font-bold"
                  : "text-slate-500 font-semibold"
              ].join(" ")}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div
        className="fixed z-[200] right-5 bottom-7 flex flex-col gap-2.5 items-end max-[900px]:right-3 max-[900px]:bottom-4"
        role="complementary"
        aria-label="빠른 상담"
      >
        <a
          className="inline-flex gap-2 items-center h-[46px] border-0 rounded-full px-5 text-[0.85rem] font-extrabold shadow-[0_4px_20px_rgba(0,0,0,0.2)] whitespace-nowrap cursor-pointer transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.25)] no-underline bg-[#fee500] text-[#3c1e1e]"
          href="/consultation"
        >
          💬 <span className="max-[560px]:hidden">카카오 상담</span>
        </a>
      </div>
    </>
  );
}
