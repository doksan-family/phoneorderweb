"use client";

import { useQuery } from "@tanstack/react-query";
import { siteSettingsQueryOptions } from "@/entities/site-settings/model/queries";

/**
 * 사업자 정보는 실제 값이 올 때까지 fallback으로 먼저 그리고,
 * 백그라운드 조회가 끝나면 값을 교체한다. 최초 렌더는 서버와 항상 같아야
 * hydration mismatch가 안 나므로 fallback은 로딩 상태에서도 그대로 쓴다.
 */
export function SiteFooterInfo() {
  const { data } = useQuery(siteSettingsQueryOptions.public());

  const companyName = data?.company_name ?? "핵폰";
  const representativeName = data?.representative_name ?? "김대표";
  const businessNumber = data?.business_registration_number ?? "000-00-00000";
  const address = data?.address ?? "서울특별시 중구 상담로 10";
  const phone = data?.representative_phone ?? "02-0000-0000";
  const hours = data?.customer_service_hours ?? "평일 10:00 – 19:00";

  return (
    <div className="grid content-start gap-1">
      <p className="m-0 mb-1 text-[1.05rem] font-extrabold text-white">
        핵<span className="text-[var(--brand-accent)]">폰</span>
      </p>
      <p className="m-0">
        {companyName} &nbsp;|&nbsp; 대표자 {representativeName} &nbsp;|&nbsp;
        사업자등록번호 {businessNumber}
      </p>
      <p className="m-0">{address}</p>
      <p className="m-0">
        고객센터 <strong className="font-bold text-white">{phone}</strong>{" "}
        &nbsp;({hours})
      </p>
    </div>
  );
}

export function SiteFooterSocialLinks() {
  const { data } = useQuery(siteSettingsQueryOptions.public());
  const links = [
    { href: data?.kakao_channel_url, label: "카카오톡 채널" },
    { href: data?.instagram_url, label: "인스타그램" },
    { href: data?.youtube_url, label: "유튜브" },
  ].filter((link): link is { href: string; label: string } => Boolean(link.href));

  if (!links.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {links.map((link) => (
        <a
          className="text-[0.83rem] font-semibold text-slate-400 transition hover:text-[var(--brand-accent)]"
          href={link.href}
          key={link.label}
          rel="noreferrer"
          target="_blank"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function SiteFooterCopyright() {
  const { data } = useQuery(siteSettingsQueryOptions.public());

  const copyrightText = data?.copyright_text ?? "© 2025 핵폰. All rights reserved.";
  const ecommerceNumber = data?.ecommerce_registration_number ?? "제0000-서울중구-0000호";

  return (
    <span className="text-[0.76rem] text-slate-600">
      {copyrightText} &nbsp;|&nbsp; 통신판매업신고번호 {ecommerceNumber}
    </span>
  );
}
