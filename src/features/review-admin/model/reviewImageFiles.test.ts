import assert from "node:assert/strict";
import { test } from "node:test";
import type { PublicReviewImage } from "@/entities/review/model/types";
import { toReviewImagePayload } from "./reviewImageFiles.ts";

const first = makeImage("img-1", "raw/a.jpg");
const second = makeImage("img-2", "raw/b.jpg");
const original = [first, second];

test("이미지를 건드리지 않으면 아무것도 보내지 않는다", async () => {
  assert.deepEqual(await toReviewImagePayload(original, original, []), {});
});

test("전부 지우면 replace_images로 비운다", async () => {
  assert.deepEqual(await toReviewImagePayload(original, [], []), {
    replace_images: true,
  });
});

test("일부만 남기면 남긴 파일을 받아 새 파일과 함께 전체 교체한다", async () => {
  const added = new File([new Uint8Array(3)], "new.jpg", { type: "image/jpeg" });
  const restore = stubFetch();

  try {
    const payload = await toReviewImagePayload(original, [second], [added]);
    assert.deepEqual(
      payload.image_files?.map((file) => file.name),
      ["b.jpg", "new.jpg"]
    );
    assert.equal(payload.replace_images, undefined);
  } finally {
    restore();
  }
});

function makeImage(id: string, imagePath: string): PublicReviewImage {
  return {
    id,
    image_path: imagePath,
    image_url: `https://example.test/${imagePath}`,
    alt: null,
    display_order: 0,
  };
}

function stubFetch() {
  const original = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(new Uint8Array(2), { headers: { "Content-Type": "image/jpeg" } });
  return () => {
    globalThis.fetch = original;
  };
}
