"use client";

import { FormEvent, useState } from "react";
import { banners } from "@/entities/content/model/mock-content";
import { productCategories, products } from "@/entities/product/model/mock-products";
import type { Product } from "@/entities/product/model/types";

type ProductDraft = Pick<Product, "name" | "categoryId" | "priceGuide">;

const btnPrimary =
  "inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-transparent rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-blue-700 text-white shadow-[0_2px_8px_rgba(29,78,216,0.28)] hover:bg-blue-900";
const btnSecondary =
  "inline-flex items-center justify-center min-h-[48px] border-[1.5px] border-slate-200 rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-white text-blue-900 hover:border-blue-700 hover:text-blue-700";
const btnGhost =
  "inline-flex items-center justify-center min-h-[48px] border-0 rounded-[10px] px-[22px] cursor-pointer font-bold text-[0.95rem] transition-all bg-transparent text-red-600";

export function AdminCatalogPanel() {
  const [items, setItems] = useState(products);
  const [draft, setDraft] = useState<ProductDraft>({
    name: "",
    categoryId: productCategories[0]?.id ?? "",
    priceGuide: ""
  });

  function addProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const category = productCategories.find((item) => item.id === draft.categoryId);

    if (!draft.name || !category) {
      return;
    }

    setItems((current) => [
      {
        id: `product-${Date.now()}`,
        name: draft.name,
        categoryId: category.id,
        categoryName: category.name,
        imageUrl: "/images/phone-core.svg",
        imageAlt: `${draft.name} 대표 이미지`,
        summary: "관리자가 등록한 상품입니다.",
        detail: "상세 설명은 관리자 페이지에서 보완합니다.",
        originalPrice: 0,
        salePrice: 0,
        planName: "상담 후 안내",
        planMonthlyPrice: 0,
        monthlyEstimate: 0,
        priceGuide: draft.priceGuide || "상담 후 안내",
        planGuide: "상담 후 안내",
        discountGuide: "상담 후 안내",
        saleTypes: ["번호이동", "기기변경"],
        cardTag: "NEW",
        discountRate: 0,
        visible: true,
        order: current.length + 1
      },
      ...current
    ]);
    setDraft({ name: "", categoryId: productCategories[0]?.id ?? "", priceGuide: "" });
  }

  return (
    <section className="border border-slate-200 rounded-xl bg-white p-[22px]">
      <div className="mb-7">
        <p className="m-0 mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-blue-700">Catalog</p>
        <h2 className="m-0 text-[clamp(1.4rem,3vw,2.1rem)] tracking-[-0.5px]">상품, 카테고리, 배너 관리</h2>
      </div>
      <form
        className="grid grid-cols-[repeat(4,minmax(0,1fr))_auto] gap-2.5 mb-[18px] max-[900px]:grid-cols-1"
        onSubmit={addProduct}
      >
        <input placeholder="상품명" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
        <select value={draft.categoryId} onChange={(event) => setDraft({ ...draft, categoryId: event.target.value })}>
          {productCategories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <input placeholder="가격 안내 문구" value={draft.priceGuide} onChange={(event) => setDraft({ ...draft, priceGuide: event.target.value })} />
        <input aria-label="상품 이미지 업로드" type="file" />
        <button className={btnPrimary} type="submit">상품 등록</button>
      </form>
      <div className="grid gap-2.5">
        {items.map((item) => (
          <article className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center p-[14px] border border-slate-200 rounded-[10px] bg-white max-[900px]:grid-cols-1" key={item.id}>
            <div className="grid gap-1">
              <strong>{item.name}</strong>
              <span className="text-slate-500 text-[0.88rem] leading-[1.65]">{item.categoryName} · 정렬 {item.order}</span>
            </div>
            <button className={btnSecondary} onClick={() => setItems(toggleVisible(items, item.id))} type="button">
              {item.visible ? "노출 중" : "숨김"}
            </button>
            <button className={btnGhost} onClick={() => setItems(items.filter((product) => product.id !== item.id))} type="button">
              삭제
            </button>
          </article>
        ))}
      </div>
      <div className="text-slate-500 text-[0.88rem] leading-[1.65] mt-[14px]">
        카테고리 {productCategories.length}개 · 이벤트 배너 {banners.length}개
      </div>
    </section>
  );
}

function toggleVisible(items: Product[], id: string) {
  return items.map((item) => {
    return item.id === id ? { ...item, visible: !item.visible } : item;
  });
}
