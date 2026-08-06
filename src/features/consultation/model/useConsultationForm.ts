"use client";

import { FormEvent, useState } from "react";
import { addStoredConsultation } from "@/entities/consultation/model/storage";
import type {
  ConsultationRequest,
  TextField,
} from "@/entities/consultation/model/types";
import {
  formatConsultationConditions,
  useConsultationSelection,
} from "./useConsultationSelection";

type FormState = {
  name: string;
  phone: string;
  password: string;
  privacyAgreed: boolean;
  marketingAgreed: boolean;
};

export function useConsultationForm() {
  // 문의 상품은 상세 화면이나 상품 고르기 모달에서만 정해진다.
  const selection = useConsultationSelection();
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    password: "",
    privacyAgreed: false,
    marketingAgreed: false,
  });
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState<ConsultationRequest | null>(null);

  function updateTextField(field: TextField, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateCheckField(
    field: "privacyAgreed" | "marketingAgreed",
    value: boolean
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!selection.product) {
      setError("문의할 상품을 먼저 선택해 주세요.");
      return;
    }

    if (!form.name || !form.phone || !form.password) {
      setError("이름, 휴대폰 번호, 조회용 비밀번호를 입력해 주세요.");
      return;
    }

    if (!form.privacyAgreed) {
      setError("개인정보 수집 및 이용 동의가 필요합니다.");
      return;
    }

    setCompleted(
      addStoredConsultation({
        ...form,
        conditions: formatConsultationConditions(selection.conditions),
        productId: selection.product.id,
        productName: selection.product.name,
      })
    );
  }

  return {
    completed,
    error,
    form,
    selection,
    submit,
    updateCheckField,
    updateTextField,
  };
}
