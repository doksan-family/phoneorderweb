"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { AdminProductSummary } from "@/entities/product/api/admin";
import { productQueryOptions } from "@/entities/product/model/queries";
import { AdminCreateDialog } from "@/shared/ui/AdminCreateDialog";
import { Skeleton } from "@/shared/ui/Skeleton";
import { AdminProductDetailBody } from "./AdminProductDetailBody";
import { ProductForm } from "./ProductForm";

type AdminProductDetailModalProps = {
  productId: string;
  /** 목록에 이미 있는 값. 상세 응답이 오기 전까지 먼저 보여준다. */
  fallback?: AdminProductSummary;
  onClose: () => void;
};

const editButtonClass =
  "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-700 transition hover:bg-[var(--brand-primary-soft)]";

export function AdminProductDetailModal({
  productId,
  fallback,
  onClose,
}: AdminProductDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { data, error, isPending } = useQuery({
    ...productQueryOptions.adminDetail(productId),
    placeholderData: fallback,
  });

  return (
    <AdminCreateDialog
      title={isEditing ? "상품 수정" : "상품 상세"}
      onClose={onClose}
    >
      {error ? (
        <p className="m-0 text-sm font-bold text-red-600">
          상품을 불러오지 못했습니다. {error.message}
        </p>
      ) : isPending ? (
        <AdminProductDetailSkeleton />
      ) : !data ? (
        <p className="m-0 text-sm text-slate-500">
          상품을 찾을 수 없습니다. (id: {productId})
        </p>
      ) : isEditing ? (
        <ProductForm
          product={data}
          onCancel={() => setIsEditing(false)}
          onUpdate={() => setIsEditing(false)}
        />
      ) : (
        <div className="grid gap-4">
          <AdminProductDetailBody product={data} />
          <div className="flex justify-end">
            <button
              className={editButtonClass}
              type="button"
              onClick={() => setIsEditing(true)}
            >
              수정
            </button>
          </div>
        </div>
      )}
    </AdminCreateDialog>
  );
}

function AdminProductDetailSkeleton() {
  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton className="size-24 rounded-lg" key={index} />
        ))}
      </div>
      <div className="grid gap-2">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-3 w-3/5" />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 max-[560px]:grid-cols-1">
        {Array.from({ length: 8 }, (_, index) => (
          <div className="grid gap-1.5 border-b border-slate-100 pb-2" key={index}>
            <Skeleton className="h-2.5 w-16" />
            <Skeleton className="h-3.5 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
