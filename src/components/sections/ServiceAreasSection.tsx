import type { ServiceArea } from "@/types/site";

export function ServiceAreasSection({
  areas,
  title = "Service Areas",
}: {
  areas: ServiceArea[];
  title?: string;
}) {
  if (areas.length === 0) return null;

  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
          Coverage
        </p>
        <h2 className="mt-2 font-heading text-4xl text-[var(--color-foreground)]">
          {title}
        </h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {areas.map((area) => (
            <span
              key={area.id}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-2.5 text-sm font-semibold text-[var(--color-foreground)]"
            >
              {area.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
