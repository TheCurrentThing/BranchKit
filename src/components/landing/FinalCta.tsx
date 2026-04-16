"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Circle,
  ArrowRight,
  CheckCircle,
  Broadcast,
} from "@phosphor-icons/react";

const statusItems = [
  { label: "Menu", value: "Updated 2m ago", active: true },
  { label: "Hours", value: "Open · Closes 11PM", active: true },
  { label: "Specials", value: "3 live items", active: true },
  { label: "Branding", value: "Theme v2 applied", active: false },
];

const closingPoints = [
  "No rebuilds. No waiting. No middlemen.",
  "Every change you make is live in seconds.",
];

export default function FinalCta() {
  return (
    <section
      id="final-cta"
      className="bg-background py-24 px-4 flex flex-col items-center justify-center min-h-screen"
    >
      <div className="w-full max-w-3xl flex flex-col items-center gap-12">
        {/* Framed Dashboard Panel */}
        <div className="w-full rounded-xl border border-border shadow-xl overflow-hidden">
          {/* Window Chrome / Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted border-b border-border">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-muted-foreground opacity-30" />
              <span className="w-3 h-3 rounded-full bg-muted-foreground opacity-30" />
              <span className="w-3 h-3 rounded-full bg-muted-foreground opacity-30" />
            </div>
            <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
              branchkit · control panel
            </span>
            <Badge className="bg-primary text-primary-foreground font-mono text-xs px-2 py-0.5 flex items-center gap-1 rounded-full">
              <Broadcast weight="duotone" size={10} />
              LIVE
            </Badge>
          </div>

          {/* Status Rail */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border border-b border-border">
            {statusItems.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1 px-4 py-3 bg-card"
              >
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  {item.label}
                </span>
                <div className="flex items-center gap-1.5">
                  <Circle
                    weight="fill"
                    size={7}
                    className={
                      item.active
                        ? "text-primary"
                        : "text-muted-foreground opacity-40"
                    }
                  />
                  <span className="font-mono text-xs text-foreground leading-tight">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Panel Body */}
          <div className="bg-card px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                system status
              </span>
              <div className="flex flex-col gap-2">
                {closingPoints.map((point) => (
                  <div key={point} className="flex items-start gap-2">
                    <CheckCircle
                      weight="duotone"
                      size={16}
                      className="text-primary mt-0.5 shrink-0"
                    />
                    <span className="font-mono text-sm text-foreground leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monospace annotation */}
            <div className="shrink-0 flex flex-col items-end gap-1 opacity-60">
              <span className="font-mono text-xs text-muted-foreground">
                v1.0.0 · stable
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                all systems nominal
              </span>
            </div>
          </div>

          {/* Bottom Rail */}
          <div className="flex items-center gap-2 px-4 py-2 bg-muted border-t border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground">
              branchkit is running · your site is live
            </span>
          </div>
        </div>

        {/* Text Block */}
        <div className="flex flex-col items-center gap-6 text-center max-w-2xl">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight tracking-tight">
            "Run your website like a system,
            <br className="hidden sm:block" /> not a project."
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl">
            BranchKit gives you live control over your menu, hours, specials,
            and branding — all from one place, always current, always yours.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground rounded-lg px-8 py-3 font-semibold shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 ease-out flex items-center gap-2"
            >
              Get Started
              <ArrowRight weight="duotone" size={18} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-lg px-8 py-3 font-semibold border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 ease-out"
              asChild
            >
              <a href="#how-it-works">See How It Works</a>
            </Button>
          </div>

          {/* Footnote */}
          <span className="font-mono text-xs text-muted-foreground opacity-60 tracking-wide">
            No setup fees · No rebuilds · Live from day one
          </span>
        </div>
      </div>
    </section>
  );
}
