"use client";

import { type FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAdminNotice,
  updateAdminNotice,
} from "@/entities/content/api/adminCustomerCenter";
import type { PublicNotice } from "@/entities/content/model/customerCenterTypes";
import {
  adminErrorClass,
  adminFieldClass,
  primaryButtonClass,
  twoColumnFieldGridClass,
} from "@/features/admin/ui/adminStyles";
import { ToggleCard } from "@/shared/ui/ToggleCard";

type AdminNoticeFormProps = {
  /** 있으면 수정 모드(PATCH), 없으면 등록 모드(POST) */
  notice?: PublicNotice;
  onSaved: () => void;
};

const initialValue = {
  title: "",
  content: "",
  isPinned: false,
  isPublished: false,
};

export function AdminNoticeForm({ notice, onSaved }: AdminNoticeFormProps) {
  const [value, setValue] = useState(() =>
    notice
      ? {
          title: notice.title,
          content: notice.content,
          isPinned: notice.is_pinned,
          isPublished: notice.is_published,
        }
      : initialValue
  );
  const queryClient = useQueryClient();
  const isEdit = Boolean(notice);

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = {
        title: value.title.trim(),
        content: value.content.trim(),
        is_pinned: value.isPinned,
        is_published: value.isPublished,
        display_order: notice?.display_order ?? 0,
      };
      return notice
        ? updateAdminNotice(notice.id, payload)
        : createAdminNotice(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-notices"] });
      await queryClient.invalidateQueries({ queryKey: ["public-notices"] });
      if (!notice) setValue(initialValue);
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
        제목 *
        <input
          required
          value={value.title}
          onChange={(event) => update("title", event.target.value)}
        />
      </label>

      <label className={adminFieldClass}>
        본문 *
        <textarea
          required
          rows={6}
          value={value.content}
          onChange={(event) => update("content", event.target.value)}
        />
      </label>

      <div className={twoColumnFieldGridClass}>
        <ToggleCard
          checked={value.isPublished}
          description="체크하면 등록 즉시 공지사항 페이지에 노출됩니다."
          title="바로 공개"
          onChange={(checked) => update("isPublished", checked)}
        />
        <ToggleCard
          checked={value.isPinned}
          description="목록 맨 위에 고정해서 보여줍니다."
          title="상단 고정"
          onChange={(checked) => update("isPinned", checked)}
        />
      </div>

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
        {saveMutation.isPending
          ? "저장 중…"
          : isEdit
            ? "공지사항 저장"
            : "공지사항 등록"}
      </button>
    </form>
  );
}
