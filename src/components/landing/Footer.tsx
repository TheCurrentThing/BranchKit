"use client";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  GitBranch,
  CheckCircle,
  GithubLogo,
  TwitterLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";

const productLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Live Preview", href: "#live-control-preview" },
  { label: "Why BranchKit", href: "#why-branchkit" },
  { label: "Features", href: "#feature-pillars" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const socialLinks = [
  { icon: TwitterLogo, label: "Twitter", href: "#" },
  { icon: GithubLogo, label: "GitHub", href: "#" },
  { icon: LinkedinLogo, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-card border-t border-border">
      {/* Status rail */}
      <div className="border-b border-border/50 px-6 py-2 flex items-center gap-3">
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
          sys.branchkit
        </span>
        <span className="font-mono text-xs text-muted-foreground">·</span>
        <Badge
          variant="outline"
          className="font-mono text-xs border-border gap-1.5 px-2 py-0.5 text-muted-foreground"
        >
          <CheckCircle
            weight="duotone"
            className="text-primary"
            size={12}
          />
          all systems operational
        </Badge>
        <span className="ml-auto font-mono text-xs text-muted-foreground hidden sm:block">
          uptime: 99.98%
        </span>
      </div>

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16">
          {/* Brand block */}
          <div className="flex flex-col gap-3 min-w-[180px]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <GitBranch
                  weight="duotone"
                  size={16}
                  className="text-primary-foreground"
                />
              </div>
              <span className="font-heading text-base font-semibold text-foreground tracking-tight">
                BranchKit
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-snug max-w-[200px]">
              Your business. Live. Under control.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-all duration-200"
                >
                  <Icon weight="duotone" size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation clusters */}
          <div className="flex flex-wrap gap-10 flex-1">
            {/* Product links */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Product
              </span>
              <ul className="flex flex-col gap-2">
                {productLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      {label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#final-cta"
                    className="text-sm text-primary hover:text-foreground transition-colors duration-150 font-medium"
                  >
                    Get Started →
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal links */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                Legal
              </span>
              <ul className="flex flex-col gap-2">
                {legalLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border/60" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} BranchKit. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground">
              live system · v2.4.1
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
