export type CarrierCode = "skt" | "kt" | "lguplus";

export type AdminPlan = {
  id: string;
  carrier_code: CarrierCode | string;
  name: string;
  monthly_fee: number;
  description?: string[];
  data_amount?: string;
  call_text_description?: string;
  display_order?: number;
  is_active?: boolean;
};

export type AdminPlanResponseItem = {
  id?: string;
  plan_id?: string;
  planId?: string;
  uuid?: string;
  carrier_code?: CarrierCode | string;
  carrierCode?: CarrierCode | string;
  carrier?: CarrierCode | string;
  name?: string;
  plan_name?: string;
  planName?: string;
  monthly_fee?: number;
  monthlyFee?: number;
  plan_monthly_fee?: number;
  description?: string[];
  data_amount?: string;
  dataAmount?: string;
  call_text_description?: string;
  callTextDescription?: string;
  display_order?: number;
  displayOrder?: number;
  is_active?: boolean;
  isActive?: boolean;
};

export type AdminPlanListData =
  | AdminPlanResponseItem[]
  | { data?: AdminPlanResponseItem[]; plans?: AdminPlanResponseItem[]; items?: AdminPlanResponseItem[] };

export type AdminPlanCreatePayload = {
  carrier_code: CarrierCode;
  name: string;
  monthly_fee: number;
  description: string[];
  data_amount: string;
  call_text_description: string;
  display_order: number;
  is_active: boolean;
};

export type FetchAdminPlansParams = {
  carrierCode?: CarrierCode;
  includeInactive?: boolean;
};

export type AdminPlanListResponse =
  | AdminPlanResponseItem[]
  | { data: AdminPlanListData }
  | { plans: AdminPlanResponseItem[] }
  | { items: AdminPlanResponseItem[] };
