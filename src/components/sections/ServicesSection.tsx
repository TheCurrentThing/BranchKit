// ServicesSection — single entry point for all services-family rendering.
// Dispatches to an internal layout variant based on category.
// DO NOT add per-kit logic outside this file.

import type { SitePayload } from "@/types/site";
import type { ServiceOffering, ServiceArea } from "@/types/site";
import type { ServiceVariant } from "@/lib/rendering/resolve-service-variant";
import { resolveServiceVariant } from "@/lib/rendering/resolve-service-variant";

// ─── Entry point ──────────────────────────────────────────────────────────────

export function ServicesSection({ payload }: { payload: SitePayload }) {
  const offerings = (payload.serviceOfferings ?? []).filter((o) => o.isActive);
  if (offerings.length === 0) return null;

  const variant: ServiceVariant = resolveServiceVariant(payload.kitCategory);
  const areas = (payload.serviceAreas ?? []).filter((a) => a.isActive);
  const sectionTitle = payload.homePage.menuPreviewTitle ?? "Services";
  const phone = payload.brand.phone ?? null;

  const props: ServicesProps = { offerings, areas, sectionTitle, phone };

  if (variant === "urgent")      return <UrgentServices      {...props} />;
  if (variant === "scheduled")   return <ScheduledServices   {...props} />;
  if (variant === "proof")       return <ProofServices       {...props} />;
  return <StreamlinedServices {...props} />;
}

// ─── Shared props type ────────────────────────────────────────────────────────

type ServicesProps = {
  offerings: ServiceOffering[];
  areas: ServiceArea[];
  sectionTitle: string;
  phone: string | null;
};

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT: URGENT — on_demand, mobile
//
// Structure: action-first rows, high density, immediacy framing. Price is
// right-aligned per row. No card chrome — services feel like a dispatch
// roster, not a product catalog. CTA block anchors the top.
// Scan pattern: skim rows → confirm availability → act.
// ─────────────────────────────────────────────────────────────────────────────

function UrgentServices({ offerings, areas, sectionTitle, phone }: ServicesProps) {
  const featured = offerings.filter((o) => o.isFeatured);
  const standard = offerings.filter((o) => !o.isFeatured);

  return (
    <section
      data-section="services"
      data-service-variant="urgent"
      className="bg-[var(--color-section-dark,#0f0f0f)] py-16"
    >
      <div className="mx-auto max-w-4xl px-6">

        {/* Header + immediate CTA — action precedes browsing */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
              {sectionTitle}
            </p>
            <h2 className="mt-2 font-heading text-3xl text-[var(--color-foreground)] md:text-4xl">
              Available now
            </h2>
          </div>
          {/* Phone or contact CTA — prominent, near the top */}
          <a
            href={phone ? `tel:${phone.replace(/\D/g, "")}` : "#contact"}
            className="inline-flex shrink-0 items-center gap-2 rounded-none border border-[var(--color-primary)] bg-[var(--color-primary)] px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            {phone ? phone : "Request Service"}
          </a>
        </div>

        {/* Featured services — slightly elevated row */}
        {featured.length > 0 && (
          <div className="mb-1 space-y-px">
            {featured.map((o) => (
              <UrgentRow key={o.id} offering={o} elevated />
            ))}
          </div>
        )}

        {/* Standard service rows — dense, scannable */}
        <div className="space-y-px border-t border-[var(--color-border,#2a2a2a)]">
          {standard.map((o) => (
            <UrgentRow key={o.id} offering={o} elevated={false} />
          ))}
        </div>

        {/* Service areas — compact chip strip below roster */}
        {areas.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted-foreground,#666)]">
              Areas:
            </span>
            {areas.map((a) => (
              <span
                key={a.id}
                className="border border-[var(--color-border,#2a2a2a)] px-2.5 py-0.5 text-[11px] text-[var(--color-muted-foreground,#888)]"
              >
                {a.name}
              </span>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

function UrgentRow({ offering, elevated }: { offering: ServiceOffering; elevated: boolean }) {
  return (
    <div
      className={`flex items-start justify-between gap-6 px-4 py-4 transition-colors duration-100 hover:bg-[var(--color-primary)]/5 ${
        elevated
          ? "border-l-2 border-[var(--color-primary)] bg-[var(--color-primary)]/[0.03]"
          : "border-l-2 border-transparent"
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[var(--color-foreground)]">{offering.title}</p>
        {offering.shortDescription && (
          <p className="mt-0.5 line-clamp-1 text-xs text-[var(--color-muted-foreground,#888)]">
            {offering.shortDescription}
          </p>
        )}
      </div>
      <div className="shrink-0 text-right">
        {offering.startingPrice ? (
          <p className="text-sm font-bold text-[var(--color-primary)]">{offering.startingPrice}</p>
        ) : (
          <p className="text-xs text-[var(--color-muted-foreground,#666)]">Call for quote</p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT: SCHEDULED — scheduled
//
// Structure: spacious, appointment-oriented cards. Clean vertical rhythm.
// Services are presented as bookable offerings with room for context.
// CTA anchors the bottom of the section, pointing toward booking.
// Scan pattern: compare what's available → choose → schedule.
// ─────────────────────────────────────────────────────────────────────────────

function ScheduledServices({ offerings, sectionTitle }: ServicesProps) {
  const featured = offerings.filter((o) => o.isFeatured);
  const standard = offerings.filter((o) => !o.isFeatured);

  return (
    <section
      data-section="services"
      data-service-variant="scheduled"
      className="bg-[var(--color-surface)] py-20"
    >
      <div className="mx-auto max-w-5xl px-6">

        {/* Header — calm, planning-oriented */}
        <div className="mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
            {sectionTitle}
          </p>
          <h2 className="mt-2 font-heading text-3xl text-[var(--color-foreground)] md:text-4xl">
            Book your next appointment
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-muted-foreground,#888)]">
            Choose a service below to get started.
          </p>
        </div>

        {/* Featured — 2-col, full description visible */}
        {featured.length > 0 && (
          <div className="mb-5 grid gap-4 sm:grid-cols-2">
            {featured.map((o) => (
              <ScheduledCard key={o.id} offering={o} featured />
            ))}
          </div>
        )}

        {/* Standard — 2-col on sm, 3-col on lg */}
        {standard.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {standard.map((o) => (
              <ScheduledCard key={o.id} offering={o} featured={false} />
            ))}
          </div>
        )}

        {/* Bottom CTA — booking action after comparing options */}
        <div className="mt-14 flex flex-col items-start gap-4 border-t border-[var(--color-border,#2a2a2a)] pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--color-muted-foreground,#888)]">
            Not sure which service is right for you? Get in touch.
          </p>
          <a
            href="#contact"
            className="shrink-0 border border-[var(--color-foreground,#fff)]/20 px-6 py-2.5 text-sm font-semibold text-[var(--color-foreground)] transition-colors duration-150 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            Book Now
          </a>
        </div>

      </div>
    </section>
  );
}

function ScheduledCard({ offering, featured }: { offering: ServiceOffering; featured: boolean }) {
  return (
    <article
      className={`flex flex-col gap-3 border p-6 transition-colors duration-150 ${
        featured
          ? "border-[var(--color-primary)]/30 bg-[var(--color-primary)]/[0.03] hover:border-[var(--color-primary)]/50"
          : "border-[var(--color-border,#2a2a2a)] bg-[var(--color-card,#0f0f0f)] hover:border-[var(--color-border,#444)]"
      }`}
    >
      {featured && (
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Popular
        </p>
      )}
      <h3 className="font-heading text-lg text-[var(--color-foreground)]">{offering.title}</h3>
      {offering.shortDescription && (
        <p className="flex-1 text-sm leading-relaxed text-[var(--color-muted-foreground,#888)]">
          {offering.shortDescription}
        </p>
      )}
      {offering.startingPrice && (
        <p className="mt-auto pt-2 text-base font-bold text-[var(--color-primary)]">
          {offering.startingPrice}
        </p>
      )}
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT: PROOF — project, professional
//
// Structure: credibility-first, spacious, description-heavy. Featured services
// get full-width treatment with room for scope and process. Non-featured are
// in a 2-col grid with description fully visible. No urgency signals.
// Action comes after understanding. Scan pattern: read scope → trust → inquire.
// ─────────────────────────────────────────────────────────────────────────────

function ProofServices({ offerings, sectionTitle }: ServicesProps) {
  const featured = offerings.filter((o) => o.isFeatured);
  const standard = offerings.filter((o) => !o.isFeatured);

  return (
    <section
      data-section="services"
      data-service-variant="proof"
      className="bg-[var(--color-section-dark,#0f0f0f)] py-24"
    >
      <div className="mx-auto max-w-4xl px-6">

        {/* Header — establishes credibility context before any offering */}
        <div className="mb-20 border-b border-[var(--color-border,#2a2a2a)] pb-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">
            {sectionTitle}
          </p>
          <h2 className="mt-3 font-heading text-4xl text-[var(--color-foreground)] md:text-5xl">
            How we work
          </h2>
        </div>

        {/* Featured — full-width, maximum space for scope and description */}
        {featured.length > 0 && (
          <div className="mb-16 space-y-10">
            {featured.map((o) => (
              <ProofFeaturedCard key={o.id} offering={o} />
            ))}
          </div>
        )}

        {/* Standard — 2-col, description fully visible, no truncation */}
        {standard.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2">
            {standard.map((o) => (
              <ProofStandardCard key={o.id} offering={o} />
            ))}
          </div>
        )}

        {/* CTA — action after credibility is established */}
        <div className="mt-20 border-t border-[var(--color-border,#2a2a2a)] pt-12 text-center">
          <p className="font-heading text-2xl text-[var(--color-foreground)]">
            Ready to get started?
          </p>
          <p className="mt-3 text-sm text-[var(--color-muted-foreground,#888)]">
            Reach out to discuss your project and get a clear scope.
          </p>
          <a
            href="#contact"
            className="mt-6 inline-flex border border-[var(--color-primary)] px-8 py-3 text-sm font-bold text-[var(--color-primary)] transition-colors duration-150 hover:bg-[var(--color-primary)] hover:text-white"
          >
            Get in Touch
          </a>
        </div>

      </div>
    </section>
  );
}

function ProofFeaturedCard({ offering }: { offering: ServiceOffering }) {
  return (
    <article className="border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/[0.03] p-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Engagement
          </p>
          <h3 className="mt-2 font-heading text-2xl text-[var(--color-foreground)]">
            {offering.title}
          </h3>
          {offering.shortDescription && (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-muted-foreground,#aaa)]">
              {offering.shortDescription}
            </p>
          )}
        </div>
        {offering.startingPrice && (
          <div className="shrink-0 text-right sm:pl-12">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted-foreground,#666)]">
              Starting from
            </p>
            <p className="mt-1 font-heading text-2xl text-[var(--color-primary)]">
              {offering.startingPrice}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

function ProofStandardCard({ offering }: { offering: ServiceOffering }) {
  return (
    <article className="flex flex-col gap-4 border-t border-[var(--color-border,#2a2a2a)] pt-8">
      <h3 className="font-heading text-xl text-[var(--color-foreground)]">{offering.title}</h3>
      {offering.shortDescription && (
        <p className="flex-1 text-sm leading-relaxed text-[var(--color-muted-foreground,#888)]">
          {offering.shortDescription}
        </p>
      )}
      {offering.startingPrice && (
        <p className="text-sm font-bold text-[var(--color-primary)]">{offering.startingPrice}</p>
      )}
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT: STREAMLINED — general fallback
//
// Structure: balanced 2–3-col grid, no urgency or editorial proof bias.
// All content fields at equal weight. Usable for any services-family category
// that doesn't warrant a more specialized presentation.
// Scan pattern: browse → understand → contact.
// ─────────────────────────────────────────────────────────────────────────────

function StreamlinedServices({ offerings, sectionTitle }: ServicesProps) {
  const featured = offerings.filter((o) => o.isFeatured);
  const standard = offerings.filter((o) => !o.isFeatured);

  return (
    <section
      data-section="services"
      data-service-variant="streamlined"
      className="bg-[var(--color-surface)] py-20"
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Standard header */}
        <div className="mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
            {sectionTitle}
          </p>
          <h2 className="mt-2 font-heading text-3xl text-[var(--color-foreground)] md:text-4xl">
            What we offer
          </h2>
        </div>

        {/* Featured — 2-col on top */}
        {featured.length > 0 && (
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            {featured.map((o) => (
              <StreamlinedCard key={o.id} offering={o} featured />
            ))}
          </div>
        )}

        {/* Standard — 3-col grid */}
        {standard.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {standard.map((o) => (
              <StreamlinedCard key={o.id} offering={o} featured={false} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

function StreamlinedCard({ offering, featured }: { offering: ServiceOffering; featured: boolean }) {
  return (
    <article
      className={`rounded-xl border p-6 transition-colors duration-150 ${
        featured
          ? "border-[var(--color-primary)]/25 bg-[var(--color-card,#0f0f0f)] hover:border-[var(--color-primary)]/40"
          : "border-[var(--color-border,#2a2a2a)] bg-[var(--color-card,#0f0f0f)] hover:border-[var(--color-border,#444)]"
      }`}
    >
      <h3 className="font-heading text-xl text-[var(--color-foreground)]">{offering.title}</h3>
      {offering.shortDescription && (
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground,#888)]">
          {offering.shortDescription}
        </p>
      )}
      {offering.startingPrice && (
        <p className="mt-4 text-sm font-bold text-[var(--color-primary)]">{offering.startingPrice}</p>
      )}
    </article>
  );
}
