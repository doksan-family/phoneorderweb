import Image from "next/image";
import Link from "next/link";
import { adminNavItems, type AdminTab } from "./adminDashboardConfig";

type AdminSidebarProps = {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
};

function navButtonClass(isActive: boolean) {
  return [
    "w-full cursor-pointer rounded-md px-3.5 py-3 text-left text-sm transition max-[900px]:text-center max-[900px]:whitespace-nowrap",
    isActive
      ? "bg-[var(--brand-primary-soft)] font-extrabold text-slate-950"
      : "bg-transparent font-bold text-slate-500 hover:bg-zinc-50 hover:text-slate-900",
  ].join(" ");
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  return (
    <aside
      className="sticky top-0 flex h-screen flex-col gap-[34px] border-r border-slate-200 bg-white px-7 py-[30px] max-[900px]:static max-[900px]:grid max-[900px]:h-auto max-[900px]:gap-4 max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:p-5 max-[560px]:px-3.5 max-[560px]:py-[18px]"
      aria-label="관리자 메뉴"
    >
      <Link className="relative block h-12 w-28" href="/" aria-label="핵폰 홈">
        <Image
          alt="핵폰"
          className="object-contain object-left"
          fill
          priority
          sizes="112px"
          src="/images/logo/hack_phone_logo_2.png"
        />
      </Link>
      <nav className="grid gap-3.5 max-[900px]:grid-cols-[repeat(6,minmax(120px,1fr))] max-[900px]:overflow-x-auto max-[900px]:[-webkit-overflow-scrolling:touch] max-[560px]:grid-cols-2">
        {adminNavItems.map((item) => (
          <button
            className={navButtonClass(activeTab === item.id)}
            key={item.id}
            onClick={() => onTabChange(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
