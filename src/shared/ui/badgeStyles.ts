/*
 * 상품 이미지 위에 얹히는 뱃지.
 * 이미지가 영역을 꽉 채우므로 배경이 밝을지 어두울지 알 수 없어
 * 반투명 + backdrop-blur로 어떤 이미지 위에서도 흰 글씨가 읽히게 한다.
 * backdrop-filter 미지원 브라우저에서는 불투명도를 높여 가독성을 지킨다.
 */
const badgeGlassBase =
  "brand-pill border border-white/30 font-bold text-white shadow-[0_2px_10px_rgba(21,24,15,0.22)] backdrop-blur-md backdrop-saturate-150";

export const badgeGlassClass = `${badgeGlassBase} px-[9px] py-1 text-[0.66rem]`;

export const badgeGlassLargeClass = `${badgeGlassBase} px-[11px] py-[5px] text-[0.72rem]`;

/** 프로모션 태그(특가·인기 등) */
export const badgeHotClass =
  "bg-[rgba(255,92,138,0.82)] supports-[backdrop-filter]:bg-[rgba(255,92,138,0.6)]";

/** 운영자 등록 뱃지 */
export const badgeInkClass =
  "bg-[rgba(21,24,15,0.62)] supports-[backdrop-filter]:bg-[rgba(21,24,15,0.42)]";
