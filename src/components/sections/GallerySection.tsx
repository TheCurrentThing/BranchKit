import type { GalleryImage } from "@/types/site";

export function GallerySection({
  images,
  title,
  subtitle,
}: {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
}) {
  if (images.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-muted)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-primary)]">
          Gallery
        </p>
        {title ? (
          <h2 className="mt-2 font-heading text-4xl text-[var(--color-foreground)]">
            {title}
          </h2>
        ) : null}
        {subtitle ? (
          <p className="mt-3 max-w-2xl text-base text-[var(--color-foreground)]/70">
            {subtitle}
          </p>
        ) : null}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-64 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

