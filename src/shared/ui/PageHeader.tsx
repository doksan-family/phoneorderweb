type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="mb-7">
      <p className="m-0 mb-2 text-xs font-extrabold uppercase tracking-[0.12em] text-blue-700">{eyebrow}</p>
      <h1 className="m-0 text-[clamp(1.4rem,3vw,2.1rem)] tracking-[-0.5px]">{title}</h1>
      <p className="text-slate-500 text-[1.05rem] leading-[1.8] mt-2.5">{description}</p>
    </section>
  );
}
