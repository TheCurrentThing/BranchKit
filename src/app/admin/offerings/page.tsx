import { AdminShell } from "@/components/admin/AdminShell";
import { OfferingsEditorClient } from "@/components/admin/OfferingsEditorClient";
import { getAdminSitePayload } from "@/lib/queries";
import { getCategoryConfig } from "@/lib/kit-config";

export const dynamic = "force-dynamic";

export default async function OfferingsPage() {
  const payload = await getAdminSitePayload();
  const config = getCategoryConfig(payload.kitCategory);

  return (
    <AdminShell
      activeKey="offerings"
      brandName={payload.brand.businessName}
      eyebrow={config.label}
      title="Offerings"
      previewHref="/preview"
      liveHref={payload.businessSlug ? `/${payload.businessSlug}` : undefined}
      contentClassName="min-h-0 flex flex-1 flex-col overflow-hidden"
    >
      <div style={{ padding: "0 2px 2px", flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 20, padding: "0 2px" }}>
          <p style={{ fontSize: 13, color: "var(--admin-text-muted)", margin: 0, lineHeight: 1.5 }}>
            Add and manage the services you offer. Offerings appear on your public site and help
            potential customers understand what you do and what it costs.
          </p>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <OfferingsEditorClient initialOfferings={payload.serviceOfferings} />
        </div>
      </div>
    </AdminShell>
  );
}
