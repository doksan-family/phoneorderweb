"use client";

import { useConsultationForm } from "../model/useConsultationForm";
import { ConsultationAgreementFields } from "./ConsultationAgreementFields";
import { ConsultationComplete } from "./ConsultationComplete";
import { ConsultationContactFields } from "./ConsultationContactFields";
import { ConsultationProductPicker } from "./ConsultationProductPicker";
import { ConsultationSelectionSummary } from "./ConsultationSelectionSummary";

const submitClass =
  "inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-transparent rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] bg-[var(--brand-cta)] text-white shadow-[0_2px_8px_var(--brand-cta-shadow)] transition hover:bg-[var(--brand-cta-hover)]";

export function ConsultationForm() {
  const {
    completedProductName,
    error,
    form,
    isSubmitting,
    selection,
    submit,
    updateCheckField,
    updateTextField,
  } = useConsultationForm();

  if (completedProductName) {
    return <ConsultationComplete productName={completedProductName} />;
  }

  return (
    <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] items-start gap-5 max-[900px]:grid-cols-1">
      {selection.product ? (
        <ConsultationSelectionSummary
          conditions={selection.conditions}
          estimate={selection.estimate}
          product={selection.product}
        />
      ) : (
        <ConsultationProductPicker />
      )}

      <form className="grid content-start gap-5 brand-card p-8" onSubmit={submit}>
        <ConsultationContactFields
          name={form.name}
          phone={form.phone}
          password={form.password}
          onChange={updateTextField}
        />
        <ConsultationAgreementFields
          privacyAgreed={form.privacyAgreed}
          marketingAgreed={form.marketingAgreed}
          onChange={updateCheckField}
        />
        {error ? <p className="m-0 text-red-600 text-sm font-bold">{error}</p> : null}
        <button
          className={`${submitClass} disabled:cursor-not-allowed disabled:opacity-60`}
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "신청 중..." : "상담 신청하기"}
        </button>
      </form>
    </div>
  );
}
