import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-[#111827] text-[rgba(255,255,255,0.55)] text-[0.84rem] leading-[1.75] mt-20">
      <div className="flex justify-between gap-8 items-start px-8 pt-10 pb-8 border-b border-[rgba(255,255,255,0.07)] max-[900px]:flex-col">
        <div className="grid gap-1">
          <p className="text-[1.2rem] font-black text-white tracking-[-0.3px] mb-2.5 [&_em]:text-blue-700 [&_em]:not-italic">
            Phone<em>Order</em>
          </p>
          <p>대표자 김대표 &nbsp;|&nbsp; 사업자등록번호 000-00-00000</p>
          <p>서울특별시 중구 상담로 10</p>
          <p>고객센터 <strong className="text-[rgba(255,255,255,0.75)]">02-0000-0000</strong> &nbsp;(평일 10:00 – 19:00)</p>
        </div>
        <div className="flex gap-5 items-start flex-wrap">
          <Link href="/terms" className="text-[rgba(255,255,255,0.55)] text-[0.85rem] transition hover:text-white">이용약관</Link>
          <Link href="/privacy" className="text-[rgba(255,255,255,0.55)] text-[0.85rem] transition hover:text-white">개인정보처리방침</Link>
          <Link href="/support" className="text-[rgba(255,255,255,0.55)] text-[0.85rem] transition hover:text-white">FAQ</Link>
          <Link href="/notices" className="text-[rgba(255,255,255,0.55)] text-[0.85rem] transition hover:text-white">공지사항</Link>
          <Link href="/consultation" className="text-[rgba(255,255,255,0.55)] text-[0.85rem] transition hover:text-white">상담신청</Link>
        </div>
      </div>
      <div className="px-8 py-[18px] text-[0.78rem] text-[rgba(255,255,255,0.28)]">
        © 2025 PhoneOrder. All rights reserved. &nbsp;|&nbsp; 통신판매업신고번호 제0000-서울중구-0000호
      </div>
    </footer>
  );
}
