"use client";

import { useQuery } from "@tanstack/react-query";
import { siteSettingsQueryOptions } from "@/entities/site-settings/model/queries";
import { SkeletonRows } from "@/shared/ui/SkeletonRows";

const runStatusLabel: Record<string, string> = {
  running: "실행중",
  success: "성공",
  skipped: "건너뜀(비활성화)",
  failed: "실패",
};

export function PrivacyRetentionPreviewCard() {
  const { data, error, isPending } = useQuery(
    siteSettingsQueryOptions.privacyRetentionPreview()
  );

  return (
    <section className="grid gap-3 rounded-[14px] border border-slate-200 bg-white p-5">
      <h3 className="m-0 text-base font-black text-slate-950">
        개인정보 파기 미리보기
      </h3>
      {error ? (
        <p className="m-0 text-sm font-bold text-red-600">
          미리보기를 불러오지 못했습니다. {error.message}
        </p>
      ) : isPending || !data ? (
        <SkeletonRows count={1} withThumbnail={false} />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2.5 max-[700px]:grid-cols-1">
            <SummaryTile label="현재 익명화 대상" value={`${data.eligible_count}건`} />
            <SummaryTile
              label="다음 실행 최대 처리"
              value={`${data.max_next_run_count}건`}
            />
            <SummaryTile
              label="기준 시각"
              value={data.cutoff_at}
              small
            />
          </div>
          <p className="m-0 text-[0.82rem] font-bold text-slate-500">
            {data.warning}
          </p>
          {data.recent_runs.length ? (
            <div className="grid gap-1.5">
              <p className="m-0 text-sm font-extrabold text-slate-700">
                최근 실행 이력
              </p>
              {data.recent_runs.map((run) => (
                <div
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-2.5 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-[0.82rem]"
                  key={run.id}
                >
                  <span className="font-bold text-slate-700">
                    {runStatusLabel[run.status] ?? run.status}
                  </span>
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap text-slate-500">
                    {run.started_at} · 처리 {run.processed_count}/{run.eligible_count}건
                    {run.error_message ? ` · ${run.error_message}` : ""}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}

function SummaryTile({
  label,
  value,
  small,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="grid gap-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2.5">
      <span className="text-[0.76rem] font-bold text-slate-500">{label}</span>
      <span
        className={`font-black text-slate-950 ${small ? "text-[0.85rem]" : "text-lg"}`}
      >
        {value}
      </span>
    </div>
  );
}
