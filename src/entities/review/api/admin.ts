import { apiFetch, apiFetchMultipart } from "@/shared/api/client";
import { createClient } from "@/shared/lib/supabase/client";
import type {
  AdminReview,
  PublicReviewDetailResponse,
  PublicReviewListResponse,
  PublicReviewPage,
} from "../model/types";
import { toPublicReviewsSearch, type PublicReviewsParams } from "./public";

export type AdminReviewsParams = PublicReviewsParams;

/** GET /functions/v1/admin-reviews (id 없이 = 목록, 비공개 후기도 포함) */
export async function fetchAdminReviews(
  params: AdminReviewsParams = {}
): Promise<PublicReviewPage> {
  const accessToken = await getAccessToken();
  const response = await apiFetch<PublicReviewListResponse>(
    `/functions/v1/admin-reviews${toPublicReviewsSearch(params)}`,
    undefined,
    accessToken
  );
  return response.data;
}

/** GET /functions/v1/admin-reviews?id= (단건) */
export async function fetchAdminReview(id: string): Promise<AdminReview> {
  const accessToken = await getAccessToken();
  const search = new URLSearchParams({ id });
  const response = await apiFetch<PublicReviewDetailResponse>(
    `/functions/v1/admin-reviews?${search.toString()}`,
    undefined,
    accessToken
  );
  return response.data;
}

export type AdminReviewCreatePayload = {
  product_id?: string;
  title: string;
  content: string;
  author_name: string;
  rating: number;
  is_featured?: boolean;
  is_published?: boolean;
  display_order?: number;
  /** png·jpg·jpeg·webp·gif, 파일당 10MB. 보낸 순서대로 저장된다. */
  image_files?: File[];
};

/** POST /functions/v1/admin-reviews (multipart/form-data) */
export async function createAdminReview(
  payload: AdminReviewCreatePayload
): Promise<AdminReview> {
  const formData = new FormData();
  if (payload.product_id) formData.append("product_id", payload.product_id);
  formData.append("title", payload.title);
  formData.append("content", payload.content);
  formData.append("author_name", payload.author_name);
  formData.append("rating", String(payload.rating));
  if (payload.is_featured !== undefined)
    formData.append("is_featured", String(payload.is_featured));
  if (payload.is_published !== undefined)
    formData.append("is_published", String(payload.is_published));
  if (payload.display_order !== undefined)
    formData.append("display_order", String(payload.display_order));
  payload.image_files?.forEach((file) => formData.append("image_files", file));

  const accessToken = await getAccessToken();
  const response = await apiFetchMultipart<PublicReviewDetailResponse>(
    "/functions/v1/admin-reviews",
    formData,
    accessToken
  );
  return response.data;
}

/** PATCH /functions/v1/admin-reviews?id= 본문 (multipart/form-data, 부분 수정) */
export type AdminReviewUpdatePayload = {
  /** 빈 문자열을 보내면 상품 연결이 해제된다. */
  product_id?: string;
  title?: string;
  content?: string;
  author_name?: string;
  rating?: number;
  is_featured?: boolean;
  is_published?: boolean;
  display_order?: number;
  /** 보내면 기존 이미지 전체가 이 목록으로 교체된다. 빼면 기존 이미지가 유지된다. */
  image_files?: File[];
  /** image_files 없이 true면 기존 이미지를 모두 제거한다. */
  replace_images?: boolean;
};

/** PATCH /functions/v1/admin-reviews?id= (multipart/form-data) */
export async function updateAdminReview(
  id: string,
  payload: AdminReviewUpdatePayload
): Promise<AdminReview> {
  const formData = new FormData();
  if (payload.product_id !== undefined)
    formData.append("product_id", payload.product_id);
  if (payload.title !== undefined) formData.append("title", payload.title);
  if (payload.content !== undefined) formData.append("content", payload.content);
  if (payload.author_name !== undefined)
    formData.append("author_name", payload.author_name);
  if (payload.rating !== undefined) formData.append("rating", String(payload.rating));
  if (payload.is_featured !== undefined)
    formData.append("is_featured", String(payload.is_featured));
  if (payload.is_published !== undefined)
    formData.append("is_published", String(payload.is_published));
  if (payload.display_order !== undefined)
    formData.append("display_order", String(payload.display_order));
  payload.image_files?.forEach((file) => formData.append("image_files", file));
  if (payload.replace_images !== undefined)
    formData.append("replace_images", String(payload.replace_images));

  const accessToken = await getAccessToken();
  const search = new URLSearchParams({ id });
  const response = await apiFetchMultipart<PublicReviewDetailResponse>(
    `/functions/v1/admin-reviews?${search.toString()}`,
    formData,
    accessToken,
    "PATCH"
  );
  return response.data;
}

/** DELETE /functions/v1/admin-reviews?id= (후기와 첨부 이미지를 함께 지운다) */
export async function deleteAdminReview(id: string): Promise<void> {
  const accessToken = await getAccessToken();
  const search = new URLSearchParams({ id });
  await apiFetch<unknown>(
    `/functions/v1/admin-reviews?${search.toString()}`,
    { method: "DELETE" },
    accessToken
  );
}

async function getAccessToken(): Promise<string | undefined> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}
