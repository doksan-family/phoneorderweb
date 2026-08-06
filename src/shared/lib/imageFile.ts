/**
 * 업로드된 이미지 URL을 다시 File로 만든다.
 * 상품 수정 PATCH가 이미지 전체 교체라서, 남겨둘 기존 이미지도 함께 올려야 한다.
 */
export async function fetchImageAsFile(url: string): Promise<File> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("기존 이미지를 불러오지 못해 저장할 수 없습니다.");
  }

  const blob = await response.blob();
  return new File([blob], getFileName(url, blob.type), { type: blob.type });
}

function getFileName(url: string, mimeType: string) {
  const path = url.split("?")[0];
  const name = path.slice(path.lastIndexOf("/") + 1);
  if (name.includes(".")) return name;

  const extension = mimeType.split("/")[1] || "jpg";
  return `${name || "image"}.${extension}`;
}
