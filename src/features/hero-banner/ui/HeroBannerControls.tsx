import { ChevronLeft, ChevronRight } from "lucide-react";

type HeroBannerControlsProps = {
  bannersLength: number;
  current: number;
  onNext: () => void;
  onPrevious: () => void;
  onSelect: (index: number) => void;
};

const arrowBase =
  "absolute top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border-0 bg-white/80 text-slate-950 opacity-0 transition hover:bg-white group-hover:opacity-100";

export function HeroBannerControls({
  bannersLength,
  current,
  onNext,
  onPrevious,
  onSelect,
}: HeroBannerControlsProps) {
  if (bannersLength <= 1) return null;

  return (
    <>
      <button
        aria-label="이전 배너"
        className={`${arrowBase} left-4`}
        type="button"
        onClick={onPrevious}
      >
        <ChevronLeft aria-hidden="true" size={24} />
      </button>
      <button
        aria-label="다음 배너"
        className={`${arrowBase} right-4`}
        type="button"
        onClick={onNext}
      >
        <ChevronRight aria-hidden="true" size={24} />
      </button>
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {Array.from({ length: bannersLength }, (_, index) => (
          <button
            aria-label={`${index + 1}번째 배너`}
            className={`h-2 w-2 rounded-full border-0 p-0 transition ${index === current ? "bg-white" : "bg-white/50"}`}
            key={index}
            type="button"
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
    </>
  );
}
