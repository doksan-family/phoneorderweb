import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/terms", label: "이용약관" },
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/support", label: "FAQ" },
  { href: "/notices", label: "공지사항" },
  { href: "/consultation", label: "상담신청" }
];

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-slate-950 text-[0.82rem] leading-[1.8] text-slate-400">
      <div className="site-container flex items-start justify-between gap-8 border-b border-white/[0.07] pb-8 pt-10 max-[900px]:flex-col">
        <div className="grid gap-1">
          <div className="relative mb-3 h-14 w-14 overflow-hidden rounded-2xl bg-black">
            <Image
              alt="핵폰"
              className="object-cover"
              fill
              sizes="56px"
              src="/images/logo/hack_phone_logo_1.png"
            />
          </div>
          <p className="m-0 mb-1 text-[1.05rem] font-extrabold text-white">
            핵<span className="text-[var(--brand-accent)]">폰</span>
          </p>
          <p className="m-0">대표자 김대표 &nbsp;|&nbsp; 사업자등록번호 000-00-00000</p>
          <p className="m-0">서울특별시 중구 상담로 10</p>
          <p className="m-0">
            고객센터 <strong className="font-bold text-white">02-0000-0000</strong> &nbsp;(평일 10:00 – 19:00)
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-x-5 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              className="text-[0.83rem] font-semibold text-slate-400 transition hover:text-[var(--brand-accent)]"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="site-container py-[18px] text-[0.76rem] text-slate-600">
        © 2025 핵폰. All rights reserved. &nbsp;|&nbsp; 통신판매업신고번호 제0000-서울중구-0000호
      </div>
    </footer>
  );
}
