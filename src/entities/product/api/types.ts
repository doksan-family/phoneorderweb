export type ProductCreateVariantInput = {
  storage_value: string;
  original_price: number;
  sale_price: number;
  display_order: number;
  is_active: boolean;
};

export type ProductCreateColorInput = {
  label: string;
  value: string;
  color_hex: string | null;
  display_order: number;
  is_active: boolean;
};

export type ProductCreatePricingOverrideInput = {
  storage_value: string | null;
  plan_id: string | null;
  subscription_type: string | null;
  device_price: number | null;
  support_amount: number | null;
  extra_support_amount: number | null;
  monthly_plan_discount: number | null;
  total_benefit_amount: number | null;
  calculation_method: string;
  calculation_params: Record<string, never>;
  priority: number;
};

export type ProductCreatePayload = {
  category_code: string;
  brand: string;
  name: string;
  summary: string | null;
  badges: string[];
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  variants: ProductCreateVariantInput[];
  colors: ProductCreateColorInput[];
  plan_ids: string[];
  subscription_types: string[];
  installment_month_options: number[];
  pricing_overrides: ProductCreatePricingOverrideInput[];
};

export type ProductCreateImage = {
  url: string;
  alt: string;
  display_order: number;
};

export type AdminProductCreateResponse = {
  id: string;
  thumbnail_image_url?: string;
  product_images?: ProductCreateImage[];
  badges?: string[];
  description_images?: ProductCreateImage[];
};
