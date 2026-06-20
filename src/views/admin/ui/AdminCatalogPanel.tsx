"use client";

import { FormEvent, useState } from "react";
import { banners } from "@/entities/content/model/mock-content";
import { productCategories, products } from "@/entities/product/model/mock-products";
import type { Product } from "@/entities/product/model/types";

type ProductDraft = Pick<Product, "name" | "categoryId" | "priceGuide">;

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
    <section className="admin-panel">
      <div className="section__header">
        <p className="eyebrow">Catalog</p>
        <h2>상품, 카테고리, 배너 관리</h2>
      </div>
      <form className="admin-form" onSubmit={addProduct}>
        <input placeholder="상품명" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
        <select value={draft.categoryId} onChange={(event) => setDraft({ ...draft, categoryId: event.target.value })}>
          {productCategories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <input placeholder="가격 안내 문구" value={draft.priceGuide} onChange={(event) => setDraft({ ...draft, priceGuide: event.target.value })} />
        <input aria-label="상품 이미지 업로드" type="file" />
        <button className="button button--primary" type="submit">상품 등록</button>
      </form>
      <div className="admin-table">
        {items.map((item) => (
          <article className="admin-row" key={item.id}>
            <div>
              <strong>{item.name}</strong>
              <span>{item.categoryName} · 정렬 {item.order}</span>
            </div>
            <button className="button button--secondary" onClick={() => setItems(toggleVisible(items, item.id))} type="button">
              {item.visible ? "노출 중" : "숨김"}
            </button>
            <button className="button button--ghost" onClick={() => setItems(items.filter((product) => product.id !== item.id))} type="button">
              삭제
            </button>
          </article>
        ))}
      </div>
      <div className="admin-summary">
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
