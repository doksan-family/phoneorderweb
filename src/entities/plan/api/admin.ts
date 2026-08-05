import { apiFetch } from "@/shared/api/client";
import { createClient } from "@/shared/lib/supabase/client";
import type {
  AdminPlan,
  AdminPlanCreatePayload,
  AdminPlanListResponse,
  AdminPlanResponseItem,
  FetchAdminPlansParams,
} from "./types";

export type {
  AdminPlan,
  AdminPlanCreatePayload,
  CarrierCode,
  FetchAdminPlansParams,
} from "./types";

export async function fetchAdminPlans(params: FetchAdminPlansParams = {}) {
  const accessToken = await getAccessToken();
  const response = await apiFetch<AdminPlanListResponse>(
    `/functions/v1/admin-plans${toPlansSearch(params)}`,
    undefined,
    accessToken
  );
  return normalizePlansResponse(response);
}

export async function createAdminPlan(payload: AdminPlanCreatePayload) {
  const accessToken = await getAccessToken();
  return apiFetch<AdminPlan>(
    "/functions/v1/admin-plans",
    { method: "POST", body: JSON.stringify(payload) },
    accessToken
  );
}

function toPlansSearch(params: FetchAdminPlansParams) {
  const search = new URLSearchParams();
  if (params.carrierCode) search.set("carrier_code", params.carrierCode);
  if (params.includeInactive !== undefined) {
    search.set("include_inactive", String(params.includeInactive));
  }

  const query = search.toString();
  return query ? `?${query}` : "";
}

function normalizePlansResponse(response: AdminPlanListResponse) {
  const plans = extractPlans(response);

  return plans.map(normalizePlan).filter(isAdminPlan);
}

function extractPlans(response: AdminPlanListResponse): AdminPlanResponseItem[] {
  if (Array.isArray(response)) return response;
  if ("plans" in response) return response.plans;
  if ("items" in response) return response.items;
  if (Array.isArray(response.data)) return response.data;
  if (response.data.plans) return response.data.plans;
  if (response.data.items) return response.data.items;
  return response.data.data ?? [];
}

function normalizePlan(plan: AdminPlanResponseItem): AdminPlan | null {
  const id = plan.plan_id ?? plan.planId ?? plan.id ?? plan.uuid;
  if (!id) return null;

  return {
    id,
    carrier_code: plan.carrier_code ?? plan.carrierCode ?? plan.carrier ?? "",
    name: plan.plan_name ?? plan.planName ?? plan.name ?? id,
    monthly_fee: plan.monthly_fee ?? plan.monthlyFee ?? plan.plan_monthly_fee ?? 0,
    description: plan.description,
    data_amount: plan.data_amount ?? plan.dataAmount,
    call_text_description: plan.call_text_description ?? plan.callTextDescription,
    display_order: plan.display_order ?? plan.displayOrder,
    is_active: plan.is_active ?? plan.isActive,
  };
}

function isAdminPlan(plan: AdminPlan | null): plan is AdminPlan {
  return plan !== null;
}

async function getAccessToken(): Promise<string | undefined> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}
