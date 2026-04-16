import {
  saveAnnouncementAction,
  saveHomepageContentAction,
} from "@/app/admin/actions";
import { AdminFeedback } from "@/components/admin/AdminFeedback";
import { AdminShell } from "@/components/admin/AdminShell";
import { SectionVisibilityEditor } from "@/components/admin/SectionVisibilityEditor";
import {
  AdminCheckbox,
  AdminFileInput,
  AdminInput,
  AdminTextarea,
  HiddenField,
  PreviewLink,
  SaveButton,
} from "@/components/admin/FormPrimitives";
import { Badge } from "@/components/ui/badge";
import { getAdminSitePayload } from "@/lib/queries";
import Link from "next/link";

type AdminPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function AdminHomepagePage({ searchParams }: AdminPageProps) {
  const payload = await getAdminSitePayload();
  const orderedSections = [
    {
      name: "Announcement Bar",
      status: payload.meta.announcementIsActive ? "Showing" : "Hidden",
      editHref: "/admin/homepage",
    },
    { name: "Hero", status: "Always shown", editHref: "/admin/homepage" },
    {
      name: "Daily Specials",
      status: payload.features.showSpecials ? "Showing" : "Hidden",
      editHref: "/admin/specials",
    },
    { name: "Featured Menu", status: "Always shown", editHref: "/admin/menu" },
    { name: "About", status: "Always shown", editHref: "/admin/homepage" },
    {
      name: "Photo Gallery",
      status: payload.features.showGallery ? "Showing" : "Hidden",
      editHref: "/admin/photos",
    },
    {
      name: "Testimonials",
      status: payload.features.showTestimonials ? "Showing" : "Hidden",
      editHref: "/admin/settings",
    },
    {
      name: "Contact / Map",
      status: payload.features.showMap ? "Showing with map" : "Showing without map",
      editHref: "/admin/contact",
    },
  ];

  return (
    <AdminShell
      activeKey="homepage"
      brandName={payload.brand.businessName}
      eyebrow="Homepage System"
      title="Homepage Control"
      description="Edit the homepage in the same order guests experience it: announcement bar, hero, then supporting sections. The structure map stays visible while you update content."
      previewHref="/"
      contentClassName="min-h-0 flex flex-1 flex-col overflow-hidden"
    >
      <AdminFeedback searchParams={searchParams} />

      <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[320px_minmax(0,1fr)_360px]">
        <aside className="admin-panel min-h-0 overflow-hidden rounded-[1.5rem]">
          <div className="border-b border-white/[0.08] px-5 py-4">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              Section Map
            </p>
            <h2 className="mt-2 text-[1.35rem] font-semibold text-white">Homepage flow</h2>
          </div>

          <div className="admin-scrollbar min-h-0 space-y-3 overflow-y-auto p-4">
            {orderedSections.map((section, index) => (
              <Link
                key={section.name}
                href={section.editHref}
                className="admin-panel admin-panel-hover rounded-[1rem] border-white/[0.08] bg-black/20 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/36">
                      Step {index + 1}
                    </p>
                    <p className="mt-1 font-semibold text-white">{section.name}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="rounded-full border border-white/10 bg-white/[0.04] font-mono text-[10px] tracking-[0.2em] text-white/58"
                  >
                    {section.status}
                  </Badge>
                </div>
                <p className="mt-3 text-sm font-semibold text-[var(--color-primary)]">Open section</p>
              </Link>
            ))}
          </div>
        </aside>

        <section className="admin-panel admin-scrollbar min-h-0 overflow-y-auto rounded-[1.5rem]">
          <div className="border-b border-white/[0.08] px-5 py-4">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              Primary Content
            </p>
            <h2 className="mt-2 text-[1.5rem] font-semibold text-white">Hero and intro content</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/55">
              These are the biggest first-impression edits on the homepage.
            </p>
          </div>

          <form action={saveHomepageContentAction} className="space-y-4 p-5">
            <HiddenField name="redirect_to" value="/admin/homepage" />
            <HiddenField name="business_name" value={payload.brand.businessName} />

            {payload.homePage.heroImageUrl ? (
              <div className="rounded-[1rem] border border-white/[0.08] bg-black/20 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-primary)]">
                  Current Hero Photo
                </p>
                <img
                  src={payload.homePage.heroImageUrl}
                  alt="Current hero"
                  className="mt-3 h-52 w-full rounded-[1rem] object-cover"
                />
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput label="Small Headline" name="hero_eyebrow" defaultValue={payload.settings.heroEyebrow} required />
              <AdminInput label="Hero Image URL" name="hero_image_url" defaultValue={payload.homePage.heroImageUrl} />
              <AdminInput label="Main Headline" name="hero_headline" defaultValue={payload.settings.heroHeadline} required />
              <AdminInput label="Quick Hours Summary" name="quick_info_hours_label" defaultValue={payload.settings.quickInfoHoursLabel} required />
              <AdminInput label="Main Button Text" name="hero_primary_cta_label" defaultValue={payload.settings.heroPrimaryCtaLabel} required />
              <AdminInput label="Main Button Link" name="hero_primary_cta_href" defaultValue={payload.settings.heroPrimaryCtaHref} required />
              <AdminInput label="Second Button Text" name="hero_secondary_cta_label" defaultValue={payload.settings.heroSecondaryCtaLabel} required />
              <AdminInput label="Second Button Link" name="hero_secondary_cta_href" defaultValue={payload.settings.heroSecondaryCtaHref} required />
            </div>

            <AdminFileInput
              label="Upload Hero Photo"
              name="hero_image_file"
              accept=".png,.jpg,.jpeg,.webp"
              helperText="If both a file and URL are provided, the uploaded file wins."
            />

            <AdminTextarea label="Hero Text" name="hero_subheadline" defaultValue={payload.settings.heroSubheadline} required />
            <AdminTextarea
              label="Short Note Under the Hero"
              name="ordering_notice"
              defaultValue={payload.settings.orderingNotice}
              rows={3}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput label="Menu Preview Title" name="menu_preview_title" defaultValue={payload.homePage.menuPreviewTitle} />
              <AdminInput label="Gallery Title" name="gallery_title" defaultValue={payload.homePage.galleryTitle} />
              <AdminInput label="Contact Title" name="contact_title" defaultValue={payload.homePage.contactTitle} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <AdminTextarea label="Menu Preview Subtitle" name="menu_preview_subtitle" defaultValue={payload.homePage.menuPreviewSubtitle} rows={3} />
              <AdminTextarea label="Gallery Subtitle" name="gallery_subtitle" defaultValue={payload.homePage.gallerySubtitle} rows={3} />
              <AdminTextarea label="Contact Subtitle" name="contact_subtitle" defaultValue={payload.homePage.contactSubtitle} rows={3} />
            </div>

            <AdminInput label="About Section Title" name="about_title" defaultValue={payload.aboutPage.title} required />
            <AdminTextarea
              label="About Section Text"
              name="about_body"
              defaultValue={payload.aboutPage.body.join("\n\n")}
              rows={6}
              required
            />

            <div className="flex flex-wrap gap-3">
              <SaveButton label="Save Homepage Content" />
              <PreviewLink href="/" label="Preview Homepage" />
            </div>
          </form>
        </section>

        <aside className="admin-scrollbar min-h-0 space-y-4 overflow-y-auto pr-1">
          <section className="admin-panel rounded-[1.5rem]">
            <div className="border-b border-white/[0.08] px-5 py-4">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                Announcement Control
              </p>
              <h2 className="mt-2 text-[1.35rem] font-semibold text-white">Announcement bar</h2>
            </div>

            <form action={saveAnnouncementAction} className="space-y-4 p-4">
              <HiddenField name="redirect_to" value="/admin/homepage" />
              <AdminInput label="Announcement Label" name="announcement_title" defaultValue={payload.meta.announcementTitle} required />
              <AdminInput label="Announcement Text" name="announcement_body" defaultValue={payload.meta.announcementBody} required />
              <AdminInput label="Order" name="sort_order" type="number" defaultValue={payload.meta.announcementSortOrder} />
              <AdminCheckbox label="Show the announcement bar" name="announcement_is_active" defaultChecked={payload.meta.announcementIsActive} />
              <SaveButton label="Save Announcement" />
            </form>
          </section>

          <SectionVisibilityEditor
            title="Show or hide homepage sections"
            description="Turn major sections on or off using clear system switches."
            features={payload.features}
            redirectPath="/admin/homepage"
            includeMenuTiming={false}
            includeUtilityOptions={false}
          />
        </aside>
      </div>
    </AdminShell>
  );
}
