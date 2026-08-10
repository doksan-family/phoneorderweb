const MAX_EDGE = 1600;
const QUALITY = 0.82;
/** 이보다 작으면 줄여도 이득이 없어 원본을 그대로 올린다. */
const SKIP_UNDER_BYTES = 300 * 1024;

/**
 * 업로드 전에 브라우저에서 사진을 줄인다.
 * 휴대폰 사진 원본(3MB 안팎)이 그대로 올라가면 목록에서 썸네일을 만들 때마다
 * 원본을 다시 내려받아 변환해야 해서 첫 로딩이 느려진다.
 * 변환에 실패하면 원본을 그대로 돌려주므로 업로드 자체는 막지 않는다.
 */
export async function downscaleImageFile(
  file: File,
  maxEdge = MAX_EDGE
): Promise<File> {
  if (!file.type.startsWith("image/") || file.size <= SKIP_UNDER_BYTES) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return file;
    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", QUALITY)
    );
    // 원본이 이미 더 작으면(작은 PNG 등) 굳이 바꾸지 않는다
    if (!blob || blob.size >= file.size) return file;

    return new File([blob], toWebpName(file.name), {
      type: "image/webp",
      lastModified: file.lastModified,
    });
  } catch {
    return file;
  }
}

function toWebpName(name: string) {
  const dot = name.lastIndexOf(".");
  return `${dot > 0 ? name.slice(0, dot) : name}.webp`;
}
