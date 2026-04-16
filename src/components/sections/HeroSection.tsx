import { Button } from "@/components/ui/button";
import { getBusinessAddress } from "@/lib/brand";
import type { BrandConfig, HomePageContent, SiteSettings } from "@/types/site";

export function HeroSection({
  brand,
  settings,
  homePage,
}: {
  brand: BrandConfig;
  settings: SiteSettings;
  homePage: HomePageContent;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-section-dark)] bg-[var(--color-section-dark-alt)]">
      {homePage.heroImageUrl ? (
        <div className="absolute inset-0 z-0">
          <img
            src={homePage.heroImageUrl}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, color-mix(in srgb, var(--color-section-dark) 88%, transparent) 0%, color-mix(in srgb, var(--color-section-dark-alt) 78%, transparent) 52%, color-mix(in srgb, var(--color-section-dark-alt) 42%, transparent) 100%)",
            }}
          />
        </div>
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-15 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            {settings.heroEyebrow}
          </p>
          <h1 className="mt-5 font-heading text-5xl leading-none text-[var(--color-section-dark-text)] sm:text-6xl lg:text-7xl">
            {settings.heroHeadline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:color-mix(in_srgb,var(--color-section-dark-text)_84%,transparent)] sm:text-xl">
            {settings.heroSubheadline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={settings.heroPrimaryCtaHref}>{settings.heroPrimaryCtaLabel}</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={settings.heroSecondaryCtaHref}>{settings.heroSecondaryCtaLabel}</a>
            </Button>
          </div>
          <div className="mt-8 inline-flex max-w-full rounded-full border border-[color:color-mix(in_srgb,var(--color-section-dark-text)_18%,transparent)] bg-[color:color-mix(in_srgb,var(--color-section-dark)66%,transparent)] px-4 py-2 text-sm font-medium text-[color:color-mix(in_srgb,var(--color-section-dark-text)_88%,transparent)] backdrop-blur-sm">
            {getBusinessAddress(brand)}
          </div>
        </div>
      </div>
    </section>
  );
}

