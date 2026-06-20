import type { Banner, Faq, HeroBanner, Notice, Review } from "./types";

export const heroBanners: HeroBanner[] = [
  {
    id: "hero-1",
    title: "갤럭시 S25 특가 상담",
    subtitle: "번호이동 시 최대 혜택 안내. 지금 바로 상담 신청하세요.",
    bgColor: "linear-gradient(130deg, #eff6ff 0%, #dbeafe 100%)",
    visible: true,
    order: 1
  },
  {
    id: "hero-2",
    title: "아이폰 16 시리즈 상담",
    subtitle: "최신 아이폰을 가장 저렴하게. 조건 비교 상담 신청.",
    bgColor: "linear-gradient(130deg, #f0fdf4 0%, #dcfce7 100%)",
    visible: true,
    order: 2
  },
  {
    id: "hero-3",
    title: "키즈폰 0원 특가",
    subtitle: "자녀 첫 번째 폰, 공짜폰으로 시작하세요.",
    bgColor: "linear-gradient(130deg, #fefce8 0%, #fef9c3 100%)",
    visible: true,
    order: 3
  }
];

export const banners: Banner[] = [
  {
    id: "summer-switch",
    title: "상담 신청으로 빠르게 비교",
    description: "번호이동, 기기변경 조건을 남겨주시면 담당자가 확인합니다.",
    imageUrl: "/images/event-banner.svg",
    visible: true,
    order: 1
  }
];

export const reviews: Review[] = [
  {
    id: "review-1",
    title: "기기변경 상담이 빨랐어요",
    content: "원하는 모델과 요금제를 기준으로 설명을 받아 결정하기 쉬웠습니다.",
    imageUrl: "/images/phone-core.svg",
    createdAt: "2026-06-10",
    visible: true
  },
  {
    id: "review-2",
    title: "부모님 폰 상담 완료",
    content: "복잡한 조건을 정리해서 안내받아 실속형 모델로 진행했습니다.",
    imageUrl: "/images/phone-aurora.svg",
    createdAt: "2026-06-14",
    visible: true
  }
];

export const notices: Notice[] = [
  {
    id: "notice-1",
    title: "상담 신청 운영 시간 안내",
    content: "평일 오전 10시부터 오후 7시까지 순차적으로 연락드립니다.",
    createdAt: "2026-06-01",
    visible: true
  },
  {
    id: "notice-2",
    title: "상품 가격 안내 기준",
    content: "가격, 요금, 할인 정보는 상담 시점의 조건에 따라 달라질 수 있습니다.",
    createdAt: "2026-06-05",
    visible: true
  }
];

export const faqs: Faq[] = [
  {
    id: "faq-1",
    question: "회원가입 없이 상담 신청이 가능한가요?",
    answer: "가능합니다. 이름, 휴대폰 번호, 조회용 비밀번호로 신청합니다.",
    visible: true,
    order: 1
  },
  {
    id: "faq-2",
    question: "온라인 결제도 가능한가요?",
    answer: "본 서비스 범위에는 온라인 결제가 포함되지 않습니다.",
    visible: true,
    order: 2
  },
  {
    id: "faq-3",
    question: "실시간 재고나 가격이 반영되나요?",
    answer: "실시간 재고 및 가격 연동은 별도 합의가 필요한 항목입니다.",
    visible: true,
    order: 3
  }
];
