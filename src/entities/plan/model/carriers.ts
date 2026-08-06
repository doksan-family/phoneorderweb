import type { CarrierCode } from "@/entities/plan/api/types";

export const carrierOptions: { label: string; value: CarrierCode }[] = [
  { label: "SKT", value: "skt" },
  { label: "KT", value: "kt" },
  { label: "LG U+", value: "lguplus" },
];
