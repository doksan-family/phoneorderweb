"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useRef, useState } from "react";
import {
  updateAdminSiteSettings,
  type AdminSiteSettings,
  type SiteSettingsUpdatePayload,
} from "@/entities/site-settings/api/admin";
import {
  adminSiteSettingsQueryKey,
  siteSettingsQueryOptions,
} from "@/entities/site-settings/model/queries";

type SiteSettingsDraft = SiteSettingsUpdatePayload;

function draftFromSettings(settings: AdminSiteSettings): SiteSettingsDraft {
  const {
    privacy_disposal_method,
    privacy_cleanup_schedule,
    updated_at,
    ...draft
  } = settings;
  void privacy_disposal_method;
  void privacy_cleanup_schedule;
  void updated_at;
  return draft;
}

export function useSiteSettingsForm() {
  const queryClient = useQueryClient();
  const query = useQuery(siteSettingsQueryOptions.admin());
  // 사용자가 아직 건드리지 않았으면 서버 값을, 건드렸으면 편집 중인 값을 보여준다.
  const [editedDraft, setEditedDraft] = useState<SiteSettingsDraft | null>(
    null
  );
  const draft =
    editedDraft ?? (query.data ? draftFromSettings(query.data) : null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const lastSubmitAtRef = useRef(0);

  function update<K extends keyof SiteSettingsDraft>(
    key: K,
    value: SiteSettingsDraft[K]
  ) {
    setEditedDraft(draft ? { ...draft, [key]: value } : null);
    setSaved(false);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft) return;
    if (Date.now() - lastSubmitAtRef.current < 400) return;
    lastSubmitAtRef.current = Date.now();

    setLoading(true);
    setError("");
    setSaved(false);
    try {
      await updateAdminSiteSettings(draft);
      await queryClient.invalidateQueries({
        queryKey: adminSiteSettingsQueryKey,
      });
      setEditedDraft(null);
      setSaved(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "사이트 설정 저장에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    draft,
    error,
    isPending: query.isPending,
    loadError: query.error,
    loading,
    saved,
    submit,
    update,
  };
}
