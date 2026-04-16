import { deleteHourAction, saveHourAction, saveQuickHoursAction } from "@/app/admin/actions";
import { AdminFeedback } from "@/components/admin/AdminFeedback";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  AdminCheckbox,
  AdminInput,
  DeleteButton,
  HiddenField,
  PreviewLink,
  SaveButton,
} from "@/components/admin/FormPrimitives";
import { getAdminSitePayload } from "@/lib/queries";

type AdminPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function AdminHoursPage({ searchParams }: AdminPageProps) {
  const payload = await getAdminSitePayload();

  return (
    <AdminShell
      activeKey="hours"
      brandName={payload.brand.businessName}
      eyebrow="Hours System"
      title="Hours Control"
      description="Keep the quick-hours summary and the weekly schedule visible together so operational changes stay clear and trustworthy."
      previewHref="/"
      contentClassName="min-h-0 flex flex-1 flex-col overflow-hidden"
    >
      <AdminFeedback searchParams={searchParams} />

      <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[360px_minmax(0,1fr)_320px]">
        <aside className="admin-panel min-h-0 overflow-hidden rounded-[1.5rem]">
          <div className="border-b border-white/[0.08] px-5 py-4">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              Customer Read
            </p>
            <h2 className="mt-2 text-[1.35rem] font-semibold text-white">Live hours summary</h2>
          </div>

          <div className="space-y-3 p-4">
            <div className="rounded-[1rem] border border-white/[0.08] bg-black/25 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/36">
                Quick Summary
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                {payload.settings.quickInfoHoursLabel}
              </p>
            </div>

            <div className="rounded-[1rem] border border-white/[0.08] bg-black/25 p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/36">
                Weekly Read
              </p>
              <div className="mt-3 space-y-2 text-sm text-white/62">
                {payload.hours.slice(0, 5).map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-start justify-between gap-3 rounded-[0.9rem] border border-white/[0.08] bg-white/[0.03] px-3 py-3"
                  >
                    <span className="font-semibold text-white">{entry.dayLabel}</span>
                    <span className="text-right">{entry.openText}</span>
                  </div>
                ))}
              </div>
            </div>

            <PreviewLink href="/" label="Preview Homepage" />
          </div>
        </aside>

        <section className="admin-panel admin-scrollbar min-h-0 overflow-y-auto rounded-[1.5rem]">
          <div className="border-b border-white/[0.08] px-5 py-4">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              Weekly Schedule
            </p>
            <h2 className="mt-2 text-[1.45rem] font-semibold text-white">Edit operating hours</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/55">
              Maintain one row per day or grouped day range. Keep hidden rows out of the public read.
            </p>
          </div>

          <div className="space-y-4 p-5">
            {payload.hours.map((entry) => (
              <div
                key={entry.id}
                className="rounded-[1.1rem] border border-white/[0.08] bg-black/20 p-4"
              >
                <form action={saveHourAction} className="space-y-4">
                  <HiddenField name="redirect_to" value="/admin/hours" />
                  <HiddenField name="hour_id" value={entry.id} />
                  <div className="grid gap-4 md:grid-cols-[1fr_1fr_120px]">
                    <AdminInput
                      label="Day or Day Range"
                      name="day_label"
                      defaultValue={entry.dayLabel}
                      required
                    />
                    <AdminInput
                      label="Open Hours"
                      name="open_text"
                      defaultValue={entry.openText}
                      required
                    />
                    <AdminInput
                      label="Order"
                      name="sort_order"
                      type="number"
                      defaultValue={entry.sortOrder}
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <AdminCheckbox
                      label="Show this row on the site"
                      name="is_active"
                      defaultChecked={entry.isActive}
                    />
                    <SaveButton label="Save Hours Row" />
                  </div>
                </form>
                <form action={deleteHourAction} className="mt-3">
                  <HiddenField name="redirect_to" value="/admin/hours" />
                  <HiddenField name="hour_id" value={entry.id} />
                  <DeleteButton label="Delete Row" />
                </form>
              </div>
            ))}
          </div>
        </section>

        <aside className="admin-panel rounded-[1.5rem]">
          <div className="border-b border-white/[0.08] px-5 py-4">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              Control Stack
            </p>
            <h2 className="mt-2 text-[1.35rem] font-semibold text-white">Summary and add row</h2>
          </div>

          <div className="admin-scrollbar space-y-4 overflow-y-auto p-4">
            <form action={saveQuickHoursAction} className="space-y-4 rounded-[1rem] border border-white/[0.08] bg-black/25 p-4">
              <HiddenField name="redirect_to" value="/admin/hours" />
              <AdminInput
                label="Quick Hours Summary"
                name="quick_info_hours_label"
                defaultValue={payload.settings.quickInfoHoursLabel}
                required
              />
              <SaveButton label="Save Quick Summary" />
            </form>

            <form
              action={saveHourAction}
              className="space-y-4 rounded-[1rem] border border-dashed border-white/[0.1] bg-black/15 p-4"
            >
              <HiddenField name="redirect_to" value="/admin/hours" />
              <AdminInput label="Day or Day Range" name="day_label" required />
              <AdminInput label="Open Hours" name="open_text" required />
              <AdminInput label="Order" name="sort_order" type="number" />
              <AdminCheckbox label="Show this row on the site" name="is_active" defaultChecked />
              <SaveButton label="Add Hours Row" />
            </form>
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}
