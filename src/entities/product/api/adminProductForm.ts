import type { AdminProductUpdatePayload } from "./adminProductTypes";

/** undefined인 필드는 보내지 않아 서버가 기존 값을 유지한다. */
export function appendProductFields(
  formData: FormData,
  payload: AdminProductUpdatePayload
) {
  appendText(formData, "category_code", payload.category_code);
  appendText(formData, "brand", payload.brand);
  appendText(formData, "name", payload.name);
  if (payload.summary) formData.append("summary", payload.summary);
  payload.badges?.forEach((badge) => formData.append("badges", badge));
  appendText(formData, "is_featured", payload.is_featured);
  appendText(formData, "display_order", payload.display_order);
  appendText(formData, "is_active", payload.is_active);
  appendJson(formData, "variants", payload.variants);
  appendJson(formData, "plan_ids", payload.plan_ids);
  appendJson(formData, "subscription_types", payload.subscription_types);
  appendJson(
    formData,
    "installment_month_options",
    payload.installment_month_options
  );
  appendJson(formData, "colors", payload.colors);
  appendJson(formData, "pricing_overrides", payload.pricing_overrides);
}

function appendText(
  formData: FormData,
  key: string,
  value: string | number | boolean | undefined
) {
  if (value === undefined) return;
  formData.append(key, String(value));
}

function appendJson(formData: FormData, key: string, value: unknown[] | undefined) {
  if (value === undefined) return;
  formData.append(key, JSON.stringify(value));
}
