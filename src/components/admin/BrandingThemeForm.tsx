"use client";

import { useMemo, useState } from "react";
import { SaveButton } from "@/components/admin/FormPrimitives";
import { BrandingPreviewLink } from "@/components/admin/BrandingPreviewLink";
import { ThemeCustomizer } from "@/components/admin/ThemeCustomizer";
import { ThemePresetPicker } from "@/components/admin/ThemePresetPicker";
import { ThemePreviewCard } from "@/components/admin/ThemePreviewCard";
import { getThemePresetById, type ThemePreset, type ThemeTokens } from "@/lib/theme";
import { resolveTheme } from "@/lib/theme-utils";

export function BrandingThemeForm({
  initialBrand,
}: {
  initialBrand: {
    businessName: string;
    tagline: string;
    logoUrl?: string;
    themeMode: "preset" | "custom";
    themePresetId: string | null;
    themeTokens: ThemeTokens;
  };
}) {
  const initialPreset = getThemePresetById(initialBrand.themePresetId);
  const [businessName, setBusinessName] = useState(initialBrand.businessName);
  const [tagline, setTagline] = useState(initialBrand.tagline);
  const [selectedPreset, setSelectedPreset] = useState<ThemePreset>(initialPreset);
  const [themeMode, setThemeMode] = useState<"preset" | "custom">(
    initialBrand.themeMode,
  );
  const [themeTokens, setThemeTokens] = useState<ThemeTokens>(initialBrand.themeTokens);

  const resolvedTheme = useMemo(
    () =>
      resolveTheme({
        themeMode,
        themePresetId: selectedPreset.id,
        themeTokens,
      }),
    [selectedPreset.id, themeMode, themeTokens],
  );
  const initialResolvedTheme = useMemo(
    () =>
      resolveTheme({
        themeMode: initialBrand.themeMode,
        themePresetId: initialBrand.themePresetId,
        themeTokens: initialBrand.themeTokens,
      }),
    [initialBrand.themeMode, initialBrand.themePresetId, initialBrand.themeTokens],
  );
  const resolvedSwatches = [
    resolvedTheme.resolvedColors.background,
    resolvedTheme.resolvedColors.surface,
    resolvedTheme.resolvedColors.highlight,
    resolvedTheme.resolvedColors.primary,
    resolvedTheme.resolvedColors.accent,
  ];
  const isDirty =
    businessName.trim() !== initialBrand.businessName.trim() ||
    tagline.trim() !== initialBrand.tagline.trim() ||
    themeMode !== initialBrand.themeMode ||
    selectedPreset.id !== initialPreset.id ||
    JSON.stringify(resolvedTheme.resolvedColors) !==
      JSON.stringify(initialResolvedTheme.resolvedColors);

  function handlePresetSelect(preset: ThemePreset) {
    setSelectedPreset(preset);
    setThemeMode("preset");
    setThemeTokens(preset.colors);
  }

  function handleCustomColorChange(key: keyof ThemeTokens, value: string) {
    setThemeMode("custom");
    setThemeTokens((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function resetToPreset() {
    setThemeMode("preset");
    setThemeTokens(selectedPreset.colors);
  }

  function resetToSaved() {
    setSelectedPreset(getThemePresetById(initialBrand.themePresetId));
    setBusinessName(initialBrand.businessName);
    setTagline(initialBrand.tagline);
    setThemeMode(initialBrand.themeMode);
    setThemeTokens(initialBrand.themeTokens);
  }

  return (
    <div className="h-full min-h-0 overflow-hidden">
      <input type="hidden" name="theme_mode" value={themeMode} />
      <input type="hidden" name="theme_preset_id" value={selectedPreset.id} />
      <input
        type="hidden"
        name="theme_tokens"
        value={JSON.stringify(resolvedTheme.resolvedColors)}
      />

      <div className="grid h-full min-h-0 gap-4 xl:grid-cols-[300px_minmax(0,1fr)_360px]">
        <aside className="admin-panel min-h-0 overflow-hidden rounded-[1.5rem]">
          <div className="flex h-full min-h-0 flex-col">
            <div className="border-b border-white/[0.08] px-5 py-4">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                Brand Identity System
              </p>
              <h2 className="mt-2 text-[1.45rem] font-semibold text-white">Theme selection</h2>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Keep one direction active and compare alternatives without leaving the live preview.
              </p>
            </div>

            <div className="admin-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4">
              <ThemePresetPicker
                selectedPresetId={selectedPreset.id}
                onSelect={handlePresetSelect}
                mode="workspace"
              />
            </div>
          </div>
        </aside>

        <section className="admin-panel min-h-0 overflow-hidden rounded-[1.5rem]">
          <div className="border-b border-white/[0.08] px-5 py-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                  Live Preview
                </p>
                <h3 className="mt-2 text-[1.65rem] font-semibold text-white">
                  {selectedPreset.name}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/56">
                  {selectedPreset.shortDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/58">
                  {themeMode === "custom" ? "Custom Tuned" : "Preset Locked"}
                </div>
                <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/58">
                  {selectedPreset.fonts.label}
                </div>
              </div>
            </div>

            <div className="mt-4 flex overflow-hidden rounded-full border border-white/[0.08]">
              {resolvedSwatches.map((color, index) => (
                <div
                  key={`${selectedPreset.id}-swatch-${index}`}
                  className="h-3 flex-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex h-full min-h-0 flex-col px-5 py-4">
            <div className="min-h-0 flex-1">
              <div className="flex h-full items-start justify-center">
                <div className="w-full max-w-[920px]">
                  <ThemePreviewCard
                    businessName={businessName}
                    tagline={tagline}
                    preset={selectedPreset}
                    tokens={resolvedTheme.resolvedColors}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 border-t border-white/[0.08] pt-3 text-sm text-white/52">
              Preview stays live while you change the identity controls. Saving pushes the selected
              direction into the active restaurant theme.
            </div>
          </div>
        </section>

        <aside className="admin-panel min-h-0 overflow-hidden rounded-[1.5rem]">
          <div className="flex h-full min-h-0 flex-col">
            <div className="border-b border-white/[0.08] px-5 py-4">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                Control Stack
              </p>
              <h3 className="mt-2 text-[1.45rem] font-semibold text-white">Save, reset, fine tune</h3>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Brand details, live actions, and deeper color tuning stay grouped in one command lane.
              </p>
            </div>

            <div className="admin-scrollbar min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
              <div className="grid gap-2">
                <div
                  className={[
                    "rounded-[1rem] border px-4 py-3",
                    isDirty
                      ? "border-amber-300/25 bg-amber-300/10 text-amber-100"
                      : "border-emerald-400/25 bg-emerald-400/10 text-emerald-100",
                  ].join(" ")}
                >
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
                    {isDirty ? "Changes Pending" : "Saved State Live"}
                  </p>
                  <p className="mt-2 text-sm">
                    {isDirty
                      ? "You are viewing unsaved identity changes."
                      : "The preview matches the saved live theme."}
                  </p>
                </div>

                <div className="grid gap-2">
                  <SaveButton label="Save Theme" />
                  <BrandingPreviewLink
                    businessName={businessName}
                    tagline={tagline}
                    themeMode={themeMode}
                    themePresetId={selectedPreset.id}
                    themeTokens={resolvedTheme.resolvedColors}
                  />
                  <button
                    type="button"
                    onClick={resetToPreset}
                    className="rounded-[0.95rem] border border-white/10 bg-white/[0.04] px-4 py-2.5 text-left text-sm font-semibold text-white/78 transition hover:bg-white/[0.07]"
                  >
                    Reset to Preset
                  </button>
                  <button
                    type="button"
                    onClick={resetToSaved}
                    className="rounded-[0.95rem] border border-white/10 bg-transparent px-4 py-2.5 text-left text-sm font-semibold text-white/58 transition hover:bg-white/[0.04] hover:text-white/78"
                  >
                    Reset to Saved
                  </button>
                </div>
              </div>

              <div className="rounded-[1.15rem] border border-white/[0.08] bg-black/25 p-4">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">
                  Brand Details
                </p>

                <div className="mt-4 space-y-4">
                  <label className="block space-y-1.5">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                      Business Name
                    </span>
                    <input
                      name="business_name"
                      value={businessName}
                      onChange={(event) => setBusinessName(event.target.value)}
                      required
                      className="w-full rounded-[1rem] border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--color-primary)] focus:bg-black/40"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                      Tagline
                    </span>
                    <input
                      name="tagline"
                      value={tagline}
                      onChange={(event) => setTagline(event.target.value)}
                      required
                      className="w-full rounded-[1rem] border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--color-primary)] focus:bg-black/40"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                      Logo Image URL
                    </span>
                    <input
                      name="logo_url"
                      defaultValue={initialBrand.logoUrl ?? ""}
                      placeholder="https://..."
                      className="w-full rounded-[1rem] border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[var(--color-primary)] focus:bg-black/40"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/48">
                      Upload Logo
                    </span>
                    <input
                      name="logo_file"
                      type="file"
                      accept=".png,.jpg,.jpeg,.webp,.svg"
                      className="w-full rounded-[1rem] border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/70 outline-none transition file:mr-4 file:rounded-xl file:border-0 file:bg-[var(--color-primary)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                    />
                  </label>

                  {initialBrand.logoUrl ? (
                    <div className="rounded-[1rem] border border-white/[0.08] bg-white/[0.03] p-4">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/38">
                        Current Logo
                      </p>
                      <div className="mt-3 flex items-center justify-center rounded-[0.9rem] bg-white p-4">
                        <img
                          src={initialBrand.logoUrl}
                          alt={`${businessName} logo`}
                          className="max-h-20 w-auto"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <ThemeCustomizer
                tokens={resolvedTheme.resolvedColors}
                onChange={handleCustomColorChange}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
