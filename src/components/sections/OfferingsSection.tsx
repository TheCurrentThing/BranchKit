import { Card, CardContent } from "@/components/ui/card";
import type { ServiceOffering } from "@/types/site";

export function OfferingsSection({
  offerings,
  title = "Our Services",
}: {
  offerings: ServiceOffering[];
  title?: string;
}) {
  if (offerings.length === 0) return null;

  const featured = offerings.filter((o) => o.isFeatured);
  const rest = offerings.filter((o) => !o.isFeatured);

  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-background)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
          Services
        </p>
        <h2 className="mt-2 font-heading text-4xl text-[var(--color-foreground)]">
          {title}
        </h2>

        {/* Featured offerings — larger card */}
        {featured.length > 0 && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {featured.map((offering) => (
              <Card
                key={offering.id}
                className="border-[var(--color-primary)]/20 bg-[var(--color-card)] shadow-sm"
              >
                <CardContent className="p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                    Featured
                  </p>
                  <h3 className="mt-3 font-heading text-2xl text-[var(--color-foreground)]">
                    {offering.title}
                  </h3>
                  {offering.shortDescription && (
                    <p className="mt-3 text-base leading-relaxed text-[var(--color-foreground)]/72">
                      {offering.shortDescription}
                    </p>
                  )}
                  {offering.startingPrice && (
                    <p className="mt-5 text-lg font-bold text-[var(--color-primary)]">
                      {offering.startingPrice}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Remaining offerings — standard grid */}
        {rest.length > 0 && (
          <div className={`grid gap-4 md:grid-cols-3 ${featured.length > 0 ? "mt-4" : "mt-8"}`}>
            {rest.map((offering) => (
              <Card key={offering.id} className="bg-[var(--color-card)]">
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl text-[var(--color-foreground)]">
                    {offering.title}
                  </h3>
                  {offering.shortDescription && (
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-foreground)]/68">
                      {offering.shortDescription}
                    </p>
                  )}
                  {offering.startingPrice && (
                    <p className="mt-4 text-sm font-bold text-[var(--color-primary)]">
                      {offering.startingPrice}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
