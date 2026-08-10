"use client";

import { type FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAdminFaq,
  updateAdminFaq,
} from "@/entities/content/api/adminCustomerCenter";
import type { PublicFaq } from "@/entities/content/model/customerCenterTypes";
import {
  adminErrorClass,
  adminFieldClass,
  primaryButtonClass,
} from "@/features/admin/ui/adminStyles";
import { navigationLabels } from "@/shared/ui/SiteNav";
import { ToggleCard } from "@/shared/ui/ToggleCard";

const faqCategories = [...navigationLabels, "자주 묻는 질문"];

type AdminFaqFormProps = {
  /** 있으면 수정 모드(PATCH), 없으면 등록 모드(POST) */
  faq?: PublicFaq;
  onSaved: () => void;
};

const initialValue = {
  category: "",
  question: "",
  answer: "",
  isPublished: false,
};

export function AdminFaqForm({ faq, onSaved }: AdminFaqFormProps) {
  const [value, setValue] = useState(() =>
    faq
      ? {
          category: faq.category,
          question: faq.question,
          answer: faq.answer,
          isPublished: faq.is_published,
        }
      : initialValue
  );
  const queryClient = useQueryClient();
  const isEdit = Boolean(faq);
  // 목록에 없는 기존 분류를 수정하다가 값이 사라지지 않도록 선택지에 넣어준다.
  const categoryOptions =
    value.category && !faqCategories.includes(value.category)
      ? [...faqCategories, value.category]
      : faqCategories;

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = {
        category: value.category.trim(),
        question: value.question.trim(),
        answer: value.answer.trim(),
        is_published: value.isPublished,
        display_order: faq?.display_order ?? 0,
      };
      return faq ? updateAdminFaq(faq.id, payload) : createAdminFaq(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-faqs"] });
      await queryClient.invalidateQueries({ queryKey: ["public-faqs"] });
      if (!faq) setValue(initialValue);
      onSaved();
    },
  });

  function update<K extends keyof typeof initialValue>(
    key: K,
    next: (typeof initialValue)[K]
  ) {
    setValue((current) => ({ ...current, [key]: next }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveMutation.mutate();
  }

  return (
    <form className="grid gap-4" onSubmit={submit}>
      <label className={adminFieldClass}>
        분류 *
        <select
          required
          value={value.category}
          onChange={(event) => update("category", event.target.value)}
        >
          <option disabled value="">
            분류 선택
          </option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className={adminFieldClass}>
        질문 *
        <input
          required
          value={value.question}
          onChange={(event) => update("question", event.target.value)}
        />
      </label>

      <label className={adminFieldClass}>
        답변 *
        <textarea
          required
          rows={6}
          value={value.answer}
          onChange={(event) => update("answer", event.target.value)}
        />
      </label>

      <ToggleCard
        checked={value.isPublished}
        description="체크하면 등록 즉시 고객센터 FAQ에 노출됩니다."
        title="바로 공개"
        onChange={(checked) => update("isPublished", checked)}
      />

      {saveMutation.error ? (
        <p className={adminErrorClass}>
          {saveMutation.error instanceof Error
            ? saveMutation.error.message
            : isEdit
              ? "수정에 실패했습니다."
              : "등록에 실패했습니다."}
        </p>
      ) : null}

      <button
        className={primaryButtonClass}
        disabled={saveMutation.isPending}
        type="submit"
      >
        {saveMutation.isPending ? "저장 중…" : isEdit ? "FAQ 저장" : "FAQ 등록"}
      </button>
    </form>
  );
}
