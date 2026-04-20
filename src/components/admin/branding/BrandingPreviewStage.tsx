"use client";

// Renders the REAL site renderer inside the Branding admin preview viewport.
// The preview is the product: whatever the renderer shows here is exactly what
// the published site shows. No hand-rolled mock, no drifting category mocks.
//
// Layering: branding draft → real saved payload → category seed (empty-slot fill).
// `resolveRenderer` is the single entry point — same function live traffic uses.

import { useMemo } from "react";
import type { SitePayload } from "@/types/site";
import type { KitCategory, KitFamily } from "@/types/kit";
import { resolveRenderer } from "@/lib/rendering/resolve-renderer";
import { buildPreviewPayload, type BrandingDraft } from "@/lib/rendering/preview-payload";

export type BrandingPreviewStageProps = {
  realPayload: SitePayload;
  brandingDraft?: BrandingDraft;
  family: KitFamily;
  category: KitCategory;
};

export function BrandingPreviewStage({
  realPayload,
  brandingDraft,
  family,
  category,
}: BrandingPreviewStageProps) {
  const previewPayload = useMemo(
    () => buildPreviewPayload({ realPayload, brandingDraft, family, category }),
    [realPayload, brandingDraft, family, category],
  );

  const Renderer = useMemo(
    () => resolveRenderer(previewPayload),
    [previewPayload],
  );

  return <Renderer payload={previewPayload} basePath="/preview" />;
}
