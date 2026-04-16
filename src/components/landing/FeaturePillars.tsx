"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sliders,
  Clock,
  Star,
  Palette,
  TextT,
  Image,
  ListBullets,
  GitBranch,
} from "@phosphor-icons/react";

const pillars = [
  {
    index: "01",
    label: "Control",
    headline: "Everything your business runs on, editable in seconds.",
    description:
      "Update your menu, adjust hours, and push specials live — without touching a file or calling a developer. Every change reflects instantly.",
    status: "LIVE SYNC",
    statusVariant: "active",
    features: [
      {
        icon: Sliders,
        title: "Menu Editor",
        detail: "Add, remove, or reprice items across sections in real time.",
        annotation: "menu.items → published",
      },
      {
        icon: Clock,
        title: "Hours Controls",
        detail: "Set regular hours, holiday overrides, and temporary closures.",
        annotation: "hours.schedule → active",
      },
      {
        icon: Star,
        title: "Specials Update",
        detail: "Push today's special to your live site in under 10 seconds.",
        annotation: "specials.today → visible",
      },
    ],
    image: "https://c.animaapp.com/mo1y4fsr4OgbS4/img/ai_5.png",
    imageAlt: "Feature pillars in unified interface",
  },
  {
    index: "02",
    label: "Identity",
    headline: "Your brand, consistent and always on-model.",
    description:
      "Switch themes, update your logo, and dial in your color and type presets — all from a single panel. Your site reflects your brand, not a template.",
    status: "BRAND SYNCED",
    statusVariant: "synced",
    features: [
      {
        icon: Palette,
        title: "Theme Switcher",
        detail: "Choose from curated themes built for hospitality businesses.",
        annotation: "theme.active → noir-warm",
      },
      {
        icon: Image,
        title: "Logo & Brand Styling",
        detail:
          "Upload your mark and set brand assets once, applied everywhere.",
        annotation: "brand.logo → applied",
      },
      {
        icon: TextT,
        title: "Color & Type Presets",
        detail:
          "Lock in your palette and typography across every page element.",
        annotation: "style.tokens → locked",
      },
    ],
    image: "https://c.animaapp.com/mo1y4fsr4OgbS4/img/ai_5.png",
    imageAlt: "Feature pillars in unified interface",
  },
  {
    index: "03",
    label: "Awareness",
    headline: "Know what's live, what changed, and when.",
    description:
      "A live status rail and activity feed keep you oriented. See every change logged, every update confirmed — so nothing goes out unnoticed.",
    status: "MONITORING",
    statusVariant: "monitoring",
    features: [
      {
        icon: Star,
        title: "Live Status",
        detail:
          "Real-time indicators show what's published and what's pending.",
        annotation: "site.status → live",
      },
      {
        icon: ListBullets,
        title: "Star Feed",
        detail: "A timestamped log of every update made to your site.",
        annotation: "feed.events → streaming",
      },
      {
        icon: GitBranch,
        title: "Change History",
        detail:
          "Review past changes and understand what your site looked like before.",
        annotation: "history.depth → 30d",
      },
    ],
    image: "https://c.animaapp.com/mo1y4fsr4OgbS4/img/ai_5.png",
    imageAlt: "Feature pillars in unified interface",
  },
];

const statusColors: Record<string, string> = {
  active: "bg-primary text-primary-foreground",
  synced: "bg-accent text-accent-foreground",
  monitoring: "bg-muted text-foreground border border-border",
};

export default function FeaturePillars() {
  return (
    <section id="feature-pillars" className="bg-muted py-20 px-4 md:px-8">
      {/* Section Header */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
            feature-pillars.tsx
          </span>
          <Separator className="flex-1 bg-border" />
          <span className="font-mono text-xs text-muted-foreground">v1.0</span>
        </div>
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
          Three pillars that keep
          <br />
          your site current.
        </h2>
      </div>

      {/* Pillars Stack */}
      <div className="max-w-5xl mx-auto flex flex-col gap-0">
        {pillars.map((pillar, idx) => (
          <div key={pillar.index}>
            {/* Pillar Panel */}
            <div className="group py-10 md:py-14">
              {/* Pillar Label Row */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {pillar.index}
                </span>
                <span className="font-mono text-xs tracking-widest uppercase text-foreground font-semibold">
                  {pillar.label}
                </span>
                <div className="flex-1 h-px bg-border" />
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded-sm tracking-widest ${statusColors[pillar.statusVariant]}`}
                >
                  ● {pillar.status}
                </span>
              </div>

              {/* Main Panel Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left: Copy + Feature Rows */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3 leading-snug">
                      {pillar.headline}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Feature Rows */}
                  <div className="flex flex-col gap-1">
                    {pillar.features.map((feature) => {
                      const Icon = feature.icon;
                      return (
                        <div
                          key={feature.title}
                          className="group/row flex items-start gap-3 p-3 rounded-md border border-transparent hover:border-border hover:bg-card transition-all duration-200 cursor-default"
                        >
                          <div className="mt-0.5 shrink-0 w-7 h-7 rounded-sm bg-card border border-border flex items-center justify-center">
                            <Icon
                              weight="duotone"
                              size={15}
                              className="text-primary"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-medium text-foreground">
                                {feature.title}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {feature.detail}
                            </p>
                            <span className="font-mono text-xs text-muted-foreground opacity-60 mt-1 block">
                              {feature.annotation}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Framed UI Preview */}
                <div className="group/panel relative rounded-lg border border-border bg-card shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                  {/* Panel Status Rail */}
                  <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary opacity-80" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground opacity-30" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground opacity-30" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">
                      branchkit / {pillar.label.toLowerCase()}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground opacity-50">
                      {pillar.status}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      loading="lazy"
                      className="w-full h-48 md:h-56 object-cover object-top transition-all duration-300 group-hover/panel:brightness-110"
                    />
                    {/* Overlay annotation */}
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-card/80 backdrop-blur-sm border-t border-border">
                      <span className="font-mono text-xs text-muted-foreground">
                        → {pillar.features[0].annotation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ruled Divider between pillars */}
            {idx < pillars.length - 1 && (
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-border" />
                <span className="font-mono text-xs text-muted-foreground opacity-40">
                  ///
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
