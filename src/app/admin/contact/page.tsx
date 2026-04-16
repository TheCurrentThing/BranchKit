import { saveContactInfoAction } from "@/app/admin/actions";
import { AdminFeedback } from "@/components/admin/AdminFeedback";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  AdminInput,
  HiddenField,
  PreviewLink,
  SaveButton,
} from "@/components/admin/FormPrimitives";
import { getAdminSitePayload } from "@/lib/queries";

type AdminPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function AdminContactPage({ searchParams }: AdminPageProps) {
  const payload = await getAdminSitePayload();

  return (
    <AdminShell
      activeKey="contact"
      brandName={payload.brand.businessName}
      eyebrow="Contact System"
      title="Contact Control"
      description="Keep the restaurant's trust details accurate. The public contact read stays visible while you update the live records."
      previewHref="/contact"
      contentClassName="min-h-0 flex flex-1 flex-col overflow-hidden"
    >
      <AdminFeedback searchParams={searchParams} />

      <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="admin-panel min-h-0 overflow-hidden rounded-[1.5rem]">
          <div className="border-b border-white/[0.08] px-5 py-4">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              Public Read
            </p>
            <h2 className="mt-2 text-[1.4rem] font-semibold text-white">Live contact details</h2>
          </div>

          <div className="space-y-3 p-4 text-sm text-white/62">
            <div className="rounded-[1rem] border border-white/[0.08] bg-black/25 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/36">Phone</p>
              <p className="mt-2 text-base font-semibold text-white">{payload.brand.phone}</p>
            </div>
            <div className="rounded-[1rem] border border-white/[0.08] bg-black/25 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/36">Address</p>
              <p className="mt-2 text-base font-semibold text-white">
                {payload.brand.addressLine1}
              </p>
              <p className="mt-1">
                {payload.brand.city}, {payload.brand.state} {payload.brand.zip}
              </p>
            </div>
            <div className="rounded-[1rem] border border-white/[0.08] bg-black/25 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/36">Email</p>
              <p className="mt-2 text-base font-semibold text-white">
                {payload.brand.email || "No public email configured"}
              </p>
            </div>
            <div className="rounded-[1rem] border border-white/[0.08] bg-black/25 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/36">Actions</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <PreviewLink href="/contact" label="Preview Contact Page" />
              </div>
            </div>
          </div>
        </aside>

        <section className="admin-panel admin-scrollbar min-h-0 overflow-y-auto rounded-[1.5rem]">
          <div className="border-b border-white/[0.08] px-5 py-4">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              Contact Records
            </p>
            <h2 className="mt-2 text-[1.5rem] font-semibold text-white">Public business details</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/55">
              These values power the call button, directions link, footer, and local business data.
            </p>
          </div>

          <form action={saveContactInfoAction} className="space-y-4 p-5">
            <HiddenField name="redirect_to" value="/admin/contact" />
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput
                label="Phone Number"
                name="phone"
                defaultValue={payload.brand.phone}
                required
              />
              <AdminInput
                label="Email Address"
                name="email"
                defaultValue={payload.brand.email}
              />
              <AdminInput
                label="Street Address"
                name="address_line_1"
                defaultValue={payload.brand.addressLine1}
                required
              />
              <AdminInput
                label="City"
                name="city"
                defaultValue={payload.brand.city}
                required
              />
              <AdminInput
                label="State"
                name="state"
                defaultValue={payload.brand.state}
                required
              />
              <AdminInput
                label="ZIP Code"
                name="zip"
                defaultValue={payload.brand.zip}
                required
              />
              <AdminInput
                label="Facebook URL"
                name="facebook_url"
                defaultValue={payload.brand.socialLinks.facebook}
              />
              <AdminInput
                label="Instagram URL"
                name="instagram_url"
                defaultValue={payload.brand.socialLinks.instagram}
              />
              <AdminInput
                label="TikTok URL"
                name="tiktok_url"
                defaultValue={payload.brand.socialLinks.tiktok}
              />
              <AdminInput
                label="Google Business URL"
                name="google_business_url"
                defaultValue={payload.brand.socialLinks.googleBusiness}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <SaveButton label="Save Contact Info" />
              <PreviewLink href="/contact" label="Preview Contact Page" />
            </div>
          </form>
        </section>
      </div>
    </AdminShell>
  );
}
