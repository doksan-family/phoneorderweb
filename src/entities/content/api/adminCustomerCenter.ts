import { apiFetch } from "@/shared/api/client";
import { createClient } from "@/shared/lib/supabase/client";
import type {
  CustomerCenterDetailResponse,
  CustomerCenterListResponse,
  CustomerCenterPage,
  PublicFaq,
  PublicNotice,
} from "../model/customerCenterTypes";
import { toCustomerCenterSearch, type CustomerCenterParams } from "./customerCenter";

/** GET /functions/v1/admin-customer-center/notices (비공개 공지도 내려온다) */
export function fetchAdminNotices(
  params: CustomerCenterParams = {}
): Promise<CustomerCenterPage<PublicNotice>> {
  return fetchAdminCustomerCenter<PublicNotice>("notices", params);
}

/** GET /functions/v1/admin-customer-center/faqs (비공개 FAQ도 내려온다) */
export function fetchAdminFaqs(
  params: CustomerCenterParams = {}
): Promise<CustomerCenterPage<PublicFaq>> {
  return fetchAdminCustomerCenter<PublicFaq>("faqs", params);
}

export type AdminNoticeCreatePayload = {
  title: string;
  content: string;
  is_pinned?: boolean;
  is_published?: boolean;
  display_order?: number;
};

export type AdminFaqCreatePayload = {
  category: string;
  question: string;
  answer: string;
  is_published?: boolean;
  display_order?: number;
};

/** POST /functions/v1/admin-customer-center/notices */
export function createAdminNotice(
  payload: AdminNoticeCreatePayload
): Promise<PublicNotice> {
  return createAdminCustomerCenter<PublicNotice>("notices", payload);
}

/** POST /functions/v1/admin-customer-center/faqs */
export function createAdminFaq(
  payload: AdminFaqCreatePayload
): Promise<PublicFaq> {
  return createAdminCustomerCenter<PublicFaq>("faqs", payload);
}

async function createAdminCustomerCenter<T>(
  resource: "notices" | "faqs",
  payload: AdminNoticeCreatePayload | AdminFaqCreatePayload
): Promise<T> {
  const accessToken = await getAccessToken();
  const response = await apiFetch<CustomerCenterDetailResponse<T>>(
    `/functions/v1/admin-customer-center/${resource}`,
    { method: "POST", body: JSON.stringify(payload) },
    accessToken
  );
  return response.data;
}

/** 부분 수정이므로 보낸 필드만 바뀐다. */
export type AdminNoticeUpdatePayload = Partial<AdminNoticeCreatePayload>;
export type AdminFaqUpdatePayload = Partial<AdminFaqCreatePayload>;

/** PATCH /functions/v1/admin-customer-center/notices?id= */
export function updateAdminNotice(
  id: string,
  payload: AdminNoticeUpdatePayload
): Promise<PublicNotice> {
  return updateAdminCustomerCenter<PublicNotice>("notices", id, payload);
}

/** PATCH /functions/v1/admin-customer-center/faqs?id= */
export function updateAdminFaq(
  id: string,
  payload: AdminFaqUpdatePayload
): Promise<PublicFaq> {
  return updateAdminCustomerCenter<PublicFaq>("faqs", id, payload);
}

/** DELETE /functions/v1/admin-customer-center/{resource}?id= */
export async function deleteAdminCustomerCenter(
  resource: "notices" | "faqs",
  id: string
): Promise<void> {
  const accessToken = await getAccessToken();
  await apiFetch<unknown>(
    `/functions/v1/admin-customer-center/${resource}?${new URLSearchParams({ id })}`,
    { method: "DELETE" },
    accessToken
  );
}

async function updateAdminCustomerCenter<T>(
  resource: "notices" | "faqs",
  id: string,
  payload: AdminNoticeUpdatePayload | AdminFaqUpdatePayload
): Promise<T> {
  const accessToken = await getAccessToken();
  const search = new URLSearchParams({ id });
  const response = await apiFetch<CustomerCenterDetailResponse<T>>(
    `/functions/v1/admin-customer-center/${resource}?${search.toString()}`,
    { method: "PATCH", body: JSON.stringify(payload) },
    accessToken
  );
  return response.data;
}

async function fetchAdminCustomerCenter<T>(
  resource: "notices" | "faqs",
  params: CustomerCenterParams
): Promise<CustomerCenterPage<T>> {
  const accessToken = await getAccessToken();
  const response = await apiFetch<CustomerCenterListResponse<T>>(
    `/functions/v1/admin-customer-center/${resource}${toCustomerCenterSearch(params)}`,
    undefined,
    accessToken
  );
  return response.data;
}

async function getAccessToken(): Promise<string | undefined> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}
