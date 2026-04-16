import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { getAdminSitePayload } from "@/lib/queries";

function buildActivityFeed({
  announcementLive,
  featuredSpecialLabel,
  visibleSectionCount,
  photoCount,
}: {
  announcementLive: boolean;
  featuredSpecialLabel: string;
  visibleSectionCount: number;
  photoCount: number;
}) {
  return [
    announcementLive
      ? "Announcement bar is live on the homepage."
      : "Announcement bar is currently offline.",
    `Primary special: ${featuredSpecialLabel}.`,
    `${visibleSectionCount} homepage sections are currently visible to guests.`,
    `${photoCount} gallery photos are available in the live library.`,
  ];
}

export default async function AdminDashboardPage() {
  const payload = await getAdminSitePayload();
  const totalItems = payload.menuCategories.reduce(
    (count, category) => count + category.items.length,
    0,
  );
  const featuredSpecial =
    payload.specials.find((special) => special.isFeatured && special.isActive) ??
    payload.specials.find((special) => special.isActive) ??
    null;
  const visibleSectionCount = [
    payload.meta.announcementIsActive && payload.meta.announcementBody.trim()
      ? "Announcement Bar"
      : null,
    "Hero",
    payload.features.showSpecials ? "Daily Specials" : null,
    "Featured Menu",
    "About",
    payload.features.showGallery ? "Photo Gallery" : null,
    payload.features.showTestimonials ? "Testimonials" : null,
    "Contact",
    payload.features.showMap ? "Map" : null,
  ].filter(Boolean).length;
  const pendingQueue = [
    !featuredSpecial ? "Set a featured special" : null,
    !payload.meta.announcementIsActive || !payload.meta.announcementBody.trim()
      ? "Publish an announcement bar"
      : null,
    totalItems === 0 ? "Load menu items into the live system" : null,
    payload.hours.length === 0 ? "Enter open hours" : null,
    payload.galleryImages.length === 0 ? "Add gallery photos" : null,
  ].filter(Boolean) as string[];
  const featuredSpecialLabel = featuredSpecial
    ? featuredSpecial.price === null
      ? featuredSpecial.title
      : `${featuredSpecial.title} ($${featuredSpecial.price.toFixed(2)})`
    : "No live special selected";
  const activityFeed = buildActivityFeed({
    announcementLive:
      payload.meta.announcementIsActive && Boolean(payload.meta.announcementBody.trim()),
    featuredSpecialLabel,
    visibleSectionCount,
    photoCount: payload.galleryImages.length,
  });

  return (
    <AdminShell
      activeKey="overview"
      brandName={payload.brand.businessName}
      eyebrow="Control Terminal"
      title="Control Terminal"
      description="Run the restaurant website like an operating console. Check the live site first, then move into the one update that matters right now."
      previewHref="/"
      contentClassName="min-h-0 flex flex-1 flex-col overflow-hidden"
    >
      <div className="grid min-h-0 flex-1 gap-4 lg:grid-rows-[auto_minmax(0,1fr)_auto]">
        <section className="admin-panel overflow-hidden rounded-[1.5rem]">
          <div className="flex flex-col gap-4 border-b border-white/[0.08] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                {payload.brand.businessName} // Control Terminal
              </p>
              <p className="mt-2 text-sm leading-6 text-white/58">
                Live publishing is active. The workspace below keeps the current site state, the
                priority actions, and the supporting system details visible at the same time.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
                Status: Live
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
                {pendingQueue.length} Changes Pending
              </div>
            </div>
          </div>
          <div className="grid gap-3 px-5 py-3 text-sm text-white/50 md:grid-cols-3">
            <p>Primary special: {featuredSpecial ? featuredSpecial.title : "Not set"}</p>
            <p>Hours summary: {payload.settings.quickInfoHoursLabel || "Not configured"}</p>
            <p>Menu system: {payload.menuCategories.length} sections online</p>
          </div>
        </section>

        <div className="grid min-h-0 gap-4 xl:grid-cols-[minmax(340px,0.76fr)_minmax(420px,1.24fr)]">
          <section className="admin-panel min-h-0 overflow-hidden rounded-[1.5rem]">
            <div className="border-b border-white/[0.08] px-5 py-4">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                Live Site Snapshot
              </p>
              <h2 className="mt-2 text-[1.45rem] font-semibold text-white">Current guest-facing output</h2>
            </div>
            <div className="grid h-full min-h-0 gap-3 p-4 lg:grid-rows-3">
              <div className="rounded-[1.1rem] border border-white/[0.08] bg-black/25 p-4">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">
                  Announcement
                </p>
                <p className="mt-3 text-sm leading-6 text-white/68">
                  {payload.meta.announcementIsActive && payload.meta.announcementBody.trim()
                    ? payload.meta.announcementBody
                    : "No announcement is currently being broadcast."}
                </p>
              </div>

              <div className="rounded-[1.1rem] border border-white/[0.08] bg-black/25 p-4">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">
                  Featured Special
                </p>
                {featuredSpecial ? (
                  <>
                    <p className="mt-3 text-xl font-semibold text-white">{featuredSpecial.title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/62">
                      {featuredSpecial.description}
                    </p>
                    <p className="mt-3 text-sm font-semibold text-[var(--color-primary)]">
                      {featuredSpecial.price === null
                        ? featuredSpecial.label
                        : `${featuredSpecial.label} // $${featuredSpecial.price.toFixed(2)}`}
                    </p>
                  </>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-white/62">
                    No special is currently marked as the live focus item.
                  </p>
                )}
              </div>

              <div className="rounded-[1.1rem] border border-white/[0.08] bg-black/25 p-4">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">
                  Hours Summary
                </p>
                <p className="mt-3 text-base font-semibold text-white">
                  {payload.settings.quickInfoHoursLabel || "Quick hours label not configured"}
                </p>
                <div className="mt-3 space-y-1 text-sm text-white/58">
                  {payload.hours.slice(0, 3).map((row) => (
                    <p key={row.dayLabel}>
                      {row.dayLabel}: {row.openText}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="admin-panel min-h-0 overflow-hidden rounded-[1.5rem]">
            <div className="border-b border-white/[0.08] px-5 py-4">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                Primary Control
              </p>
              <h2 className="mt-2 text-[1.6rem] font-semibold text-white">
                Choose the next live change.
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
                These are the highest-frequency publishing actions. Each panel is a direct entry
                point into the edit surface.
              </p>
            </div>

            <div className="grid gap-3 p-4 lg:grid-cols-3">
              <Link
                href="/admin/specials"
                className="admin-panel admin-panel-hover rounded-[1.15rem] border-white/[0.08] bg-white/[0.03] p-4"
              >
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                  Priority 01
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">Edit Today&apos;s Special</h3>
                <p className="mt-2 text-sm leading-6 text-white/56">
                  Swap the headline item, adjust status, and control what guests notice first.
                </p>
              </Link>

              <Link
                href="/admin/hours"
                className="admin-panel admin-panel-hover rounded-[1.15rem] border-white/[0.08] bg-white/[0.03] p-4"
              >
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                  Priority 02
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">Update Hours</h3>
                <p className="mt-2 text-sm leading-6 text-white/56">
                  Change open times, quick-hours copy, and the weekly operating read.
                </p>
              </Link>

              <Link
                href="/admin/menu"
                className="admin-panel admin-panel-hover rounded-[1.15rem] border-white/[0.08] bg-white/[0.03] p-4"
              >
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                  Priority 03
                </p>
                <h3 className="mt-3 text-lg font-semibold text-white">Open Menu Manager</h3>
                <p className="mt-2 text-sm leading-6 text-white/56">
                  Move into the menu console for category edits, item pricing, and visibility.
                </p>
              </Link>
            </div>

            <div className="grid gap-3 border-t border-white/[0.08] px-4 py-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-[1.1rem] border border-white/[0.08] bg-black/25 p-4">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">
                  Attention Queue
                </p>
                <div className="mt-3 space-y-2 text-sm text-white/62">
                  {pendingQueue.length > 0 ? (
                    pendingQueue.map((entry) => <p key={entry}>- {entry}</p>)
                  ) : (
                    <p>- No pending operational gaps detected in the main publishing lanes.</p>
                  )}
                </div>
              </div>

              <div className="rounded-[1.1rem] border border-white/[0.08] bg-black/25 p-4">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">
                  Fast Access
                </p>
                <div className="mt-3 space-y-2 text-sm text-white/62">
                  <Link href="/admin/branding" className="block transition hover:text-white">
                    Open brand identity system
                  </Link>
                  <Link href="/admin/homepage" className="block transition hover:text-white">
                    Adjust homepage visibility
                  </Link>
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition hover:text-white"
                  >
                    Preview live website
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="admin-panel rounded-[1.5rem]">
            <div className="border-b border-white/[0.08] px-5 py-4">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                System Metrics
              </p>
            </div>
            <div className="grid gap-3 px-5 py-4 md:grid-cols-4">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/34">
                  Menu
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">{payload.menuCategories.length}</p>
                <p className="mt-1 text-sm text-white/52">{totalItems} items in circulation</p>
              </div>
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/34">
                  Specials
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">{payload.specials.length}</p>
                <p className="mt-1 text-sm text-white/52">Special offers configured</p>
              </div>
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/34">
                  Photos
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">{payload.galleryImages.length}</p>
                <p className="mt-1 text-sm text-white/52">Gallery assets live</p>
              </div>
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/34">
                  Sections
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">{visibleSectionCount}</p>
                <p className="mt-1 text-sm text-white/52">Homepage modules visible</p>
              </div>
            </div>
          </section>

          <section className="admin-panel rounded-[1.5rem]">
            <div className="border-b border-white/[0.08] px-5 py-4">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                Activity Feed
              </p>
            </div>
            <div className="space-y-3 px-5 py-4 text-sm text-white/62">
              {activityFeed.map((entry) => (
                <p key={entry}>- {entry}</p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AdminShell>
  );
}
