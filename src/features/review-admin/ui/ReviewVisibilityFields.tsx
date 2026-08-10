"use client";

import { twoColumnFieldGridClass } from "@/features/admin/ui/adminStyles";
import { ToggleCard } from "@/shared/ui/ToggleCard";

type ReviewVisibilityFieldsProps = {
  isPublished: boolean;
  isFeatured: boolean;
  onChange: (key: "isPublished" | "isFeatured", checked: boolean) => void;
};

export function ReviewVisibilityFields({
  isPublished,
  isFeatured,
  onChange,
}: ReviewVisibilityFieldsProps) {
  return (
    <div className={twoColumnFieldGridClass}>
      <ToggleCard
        checked={isPublished}
        description="체크하면 등록 즉시 후기 페이지에 노출됩니다. 해제하면 비공개로 저장됩니다."
        title="바로 공개"
        onChange={(checked) => onChange("isPublished", checked)}
      />
      <ToggleCard
        checked={isFeatured}
        description="홈 화면 추천 후기 영역에 우선 노출됩니다."
        title="추천 후기"
        onChange={(checked) => onChange("isFeatured", checked)}
      />
    </div>
  );
}
