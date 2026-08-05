import { apiFetchMultipart } from "@/shared/api/client";
import { createClient } from "@/shared/lib/supabase/client";
import type {
  AdminProductCreateResponse,
  ProductCreatePayload,
} from "./types";

export type {
  AdminProductCreateResponse,
  ProductCreateColorInput,
  ProductCreateImage,
  ProductCreatePayload,
  ProductCreatePricingOverrideInput,
  ProductCreateVariantInput,
} from "./types";

type CreateAdminProductParams = {
  payload: ProductCreatePayload;
  productImages: File[];
  descriptionImages: File[];
};

export async function createAdminProduct(params: CreateAdminProductParams) {
  const formData = new FormData();
  appendProductFields(formData, params.payload);
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

function appendProductFields(formData: FormData, payload: ProductCreatePayload) {
  formData.append("category_code", payload.category_code);
  formData.append("brand", payload.brand);
  formData.append("name", payload.name);
  if (payload.summary) formData.append("summary", payload.summary);
  payload.badges.forEach((badge) => formData.append("badges", badge));
  formData.append("is_featured", String(payload.is_featured));
  formData.append("display_order", String(payload.display_order));
  formData.append("is_active", String(payload.is_active));
  formData.append("variants", JSON.stringify(payload.variants));
  formData.append("plan_ids", JSON.stringify(payload.plan_ids));
  formData.append("subscription_types", JSON.stringify(payload.subscription_types));
  formData.append(
    "installment_month_options",
    JSON.stringify(payload.installment_month_options)
  );
  if (payload.colors.length) {
    formData.append("colors", JSON.stringify(payload.colors));
  }
  if (payload.pricing_overrides.length) {
    formData.append("pricing_overrides", JSON.stringify(payload.pricing_overrides));
  }
}

async function getAccessToken(): Promise<string | undefined> {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}
