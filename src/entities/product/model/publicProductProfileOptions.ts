import type {
  PublicCarrierOption,
  PublicProductColor,
  PublicProductDetail,
} from "@/entities/product/api/public";
import type { ProductOption } from "./types";

export function mapColors(colors: PublicProductColor[] | undefined) {
  if (!colors?.length) return [];

  return [...colors]
    .sort((first, second) => getOrder(first) - getOrder(second))
    .map((color, index) => ({
      id: color.value ?? color.color_value ?? color.id ?? color.name ?? String(index + 1),
      label: color.label ?? color.color_name ?? color.name ?? color.value ?? color.color_value ?? `색상 ${index + 1}`,
      hexCode: color.color_hex ?? color.hex_code ?? color.colorHex ?? color.hex ?? "#ffffff",
    }));
}

export function mapCapacities(detail: PublicProductDetail): ProductOption[] {
  if (!detail.variants?.length) return [];

  return [...detail.variants]
    .sort((first, second) => getOrder(first) - getOrder(second))
    .map((variant) => ({
      id: variant.id,
      label: variant.storage_value,
      description: `${variant.sale_price.toLocaleString("ko-KR")}원`,
    }));
}

export function mapCarriers(detail: PublicProductDetail): ProductOption[] {
  const pricingCarriers = mapCarrierRowsFromPricing(detail);
  if (pricingCarriers.length) return pricingCarriers;
  if (detail.carriers?.length) return mapCarrierRows(detail.carriers);

  return [];
}

function mapCarrierRowsFromPricing(detail: PublicProductDetail) {
  const carriers = new Map<string, ProductOption>();
  detail.pricing_options?.forEach((option) => {
    const id = option.carrier_id ?? option.carrier_code ?? option.carrier_name;
    if (!id || carriers.has(id)) return;
    carriers.set(id, {
      id,
      label: getCarrierLabel(option.carrier_name, option.carrier_code),
    });
  });

  return Array.from(carriers.values());
}

export function mapSubscriptionTypes(detail: PublicProductDetail): ProductOption[] {
  if (!detail.subscription_types?.length) return [];

  return detail.subscription_types.map((type) => ({
    id: type.value,
    label: type.label,
  }));
}

function mapCarrierRows(carriers: PublicCarrierOption[]) {
  return [...carriers]
    .sort((first, second) => getOrder(first) - getOrder(second))
    .map((carrier, index) => {
      const id = carrier.carrier_id ?? carrier.id ?? carrier.carrier_code;
      const label = getCarrierLabel(
        carrier.label ?? carrier.carrier_name,
        carrier.carrier_code
      );

      return {
        id: id ?? String(index + 1),
        label,
      };
    });
}

function getCarrierLabel(name?: string, code?: string) {
  if (isMeaningfulText(name)) return name;
  if (code === "skt") return "SKT";
  if (code === "kt") return "KT";
  if (code === "lguplus" || code === "lg_uplus") return "LG U+";
  if (isMeaningfulText(code)) return code.toUpperCase();
  return "통신사";
}

function isMeaningfulText(value?: string): value is string {
  return !!value && value.trim() !== "" && value !== "string" && !/^\d+$/.test(value);
}

function getOrder(item: { display_order?: number; displayOrder?: number }) {
  return item.display_order ?? item.displayOrder ?? 0;
}
