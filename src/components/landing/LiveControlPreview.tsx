"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowClockwise,
  PaintBrush,
  Clock,
  Lightning,
  Circle,
  CheckCircle,
  ArrowRight,
} from "@phosphor-icons/react";

const quickActions = [
  { label: "Update Special", icon: Lightning, key: "special" },
  { label: "Edit Hours", icon: Clock, key: "hours" },
  { label: "Change Theme", icon: PaintBrush, key: "theme" },
];

const activityItems = [
  { label: "Menu updated", time: "just now", status: "live" },
  { label: "Hours synced", time: "2m ago", status: "done" },
  { label: "Special pushed", time: "5m ago", status: "done" },
];

const currentSpecial = {
  name: "Truffle Arancini",
  description: "Crispy risotto balls, black truffle aioli",
  price: "$14",
  tag: "TODAY ONLY",
};

const hoursData = [
  { day: "Mon–Fri", hours: "11:00 – 22:00", open: true },
  { day: "Saturday", hours: "10:00 – 23:00", open: true },
  { day: "Sunday", hours: "Closed", open: false },
];

export default function LiveControlPreview() {
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [highlightPreview, setHighlightPreview] = useState<string | null>(null);

  const handleAction = (key: string) => {
    setActiveAction(key);
    setHighlightPreview(key);
    setTimeout(() => {
      setActiveAction(null);
      setHighlightPreview(null);
    }, 1800);
  };

  return (
    <section
      id="live-control-preview"
      className="bg-background py-20 px-4 md:px-8"
    >
      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
            03 / Control Surface
          </span>
          <div className="h-px flex-1 bg-border" />
          <Badge className="bg-primary text-primary-foreground font-mono text-xs px-2 py-0.5 rounded-sm">
            LIVE
          </Badge>
        </div>
        <h2 className="font-heading text-3xl md:text-4xl text-foreground tracking-tight">
          "See every change live."
        </h2>
        <p className="mt-2 text-muted-foreground text-base max-w-xl">
          One control surface. Every update reflected instantly — no rebuilds,
          no deploys, no waiting.
        </p>
      </div>

      {/* Two-panel layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LEFT: Dashboard Console */}
        <div className="rounded-xl border border-border bg-card shadow-xl overflow-hidden flex flex-col">
          {/* Console chrome bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <span className="ml-3 font-mono text-xs text-muted-foreground tracking-wide">
              branchkit / dashboard
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-primary">LIVE</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-4 flex-1">
            {/* Current Special Module */}
            <div
              className={`rounded-lg border p-3 transition-all duration-300 ${
                highlightPreview === "special"
                  ? "border-primary shadow-md bg-primary/5"
                  : "border-border bg-muted/20"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                  Current Special
                </span>
                <Badge className="bg-accent text-accent-foreground font-mono text-xs px-1.5 py-0 rounded-sm">
                  {currentSpecial.tag}
                </Badge>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-foreground font-heading text-base font-semibold leading-tight">
                    {currentSpecial.name}
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {currentSpecial.description}
                  </p>
                </div>
                <span className="text-foreground font-mono text-lg font-bold">
                  {currentSpecial.price}
                </span>
              </div>
            </div>

            {/* Hours / Status Module */}
            <div
              className={`rounded-lg border p-3 transition-all duration-300 ${
                highlightPreview === "hours"
                  ? "border-primary shadow-md bg-primary/5"
                  : "border-border bg-muted/20"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                  Hours / Status
                </span>
                <span className="font-mono text-xs text-primary">
                  ● OPEN NOW
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {hoursData.map((row) => (
                  <div
                    key={row.day}
                    className="flex items-center justify-between"
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      {row.day}
                    </span>
                    <span
                      className={`font-mono text-xs ${
                        row.open
                          ? "text-foreground"
                          : "text-muted-foreground line-through"
                      }`}
                    >
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-2">
                Quick Actions
              </span>
              <div className="flex gap-2 flex-wrap">
                {quickActions.map(({ label, icon: Icon, key }) => (
                  <button
                    key={key}
                    onClick={() => handleAction(key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-mono transition-all duration-200 cursor-pointer
                      ${
                        activeAction === key
                          ? "border-primary bg-primary/10 text-foreground shadow-md -translate-y-0.5"
                          : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground hover:-translate-y-0.5 hover:shadow-md"
                      }`}
                  >
                    <Icon weight="duotone" size={13} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Activity Strip */}
            <div className="rounded-lg border border-border bg-muted/10 px-3 py-2">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                  Activity
                </span>
                <ArrowClockwise
                  weight="duotone"
                  size={11}
                  className="text-muted-foreground"
                />
              </div>
              <div className="flex flex-col gap-1">
                {activityItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {item.status === "live" ? (
                      <Circle
                        weight="fill"
                        size={7}
                        className="text-primary animate-pulse shrink-0"
                      />
                    ) : (
                      <CheckCircle
                        weight="duotone"
                        size={7}
                        className="text-muted-foreground shrink-0"
                      />
                    )}
                    <span className="font-mono text-xs text-foreground">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground ml-auto">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Site Preview Pane */}
        <div className="rounded-xl border border-border bg-card shadow-xl overflow-hidden flex flex-col">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/40">
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
            <div className="ml-3 flex-1 bg-muted/60 rounded-sm px-3 py-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="font-mono text-xs text-muted-foreground truncate">
                yourplace.branchkit.io
              </span>
            </div>
            <div className="ml-2 flex items-center gap-1">
              <span className="font-mono text-xs text-muted-foreground">
                synced
              </span>
              <CheckCircle
                weight="duotone"
                size={13}
                className="text-primary"
              />
            </div>
          </div>

          {/* Preview image */}
          <div className="relative flex-1 overflow-hidden">
            <img
              src="https://c.animaapp.com/mo1y4fsr4OgbS4/img/ai_3.png"
              alt="Live control system preview"
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />

            {/* Overlay highlight zones */}
            {highlightPreview === "special" && (
              <div className="absolute inset-x-4 top-4 h-20 rounded-lg border-2 border-primary bg-primary/10 transition-all duration-300 flex items-center justify-center">
                <span className="font-mono text-xs text-primary">
                  Special updated ↗
                </span>
              </div>
            )}
            {highlightPreview === "hours" && (
              <div className="absolute inset-x-4 bottom-16 h-16 rounded-lg border-2 border-primary bg-primary/10 transition-all duration-300 flex items-center justify-center">
                <span className="font-mono text-xs text-primary">
                  Hours synced ↗
                </span>
              </div>
            )}
            {highlightPreview === "theme" && (
              <div className="absolute inset-4 rounded-lg border-2 border-primary bg-primary/5 transition-all duration-300 flex items-center justify-center">
                <span className="font-mono text-xs text-primary">
                  Theme applied ↗
                </span>
              </div>
            )}

            {/* Status rail at bottom */}
            <div className="absolute bottom-0 inset-x-0 bg-card/90 backdrop-blur border-t border-border px-4 py-2 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-muted-foreground">
                Live — last sync{" "}
                <span className="text-foreground">just now</span>
              </span>
              <div className="ml-auto">
                <Badge className="bg-muted text-muted-foreground font-mono text-xs px-2 py-0 rounded-sm border border-border">
                  UPDATED
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom annotation row */}
      <div className="max-w-6xl mx-auto mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground">
          // click any quick action to see the preview respond
        </p>
        <Button
          asChild
          variant="outline"
          className="rounded-md border-border text-foreground hover:border-primary hover:text-foreground transition-all duration-200 hover:-translate-y-0.5 font-mono text-xs"
        >
          <a href="#final-cta" className="flex items-center gap-2">
            Launch Your Site
            <ArrowRight weight="duotone" size={14} />
          </a>
        </Button>
      </div>
    </section>
  );
}
