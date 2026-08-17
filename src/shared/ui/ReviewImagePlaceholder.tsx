type ReviewImagePlaceholderProps = {
  className?: string;
  /** light: 흰 카드 위, dark: 어두운 글래스모피즘 모달 위 */
  tone?: "light" | "dark";
};

const toneClass = {
  light: "border-slate-900/10 bg-slate-900/5 text-slate-500",
  dark: "border-white/20 bg-white/10 text-white/80",
};

const toneHatch = {
  light: "rgba(15,23,42,0.14)",
  dark: "rgba(255,255,255,0.28)",
};

/**
 * 등록된 이미지가 없는 후기 카드/갤러리에 쓰는 placeholder.
 * 배경을 가리지 않고 그 위에 backdrop-blur + 빗금을 겹치는 글래스모피즘이다.
 */
export function ReviewImagePlaceholder({
  className = "",
  tone = "light",
}: ReviewImagePlaceholderProps) {
  return (
    <div
      className={`grid place-items-center border backdrop-blur-md ${toneClass[tone]} ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, ${toneHatch[tone]} 0, ${toneHatch[tone]} 1px, transparent 1px, transparent 24px)`,
      }}
    >
      <span className="text-[0.8rem] font-bold">등록된 이미지가 없습니다</span>
    </div>
  );
}
