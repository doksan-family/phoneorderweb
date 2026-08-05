"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Product } from "@/entities/product/model/types";
import { productDetailProfile } from "@/entities/product/model/mock-detail";
import { productQueryOptions } from "@/entities/product/model/queries";
import { useStoredProducts } from "@/entities/product/model/useStoredProducts";
import { ProductDetailConfigurator } from "@/features/product-detail/ui/ProductDetailConfigurator";
import { ProductDescriptionImages } from "./ProductDescriptionImages";
import { ProductDetailTabs } from "./ProductDetailTabs";
import { ProductGallery } from "./ProductGallery";
import { ProductPriceSummary } from "./ProductPriceSummary";

type ProductDetailViewProps = {
  initialProduct: Product | null;
  productId: string;
};

export function ProductDetailView({
  initialProduct,
  productId,
}: ProductDetailViewProps) {
  const { products } = useStoredProducts();
  const { data: apiDetail, isPending: isApiPending } = useQuery(
    productQueryOptions.publicDetail(productId)
  );
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setStorageReady(true), 0);

    return () => window.clearTimeout(timer);
  }, []);

  const storedProduct = storageReady
    ? products.find((item) => item.id === productId)
    : null;
  const product = apiDetail?.product ?? storedProduct ?? initialProduct;
  const profile = apiDetail?.profile ?? productDetailProfile;

  if (!product && isApiPending) {
    return (
      <main className="site-container py-20">
        <h1 className="m-0 text-2xl font-extrabold">상품을 불러오는 중입니다.</h1>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="site-container py-20">
        <h1 className="m-0 text-2xl font-extrabold">상품을 찾을 수 없습니다.</h1>
        <Link className="mt-5 inline-flex font-bold underline" href="/products">
          상품 목록으로
        </Link>
      </main>
    );
  }

  const badges = product.badges ?? [];

  return (
    <main className="site-container pt-10 pb-[112px]">
      <section className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-6">
        <ProductGallery product={product} />
        <div>
          {badges.length ? (
            <div className="mb-1.5 flex flex-wrap gap-1.5">
              {badges.map((badge) => (
                <span
                  className="brand-pill bg-[var(--brand-primary-soft)] px-2.5 py-1 text-[0.72rem] text-[var(--brand-primary-strong)]"
                  key={badge}
                >
                  {badge}
                </span>
              ))}
            </div>
          ) : null}
          <h1 className="m-0 text-[clamp(1.5rem,3vw,2.1rem)] font-extrabold leading-[1.25] tracking-[-0.02em] text-slate-950">
            {product.name}
          </h1>
          <p className="mb-5 mt-1.5 text-[0.9rem] leading-[1.6] text-slate-500">
            {product.summary}
          </p>
          <ProductDetailConfigurator
            priceSummary={<ProductPriceSummary product={product} />}
            productId={product.id}
            profile={profile}
          />
        </div>
      </section>

      <ProductDetailTabs profile={profile} />

      {product.detail ? (
        <section className="mt-12">
          <h2 className="m-0 mb-3 text-[1rem] font-extrabold tracking-[-0.02em] text-slate-950">
            상세 정보
          </h2>
          <p className="m-0 max-w-[760px] text-[0.9rem] leading-[1.7] text-slate-700">
            {product.detail}
          </p>
        </section>
      ) : null}

      <ProductDescriptionImages images={product.descriptionImages ?? []} />
    </main>
  );
}
