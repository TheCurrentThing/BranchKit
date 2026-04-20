import { AdminShell } from "@/components/admin/AdminShell";
import { TestimonialsEditorClient } from "@/components/admin/TestimonialsEditorClient";
import { getAdminSitePayload } from "@/lib/queries";
import { getCategoryConfig } from "@/lib/kit-config";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const payload = await getAdminSitePayload();
  const config = getCategoryConfig(payload.kitCategory);

  return (
    <AdminShell
      activeKey="testimonials"
      brandName={payload.brand.businessName}
      eyebrow={config.label}
      title="Testimonials"
      previewHref="/preview"
      liveHref={payload.businessSlug ? `/${payload.businessSlug}` : undefined}
      contentClassName="min-h-0 flex flex-1 flex-col overflow-hidden"
    >
      <div style={{ padding: "0 2px 2px", flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 20, padding: "0 2px" }}>
          <p style={{ fontSize: 13, color: "var(--admin-text-muted)", margin: 0, lineHeight: 1.5 }}>
            Add client testimonials to build trust on your public site. Featured testimonials are
            highlighted in the testimonials section.
          </p>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <TestimonialsEditorClient initialTestimonials={payload.testimonials} />
        </div>
      </div>
    </AdminShell>
  );
}
