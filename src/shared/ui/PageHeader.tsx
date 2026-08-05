type PageHeaderProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export function PageHeader({ title, description, eyebrow }: PageHeaderProps) {
  return (
    <section className="mb-7">
      {eyebrow ? <p className="brand-eyebrow m-0">{eyebrow}</p> : null}
      <h1 className="m-0 text-[clamp(1.4rem,3vw,2.1rem)] font-extrabold tracking-[-0.02em] text-slate-950">
        {title}
      </h1>
      <p className="mt-2.5 text-[0.95rem] leading-[1.6] text-slate-500">{description}</p>
    </section>
  );
}
