import {
  deleteSpecialAction,
  saveAnnouncementAction,
  saveSpecialAction,
} from "@/app/admin/actions";
import { AdminFeedback } from "@/components/admin/AdminFeedback";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  AdminCard,
  AdminCheckbox,
  AdminInput,
  AdminTextarea,
  DeleteButton,
  HiddenField,
  PreviewLink,
  SaveButton,
} from "@/components/admin/FormPrimitives";
import { getAdminSitePayload } from "@/lib/queries";

type AdminPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function AdminSpecialsPage({
  searchParams,
}: AdminPageProps) {
  const payload = await getAdminSitePayload();
  const featuredSpecial =
    payload.specials.find((special) => special.isFeatured && special.isActive) ??
    payload.specials.find((special) => special.isActive) ??
    null;

  return (
    <AdminShell
      activeKey="specials"
      brandName={payload.brand.businessName}
      eyebrow="Live Specials"
      title="Specials Panel"
      description="Keep the current special in focus, maintain the announcement bar, and manage the broader specials registry without losing the live state."
      previewHref="/"
      contentClassName="min-h-0 flex flex-1 flex-col overflow-hidden"
    >
      <AdminFeedback searchParams={searchParams} />

      <div className="grid min-h-0 flex-1 gap-4 lg:grid-rows-[auto_minmax(0,1fr)]">
        <section className="admin-panel overflow-hidden rounded-[1.5rem]">
          <div className="grid gap-4 border-b border-white/[0.08] px-5 py-4 xl:grid-cols-[minmax(0,1.15fr)_320px]">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                Today&apos;s Special
              </p>
              <h2 className="mt-2 text-[2rem] font-semibold leading-none text-white">
                {featuredSpecial?.title ?? "No live special selected"}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58">
                {featuredSpecial?.description ??
                  'No special is currently featured. Use the registry below and enable "Feature this special" on the offer you want guests to see first.'}
              </p>
              {featuredSpecial ? (
                <p className="mt-4 text-sm font-semibold text-[var(--color-primary)]">
                  {featuredSpecial.price === null
                    ? featuredSpecial.label
                    : `${featuredSpecial.label} // $${featuredSpecial.price.toFixed(2)}`}
                </p>
              ) : null}
            </div>

            <div className="rounded-[1.15rem] border border-white/[0.08] bg-black/25 p-4">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">
                Status
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <div
                  className={[
                    "rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em]",
                    featuredSpecial
                      ? "border border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
                      : "border border-white/10 bg-white/[0.04] text-white/58",
                  ].join(" ")}
                >
                  {featuredSpecial ? "Live" : "Waiting"}
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/58">
                  {payload.specials.length} Specials Loaded
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-white/58">
                <p>Announcement: {payload.meta.announcementIsActive ? "Live" : "Hidden"}</p>
                <p>Homepage preview uses the featured active special first.</p>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="#specials-registry"
                  className="rounded-[0.95rem] border border-[var(--color-primary)] bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(181,84,61,0.18)] transition hover:opacity-95"
                >
                  Replace Special
                </a>
                <PreviewLink href="/" label="Preview Homepage" />
              </div>
            </div>
          </div>
          <div className="grid gap-3 px-5 py-3 text-sm text-white/50 md:grid-cols-3">
            <p>Primary offer: {featuredSpecial ? "Ready" : "Needs assignment"}</p>
            <p>Announcement bar: {payload.meta.announcementIsActive ? "Broadcasting" : "Offline"}</p>
            <p>Queue depth: {payload.specials.length} specials in registry</p>
          </div>
        </section>

        <div className="grid min-h-0 gap-4 xl:grid-cols-[minmax(0,1.25fr)_380px]">
          <div className="admin-scrollbar min-h-0 space-y-4 overflow-y-auto pr-1">
            <AdminCard
              title="Specials Registry"
              description="Every special stays editable here. Keep one clear primary special live and the supporting offers orderly."
              eyebrow="Specials Registry"
              className="rounded-[1.5rem]"
            >
              <div id="specials-registry" className="space-y-4">
                {payload.specials.length === 0 ? (
                  <div className="rounded-[1rem] border border-dashed border-white/[0.1] bg-black/20 p-4 text-sm text-white/50">
                    No specials have been added yet. Use the add panel to create the first special.
                  </div>
                ) : null}

                {payload.specials.map((special) => (
                  <div
                    key={special.id}
                    className="rounded-[1.15rem] border border-white/[0.08] bg-black/20 p-4"
                  >
                    <div className="mb-4 flex flex-wrap gap-2">
                      <span
                        className={[
                          "rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]",
                          special.isActive
                            ? "bg-emerald-400/15 text-emerald-200"
                            : "bg-white/[0.06] text-white/45",
                        ].join(" ")}
                      >
                        {special.isActive ? "Live" : "Hidden"}
                      </span>
                      {special.isFeatured ? (
                        <span className="rounded-full bg-[var(--color-primary)]/20 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                          Primary
                        </span>
                      ) : null}
                    </div>

                    <form action={saveSpecialAction} className="space-y-4">
                      <HiddenField name="redirect_to" value="/admin/specials" />
                      <HiddenField name="special_id" value={special.id} />
                      <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr_120px]">
                        <AdminInput
                          label="Special Name"
                          name="title"
                          defaultValue={special.title}
                          required
                        />
                        <AdminInput
                          label="Special Label"
                          name="label"
                          defaultValue={special.label}
                          required
                        />
                        <AdminInput
                          label="Order"
                          name="sort_order"
                          type="number"
                          defaultValue={special.sortOrder}
                        />
                      </div>
                      <AdminTextarea
                        label="Description"
                        name="description"
                        defaultValue={special.description}
                        required
                      />
                      <div className="grid gap-4 md:grid-cols-[160px_1fr_1fr]">
                        <AdminInput
                          label="Price"
                          name="price"
                          type="number"
                          step="0.01"
                          min="0"
                          defaultValue={special.price === null ? "" : special.price.toFixed(2)}
                        />
                        <AdminCheckbox
                          label="Show this special"
                          name="is_active"
                          defaultChecked={special.isActive}
                        />
                        <AdminCheckbox
                          label="Feature this special"
                          name="is_featured"
                          defaultChecked={special.isFeatured}
                        />
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <SaveButton label="Save Special" />
                      </div>
                    </form>
                    <form action={deleteSpecialAction} className="mt-3">
                      <HiddenField name="redirect_to" value="/admin/specials" />
                      <HiddenField name="special_id" value={special.id} />
                      <DeleteButton label="Delete Special" />
                    </form>
                  </div>
                ))}
              </div>
            </AdminCard>
          </div>

          <div className="admin-scrollbar min-h-0 space-y-4 overflow-y-auto pr-1">
            <AdminCard
              title="Announcement Bar"
              description="Use the top-line banner for closures, promos, or operational notices."
              eyebrow="Broadcast Control"
              className="rounded-[1.5rem]"
            >
              <form action={saveAnnouncementAction} className="space-y-4">
                <HiddenField name="redirect_to" value="/admin/specials" />
                <AdminInput
                  label="Announcement Label"
                  name="announcement_title"
                  defaultValue={payload.meta.announcementTitle}
                  required
                />
                <AdminInput
                  label="Announcement Text"
                  name="announcement_body"
                  defaultValue={payload.meta.announcementBody}
                  required
                />
                <AdminInput
                  label="Order"
                  name="sort_order"
                  type="number"
                  defaultValue={payload.meta.announcementSortOrder}
                />
                <AdminCheckbox
                  label="Show the announcement bar"
                  name="announcement_is_active"
                  defaultChecked={payload.meta.announcementIsActive}
                />
                <SaveButton label="Save Announcement" />
              </form>
            </AdminCard>

            <AdminCard
              title="Add Special"
              description="Create the next offer, then decide whether it should go live immediately."
              eyebrow="New Special"
              className="rounded-[1.5rem]"
            >
              <form action={saveSpecialAction} className="space-y-4">
                <HiddenField name="redirect_to" value="/admin/specials" />
                <AdminInput label="Special Name" name="title" required />
                <AdminInput label="Special Label" name="label" required />
                <AdminInput label="Order" name="sort_order" type="number" />
                <AdminTextarea label="Description" name="description" required />
                <AdminInput
                  label="Price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                />
                <AdminCheckbox label="Show this special" name="is_active" defaultChecked />
                <AdminCheckbox label="Feature this special" name="is_featured" />
                <SaveButton label="Add Special" />
              </form>
            </AdminCard>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
