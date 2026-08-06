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
    <footer className="bg-slate-950 text-[0.82rem] leading-[1.8] text-slate-400">
      <div className="site-container flex min-h-44 items-stretch justify-between gap-10 border-b border-white/[0.07] pb-8 pt-10 max-[900px]:flex-col-reverse max-[900px]:items-start max-[900px]:gap-6">
        <div className="grid content-start gap-1">
          <p className="m-0 mb-1 text-[1.05rem] font-extrabold text-white">
            핵<span className="text-[var(--brand-accent)]">폰</span>
          </p>
          <p className="m-0">대표자 김대표 &nbsp;|&nbsp; 사업자등록번호 000-00-00000</p>
          <p className="m-0">서울특별시 중구 상담로 10</p>
          <p className="m-0">
            고객센터 <strong className="font-bold text-white">02-0000-0000</strong> &nbsp;(평일 10:00 – 19:00)
          </p>
        </div>
        {/* 배지 배경을 푸터색으로 맞춘 버전이라 경계 없이 얹힌다. */}
        <div className="relative w-64 shrink-0 self-stretch max-[900px]:h-40 max-[900px]:w-40 max-[900px]:self-auto">
          <Image
            alt="핵폰"
            className="object-contain object-right max-[900px]:object-left"
            fill
            sizes="(max-width: 900px) 160px, 256px"
            src="/images/logo/hack_phone_logo_1_footer.png"
          />
        </div>
      </div>
      <div className="site-container flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-[18px]">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
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
        <span className="text-[0.76rem] text-slate-600">
          © 2025 핵폰. All rights reserved. &nbsp;|&nbsp; 통신판매업신고번호 제0000-서울중구-0000호
        </span>
      </div>
    </footer>
  );
}
