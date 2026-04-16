import type { BrandConfig, BusinessHour, SiteSettings } from "@/types/site";

function buildHoursSummary(hours: BusinessHour[], fallback: string) {
  if (hours.length === 0) {
    return fallback;
  }

  return [...hours]
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((entry) => `${entry.dayLabel} ${entry.openText}`)
    .join(" • ");
}

export function QuickInfoBar({
  brand,
  settings,
  hours,
}: {
  brand: BrandConfig;
  settings: SiteSettings;
  hours: BusinessHour[];
}) {
  const hoursSummary = buildHoursSummary(hours, settings.quickInfoHoursLabel);

  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-muted)]">
      <div className="mx-auto grid max-w-6xl gap-3 px-4 py-3 sm:grid-cols-2 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4 text-sm shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
            Address
          </p>
          <p className="mt-1 font-medium text-[var(--color-foreground)]">
            {brand.addressLine1}, {brand.city}, {brand.state}
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-4 text-sm shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
            Phone
          </p>
          <p className="mt-1 font-medium text-[var(--color-foreground)]">
            {brand.phone}
          </p>
        </div>
        <div className="order-first rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-5 text-sm shadow-sm sm:col-span-2 md:order-none md:col-span-1">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
            Hours
          </p>
          <p className="mt-2 text-base font-semibold leading-relaxed text-[var(--color-foreground)]">
            {hoursSummary}
          </p>
        </div>
      </div>
    </section>
  );
}

