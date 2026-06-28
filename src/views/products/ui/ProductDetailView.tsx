import Link from "next/link";
import type { Product } from "@/entities/product/model/types";
import { productDetailProfile } from "@/entities/product/model/mock-detail";
import { ProductDetailConfigurator } from "@/features/product-detail/ui/ProductDetailConfigurator";
import { ProductDetailTabs } from "./ProductDetailTabs";
import { ProductGallery } from "./ProductGallery";

type ProductDetailViewProps = {
  product: Product;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  return (
    <main className="w-[min(1200px,calc(100%-40px))] mx-auto pt-[42px] pb-[112px]">
      <section className="flex justify-between gap-[18px] items-start mb-6 max-[900px]:flex-col">
        <div>
          <p className="m-0 mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-blue-700">{product.categoryName}</p>
          <h1 className="m-0 text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] tracking-[-1px]">{product.name}</h1>
          <p className="text-slate-500 text-[1.05rem] leading-[1.8] mt-2.5 max-w-[660px]">{product.detail}</p>
        </div>
        <Link
          className="inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-slate-200 rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-white text-blue-900 hover:border-blue-700 hover:text-blue-700"
          href="/products"
        >
          목록으로
        </Link>
      </section>
      <section className="grid grid-cols-[auto_minmax(0,1fr)] gap-[22px] items-start max-[900px]:grid-cols-1">
        <ProductGallery product={product} />
        <div className="grid gap-[14px]">
          <div className="flex flex-wrap gap-[7px]">
            <span className="rounded-full px-2.5 py-[5px] text-[0.75rem] font-extrabold border-[1.5px] border-blue-700 text-blue-700">5G</span>
            <span className="rounded-full px-2.5 py-[5px] text-[0.75rem] font-extrabold bg-blue-900 text-white">{product.cardTag}</span>
            <span className="rounded-full px-2.5 py-[5px] text-[0.75rem] font-extrabold bg-red-50 text-red-600">{product.discountRate}% 상담 혜택</span>
          </div>
          <ProductDetailConfigurator productId={product.id} profile={productDetailProfile} />
        </div>
      </section>
      <ProductDetailTabs profile={productDetailProfile} />
    </main>
  );
}
