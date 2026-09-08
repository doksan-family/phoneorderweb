import type { ProductBadge } from "./types";

export type BadgeOptionGroup = {
  label: string;
  badges: ProductBadge[];
};

/** 휴대폰 판매·상담 사이트에서 흔히 쓰는 배지 프리셋 */
export const badgeOptionGroups: BadgeOptionGroup[] = [
  {
    label: "프로모션",
    badges: ["특가", "최저가", "한정수량", "사은품", "이벤트", "마감임박"]
  },
  {
    label: "신상 · 상태",
    badges: ["NEW", "사전예약", "출시예정", "HOT", "BEST", "인기", "재입고", "미개봉"]
  },
  {
    label: "네트워크 · 기기",
    badges: ["5G", "LTE", "자급제", "eSIM"]
  },
  {
    label: "가입 유형",
    badges: ["번호이동", "기기변경"]
  },
  {
    label: "가격 혜택",
    badges: ["0원폰", "공짜폰", "할부원금 0원", "요금할인"]
  },
  {
    label: "결합 · 대상",
    badges: ["인터넷결합", "TV결합", "키즈폰", "효도폰"]
  }
];

export const badgeOptions: ProductBadge[] = badgeOptionGroups.flatMap(
  (group) => group.badges
);
