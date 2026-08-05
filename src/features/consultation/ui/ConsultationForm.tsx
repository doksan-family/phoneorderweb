"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { addStoredConsultation } from "@/entities/consultation/model/storage";
import type { ConsultationRequest, TextField } from "@/entities/consultation/model/types";
import { useStoredProducts } from "@/entities/product/model/useStoredProducts";
import { ConsultationAgreementFields } from "./ConsultationAgreementFields";
import { ConsultationComplete } from "./ConsultationComplete";
import { ConsultationContactFields } from "./ConsultationContactFields";

type FormState = {
  name: string;
  phone: string;
  productId: string;
  password: string;
  privacyAgreed: boolean;
  marketingAgreed: boolean;
};

export function ConsultationForm() {
  const searchParams = useSearchParams();
  const { products } = useStoredProducts();
  const initialProductId = searchParams.get("productId") ?? products[0]?.id ?? "";
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    productId: initialProductId,
    password: "",
    privacyAgreed: false,
    marketingAgreed: false
  });
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState<ConsultationRequest | null>(null);
  const selectedProduct = useMemo(() => {
    return products.find((product) => product.id === form.productId) ?? products[0];
  }, [form.productId, products]);

  function updateTextField(field: TextField, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateCheckField(
    field: "privacyAgreed" | "marketingAgreed",
    value: boolean
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!selectedProduct || !form.name || !form.phone || !form.password) {
      setError("이름, 휴대폰 번호, 상품, 조회용 비밀번호를 입력해 주세요.");
      return;
    }

    if (!form.privacyAgreed) {
      setError("개인정보 수집 및 이용 동의가 필요합니다.");
      return;
    }

    const request = addStoredConsultation({
      ...form,
      productName: selectedProduct.name
    });

    setCompleted(request);
  }

  if (completed) {
    return <ConsultationComplete request={completed} />;
  }

  return (
    <form
      className="grid gap-5 brand-card p-8"
      onSubmit={submitForm}
    >
      <ConsultationContactFields
        name={form.name}
        phone={form.phone}
        productId={form.productId}
        products={products}
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
        className="inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-transparent rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-[var(--brand-primary)] text-slate-950 shadow-[0_2px_8px_var(--brand-primary-shadow)] hover:bg-[var(--brand-primary-hover)]"
        type="submit"
      >
        상담 신청하기
      </button>
    </form>
  );
}
