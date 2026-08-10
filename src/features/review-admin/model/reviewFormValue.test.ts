import assert from "node:assert/strict";
import { test } from "node:test";
import {
  MAX_REVIEW_IMAGE_BYTES,
  findOversizedImage,
  toReviewCreatePayload,
  toReviewUpdatePayload,
  type AdminReviewFormValue,
} from "./reviewFormValue.ts";

const baseValue: AdminReviewFormValue = {
  productId: "",
  title: "  상담부터 개통까지 친절했어요  ",
  content: "  빠르게 개통했습니다.  ",
  authorName: " 김** ",
  rating: 5,
  isFeatured: false,
  isPublished: false,
  imageFiles: [],
};

test("toReviewCreatePayload", () => {
  const payload = toReviewCreatePayload(baseValue);
  // 공백은 잘라내고, 비어 있는 상품/이미지는 아예 보내지 않는다
  assert.equal(payload.title, "상담부터 개통까지 친절했어요");
  assert.equal(payload.author_name, "김**");
  assert.equal(payload.product_id, undefined);
  assert.equal(payload.image_files, undefined);
  assert.equal(payload.display_order, 0);

  const withProduct = toReviewCreatePayload({
    ...baseValue,
    productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  });
  assert.equal(withProduct.product_id, "3fa85f64-5717-4562-b3fc-2c963f66afa6");
});

test("toReviewUpdatePayload", () => {
  const payload = toReviewUpdatePayload(baseValue);

  // 상품 미선택은 빈 문자열로 보내 연결을 해제한다
  assert.equal(payload.product_id, "");
  assert.equal(payload.title, "상담부터 개통까지 친절했어요");
  assert.equal(payload.author_name, "김**");
});

test("findOversizedImage", () => {
  const ok = makeFile("ok.jpg", MAX_REVIEW_IMAGE_BYTES);
  const tooBig = makeFile("big.jpg", MAX_REVIEW_IMAGE_BYTES + 1);

  assert.equal(findOversizedImage([ok]), undefined);
  assert.equal(findOversizedImage([ok, tooBig])?.name, "big.jpg");
});

function makeFile(name: string, size: number) {
  return new File([new Uint8Array(size)], name, { type: "image/jpeg" });
}
