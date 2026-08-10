"use client";

import { useQuery } from "@tanstack/react-query";
import { customerCenterQueryOptions } from "@/entities/content/model/queries";
import { FaqAccordion } from "@/features/faq/ui/FaqAccordion";

export function SupportFaqSection() {
  const { data, isPending } = useQuery(customerCenterQueryOptions.faqs());
  const faqs = data?.items ?? [];

  return (
    <div>
      <h2 className="m-0 mb-4 text-[1.05rem] font-extrabold tracking-[-0.02em] text-slate-950">
        자주 묻는 질문
      </h2>
      {!isPending && !faqs.length ? (
        <p className="m-0 text-[0.9rem] text-slate-500">
          등록된 질문이 없습니다.
        </p>
      ) : null}
      <FaqAccordion items={faqs} />
    </div>
  );
}
