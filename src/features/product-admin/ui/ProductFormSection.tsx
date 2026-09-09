import type { ReactNode } from "react";

type ProductFormSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function ProductFormSection({ title, description, children }: ProductFormSectionProps) {
  return (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
      <header className="mb-5 border-b border-slate-100 pb-3">
        <h3 className="m-0 text-base font-extrabold text-slate-950">{title}</h3>
        <p className="mb-0 mt-1 text-xs leading-relaxed text-slate-500">{description}</p>
      </header>
      <div className="grid min-w-0 gap-5">{children}</div>
    </section>
  );
}
