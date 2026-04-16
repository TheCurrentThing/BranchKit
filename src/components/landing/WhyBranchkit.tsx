"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Circle,
  ArrowRight,
  CheckCircle,
  XCircle,
  Star,
  Broadcast,
  Clock,
} from "@phosphor-icons/react";

const traditionalPoints = [
  {
    icon: XCircle,
    label: "Static",
    description:
      "Content is baked in at build time. Every change requires a developer or a rebuild cycle.",
  },
  {
    icon: XCircle,
    label: "Hard to update",
    description:
      "Editing a menu item or changing hours means touching code, files, or a clunky CMS.",
  },
  {
    icon: XCircle,
    label: "Outdated",
    description:
      "Sites drift from reality. Customers see stale hours, old specials, and wrong prices.",
  },
];

const branchkitPoints = [
  {
    icon: CheckCircle,
    label: "Live",
    description:
      "Every change you make reflects instantly. Your site is always in sync with your business.",
  },
  {
    icon: CheckCircle,
    label: "Controlled",
    description:
      "One dashboard. Menu, hours, specials, branding — all managed from a single control surface.",
  },
  {
    icon: CheckCircle,
    label: "Always current",
    description:
      "No drift. No stale data. What you set is what customers see, the moment you set it.",
  },
];

const proofCues = [
  {
    icon: Broadcast,
    label: "Live status",
    mono: "STATUS: LIVE",
  },
  {
    icon: Star,
    label: "Instant updates",
    mono: "SYNC: 0ms",
  },
  {
    icon: Clock,
    label: "Star awareness",
    mono: "LOG: ACTIVE",
  },
];

export default function WhyBranchkit() {
  return (
    <section id="why-branchkit" className="bg-card py-24 px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-14">
        {/* Section intro */}
        <div className="flex flex-col gap-3 max-w-xl">
          <Badge
            variant="outline"
            className="w-fit font-mono text-xs tracking-widest text-muted-foreground border-border uppercase px-3 py-1"
          >
            Comparison
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground leading-tight tracking-tight">
            Why BranchKit feels different
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Most websites are built once and forgotten. BranchKit treats your
            site as a live system — always reflecting your business as it
            actually is.
          </p>
        </div>

        {/* Comparison panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Traditional Website panel */}
          <div className="group relative flex flex-col gap-0 rounded-xl border border-border bg-background overflow-hidden transition-all duration-200 hover:border-muted hover:shadow-md">
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/40">
              <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                Traditional Website
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              </div>
            </div>

            {/* Points */}
            <div className="flex flex-col divide-y divide-border">
              {traditionalPoints.map((point) => (
                <div
                  key={point.label}
                  className="flex items-start gap-4 px-5 py-5 transition-colors duration-150 group-hover:bg-muted/20"
                >
                  <point.icon
                    weight="duotone"
                    className="text-muted-foreground/50 mt-0.5 shrink-0"
                    size={20}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-muted-foreground">
                      {point.label}
                    </span>
                    <span className="text-sm text-muted-foreground/70 leading-relaxed">
                      {point.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom status rail — muted */}
            <div className="mt-auto px-5 py-3 border-t border-border bg-muted/20 flex items-center gap-2">
              <Circle
                weight="duotone"
                size={8}
                className="text-muted-foreground/40"
              />
              <span className="font-mono text-xs text-muted-foreground/40 tracking-widest">
                STATUS: STATIC
              </span>
            </div>
          </div>

          {/* BranchKit panel */}
          <div className="group relative flex flex-col gap-0 rounded-xl border border-primary/30 bg-background overflow-hidden transition-all duration-200 hover:border-primary/60 hover:shadow-xl hover:-translate-y-1">
            {/* Panel header with active indicator */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-primary/20 bg-primary/5">
              <span className="font-mono text-xs text-primary tracking-widest uppercase">
                BranchKit
              </span>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="font-mono text-xs text-primary/70 tracking-widest">
                  LIVE
                </span>
              </div>
            </div>

            {/* Points */}
            <div className="flex flex-col divide-y divide-border">
              {branchkitPoints.map((point) => (
                <div
                  key={point.label}
                  className="flex items-start gap-4 px-5 py-5 transition-colors duration-150 group-hover:bg-primary/5"
                >
                  <point.icon
                    weight="duotone"
                    className="text-primary mt-0.5 shrink-0"
                    size={20}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-foreground">
                      {point.label}
                    </span>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {point.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom status rail — active */}
            <div className="mt-auto px-5 py-3 border-t border-primary/20 bg-primary/5 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="font-mono text-xs text-primary/80 tracking-widest">
                STATUS: LIVE — ALL SYSTEMS CURRENT
              </span>
            </div>
          </div>
        </div>

        {/* Proof cues bottom row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {proofCues.map((cue) => (
            <div
              key={cue.label}
              className="flex items-center gap-4 rounded-lg border border-border bg-background px-5 py-4 transition-all duration-150 hover:border-primary/30 hover:bg-primary/5"
            >
              <cue.icon
                weight="duotone"
                size={22}
                className="text-primary shrink-0"
              />
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-medium text-foreground">
                  {cue.label}
                </span>
                <span className="font-mono text-xs text-muted-foreground tracking-widest truncate">
                  {cue.mono}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
