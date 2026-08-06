"use client";

import { useQuery } from "@tanstack/react-query";
import { productQueryOptions } from "@/entities/product/model/queries";
import { ProductDetailConfigurator } from "@/features/product-detail/ui/ProductDetailConfigurator";
import { Skeleton } from "@/shared/ui/Skeleton";

type ProductPickerDetailProps = {
  productId: string;
  onBack: () => void;
  onSelect: () => void;
};

export function ProductPickerDetail({
  productId,
  onBack,
  onSelect,
}: ProductPickerDetailProps) {
  const { data, isPending } = useQuery(
    productQueryOptions.publicDetail(productId)
  );

  return (
    <div className="grid gap-4">
      <button
        className="w-fit cursor-pointer text-sm font-bold text-slate-500 underline-offset-4 hover:underline"
        type="button"
        onClick={onBack}
      >
        ← 상품 목록으로
      </button>

      {isPending || !data ? (
        <div className="grid gap-3">
          <Skeleton className="h-6 w-2/5" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
        </div>
      ) : (
        <>
          <div className="grid gap-1">
            <strong className="text-lg text-slate-950">
              {data.product.name}
            </strong>
            {data.product.summary ? (
              <span className="text-[0.85rem] leading-[1.6] text-slate-500">
                {data.product.summary}
              </span>
            ) : null}
          </div>
          <ProductDetailConfigurator
            hideBackLink
            productId={productId}
            profile={data.profile}
            onConsultationSelect={onSelect}
          />
        </>
      )}
    </div>
  );
}
