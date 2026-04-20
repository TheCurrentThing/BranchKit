import { AdminShell } from "@/components/admin/AdminShell";
import { ServiceAreasEditorClient } from "@/components/admin/ServiceAreasEditorClient";
import { getAdminSitePayload } from "@/lib/queries";
import { getCategoryConfig } from "@/lib/kit-config";

export const dynamic = "force-dynamic";

export default async function ServiceAreasPage() {
  const payload = await getAdminSitePayload();
  const config = getCategoryConfig(payload.kitCategory);

  return (
    <AdminShell
      activeKey="service-areas"
      brandName={payload.brand.businessName}
      eyebrow={config.label}
      title="Service Areas"
      previewHref="/preview"
      liveHref={payload.businessSlug ? `/${payload.businessSlug}` : undefined}
    >
      <div style={{ padding: "32px 28px", maxWidth: 720 }}>
        <div style={{ marginBottom: 28 }}>
          <h1
            style={{ fontSize: 22, fontWeight: 700, color: "var(--admin-text)", margin: "0 0 6px", letterSpacing: "-0.02em" }}
          >
            Service Areas
          </h1>
          <p style={{ fontSize: 13, color: "var(--admin-text-muted)", margin: 0, lineHeight: 1.5 }}>
            Define the geographic areas you serve. Service areas are shown on your public site
            so customers can quickly confirm you cover their location.
          </p>
        </div>
        <ServiceAreasEditorClient initialAreas={payload.serviceAreas} />
      </div>
    </AdminShell>
  );
}
