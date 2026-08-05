"use client";

import { useEffect, useState } from "react";

export type FilePreview = {
  file: File;
  url: string;
};

export function useFilePreviews(files: File[]) {
  const [previews, setPreviews] = useState<FilePreview[]>([]);

  useEffect(() => {
    const nextPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const timer = window.setTimeout(() => setPreviews(nextPreviews), 0);

    return () => {
      window.clearTimeout(timer);
      nextPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [files]);

  return previews;
}
