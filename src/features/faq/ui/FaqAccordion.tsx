"use client";

import { useState } from "react";
import type { Faq } from "@/entities/content/model/types";

type FaqAccordionProps = {
  items: Faq[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  return (
    <div className="faq-list">
      {items.map((item) => {
        const isActive = activeId === item.id;

        return (
          <article className="faq-item" key={item.id}>
            <button
              aria-expanded={isActive}
              className="faq-item__button"
              onClick={() => setActiveId(isActive ? "" : item.id)}
              type="button"
            >
              <span>{item.question}</span>
              <span aria-hidden>{isActive ? "−" : "+"}</span>
            </button>
            {isActive ? <p>{item.answer}</p> : null}
          </article>
        );
      })}
    </div>
  );
}
