import { Plus } from "lucide-react";

type FloatingActionButtonProps = {
  label: string;
  onClick: () => void;
};

export function FloatingActionButton({
  label,
  onClick,
}: FloatingActionButtonProps) {
  return (
    <button
      aria-label={label}
      className="fixed bottom-10 right-10 z-[450] grid h-14 w-14 place-items-center rounded-full border border-transparent bg-[var(--brand-cta)] text-white shadow-[0_12px_34px_rgba(21,24,15,0.24)] transition hover:bg-[var(--brand-cta-hover)] hover:shadow-[0_16px_42px_rgba(21,24,15,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-950 max-[560px]:bottom-6 max-[560px]:right-6 min-[901px]:right-[max(3.5rem,calc((100vw-248px-1280px)/2+1.5rem))]"
      title={label}
      type="button"
      onClick={onClick}
    >
      <Plus size={26} strokeWidth={2.5} aria-hidden="true" />
    </button>
  );
}
