"use client";

import {
  fontPackToFontStacks,
  getFontVariableClassNamesForPack,
} from "@/lib/font-registry";
import { buildThemeCssVars } from "@/lib/theme-utils";
import type { ThemePreset, ThemeTokens } from "@/lib/theme";

export function ThemePreviewCard({
  businessName,
  tagline,
  preset,
  tokens,
}: {
  businessName: string;
  tagline: string;
  preset: ThemePreset;
  tokens: ThemeTokens;
}) {
  const fontClassNames = getFontVariableClassNamesForPack(preset.fonts);
  const fontStacks = fontPackToFontStacks(preset.fonts);

  return (
    <div
      className={`${fontClassNames} overflow-hidden rounded-[2rem] border border-white/[0.08] bg-black/20 shadow-[0_24px_80px_rgba(0,0,0,0.28)]`}
      style={buildThemeCssVars(tokens, preset.fonts)}
    >
      <div className="border-b border-[var(--color-border)] bg-[var(--color-announcement-bg)] px-5 py-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-announcement-text)]">
        Friday fish special all day
      </div>

      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] px-5 py-5 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p
              className="text-2xl leading-none text-[var(--color-text)] sm:text-3xl"
              style={{
                fontFamily: fontStacks.heading,
              }}
            >
              {businessName}
            </p>
            <p
              className="mt-1 text-sm text-[var(--color-muted-text)]"
              style={{
                fontFamily: fontStacks.body,
              }}
            >
              {tagline}
            </p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <span className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-[var(--color-primary-text)]">
              View Menu
            </span>
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-button-secondary-bg)] px-4 py-2 text-sm font-semibold text-[var(--color-button-secondary-text)]">
              Call Now
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-section-dark-alt)] px-5 py-6 sm:px-6 sm:py-8">
        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Hometown Dining
            </p>
            <h4
              className="mt-3 max-w-2xl text-4xl leading-none text-[var(--color-section-dark-text)] sm:text-5xl"
              style={{
                fontFamily: fontStacks.heading,
              }}
            >
              Fresh meals that feel right for the neighborhood.
            </h4>
            <p
              className="mt-5 max-w-xl text-sm leading-7 text-[var(--color-section-dark-text)] opacity-82"
              style={{
                fontFamily: fontStacks.body,
              }}
            >
              Quick specials, easy menu browsing, and simple owner updates.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-section-dark)] p-5 text-[var(--color-section-dark-text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              Today&apos;s Special
            </p>
            <p
              className="mt-3 text-2xl leading-tight text-[var(--color-section-dark-text)]"
              style={{
                fontFamily: fontStacks.heading,
              }}
            >
              Country Fried Steak
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--color-section-dark-text)]/80">
              Served with mashed potatoes and gravy.
            </p>
            <div className="mt-5 inline-flex rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold text-[var(--color-accent-text)]">
              Available until sold out
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {["Address", "Phone", "Hours"].map((label, index) => (
            <div
              key={label}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
                {label}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text)]">
                {index === 0
                  ? "108 N Chestnut St"
                  : index === 1
                    ? "(618) 867-3175"
                    : "Tue-Sun 5:30 AM - 3:00 PM"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
