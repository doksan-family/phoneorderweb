import { PrivacyRetentionPreviewCard } from "@/features/site-settings-admin/ui/PrivacyRetentionPreviewCard";
import { SiteSettingsForm } from "@/features/site-settings-admin/ui/SiteSettingsForm";
import { adminFullPanelClass } from "@/shared/ui/adminPanelStyles";

export function AdminSiteSettingsPanel() {
  return (
    <section className={`grid gap-5 ${adminFullPanelClass}`}>
      <SiteSettingsForm />
      <PrivacyRetentionPreviewCard />
    </section>
  );
}
