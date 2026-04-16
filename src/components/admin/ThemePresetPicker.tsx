"use client";

import {
  fontPackToFontStacks,
  getFontVariableClassNamesForPack,
} from "@/lib/font-registry";
import { cn } from "@/lib/utils";
import { THEME_PRESETS, type ThemePreset } from "@/lib/theme";

type ThemePresetPickerProps = {
  selectedPresetId?: string | null;
  onSelect: (preset: ThemePreset) => void;
  className?: string;
  mode?: "default" | "workspace";
};

function ThemeSwatchStrip({ preset }: { preset: ThemePreset }) {
  const swatches = [
    preset.colors.background,
    preset.colors.surface,
    preset.colors.highlight,
    preset.colors.primary,
    preset.colors.accent,
  ];

  return (
    <div className="flex overflow-hidden rounded-full border border-[var(--color-border)]">
      {swatches.map((color, index) => (
        <div
          key={`${preset.id}-${index}`}
          className="h-3 flex-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

function ThemePresetCard({
  preset,
  selected,
  onClick,
}: {
  preset: ThemePreset;
  selected: boolean;
  onClick: () => void;
}) {
  const fontClassNames = getFontVariableClassNamesForPack(preset.fonts);
  const fontStacks = fontPackToFontStacks(preset.fonts);

  return (
    <button
      type="button"
      onClick={onClick}
      data-font-preview={preset.id}
      className={cn(
        fontClassNames,
        "group relative w-full rounded-[1.75rem] border p-4 text-left transition-all",
        "hover:-translate-y-0.5 hover:bg-white/[0.05]",
        selected
          ? "border-[var(--color-primary)] bg-white/[0.06] shadow-[0_0_0_1px_var(--color-primary)]"
          : "border-white/[0.08] bg-[#171717] hover:border-white/[0.12]",
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">
              {preset.name}
            </span>
            {selected ? (
              <span className="inline-flex rounded-full bg-[var(--color-primary)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-primary-text)]">
                Current
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs leading-5 text-white/45">
            {preset.shortDescription}
          </p>
        </div>

        <div className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50 transition-colors group-hover:bg-white/[0.08]">
          Style
        </div>
      </div>

      <div className="mb-4">
        <ThemeSwatchStrip preset={preset} />
      </div>

      <div
        className="mb-4 rounded-xl border p-3"
        style={{
          backgroundColor: preset.colors.surface,
          borderColor: preset.colors.border,
          color: preset.colors.text,
        }}
      >
        <div
          className="text-lg leading-tight"
          style={{
            fontFamily: fontStacks.heading,
          }}
        >
          Hometown Cooking
        </div>
        <div
          className="mt-1 text-sm"
          style={{
            color: preset.colors.mutedText,
            fontFamily: fontStacks.body,
          }}
        >
          Fresh meals, clear prices, easy updates.
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span
            className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: preset.colors.primary,
              color: preset.colors.primaryText,
            }}
          >
            View Menu
          </span>
          <span
            className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: preset.colors.buttonSecondaryBg,
              color: preset.colors.buttonSecondaryText,
              border: `1px solid ${preset.colors.border}`,
            }}
          >
            Call Now
          </span>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
          Font Pairing
        </p>
        <p className="mt-1 text-xs text-white/60">{preset.fonts.label}</p>
      </div>

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
          Best For
        </p>
        <div className="flex flex-wrap gap-2">
          {preset.recommendedFor.slice(0, 3).map((item) => (
            <span
              key={`${preset.id}-${item}`}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/58"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function ThemePresetCompactCard({
  preset,
  onClick,
}: {
  preset: ThemePreset;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-[1.35rem] border border-white/[0.06] bg-white/[0.02] p-3 text-left transition hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-white/[0.05]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">{preset.name}</p>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/45">
            {preset.shortDescription}
          </p>
        </div>
        <span className="rounded-full border border-white/[0.08] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/42">
          Try
        </span>
      </div>

      <div className="mt-3">
        <ThemeSwatchStrip preset={preset} />
      </div>
    </button>
  );
}

export function ThemePresetPicker({
  selectedPresetId,
  onSelect,
  className,
  mode = "default",
}: ThemePresetPickerProps) {
  const activePreset =
    THEME_PRESETS.find((preset) => preset.id === selectedPresetId) ?? THEME_PRESETS[0];
  const otherPresets = THEME_PRESETS.filter((preset) => preset.id !== activePreset.id);

  if (mode === "workspace") {
    return (
      <section className={cn("space-y-5", className)}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
            Style Library
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            Pick the direction.
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/52">
            Keep one theme active, compare alternatives quickly, and use the
            preview to judge the final fit.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Active Theme
            </p>
            <ThemePresetCard
              preset={activePreset}
              selected
              onClick={() => onSelect(activePreset)}
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Other Directions
            </p>
            <div className="space-y-3">
              {otherPresets.map((preset) => (
                <ThemePresetCompactCard
                  key={preset.id}
                  preset={preset}
                  onClick={() => onSelect(preset)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "space-y-6",
        className,
      )}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
          Style Library
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">
          One direction leads. The rest stay in reserve.
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/58">
          The selected theme stays large and central. Alternatives are kept smaller
          so the page feels like choosing a brand direction, not browsing a marketplace.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
            Active Theme
          </p>
          <ThemePresetCard
            preset={activePreset}
            selected
            onClick={() => onSelect(activePreset)}
          />
        </div>

        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
            Other Directions
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {otherPresets.map((preset) => (
              <ThemePresetCompactCard
                key={preset.id}
                preset={preset}
                onClick={() => onSelect(preset)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThemePresetPicker;
