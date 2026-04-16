"use client";

import type { ThemeTokens } from "@/lib/theme";

const editableFields: Array<{
  key: keyof ThemeTokens;
  label: string;
}> = [
  { key: "primary", label: "Primary Button Color" },
  { key: "accent", label: "Accent Color" },
  { key: "background", label: "Page Background" },
  { key: "surface", label: "Box / Card Color" },
  { key: "text", label: "Main Text Color" },
];

export function ThemeCustomizer({
  tokens,
  onChange,
}: {
  tokens: ThemeTokens;
  onChange: (key: keyof ThemeTokens, value: string) => void;
}) {
  return (
    <details className="rounded-[1.15rem] border border-white/[0.08] bg-[#171717]">
      <summary className="cursor-pointer list-none px-5 py-5">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Fine Tune
        </p>
        <p className="mt-2 text-base font-semibold text-white">Customize colors</p>
        <p className="mt-2 text-sm leading-6 text-white/58">
          Use this only when the preset is close and you need a tighter brand match.
        </p>
      </summary>

      <div className="grid gap-4 border-t border-white/[0.08] px-5 py-5 md:grid-cols-2">
        {editableFields.map((field) => (
          <label key={field.key} className="block space-y-2">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              {field.label}
            </span>
            <div className="flex items-center gap-3 rounded-[1rem] border border-white/10 bg-black/20 px-3 py-3">
              <input
                type="color"
                value={tokens[field.key]}
                onChange={(event) => onChange(field.key, event.target.value)}
                className="h-10 w-14 rounded-xl border-0 bg-transparent p-0"
              />
              <div>
                <p className="text-sm font-semibold text-white">
                  {tokens[field.key]}
                </p>
                <p className="text-xs text-white/45">Custom override</p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </details>
  );
}
