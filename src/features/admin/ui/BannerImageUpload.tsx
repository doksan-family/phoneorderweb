"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type BannerImageUploadProps = {
  file: File | null;
  onChange: (file: File | null) => void;
};

const ACCEPT = ["image/webp", "image/jpeg", "image/png"];
const MAX_MB = 2;

export function BannerImageUpload({ file, onChange }: BannerImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [sizeError, setSizeError] = useState("");

  function handleFile(selected: File) {
    setSizeError("");
    if (!ACCEPT.includes(selected.type)) {
      setSizeError("WebP, JPEG, PNG 형식만 업로드 가능합니다.");
      return;
    }
    if (selected.size > MAX_MB * 1024 * 1024) {
      setSizeError(`파일 크기는 ${MAX_MB}MB 이하여야 합니다.`);
      return;
    }
    onChange(selected);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const selected = e.dataTransfer.files[0];
    if (selected) handleFile(selected);
  }

  function remove() {
    onChange(null);
    setSizeError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  const previewUrl = file ? URL.createObjectURL(file) : null;

  return (
    <div className="grid gap-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(",")}
        style={{ display: "none" }}
        onChange={onInputChange}
      />

      {file && previewUrl ? (
        <div className="relative w-full aspect-[12/5] rounded-xl overflow-hidden bg-slate-100">
          <Image
            src={previewUrl}
            alt="미리보기"
            fill
            style={{ objectFit: "cover" }}
            unoptimized
          />
          <button
            className="absolute top-[10px] right-[10px] z-[1] w-7 h-7 rounded-full bg-black/55 text-white text-[0.75rem] flex items-center justify-center cursor-pointer border-0 transition hover:bg-black/80"
            type="button"
            onClick={remove}
            aria-label="이미지 제거"
          >
            ✕
          </button>
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-3 py-1.5 bg-black/45 text-white text-[0.75rem]">
            <span>{file.name}</span>
            <span>{(file.size / 1024).toFixed(0)} KB</span>
          </div>
        </div>
      ) : (
        <button
          className={`flex flex-col items-center justify-center gap-2 w-full py-9 px-6 border-2 border-dashed rounded-xl cursor-pointer transition text-center ${dragging ? "border-slate-950 bg-[var(--brand-primary-soft)] text-slate-950" : "border-slate-200 bg-white text-slate-500 hover:bg-[var(--brand-primary-soft)] hover:text-slate-950"}`}
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <span className="text-[2rem] leading-none">⬆</span>
          <strong className="text-[0.95rem] text-slate-950">클릭 또는 드래그하여 이미지 업로드</strong>
          <span className="text-[0.78rem] text-slate-500">
            권장 크기 1920 × 800px · WebP / JPEG / PNG · 최대 2MB
          </span>
        </button>
      )}

      {sizeError && <p className="m-0 text-red-600 text-sm font-bold">{sizeError}</p>}
    </div>
  );
}
