"use client";

import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { createConsultation } from "@/entities/consultation/api/public";
import type { TextField } from "@/entities/consultation/model/types";
import {
  PHONE_PREFIX,
  isPhoneComplete,
  toPhoneDigits,
} from "@/shared/lib/phone";
import { useConsultationSelection } from "./useConsultationSelection";

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
    phone: PHONE_PREFIX,
    password: "",
    privacyAgreed: false,
    marketingAgreed: false,
  });
  const [error, setError] = useState("");
  const [completedProductName, setCompletedProductName] = useState("");

  const createMutation = useMutation({
    mutationFn: createConsultation,
    onSuccess: () => setCompletedProductName(selection.product?.name ?? ""),
    onError: (cause: Error) => setError(cause.message),
  });

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

    if (!selection.payload) {
      setError("상품 상세에서 요금제와 조건을 다시 선택해 주세요.");
      return;
    }

    if (!form.name || !isPhoneComplete(form.phone) || !form.password) {
      setError("이름, 휴대폰 번호, 조회용 비밀번호를 입력해 주세요.");
      return;
    }

    if (!form.privacyAgreed) {
      setError("개인정보 수집 및 이용 동의가 필요합니다.");
      return;
    }

    createMutation.mutate({
      name: form.name.trim(),
      phone: toPhoneDigits(form.phone),
      password: form.password,
      privacy_agreed: true,
      marketing_agreed: form.marketingAgreed,
      ...selection.payload,
    });
  }

  return {
    completedProductName,
    error,
    form,
    isSubmitting: createMutation.isPending,
    selection,
    submit,
    updateCheckField,
    updateTextField,
  };
}
