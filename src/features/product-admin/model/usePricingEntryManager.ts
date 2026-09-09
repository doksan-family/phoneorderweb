import { useState } from "react";
import type { AdminPlan } from "@/entities/plan/api/admin";
import { createEmptyPricingEntry } from "./productDraft";
import { createPricingEntries } from "./pricingEntryCollection";
import { usePricingEntrySelection } from "./usePricingEntrySelection";
import type { DiscountType, ProductPricingEntryDraft } from "./types";

export function usePricingEntryManager(entries: ProductPricingEntryDraft[], plans: AdminPlan[], onChange: (entries: ProductPricingEntryDraft[]) => void) {
  const selection = usePricingEntrySelection(entries, plans);
  const [picker, setPicker] = useState<{ template?: ProductPricingEntryDraft } | null>(null);

  function add(targets: AdminPlan[], discounts: DiscountType[]) {
    const additions = createPricingEntries(entries, targets, discounts, createEmptyPricingEntry, picker?.template);
    if (additions.length) {
      onChange([...entries, ...additions]);
      selection.select(additions[0]);
    }
    setPicker(null);
  }

  function update(id: string, next: Partial<ProductPricingEntryDraft>) {
    const updated = entries.map((entry) => entry.id === id ? { ...entry, ...next } : entry);
    onChange(updated);
    const entry = updated.find((item) => item.id === id);
    if (entry) selection.select(entry);
  }

  function select(entry: ProductPricingEntryDraft) {
    setPicker(null);
    selection.select(entry);
  }

  function changeCarrier(carrier: string) {
    setPicker(null);
    selection.setCarrier(carrier);
  }

  return {
    ...selection, select, changeCarrier, picker, setPicker, add, update,
    remove: (id: string) => onChange(entries.filter((entry) => entry.id !== id)),
  };
}
