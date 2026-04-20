import type { SitePayload } from "@/types/site";
import { resolveShellCopy } from "@/lib/rendering/shell-copy-contract";

export function HeaderSection({ payload }: { payload: SitePayload }) {
  const shell = resolveShellCopy(payload.kitCategory);

  return (
    <header
      data-section="header"
      className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <span className="text-base font-semibold text-white">
          {payload.brand.businessName}
        </span>
        <nav className="hidden gap-6 text-sm text-zinc-400 md:flex">
          <a href={shell.catalogPath} className="hover:text-white transition-colors">
            {shell.catalogLabel}
          </a>
          {shell.galleryNavLabel && (
            <a href={shell.galleryNavPath} className="hover:text-white transition-colors">
              {shell.galleryNavLabel}
            </a>
          )}
          <a href={shell.contactNavPath} className="hover:text-white transition-colors">
            {shell.contactNavLabel}
          </a>
        </nav>
        {payload.brand.phone && (
          <a
            href={`tel:${payload.brand.phone.replace(/\D/g, "")}`}
            className="rounded-full bg-amber-500 px-4 py-1.5 text-sm font-semibold text-zinc-950 hover:bg-amber-400"
          >
            {payload.brand.phone}
          </a>
        )}
      </div>
    </header>
  );
}
