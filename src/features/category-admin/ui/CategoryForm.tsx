"use client";

import type { AdminProductCategory } from "@/entities/product/api/categories";
import {
  adminCheckboxClass,
  adminErrorClass,
  adminFieldClass,
  adminInlineFieldClass,
  primaryButtonClass,
  secondaryButtonClass,
  twoColumnFieldGridClass,
} from "@/features/admin/ui/adminStyles";
import { LoadingOverlay } from "@/shared/ui/LoadingOverlay";
import { useCategoryForm } from "../model/useCategoryForm";

type CategoryFormProps = {
  category?: AdminProductCategory;
  nextOrder?: number;
  onCancel?: () => void;
  onSaved?: (category: AdminProductCategory) => void;
};

export function CategoryForm({
  category,
  nextOrder,
  onCancel,
  onSaved,
}: CategoryFormProps) {
  const form = useCategoryForm({ category, nextOrder, onSaved });

  return (
    <form className="grid gap-4" onSubmit={form.submit}>
      <div className={twoColumnFieldGridClass}>
        <label className={adminFieldClass}>
          코드
          <input
            disabled={form.isEdit}
            placeholder="samsung"
            required
            value={form.draft.code}
            onChange={(event) => form.update("code", event.target.value)}
          />
        </label>
        <label className={adminFieldClass}>
          카테고리명
          <input
            required
            value={form.draft.name}
            onChange={(event) => form.update("name", event.target.value)}
          />
        </label>
      </div>
      <label className={adminFieldClass}>
        노출 순서
        <input
          min={0}
          type="number"
          value={form.draft.displayOrder}
          onChange={(event) =>
            form.update("displayOrder", Number(event.target.value) || 0)
          }
        />
      </label>
      <div className={twoColumnFieldGridClass}>
        <label className={adminInlineFieldClass}>
          <input
            checked={form.draft.isActive}
            className={adminCheckboxClass}
            type="checkbox"
            onChange={(event) => form.update("isActive", event.target.checked)}
          />
          활성화
        </label>
        <label className={adminInlineFieldClass}>
          <input
            checked={form.draft.showInMainMenu}
            className={adminCheckboxClass}
            type="checkbox"
            onChange={(event) =>
              form.update("showInMainMenu", event.target.checked)
            }
          />
          메인 메뉴 노출
        </label>
      </div>
      {form.error ? <p className={adminErrorClass}>{form.error}</p> : null}
      <div className="flex justify-end gap-2 max-[560px]:grid">
        {onCancel ? (
          <button className={secondaryButtonClass} type="button" onClick={onCancel}>
            취소
          </button>
        ) : null}
        <button
          className={primaryButtonClass}
          disabled={form.loading}
          type="submit"
          onMouseUp={(event) => event.currentTarget.form?.requestSubmit()}
        >
          {form.loading ? "저장 중..." : form.isEdit ? "카테고리 수정" : "카테고리 등록"}
        </button>
      </div>
      {form.loading ? <LoadingOverlay /> : null}
    </form>
  );
}
