export type PublicProductCategory = {
  code: string;
  name: string;
  display_order: number;
  show_in_main_menu: boolean;
};

export type PublicProductCategoryListResponse = {
  ok: boolean;
  data: { items: PublicProductCategory[] };
};

export type AdminProductCategory = {
  code: string;
  name: string;
  display_order: number;
  is_active: boolean;
  show_in_main_menu: boolean;
  product_count: number;
  active_product_count: number;
  created_at: string;
  updated_at: string;
};

export type AdminProductCategoryListResponse = {
  ok: boolean;
  data: { items: AdminProductCategory[] };
};

export type AdminProductCategoryResponse = {
  ok: boolean;
  data: AdminProductCategory;
};

export type ProductCategoryCreatePayload = {
  code: string;
  name: string;
  display_order?: number;
  is_active?: boolean;
  show_in_main_menu?: boolean;
};

export type ProductCategoryUpdatePayload = {
  name?: string;
  display_order?: number;
  is_active?: boolean;
  show_in_main_menu?: boolean;
};
