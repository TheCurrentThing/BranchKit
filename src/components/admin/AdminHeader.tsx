import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AdminHeader({
  eyebrow = "Control Surface",
  title,
  description,
  previewHref = "/",
}: {
  eyebrow?: string;
  title: string;
  description: string;
  previewHref?: string;
}) {
  return (
    <div className="admin-panel overflow-hidden rounded-[1.5rem]">
      <div className="flex flex-col gap-4 border-b border-white/[0.08] px-5 py-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
              {eyebrow}
            </p>
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/58">
              Live System
            </div>
            <Badge
              variant="secondary"
              className="rounded-full border border-white/10 bg-white/[0.04] font-mono text-[10px] tracking-[0.2em] text-white/58"
            >
              Operator
            </Badge>
          </div>
          <h1 className="mt-3 font-heading text-[2.35rem] leading-none text-white sm:text-[2.8rem]">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60 sm:text-base">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            asChild
            variant="ghost"
            className="rounded-[0.95rem] border border-white/10 bg-white/[0.03] px-4 py-2.5 text-white/72 hover:bg-white/[0.06]"
          >
            <Link href="/admin">Overview</Link>
          </Button>
          <Button
            asChild
            className="rounded-[0.95rem] border border-[var(--color-primary)] bg-[var(--color-primary)] px-4 py-2.5 text-[var(--color-primary-text)] shadow-[0_0_24px_rgba(181,84,61,0.18)]"
          >
            <a href={previewHref} target="_blank" rel="noopener noreferrer">
              Preview Website
            </a>
          </Button>
        </div>
      </div>

      <div className="grid gap-3 px-5 py-3 text-sm text-white/48 sm:grid-cols-3">
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/34">
            {eyebrow}
          </p>
          <p className="mt-1 text-white/68">Current workspace channel</p>
        </div>
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/34">
            System Role
          </p>
          <p className="mt-1 text-white/68">Live publishing control surface</p>
        </div>
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/34">
            Mode
          </p>
          <p className="mt-1 text-white/68">Warm terminal, non-technical safe</p>
        </div>
      </div>
    </div>
  );
}

