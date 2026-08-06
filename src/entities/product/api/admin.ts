import { apiFetch, apiFetchMultipart } from "@/shared/api/client";
import { createClient } from "@/shared/lib/supabase/client";
import {
  mapAdminProduct,
  mapAdminProductList,
} from "@/entities/product/model/adminProductMapper";
import { appendProductFields } from "./adminProductForm";
import type {
  AdminProductUpdatePayload,
  AdminProductsParams,
} from "./adminProductTypes";
import type {
  AdminProductCreateResponse,
  ProductCreatePayload,
} from "./types";

export type {
  AdminProductImage,
  AdminProductSummary,
  AdminProductUpdatePayload,
  AdminProductsParams,
} from "./adminProductTypes";

export type {
  AdminProductCreateResponse,
  ProductCreateColorInput,
  ProductCreateImage,
  ProductCreatePayload,
  ProductCreatePricingOverrideInput,
  ProductCreateVariantInput,
} from "./types";

/**
 * 목록 조회. id를 넘기면 서버가 단건을 주므로 fetchAdminProduct를 쓴다.
 * accessToken을 넘기면 브라우저 세션을 읽지 않으므로 서버 prefetch에서 쓸 수 있다.
 */
export async function fetchAdminProducts(
  params: AdminProductsParams = {},
  accessToken?: string
) {
  const response = await requestAdminProducts(params, accessToken);
  return mapAdminProductList(response);
}

/** 단건 조회. 단건 응답과 1건짜리 목록 응답을 모두 받는다. */
export async function fetchAdminProduct(id: string, accessToken?: string) {
  const response = await requestAdminProducts({ id }, accessToken);
  const single = mapAdminProduct(unwrapDataField(response));

  return single ?? mapAdminProductList(response)[0] ?? null;
}

type UpdateAdminProductImages = {
  /** 넘기면 기존 이미지 전체를 교체한다. 비우면 기존 이미지를 유지한다. */
  productImages?: File[];
  descriptionImages?: File[];
};

/**
 * 부분 수정(multipart/form-data). 노출 토글은 is_active만 보내면 된다.
 * 배열 필드는 넘긴 값으로 기존 전체를 교체하므로 바꿀 항목만 담는다.
 */
export async function updateAdminProduct(
  id: string,
  payload: AdminProductUpdatePayload,
  images: UpdateAdminProductImages = {}
) {
  const formData = new FormData();
  appendProductFields(formData, payload);
  images.productImages?.forEach((image) => {
    formData.append("product_images", image);
  });
  images.descriptionImages?.forEach((image) => {
    formData.append("description_images", image);
  });

  const accessToken = await getAccessToken();
  const response = await apiFetchMultipart<unknown>(
    `/functions/v1/admin-products?id=${encodeURIComponent(id)}`,
    formData,
    accessToken,
    "PATCH"
  );

  return mapAdminProduct(unwrapDataField(response));
}

/** 실제 삭제가 아니라 is_active=false로 비활성화한다. */
export async function deactivateAdminProduct(id: string) {
  const accessToken = await getAccessToken();
  await apiFetch<unknown>(
    `/functions/v1/admin-products?id=${encodeURIComponent(id)}`,
    { method: "DELETE" },
    accessToken
  );
}

function unwrapDataField(response: unknown): unknown {
  if (typeof response !== "object" || response === null) return response;
  const record = response as Record<string, unknown>;
  return "data" in record ? record.data : record;
}

async function requestAdminProducts(
  params: AdminProductsParams,
  accessToken?: string
): Promise<unknown> {
  const token = accessToken ?? (await getAccessToken());

  return apiFetch<unknown>(
    `/functions/v1/admin-products${toAdminProductsSearch(params)}`,
    undefined,
    token
  );
}

function toAdminProductsSearch(params: AdminProductsParams) {
  const search = new URLSearchParams();
  if (params.id) search.set("id", params.id);
  if (params.category) search.set("category", params.category);
  if (params.include_inactive !== undefined) {
    search.set("include_inactive", String(params.include_inactive));
  }

  const query = search.toString();
  return query ? `?${query}` : "";
}

type CreateAdminProductParams = {
  payload: ProductCreatePayload;
  productImages: File[];
  descriptionImages: File[];
};

export async function createAdminProduct(params: CreateAdminProductParams) {
  const formData = new FormData();
  appendProductFields(formData, {
    ...params.payload,
    colors: params.payload.colors.length ? params.payload.colors : undefined,
    pricing_overrides: params.payload.pricing_overrides.length
      ? params.payload.pricing_overrides
      : undefined,
  });
  params.productImages.forEach((image) => {
    formData.append("product_images", image);
  });
  params.descriptionImages.forEach((image) => {
    formData.append("description_images", image);
  });

  const accessToken = await getAccessToken();
  return apiFetchMultipart<AdminProductCreateResponse>(
    "/functions/v1/admin-products",
    formData,
    accessToken
  );
}

async function getAccessToken(): Promise<string | undefined> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}
