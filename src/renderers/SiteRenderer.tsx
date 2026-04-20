import { resolveRenderer } from "@/lib/rendering/resolve-renderer";
import { resolveShellCopy } from "@/lib/rendering/shell-copy-contract";
import type { SiteRendererProps } from "@/types/renderer";

// Entry point for all public site rendering.
// Delegates to resolveRenderer — the single decision point for which renderer
// wraps a payload. Never import renderers directly elsewhere.
export function SiteRenderer(props: SiteRendererProps) {
  const Renderer = resolveRenderer(props.payload);

  if (process.env.NODE_ENV !== "production") {
    const { kitFamily, kitCategory, rendererType } = props.payload;
    const effectiveRenderer =
      rendererType === "signature" && kitFamily === "food_service"
        ? "signature"
        : "standard";
    const shell = resolveShellCopy(kitCategory);
    console.log("[BranchKit] SiteRenderer resolved", {
      family: kitFamily,
      category: kitCategory,
      requestedRenderer: rendererType,
      effectiveRenderer,
      shell: {
        catalogLabel:  shell.catalogLabel,
        ctaLabel:      shell.ctaLabel,
        mobileAction:  shell.midLabel,
      },
    });
  }

  return <Renderer {...props} />;
}
