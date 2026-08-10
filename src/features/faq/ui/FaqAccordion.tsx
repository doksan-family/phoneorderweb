"use client";

import { useState } from "react";
import type { PublicFaq } from "@/entities/content/model/customerCenterTypes";

type FaqAccordionProps = {
  items: PublicFaq[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  return (
    <div className="grid gap-2.5">
      {items.map((item) => {
        const isActive = activeId === item.id;

        return (
          <article className="brand-card overflow-hidden" key={item.id}>
            <button
              aria-expanded={isActive}
              className="flex w-full cursor-pointer items-center justify-between gap-2.5 border-0 bg-transparent p-4 text-left text-[0.88rem] font-bold text-slate-950"
              onClick={() => setActiveId(isActive ? "" : item.id)}
              type="button"
            >
              <span>{item.question}</span>
              <span aria-hidden className="shrink-0 text-[var(--brand-primary-strong)]">
                {isActive ? "−" : "+"}
              </span>
            </button>
            {isActive ? (
              <p className="m-0 px-4 pb-4 text-[0.82rem] leading-[1.6] text-slate-500">
                {item.answer}
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
