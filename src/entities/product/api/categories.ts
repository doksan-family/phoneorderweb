import { apiFetch } from "@/shared/api/client";
import { createClient } from "@/shared/lib/supabase/client";
import type {
  AdminProductCategory,
  AdminProductCategoryListResponse,
  AdminProductCategoryResponse,
  ProductCategoryCreatePayload,
  ProductCategoryUpdatePayload,
  PublicProductCategoryListResponse,
} from "./categoryTypes";

export type {
  AdminProductCategory,
  ProductCategoryCreatePayload,
  ProductCategoryUpdatePayload,
  PublicProductCategory,
} from "./categoryTypes";

/** placement="main_menu"를 넘기면 상단 메뉴 노출 대상만 온다. */
export async function fetchPublicProductCategories(params: {
  placement?: "main_menu";
} = {}) {
  const search = params.placement ? `?placement=${params.placement}` : "";
  const response = await apiFetch<PublicProductCategoryListResponse>(
    `/functions/v1/public-products/categories${search}`,
    { next: { revalidate: 60 } }
  );
  return response.data.items;
}

export async function fetchAdminProductCategories(): Promise<
  AdminProductCategory[]
> {
  const accessToken = await getAccessToken();
  const response = await apiFetch<AdminProductCategoryListResponse>(
    "/functions/v1/admin-products/categories",
    undefined,
    accessToken
  );
  return response.data.items;
}

export async function createAdminProductCategory(
  payload: ProductCategoryCreatePayload
) {
  const accessToken = await getAccessToken();
  const response = await apiFetch<AdminProductCategoryResponse>(
    "/functions/v1/admin-products/categories",
    { method: "POST", body: JSON.stringify(payload) },
    accessToken
  );
  return response.data;
}

/** code는 변경 불가라 query로 대상만 지정한다. */
export async function updateAdminProductCategory(
  code: string,
  payload: ProductCategoryUpdatePayload
) {
  const accessToken = await getAccessToken();
  const response = await apiFetch<AdminProductCategoryResponse>(
    `/functions/v1/admin-products/categories?code=${encodeURIComponent(code)}`,
    { method: "PATCH", body: JSON.stringify(payload) },
    accessToken
  );
  return response.data;
}

async function getAccessToken(): Promise<string | undefined> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}
