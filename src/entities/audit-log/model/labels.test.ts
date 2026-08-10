import assert from "node:assert/strict";
import { test } from "node:test";
import {
  auditFieldNames,
  describeAuditAction,
  formatAuditTime,
} from "./labels.ts";

test("describeAuditAction", () => {
  assert.equal(describeAuditAction("UPDATE", "notice"), "공지사항 수정");
  assert.equal(describeAuditAction("UPLOAD_IMAGE", "banner_image"), "배너 이미지 이미지 업로드");
  // 모르는 코드값은 그대로 노출한다
  assert.equal(describeAuditAction("ARCHIVE", "coupon"), "coupon ARCHIVE");
});

test("auditFieldNames", () => {
  assert.equal(auditFieldNames(["status", "admin_memo"]), "처리 상태, 관리자 메모");
  assert.equal(auditFieldNames(["unknown_field"]), "unknown_field");
  assert.equal(auditFieldNames([]), "");
});

test("formatAuditTime", () => {
  assert.equal(formatAuditTime("2026-08-09 14:30:15"), "8월 9일 14:30");
  assert.equal(formatAuditTime("2026-12-25T09:05:00"), "12월 25일 09:05");
  // 형식이 다르면 원본을 그대로 보여준다
  assert.equal(formatAuditTime("어제"), "어제");
});
