import { useState } from "react";
import type { AdminPlan } from "@/entities/plan/api/admin";
import { carrierOptions } from "@/entities/plan/model/carriers";
import { entryCarrier } from "./pricingEntryCollection";
import type { ProductPricingEntryDraft } from "./types";

export function usePricingEntrySelection(entries: ProductPricingEntryDraft[], plans: AdminPlan[]) {
  const [carrier, setCarrier] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const carriers = [
    ...carrierOptions,
    ...[...new Set(entries.map((entry) => entryCarrier(entry, plans)))]
      .filter((code) => !carrierOptions.some((option) => option.value === code))
      .map((code) => ({ value: code, label: code === "unassigned" ? "통신사 미지정" : code })),
  ];
  const activeCarrier = carrier && carriers.some((item) => item.value === carrier)
    ? carrier : entries[0] ? entryCarrier(entries[0], plans) : carrierOptions[0].value;
  const visible = entries.filter((entry) => entryCarrier(entry, plans) === activeCarrier);
  const selected = visible.find((entry) => entry.id === selectedId) ?? visible[0];

  function select(entry: ProductPricingEntryDraft) {
    setCarrier(entryCarrier(entry, plans));
    setSelectedId(entry.id);
  }

  return { carriers, activeCarrier, selected, select, setCarrier };
}
