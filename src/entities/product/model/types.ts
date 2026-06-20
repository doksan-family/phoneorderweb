export type ProductCategory = {
  id: string;
  name: string;
  description: string;
  order: number;
  visible: boolean;
};

export type ProductSaleType = "번호이동" | "기기변경" | "신규가입";

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  imageUrl: string;
  imageAlt: string;
  summary: string;
  detail: string;
  originalPrice: number;
  salePrice: number;
  planName: string;
  planMonthlyPrice: number;
  monthlyEstimate: number;
  priceGuide: string;
  planGuide: string;
  discountGuide: string;
  saleTypes: ProductSaleType[];
  cardTag: "HOT" | "NEW" | "BEST";
  discountRate: number;
  visible: boolean;
  order: number;
};

export type ProductOption = {
  id: string;
  label: string;
  description?: string;
};

export type ProductColorOption = ProductOption & {
  hexCode: string;
};

export type ProductPlanOption = ProductOption & {
  monthlyPrice: number;
  benefits: string[];
};

export type ProductDiscountOption = ProductOption & {
  totalBenefit: number;
};

export type ProductEstimate = {
  devicePrice: number;
  carrierSupport: number;
  storeSupport: number;
  installmentMonths: number;
  monthlyPlanPrice: number;
  monthlyInstallment: number;
  monthlyTotal: number;
  note: string;
};

export type ProductDetailProfile = {
  colors: ProductColorOption[];
  capacities: ProductOption[];
  currentCarriers: ProductOption[];
  joiningCarriers: ProductOption[];
  plans: ProductPlanOption[];
  discounts: ProductDiscountOption[];
  estimate: ProductEstimate;
  detailTabs: {
    modelInfo: string[];
    cautions: string[];
  };
};
