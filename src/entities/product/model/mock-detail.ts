import type { ProductDetailProfile } from "./types";

const defaultBenefits = [
  "집/이동전화 무제한+부가통화 300분",
  "문자 기본제공",
  "데이터 무제한",
  "테더링+쉐어링 80GB",
  "콘텐츠 혜택은 상담 시점 정책에 따라 안내"
];

export const productDetailProfile: ProductDetailProfile = {
  colors: [
    { id: "black", label: "스페이스 블랙", hexCode: "#111111" },
    { id: "white", label: "클라우드 화이트", hexCode: "#ffffff" },
    { id: "gold", label: "라이트 골드", hexCode: "#f5dfae" },
    { id: "blue", label: "스카이 블루", hexCode: "#cfe5ff" }
  ],
  capacities: [
    { id: "256", label: "256GB" },
    { id: "512", label: "512GB", description: "+297,000원 상담 안내" }
  ],
  currentCarriers: [
    { id: "skt", label: "SKT" },
    { id: "kt", label: "KT" },
    { id: "lgu", label: "LGU+" },
    { id: "mvno", label: "알뜰폰" }
  ],
  joiningCarriers: [
    { id: "skt", label: "SKT" },
    { id: "kt", label: "KT" },
    { id: "lgu", label: "LGU+" }
  ],
  plans: [
    { id: "plus95", label: "플러스플랜95", monthlyPrice: 95000, benefits: defaultBenefits },
    { id: "basic75", label: "베이직75", monthlyPrice: 75000, benefits: ["데이터 충분", "통화 기본제공", "문자 기본제공"] }
  ],
  discounts: [
    { id: "support", label: "지원금할인", description: "개통 유형별 지원금 상담", totalBenefit: 550000 },
    { id: "contract", label: "선택약정할인", description: "24개월 요금 할인 기준", totalBenefit: 570000 }
  ],
  estimate: {
    devicePrice: 1584000,
    carrierSupport: 550000,
    storeSupport: 834000,
    installmentMonths: 24,
    monthlyPlanPrice: 95000,
    monthlyInstallment: 8855,
    monthlyTotal: 103855,
    note: "실제 조건은 상담 시점의 통신사 정책과 재고에 따라 달라질 수 있습니다."
  },
  detailTabs: {
    modelInfo: ["대표 이미지와 색상은 예시입니다.", "상세 스펙은 API 연동 후 모델별로 표시합니다."],
    cautions: ["실시간 재고, 실시간 가격, 정책 자동 반영은 별도 연동 범위입니다.", "상담 신청은 결제가 아니며 담당자 확인 후 진행됩니다."]
  }
};
