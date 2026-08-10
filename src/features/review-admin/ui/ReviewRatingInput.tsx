"use client";

import { adminFieldClass } from "@/features/admin/ui/adminStyles";

type ReviewRatingInputProps = {
  value: number;
  onChange: (rating: number) => void;
};

const RATINGS = [1, 2, 3, 4, 5];

export function ReviewRatingInput({ value, onChange }: ReviewRatingInputProps) {
  return (
    <fieldset className={`${adminFieldClass} border-0 p-0`}>
      <legend>별점 *</legend>
      <div className="flex gap-1 text-2xl leading-none">
        {RATINGS.map((rating) => (
          <button
            key={rating}
            aria-label={`별점 ${rating}점`}
            aria-pressed={value === rating}
            className={`border-0 bg-transparent p-0 ${
              rating <= value ? "text-amber-400" : "text-slate-300"
            }`}
            type="button"
            onClick={() => onChange(rating)}
          >
            ★
          </button>
        ))}
      </div>
    </fieldset>
  );
}
