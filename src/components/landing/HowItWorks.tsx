"use client";

import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  PencilSimple,
  Globe,
  TerminalWindow,
} from "@phosphor-icons/react";

const steps = [
  {
    step: "01",
    label: "EDIT",
    title: "Edit your business",
    description:
      "Update your menu, hours, specials, and branding from a single control panel. Every field is live-editable — no rebuilding, no waiting.",
    details: [
      "Menu items & pricing",
      "Opening hours",
      "Active specials",
      "Brand & theme",
    ],
    icon: PencilSimple,
    statusLabel: "CHANGES PENDING",
    statusVariant: "pending" as const,
    panelLines: [
      { key: "menu.special", value: "Truffle Risotto — $24" },
      { key: "hours.friday", value: "17:00 – 23:00" },
      { key: "brand.accent", value: "warm-amber" },
    ],
  },
  {
    step: "02",
    label: "PREVIEW",
    title: "See it live instantly",
    description:
      "Changes propagate to your live site in real time. No deploy step. No cache flush. Your customers see the update the moment you save.",
    details: [
      "Real-time propagation",
      "Live site snapshot",
      "Updated specials",
      "Current hours",
    ],
    icon: Globe,
    statusLabel: "LIVE",
    statusVariant: "live" as const,
    panelLines: [
      { key: "site.status", value: "live · synced 0s ago" },
      { key: "special.active", value: "Truffle Risotto" },
      { key: "hours.now", value: "Open until 23:00" },
    ],
  },
  {
    step: "03",
    label: "CONTROL",
    title: "Stay in control",
    description:
      "Monitor your site's activity feed, track what's live, and act fast with quick actions — all from one persistent dashboard.",
    details: [
      "Activity feed",
      "Live status rail",
      "Quick actions",
      "Change history",
    ],
    icon: TerminalWindow,
    statusLabel: "UPDATED",
    statusVariant: "updated" as const,
    panelLines: [
      { key: "activity.last", value: "Special updated · 2m ago" },
      { key: "site.uptime", value: "99.98%" },
      { key: "actions.ready", value: "3 quick actions" },
    ],
  },
];

const statusStyles: Record<string, string> = {
  pending: "bg-accent text-accent-foreground",
  live: "bg-primary text-primary-foreground",
  updated: "bg-muted text-foreground border border-border",
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted py-24 px-4 md:px-8">
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-16">
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-3">
          system / flow
        </p>
        <h2 className="font-heading text-3xl md:text-4xl text-foreground leading-tight">
          How BranchKit works
        </h2>
        <p className="mt-3 text-muted-foreground text-base max-w-xl">
          Three stages. One continuous control flow. Your business stays live
          and current without the overhead.
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="relative flex flex-col md:flex-row"
              >
                {/* Panel */}
                <div className="group flex-1 flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-md transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-primary cursor-default">
                  {/* Status rail */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/60">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-muted-foreground tracking-widest">
                        step.{step.step}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground opacity-50">
                        /
                      </span>
                      <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                        {step.label}
                      </span>
                    </div>
                    <span
                      className={`font-mono text-[10px] tracking-widest px-2 py-0.5 rounded-full ${statusStyles[step.statusVariant]}`}
                    >
                      {step.statusLabel}
                    </span>
                  </div>

                  {/* Panel body */}
                  <div className="flex-1 p-5 flex flex-col gap-4">
                    {/* Icon + title */}
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 rounded-lg bg-muted border border-border group-hover:border-primary transition-colors duration-200">
                        <Icon
                          weight="duotone"
                          size={20}
                          className="text-foreground"
                        />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg text-foreground leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {/* Monospace data panel */}
                    <div className="rounded-lg bg-background border border-border p-3 font-mono text-xs space-y-1.5 group-hover:border-primary/40 transition-colors duration-200">
                      {step.panelLines.map((line) => (
                        <div
                          key={line.key}
                          className="flex items-baseline gap-2"
                        >
                          <span className="text-muted-foreground shrink-0">
                            {line.key}
                          </span>
                          <span className="text-foreground opacity-40 shrink-0">
                            →
                          </span>
                          <span className="text-foreground truncate">
                            {line.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Detail tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                      {step.details.map((detail) => (
                        <Badge
                          key={detail}
                          variant="outline"
                          className="font-mono text-[10px] tracking-wide text-muted-foreground border-border px-2 py-0.5 rounded-full"
                        >
                          {detail}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connector arrow between steps (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center w-8 shrink-0 z-10 relative">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-px flex-1 bg-border" />
                      <ArrowRight
                        weight="duotone"
                        size={16}
                        className="text-muted-foreground shrink-0"
                      />
                      <div className="w-px flex-1 bg-border" />
                    </div>
                  </div>
                )}

                {/* Connector for mobile (vertical) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center py-3">
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-4 w-px bg-border" />
                      <ArrowRight
                        weight="duotone"
                        size={14}
                        className="text-muted-foreground rotate-90"
                      />
                      <div className="h-4 w-px bg-border" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom annotation */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="h-px flex-1 max-w-xs bg-border" />
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
            one continuous flow
          </span>
          <div className="h-px flex-1 max-w-xs bg-border" />
        </div>
      </div>
    </section>
  );
}
