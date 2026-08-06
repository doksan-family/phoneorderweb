"use client";

import { type FormEvent, useState } from "react";
import type {
  AdminContentCreateInput,
  AdminContentType,
} from "../model/adminContent";

type ContentCreateFormProps = {
  onCancel: () => void;
  onCreate: (input: AdminContentCreateInput) => void;
};

const fieldClass = "grid gap-2 text-sm font-bold text-slate-700";
const btnPrimary =
  "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-[10px] border border-transparent bg-[var(--brand-cta)] px-5 text-sm font-extrabold text-white shadow-[0_2px_8px_var(--brand-cta-shadow)] transition hover:bg-[var(--brand-cta-hover)]";
const btnSecondary =
  "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-[10px] border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-700 transition hover:bg-[var(--brand-primary-soft)]";

export function ContentCreateForm({
  onCancel,
  onCreate,
}: ContentCreateFormProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<AdminContentType>("후기");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    onCreate({ title: title.trim(), type });
    setTitle("");
  }

  return (
    <form className="grid gap-4" onSubmit={submit}>
      <label className={fieldClass}>
        유형
        <select
          value={type}
          onChange={(event) => setType(event.target.value as AdminContentType)}
        >
          <option value="후기">구매후기</option>
          <option value="공지">공지사항</option>
          <option value="FAQ">FAQ</option>
        </select>
      </label>
      <label className={fieldClass}>
        제목 또는 질문
        <input
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label className={fieldClass}>
        이미지
        <input aria-label="이미지 업로드" type="file" />
      </label>
      <div className="flex justify-end gap-2 max-[560px]:grid">
        <button className={btnSecondary} type="button" onClick={onCancel}>
          취소
        </button>
        <button className={btnPrimary} type="submit">
          콘텐츠 등록
        </button>
      </div>
    </form>
  );
}
