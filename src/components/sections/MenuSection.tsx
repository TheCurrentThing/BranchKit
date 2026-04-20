// MenuSection — single entry point for all food-service menu rendering.
// Dispatches to an internal layout variant based on category.
// DO NOT add per-kit logic outside this file.

import type { SitePayload } from "@/types/site";
import type { MenuCategory } from "@/types/menu";
import type { MenuVariant } from "@/lib/rendering/resolve-menu-variant";
import { resolveMenuVariant } from "@/lib/rendering/resolve-menu-variant";

// ─── Entry point ──────────────────────────────────────────────────────────────

export function MenuSection({ payload }: { payload: SitePayload }) {
  const categories = payload.menuCategories?.filter((c) => c.isActive) ?? [];
  if (categories.length === 0) return null;

  const variant: MenuVariant = resolveMenuVariant(payload.kitCategory);

  if (variant === "editorial") return <EditorialMenu categories={categories} />;
  if (variant === "compact")   return <CompactMenu   categories={categories} />;
  if (variant === "nightlife") return <NightlifeMenu  categories={categories} />;
}

// ─── Shared props type ────────────────────────────────────────────────────────

type MenuProps = { categories: MenuCategory[] };

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT: EDITORIAL — restaurant, diner
//
// Structure: course blocks with dividers, single-column items, description as
// primary content. Scan pattern: linear, top-to-bottom per course.
// ─────────────────────────────────────────────────────────────────────────────

function EditorialMenu({ categories }: MenuProps) {
  return (
    <section
      data-section="menu"
      data-menu-variant="editorial"
      className="bg-[var(--color-surface)] py-20"
    >
      <div className="mx-auto max-w-3xl px-6">

        {/* Section label */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
          The Menu
        </p>
        <h2 className="mt-2 font-heading text-3xl text-[var(--color-foreground)] md:text-4xl">
          What we&rsquo;re serving
        </h2>

        {/* Course blocks */}
        <div className="mt-14 space-y-16">
          {categories.map((cat) => {
            const items = cat.items.filter((i) => i.isActive);
            if (items.length === 0) return null;

            return (
              <div key={cat.id}>
                {/* Course header */}
                <div className="flex items-center gap-4">
                  <h3 className="shrink-0 font-heading text-xl text-[var(--color-foreground)]">
                    {cat.name}
                  </h3>
                  <div className="h-px flex-1 bg-[color:color-mix(in_srgb,var(--color-foreground)_14%,transparent)]" />
                </div>

                {/* Item list — single column, divider-separated */}
                <ul className="mt-6 divide-y divide-[color:color-mix(in_srgb,var(--color-foreground)_10%,transparent)]">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className={[
                        "flex gap-6 py-5",
                        item.isFeatured
                          ? "border-l-2 border-[var(--color-primary)] pl-4 -ml-[calc(1rem+2px)]"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {/* Item body */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-heading text-lg leading-snug text-[var(--color-foreground)]">
                            {item.name}
                          </span>
                          {item.isFeatured && (
                            <span className="shrink-0 rounded bg-[var(--color-primary)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--color-primary-text)]">
                              Chef&rsquo;s Pick
                            </span>
                          )}
                          {item.isSoldOut && (
                            <span className="shrink-0 rounded border border-[color:color-mix(in_srgb,var(--color-foreground)_24%,transparent)] px-1.5 py-0.5 text-[9px] uppercase tracking-[0.12em] text-[color:color-mix(in_srgb,var(--color-foreground)_40%,transparent)]">
                              86&apos;d
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="mt-1.5 text-sm leading-relaxed text-[color:color-mix(in_srgb,var(--color-foreground)_62%,transparent)]">
                            {item.description}
                          </p>
                        )}
                        {item.tags && item.tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-[color:color-mix(in_srgb,var(--color-foreground)_18%,transparent)] px-2 py-0.5 text-[10px] text-[color:color-mix(in_srgb,var(--color-foreground)_52%,transparent)]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Price — secondary, right-aligned */}
                      {item.price > 0 && (
                        <div className="shrink-0 pt-0.5 text-right">
                          <span
                            className={[
                              "text-base font-medium",
                              item.isSoldOut
                                ? "text-[color:color-mix(in_srgb,var(--color-foreground)_30%,transparent)] line-through"
                                : "text-[var(--color-foreground)]",
                            ].join(" ")}
                          >
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT: COMPACT — cafe, food_truck
//
// Structure: flat category chips → single-row items (name + price only).
// Description hidden. Scan pattern: left-to-right per row, price visible at a
// glance. Optimized for "what do you have and what does it cost?"
// ─────────────────────────────────────────────────────────────────────────────

function CompactMenu({ categories }: MenuProps) {
  const allActiveCategories = categories.filter(
    (c) => c.items.filter((i) => i.isActive).length > 0
  );

  return (
    <section
      data-section="menu"
      data-menu-variant="compact"
      className="bg-[var(--color-section-dark)] py-16"
    >
      <div className="mx-auto max-w-4xl px-6">

        {/* Section label */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]">
          On the Menu
        </p>
        <h2 className="mt-1.5 font-heading text-2xl text-[var(--color-section-dark-text)]">
          What&rsquo;s available today
        </h2>

        {/* Category blocks */}
        <div className="mt-10 space-y-8">
          {allActiveCategories.map((cat) => {
            const items = cat.items.filter((i) => i.isActive);

            return (
              <div key={cat.id}>
                {/* Category chip */}
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-[color:color-mix(in_srgb,var(--color-section-dark-text)_10%,transparent)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:color-mix(in_srgb,var(--color-section-dark-text)_52%,transparent)]">
                    {cat.name}
                  </span>
                  {cat.serviceWindow && cat.serviceWindow !== "all-day" && (
                    <span className="text-[10px] uppercase tracking-[0.14em] text-[color:color-mix(in_srgb,var(--color-section-dark-text)_32%,transparent)]">
                      {cat.serviceWindow}
                    </span>
                  )}
                </div>

                {/* Item rows — tabular: name fills width, price pinned right */}
                <div className="divide-y divide-[color:color-mix(in_srgb,var(--color-section-dark-text)_8%,transparent)]">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 py-2.5"
                    >
                      {/* Featured dot */}
                      <span
                        className={[
                          "mt-px h-1.5 w-1.5 shrink-0 rounded-full",
                          item.isFeatured
                            ? "bg-[var(--color-primary)]"
                            : "bg-transparent",
                        ].join(" ")}
                        aria-hidden="true"
                      />

                      {/* Name + optional tag */}
                      <span
                        className={[
                          "flex-1 text-sm",
                          item.isSoldOut
                            ? "text-[color:color-mix(in_srgb,var(--color-section-dark-text)_32%,transparent)] line-through"
                            : "text-[var(--color-section-dark-text)]",
                        ].join(" ")}
                      >
                        {item.name}
                        {item.tags?.includes("Signature") && (
                          <span className="ml-2 text-[10px] text-[var(--color-primary)]">
                            ◆
                          </span>
                        )}
                      </span>

                      {/* Dot leader — pure CSS flex spacer */}
                      <span
                        className="flex-1 border-b border-dotted border-[color:color-mix(in_srgb,var(--color-section-dark-text)_18%,transparent)]"
                        aria-hidden="true"
                      />

                      {/* Price pinned right */}
                      {item.price > 0 ? (
                        <span
                          className={[
                            "shrink-0 text-sm font-semibold tabular-nums",
                            item.isSoldOut
                              ? "text-[color:color-mix(in_srgb,var(--color-section-dark-text)_28%,transparent)] line-through"
                              : "text-[var(--color-primary)]",
                          ].join(" ")}
                        >
                          ${item.price.toFixed(2)}
                        </span>
                      ) : (
                        <span className="shrink-0 text-xs text-[color:color-mix(in_srgb,var(--color-section-dark-text)_30%,transparent)]">
                          —
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT: NIGHTLIFE — bar, pop_up
//
// Structure: per-category section with featured spotlight + card grid.
// Price is the dominant visual; items are browsed, not read linearly.
// Scan pattern: grid browse — price first, name second, description optional.
// ─────────────────────────────────────────────────────────────────────────────

function NightlifeMenu({ categories }: MenuProps) {
  const allActiveCategories = categories.filter(
    (c) => c.items.filter((i) => i.isActive).length > 0
  );

  return (
    <section
      data-section="menu"
      data-menu-variant="nightlife"
      className="bg-[var(--color-section-dark-alt)] py-20"
    >
      <div className="mx-auto max-w-5xl px-6">

        {/* Section label */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
          Tonight
        </p>
        <h2 className="mt-1.5 font-heading text-3xl text-[var(--color-section-dark-text)] md:text-4xl">
          What&rsquo;s on
        </h2>

        {/* Category sections */}
        <div className="mt-12 space-y-14">
          {allActiveCategories.map((cat) => {
            const items = cat.items.filter((i) => i.isActive);
            const featured = items.filter((i) => i.isFeatured);
            const standard = items.filter((i) => !i.isFeatured);

            return (
              <div key={cat.id}>
                {/* Category bar — thick + accent underline */}
                <div className="mb-6 border-b-2 border-[var(--color-accent)] pb-2">
                  <h3 className="font-heading text-xl uppercase tracking-[0.08em] text-[var(--color-section-dark-text)]">
                    {cat.name}
                  </h3>
                </div>

                {/* Featured spotlight cards — full width, one per featured item */}
                {featured.length > 0 && (
                  <div className="mb-6 space-y-3">
                    {featured.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between gap-4 rounded-xl border border-[var(--color-accent)]/30 bg-[color:color-mix(in_srgb,var(--color-accent)_6%,var(--color-section-dark))] px-6 py-5"
                      >
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                            ◆&nbsp; Featured
                          </p>
                          <p className="mt-1.5 font-heading text-xl text-[var(--color-section-dark-text)]">
                            {item.name}
                          </p>
                          {item.description && (
                            <p className="mt-1 text-sm leading-relaxed text-[color:color-mix(in_srgb,var(--color-section-dark-text)_60%,transparent)]">
                              {item.description}
                            </p>
                          )}
                          {item.tags && item.tags.length > 0 && (
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-[var(--color-accent)]/30 px-2.5 py-0.5 text-[10px] text-[color:color-mix(in_srgb,var(--color-accent)_80%,transparent)]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {item.price > 0 && (
                          <div className="shrink-0 text-right">
                            <span className="font-heading text-3xl font-bold text-[var(--color-accent)]">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.isSoldOut && (
                              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[color:color-mix(in_srgb,var(--color-section-dark-text)_40%,transparent)]">
                                Sold out
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Standard grid — price leads, name below */}
                {standard.length > 0 && (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {standard.map((item) => (
                      <div
                        key={item.id}
                        className={[
                          "flex flex-col rounded-lg border p-4 transition-colors",
                          item.isSoldOut
                            ? "border-[color:color-mix(in_srgb,var(--color-section-dark-text)_8%,transparent)] opacity-50"
                            : "border-[color:color-mix(in_srgb,var(--color-section-dark-text)_12%,transparent)] bg-[color:color-mix(in_srgb,var(--color-section-dark-text)_3%,transparent)]",
                        ].join(" ")}
                      >
                        {/* Price — top, dominant */}
                        <div className="flex items-start justify-between gap-2">
                          {item.price > 0 ? (
                            <span className="font-heading text-2xl font-bold text-[var(--color-section-dark-text)]">
                              ${item.price.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-sm text-[color:color-mix(in_srgb,var(--color-section-dark-text)_34%,transparent)]">
                              Ask us
                            </span>
                          )}
                          {item.isSoldOut && (
                            <span className="rounded bg-[color:color-mix(in_srgb,var(--color-section-dark-text)_12%,transparent)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[color:color-mix(in_srgb,var(--color-section-dark-text)_50%,transparent)]">
                              Out
                            </span>
                          )}
                        </div>

                        {/* Name */}
                        <p className="mt-2 text-sm font-medium leading-snug text-[var(--color-section-dark-text)]">
                          {item.name}
                        </p>

                        {/* Description — optional, small */}
                        {item.description && (
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[color:color-mix(in_srgb,var(--color-section-dark-text)_46%,transparent)]">
                            {item.description}
                          </p>
                        )}

                        {/* Tags */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="mt-2.5 flex flex-wrap gap-1">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-[color:color-mix(in_srgb,var(--color-section-dark-text)_14%,transparent)] px-2 py-0.5 text-[9px] text-[color:color-mix(in_srgb,var(--color-section-dark-text)_44%,transparent)]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
