"use client";

import {
  adminCheckboxClass,
  adminErrorClass,
  adminFieldClass,
  adminInlineFieldClass,
  primaryButtonClass,
  twoColumnFieldGridClass,
} from "@/features/admin/ui/adminStyles";
import { LoadingOverlay } from "@/shared/ui/LoadingOverlay";
import { SkeletonRows } from "@/shared/ui/SkeletonRows";
import { useSiteSettingsForm } from "../model/useSiteSettingsForm";

const sectionTitleClass = "m-0 text-base font-black text-slate-950";
const sectionClass =
  "grid gap-3 rounded-[14px] border border-slate-200 bg-white p-5";

export function SiteSettingsForm() {
  const form = useSiteSettingsForm();

  if (form.loadError) {
    return (
      <p className={adminErrorClass}>
        사이트 설정을 불러오지 못했습니다. {form.loadError.message}
      </p>
    );
  }

  if (form.isPending || !form.draft) {
    return <SkeletonRows count={3} withThumbnail={false} />;
  }

  const draft = form.draft;

  return (
    <form className="grid gap-4" onSubmit={form.submit}>
      <section className={sectionClass}>
        <h3 className={sectionTitleClass}>기본 정보</h3>
        <div className={twoColumnFieldGridClass}>
          <label className={adminFieldClass}>
            사이트명
            <input
              required
              value={draft.site_name ?? ""}
              onChange={(event) => form.update("site_name", event.target.value)}
            />
          </label>
          <label className={adminFieldClass}>
            상호명
            <input
              value={draft.company_name ?? ""}
              onChange={(event) =>
                form.update("company_name", event.target.value || null)
              }
            />
          </label>
          <label className={adminFieldClass}>
            대표자명
            <input
              value={draft.representative_name ?? ""}
              onChange={(event) =>
                form.update("representative_name", event.target.value || null)
              }
            />
          </label>
          <label className={adminFieldClass}>
            사업자등록번호
            <input
              value={draft.business_registration_number ?? ""}
              onChange={(event) =>
                form.update(
                  "business_registration_number",
                  event.target.value || null
                )
              }
            />
          </label>
          <label className={adminFieldClass}>
            통신판매업 신고번호
            <input
              value={draft.ecommerce_registration_number ?? ""}
              onChange={(event) =>
                form.update(
                  "ecommerce_registration_number",
                  event.target.value || null
                )
              }
            />
          </label>
          <label className={adminFieldClass}>
            주소
            <input
              value={draft.address ?? ""}
              onChange={(event) =>
                form.update("address", event.target.value || null)
              }
            />
          </label>
        </div>
      </section>

      <section className={sectionClass}>
        <h3 className={sectionTitleClass}>연락처</h3>
        <div className={twoColumnFieldGridClass}>
          <label className={adminFieldClass}>
            대표 전화번호
            <input
              value={draft.representative_phone ?? ""}
              onChange={(event) =>
                form.update("representative_phone", event.target.value || null)
              }
            />
          </label>
          <label className={adminFieldClass}>
            상담 가능 시간
            <input
              value={draft.customer_service_hours ?? ""}
              onChange={(event) =>
                form.update(
                  "customer_service_hours",
                  event.target.value || null
                )
              }
            />
          </label>
          <label className={adminFieldClass}>
            문의 이메일
            <input
              type="email"
              value={draft.email ?? ""}
              onChange={(event) =>
                form.update("email", event.target.value || null)
              }
            />
          </label>
        </div>
      </section>

      <section className={sectionClass}>
        <h3 className={sectionTitleClass}>SNS · 저작권</h3>
        <div className={twoColumnFieldGridClass}>
          <label className={adminFieldClass}>
            카카오톡 채널 URL
            <input
              value={draft.kakao_channel_url ?? ""}
              onChange={(event) =>
                form.update("kakao_channel_url", event.target.value || null)
              }
            />
          </label>
          <label className={adminFieldClass}>
            인스타그램 URL
            <input
              value={draft.instagram_url ?? ""}
              onChange={(event) =>
                form.update("instagram_url", event.target.value || null)
              }
            />
          </label>
          <label className={adminFieldClass}>
            유튜브 URL
            <input
              value={draft.youtube_url ?? ""}
              onChange={(event) =>
                form.update("youtube_url", event.target.value || null)
              }
            />
          </label>
          <label className={adminFieldClass}>
            푸터 저작권 문구
            <input
              value={draft.copyright_text ?? ""}
              onChange={(event) =>
                form.update("copyright_text", event.target.value || null)
              }
            />
          </label>
        </div>
      </section>

      <section className={sectionClass}>
        <h3 className={sectionTitleClass}>점검 모드</h3>
        <label className={adminInlineFieldClass}>
          <input
            checked={draft.maintenance_enabled ?? false}
            className={adminCheckboxClass}
            type="checkbox"
            onChange={(event) =>
              form.update("maintenance_enabled", event.target.checked)
            }
          />
          점검 화면 노출 (관리자 페이지는 영향 없음)
        </label>
        <label className={adminFieldClass}>
          점검 안내 문구
          <textarea
            rows={2}
            value={draft.maintenance_message ?? ""}
            onChange={(event) =>
              form.update("maintenance_message", event.target.value || null)
            }
          />
        </label>
      </section>

      <section className={sectionClass}>
        <h3 className={sectionTitleClass}>상담 개인정보 자동 파기</h3>
        <label className={adminInlineFieldClass}>
          <input
            checked={draft.privacy_cleanup_enabled ?? false}
            className={adminCheckboxClass}
            type="checkbox"
            onChange={(event) =>
              form.update("privacy_cleanup_enabled", event.target.checked)
            }
          />
          매일 자동 익명화 실행
        </label>
        <div className={twoColumnFieldGridClass}>
          <label className={adminFieldClass}>
            보관 기간(일)
            <input
              max={3650}
              min={30}
              type="number"
              value={draft.consultation_retention_days ?? 365}
              onChange={(event) =>
                form.update(
                  "consultation_retention_days",
                  Number(event.target.value) || 0
                )
              }
            />
          </label>
          <label className={adminFieldClass}>
            1회 실행당 최대 처리 건수
            <input
              max={1000}
              min={10}
              type="number"
              value={draft.privacy_cleanup_batch_limit ?? 500}
              onChange={(event) =>
                form.update(
                  "privacy_cleanup_batch_limit",
                  Number(event.target.value) || 0
                )
              }
            />
          </label>
        </div>
      </section>

      {form.error ? <p className={adminErrorClass}>{form.error}</p> : null}
      {form.saved && !form.error ? (
        <p className="m-0 text-sm font-bold text-emerald-600">저장했습니다.</p>
      ) : null}

      <div className="flex justify-end">
        <button
          className={primaryButtonClass}
          disabled={form.loading}
          type="submit"
          onMouseUp={(event) => event.currentTarget.form?.requestSubmit()}
        >
          {form.loading ? "저장 중..." : "설정 저장"}
        </button>
      </div>
      {form.loading ? <LoadingOverlay /> : null}
    </form>
  );
}
