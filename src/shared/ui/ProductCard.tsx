import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/entities/product/model/types";

type ProductCardProps = {
  product: Product;
};

const btnPrimary =
  "inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-transparent rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-blue-700 text-white shadow-[0_2px_8px_rgba(29,78,216,0.28)] hover:bg-blue-900";

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="grid border border-slate-200 rounded-xl bg-white overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] hover:-translate-y-0.5">
      <Link href={`/products/${product.id}`} className="relative grid min-h-[240px] place-items-center bg-slate-100 max-[900px]:min-h-[160px]">
        <Image
          alt={product.imageAlt}
          height={280}
          src={product.imageUrl}
          width={240}
          className="w-[78%] h-[220px] object-contain max-[900px]:h-[140px]"
        />
        <span className="absolute top-[10px] left-[10px] rounded-md px-2 py-1 bg-blue-900 text-white text-[0.72rem] font-extrabold tracking-[0.5px]">
          {product.cardTag}
        </span>
        <span className="absolute right-[10px] bottom-[10px] rounded-md px-2 py-1 bg-red-600 text-white text-[0.88rem] font-black">
          {product.discountRate}%
        </span>
      </Link>
      <div className="grid gap-2.5 p-5 max-[900px]:p-3 max-[900px]:gap-1.5">
        <p className="m-0 text-blue-700 text-[0.75rem] font-bold uppercase tracking-[0.5px]">{product.categoryName}</p>
        <h2 className="m-0 text-[1.08rem] font-extrabold tracking-[-0.3px]">{product.name}</h2>
        <p className="text-slate-500 text-[0.88rem] leading-[1.65]">{product.summary}</p>
        <div className="flex flex-col gap-0.5">
          <span className="text-slate-500 text-[0.82rem] line-through">
            {product.originalPrice.toLocaleString("ko-KR")}원
          </span>
          <strong className="text-slate-950 text-[1.25rem] font-black tracking-[-0.5px]">
            {product.salePrice.toLocaleString("ko-KR")}원
          </strong>
        </div>
        <div className="flex flex-col gap-[3px] border-t border-slate-200 pt-2.5 mt-0.5">
          <span className="text-slate-500 text-[0.78rem]">
            {product.planName} · 월 {product.planMonthlyPrice.toLocaleString("ko-KR")}원
          </span>
          <span className="text-slate-500 text-[0.82rem]">
            월 납부 예상 <strong className="text-blue-900 font-extrabold">{product.monthlyEstimate.toLocaleString("ko-KR")}원</strong>
          </span>
        </div>
        <Link className={btnPrimary} href={`/products/${product.id}`}>
          자세히 보기
        </Link>
      </div>
    </article>
  );
}
