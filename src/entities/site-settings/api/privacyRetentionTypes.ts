export type PrivacyCleanupRun = {
  id: string;
  status: "running" | "success" | "skipped" | "failed";
  retention_days: number;
  batch_limit: number;
  eligible_count: number;
  processed_count: number;
  error_message: string | null;
  cutoff_at: string | null;
  started_at: string;
  completed_at: string | null;
};

export type PrivacyRetentionPreview = {
  privacy_cleanup_enabled: boolean;
  consultation_retention_days: number;
  privacy_cleanup_batch_limit: number;
  privacy_disposal_method: "anonymize";
  privacy_cleanup_schedule: string;
  cutoff_at: string;
  eligible_count: number;
  max_next_run_count: number;
  oldest_eligible_at: string | null;
  recent_runs: PrivacyCleanupRun[];
  warning: string;
};

export type PrivacyRetentionPreviewResponse = {
  ok: boolean;
  data: PrivacyRetentionPreview;
};
