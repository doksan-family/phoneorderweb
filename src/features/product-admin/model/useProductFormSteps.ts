import { useRef, useState, type FormEvent } from "react";
import type { useProductForm } from "./useProductForm";
import { validateProductBasics, validateProductOptions, validateProductPricing } from "./productValidate";

const validators = [validateProductBasics, validateProductOptions, validateProductPricing];

export function useProductFormSteps(form: ReturnType<typeof useProductForm>) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function goTo(next: number) {
    setStep(next);
    setError("");
    requestAnimationFrame(() => {
      const button = formRef.current?.querySelector<HTMLButtonElement>(`[data-step-button="${next}"]`);
      button?.focus({ preventScroll: true });
      formRef.current?.scrollIntoView({ block: "start" });
    });
  }

  function check(index: number) {
    try {
      validators[index](form.draft);
      if (index === 0 && !form.productImages.length && !form.keptProductImages.length) {
        throw new Error("상품 이미지를 1개 이상 추가해 주세요.");
      }
      const panel = formRef.current?.querySelector(`[data-product-step="${index}"]`);
      const invalid = panel?.querySelector<HTMLInputElement | HTMLSelectElement>("input:invalid, select:invalid");
      if (invalid) {
        goTo(index);
        setError(invalid.validationMessage);
        requestAnimationFrame(() => invalid.reportValidity());
        return false;
      }
      return true;
    } catch (cause) {
      goTo(index);
      setError(cause instanceof Error ? cause.message : "입력 내용을 확인해 주세요.");
      if (index === 2) {
        const invalidEntry = form.draft.pricingEntries.find((entry) => {
          try {
            validateProductPricing({ variants: form.draft.variants, pricingEntries: [entry] });
            return false;
          } catch {
            return true;
          }
        });
        requestAnimationFrame(() => {
          const buttons = formRef.current?.querySelectorAll<HTMLButtonElement>("[data-pricing-entry-id]");
          const button = Array.from(buttons ?? []).find((item) => item.dataset.pricingEntryId === invalidEntry?.id);
          button?.click();
          requestAnimationFrame(() => button?.focus());
        });
      }
      return false;
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.loading) return;
    if (step < 2) {
      if (check(step)) goTo(step + 1);
      return;
    }
    for (let index = 0; index < validators.length; index += 1) {
      if (!check(index)) return;
    }
    setError("");
    await form.submit(event);
  }

  return { step, error, formRef, goTo, submit };
}
