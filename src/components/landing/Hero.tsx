"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@phosphor-icons/react";

const statusIndicators = [
  { label: "LIVE", color: "text-green-400", dot: "bg-green-400" },
  { label: "UPDATED", color: "text-blue-400", dot: "bg-blue-400" },
  { label: "CHANGES PENDING", color: "text-yellow-400", dot: "bg-yellow-400" },
];

const annotations = [
  { label: "menu.json", position: "top-3 left-3" },
  { label: "v2.4.1", position: "top-3 right-3" },
  { label: "live:true", position: "bottom-3 left-3" },
  { label: "sync:ok", position: "bottom-3 right-3" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-card min-h-screen flex items-center border-b border-border"
    >
      <div className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-10 md:gap-8">
          {/* Text Stack — 45% */}
          <div className="flex-none md:w-[45%] flex flex-col gap-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                BranchKit — Control System
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight">
              Your business. <span className="text-primary">Live.</span> Under
              control.
            </h1>

            {/* Subheadline */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
              Update your menu, specials, hours, and branding in real time —
              without rebuilding your website.
            </p>

            {/* Status Indicators */}
            <div className="flex flex-wrap gap-2">
              {statusIndicators.map((s) => (
                <span
                  key={s.label}
                  className="inline-flex items-center gap-1.5 bg-muted border border-border rounded-sm px-2.5 py-1 font-mono text-xs tracking-widest"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                  <span className={s.color}>{s.label}</span>
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground rounded-sm shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 ease-out font-mono tracking-wide"
              >
                <a href="#final-cta">
                  Launch Your Site
                  <ArrowRight weight="duotone" className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-sm border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 transition-all duration-200 ease-out font-mono tracking-wide"
              >
                <a href="#live-control-preview">See It In Action</a>
              </Button>
            </div>
          </div>

          {/* Dashboard Preview — 55% */}
          <div className="flex-none md:w-[55%]">
            {/* Framed Dashboard Window */}
            <div className="relative rounded-lg border border-border bg-background shadow-xl overflow-hidden group">
              {/* Window Chrome / Status Rail */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-muted border-b border-border">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="font-mono text-xs text-muted-foreground tracking-widest">
                  branchkit://dashboard
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-mono text-xs text-green-400 tracking-widest">
                    LIVE
                  </span>
                </div>
              </div>

              {/* Preview Image */}
              <div className="relative">
                <img
                  src="https://c.animaapp.com/mo1y4fsr4OgbS4/img/ai_1.png"
                  alt="Terminal style product dashboard hero"
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className="w-full h-auto block transition-all duration-300 group-hover:brightness-105"
                />

                {/* Monospace Annotations */}
                {annotations.map((a) => (
                  <span
                    key={a.label}
                    className={`absolute ${a.position} font-mono text-[10px] text-muted-foreground bg-background/80 border border-border px-1.5 py-0.5 rounded-sm tracking-widest backdrop-blur-sm`}
                  >
                    {a.label}
                  </span>
                ))}

                {/* Subtle active highlight overlay on hover */}
                <div className="absolute inset-0 ring-1 ring-inset ring-primary/0 group-hover:ring-primary/20 transition-all duration-300 rounded-b-lg pointer-events-none" />
              </div>

              {/* Bottom Status Bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-muted border-t border-border">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
                    menu.json — 12 items
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground tracking-widest">
                    hours: open
                  </span>
                </div>
                <span className="font-mono text-[10px] text-green-400 tracking-widest">
                  ● synced 2s ago
                </span>
              </div>
            </div>

            {/* Sub-annotation below frame */}
            <p className="mt-2 text-right font-mono text-[10px] text-muted-foreground tracking-widest">
              real-time · no rebuild · always current
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
