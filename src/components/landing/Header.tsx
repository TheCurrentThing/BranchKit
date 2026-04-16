"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Live Preview", href: "#live-control-preview" },
  { label: "Why BranchKit", href: "#why-branchkit" },
  { label: "Features", href: "#feature-pillars" },
  { label: "Get Started", href: "#final-cta" },
];

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header
      id="header"
      className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="BranchKit home"
          >
            <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
              BranchKit
            </span>
            <Badge className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 bg-muted text-muted-foreground border border-border rounded-sm">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              LIVE
            </Badge>
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.slice(0, 4).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 rounded-sm hover:bg-muted"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right: status pill + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase select-none">
              sys:ready
            </span>
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground rounded-sm px-4 text-sm font-medium shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-150"
            >
              <a href="#final-cta">Launch Your Site</a>
            </Button>
          </div>

          {/* Mobile: CTA + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              asChild
              size="sm"
              className="bg-primary text-primary-foreground rounded-sm px-3 text-xs font-medium shadow-sm"
            >
              <a href="#final-cta">Launch Your Site</a>
            </Button>
            <button
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
            >
              {mobileNavOpen ? (
                <X size={20} weight="duotone" />
              ) : (
                <List size={20} weight="duotone" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur">
          <nav
            className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-0.5"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center justify-between px-3 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-sm transition-colors duration-150"
              >
                <span>{link.label}</span>
                <span className="font-mono text-[10px] text-muted-foreground/50 tracking-widest">
                  {link.href.replace("#", "/")}
                </span>
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between px-3 pb-1">
              <Badge className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 bg-muted text-muted-foreground border border-border rounded-sm">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                LIVE
              </Badge>
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                sys:ready
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
