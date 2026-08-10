"use client";

import { PackageSearch } from "lucide-react";
import { useState } from "react";
import { ProductPickerModal } from "./ProductPickerModal";

/** 아직 상품을 고르지 않았을 때 좌측에 놓이는 자리. */
export function ConsultationProductPicker() {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <section className="brand-card grid content-start justify-items-center gap-3 p-8 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]">
        <PackageSearch size={24} aria-hidden />
      </span>
      <div className="grid gap-1">
        <strong className="text-[0.98rem] text-slate-950">
          문의할 상품을 골라주세요
        </strong>
        <span className="text-[0.85rem] leading-[1.6] text-slate-500">
          상품과 조건을 고르면 예상 견적까지 함께 접수됩니다.
        </span>
      </div>
      <button
        className="inline-flex min-h-12 items-center justify-center rounded-[14px] px-6 text-[0.9rem] font-bold bg-[var(--brand-cta)] text-white shadow-[0_2px_8px_var(--brand-cta-shadow)] transition hover:bg-[var(--brand-cta-hover)]"
        type="button"
        onClick={() => setIsPickerOpen(true)}
      >
        상품 고르러 가기
      </button>

      {isPickerOpen ? (
        <ProductPickerModal onClose={() => setIsPickerOpen(false)} />
      ) : null}
    </section>
  );
}
