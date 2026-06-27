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
    <div className="banner-upload">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(",")}
        style={{ display: "none" }}
        onChange={onInputChange}
      />

      {file && previewUrl ? (
        <div className="banner-upload__preview">
          <Image
            src={previewUrl}
            alt="미리보기"
            fill
            style={{ objectFit: "cover" }}
            unoptimized
          />
          <button
            className="banner-upload__remove"
            type="button"
            onClick={remove}
            aria-label="이미지 제거"
          >
            ✕
          </button>
          <div className="banner-upload__file-info">
            <span>{file.name}</span>
            <span>{(file.size / 1024).toFixed(0)} KB</span>
          </div>
        </div>
      ) : (
        <button
          className={`banner-upload__zone${dragging ? " is-dragging" : ""}`}
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <span className="banner-upload__icon">⬆</span>
          <strong>클릭 또는 드래그하여 이미지 업로드</strong>
          <span className="banner-upload__specs">
            권장 크기 1920 × 640px · WebP / JPEG / PNG · 최대 2MB
          </span>
        </button>
      )}

      {sizeError && <p className="form-card__error">{sizeError}</p>}
    </div>
  );
}
