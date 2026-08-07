"use client";

import { useState } from "react";

type AdminApplicationMemoFieldProps = {
  memo: string;
  isSaving?: boolean;
  onSave: (memo: string) => void;
};

/** 관리자 메모 편집. 저장 버튼을 눌러야 PATCH가 나간다. */
export function AdminApplicationMemoField({
  memo,
  isSaving,
  onSave,
}: AdminApplicationMemoFieldProps) {
  const [draft, setDraft] = useState(memo);

  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      관리자 메모
      <textarea
        className="min-h-[96px] rounded-xl border border-slate-300 p-3 text-[0.88rem] font-normal text-slate-950"
        placeholder="상담 내용, 후속 조치 등을 남겨 주세요."
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />
      <button
        className="w-fit cursor-pointer rounded-[12px] bg-slate-950 px-4 py-2 text-[0.85rem] font-bold text-white disabled:cursor-default disabled:opacity-50"
        disabled={isSaving || draft === memo}
        type="button"
        onClick={() => onSave(draft)}
      >
        {isSaving ? "저장 중..." : "메모 저장"}
      </button>
    </label>
  );
}
