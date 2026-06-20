import type { Product, ProductCategory } from "./types";

export const productCategories: ProductCategory[] = [
  {
    id: "samsung",
    name: "삼성",
    description: "갤럭시 시리즈 특가 상담",
    order: 1,
    visible: true
  },
  {
    id: "apple",
    name: "애플",
    description: "아이폰 시리즈 특가 상담",
    order: 2,
    visible: true
  },
  {
    id: "kids",
    name: "키즈폰/공짜폰",
    description: "어린이 전용 및 0원 특가",
    order: 3,
    visible: true
  },
  {
    id: "internet",
    name: "인터넷/TV",
    description: "인터넷·IPTV 결합 상담",
    order: 4,
    visible: true
  }
];

export const products: Product[] = [
  {
    id: "aurora-pro",
    name: "오로라 Pro 256GB",
    categoryId: "samsung",
    categoryName: "삼성",
    imageUrl: "/images/phone-aurora.svg",
    imageAlt: "오로라 Pro 휴대폰 대표 이미지",
    summary: "고성능 카메라와 밝은 디스플레이를 갖춘 대표 모델",
    detail: "사진, 영상, 업무를 모두 빠르게 처리하는 프리미엄 모델입니다.",
    originalPrice: 1_350_000,
    salePrice: 702_000,
    planName: "플러스플랜95",
    planMonthlyPrice: 95_000,
    monthlyEstimate: 124_250,
    priceGuide: "상담 후 요금제와 개통 유형에 따라 안내",
    planGuide: "5G 요금제 상담 가능",
    discountGuide: "제휴 할인과 매장 프로모션 별도 안내",
    saleTypes: ["번호이동", "기기변경"],
    cardTag: "HOT",
    discountRate: 48,
    visible: true,
    order: 1
  },
  {
    id: "core-lite",
    name: "코어 Lite 128GB",
    categoryId: "apple",
    categoryName: "애플",
    imageUrl: "/images/phone-core.svg",
    imageAlt: "코어 Lite 휴대폰 대표 이미지",
    summary: "기본기가 탄탄한 합리적인 실속형 모델",
    detail: "통화, 메시지, 영상 시청 중심 사용자에게 적합한 모델입니다.",
    originalPrice: 680_000,
    salePrice: 449_000,
    planName: "베이직75",
    planMonthlyPrice: 75_000,
    monthlyEstimate: 93_700,
    priceGuide: "월 납부 예상 금액은 상담 시 안내",
    planGuide: "LTE 및 5G 요금제 상담 가능",
    discountGuide: "가족 결합 할인 가능 여부 상담",
    saleTypes: ["기기변경", "신규가입"],
    cardTag: "BEST",
    discountRate: 34,
    visible: true,
    order: 2
  },
  {
    id: "flex-fold",
    name: "플렉스 Fold 512GB",
    categoryId: "samsung",
    categoryName: "삼성",
    imageUrl: "/images/phone-fold.svg",
    imageAlt: "플렉스 Fold 휴대폰 대표 이미지",
    summary: "넓은 화면으로 업무와 콘텐츠를 편하게 보는 폴더블 모델",
    detail: "멀티태스킹과 영상 감상에 강한 대화면 폴더블 라인입니다.",
    originalPrice: 2_100_000,
    salePrice: 1_218_000,
    planName: "플러스플랜95",
    planMonthlyPrice: 95_000,
    monthlyEstimate: 145_750,
    priceGuide: "출고가 및 프로모션은 상담 후 확정",
    planGuide: "프리미엄 5G 요금제 상담 가능",
    discountGuide: "특가 이벤트 진행 여부 별도 안내",
    saleTypes: ["번호이동", "기기변경", "신규가입"],
    cardTag: "HOT",
    discountRate: 42,
    visible: true,
    order: 3
  }
];

export function getVisibleProducts() {
  return products.filter((product) => product.visible).sort(sortByOrder);
}

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId);
}

function sortByOrder(first: Product, second: Product) {
  return first.order - second.order;
}
