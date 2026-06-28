"use client";

import { useState } from "react";
import type { Faq } from "@/entities/content/model/types";

type FaqAccordionProps = {
  items: Faq[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  return (
    <div className="grid gap-2.5">
      {items.map((item) => {
        const isActive = activeId === item.id;

        return (
          <article className="border border-slate-200 rounded-[10px] p-[18px] bg-white transition" key={item.id}>
            <button
              aria-expanded={isActive}
              className="flex justify-between w-full border-0 bg-transparent text-slate-950 cursor-pointer p-0 text-left font-extrabold"
              onClick={() => setActiveId(isActive ? "" : item.id)}
              type="button"
            >
              <span>{item.question}</span>
              <span aria-hidden>{isActive ? "−" : "+"}</span>
            </button>
            {isActive ? <p className="text-slate-500 text-[0.88rem] leading-[1.65] mt-3">{item.answer}</p> : null}
          </article>
        );
      })}
    </div>
  );
}
