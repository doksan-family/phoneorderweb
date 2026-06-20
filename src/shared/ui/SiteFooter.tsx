import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__info">
          <p className="site-footer__brand">Phone<em>Order</em></p>
          <p>대표자 김대표 &nbsp;|&nbsp; 사업자등록번호 000-00-00000</p>
          <p>서울특별시 중구 상담로 10</p>
          <p>고객센터 <strong style={{ color: "rgba(255,255,255,0.75)" }}>02-0000-0000</strong> &nbsp;(평일 10:00 – 19:00)</p>
        </div>
        <div className="site-footer__links">
          <Link href="/terms">이용약관</Link>
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/support">FAQ</Link>
          <Link href="/notices">공지사항</Link>
          <Link href="/consultation">상담신청</Link>
        </div>
      </div>
      <div className="site-footer__bottom">
        © 2025 PhoneOrder. All rights reserved. &nbsp;|&nbsp; 통신판매업신고번호 제0000-서울중구-0000호
      </div>
    </footer>
  );
}
