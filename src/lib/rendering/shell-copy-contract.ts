// src/lib/rendering/shell-copy-contract.ts
//
// Category-aware copy + action contract for shared shell surfaces:
//   - SiteHeader nav label + CTA
//   - StickyMobileBar middle action
//
// Architecture mirrors category-contracts.ts: a static record keyed by
// KitCategory, resolved by a single pure function. No family branching
// inside consumers — they call resolveShellCopy(category) and get the right
// strings back.
//
// PATHS are relative segments (no basePath prefix). The caller appends basePath.
//   ""          → homepage (basePath itself)
//   "/menu"     → basePath + "/menu"
//   "/contact"  → basePath + "/contact"
//
// HOW TO EXTEND: add a row to SHELL_COPY_CONTRACTS. TypeScript enforces
// complete coverage — the compiler will error if a KitCategory is missing.

import type { KitCategory } from "@/types/kit";

// ─── CONTRACT SHAPE ───────────────────────────────────────────────────────────

export type ShellCopyContract = {
  // Second item in the header nav (between "Home" and "About")
  catalogLabel: string;
  catalogPath: string;

  // Header CTA button (right of nav)
  ctaLabel: string;
  ctaPath: string;

  // Sticky mobile bar middle button (between Call and Directions)
  midLabel: string;
  midPath: string;
};

// ─── PER-CATEGORY TABLE ───────────────────────────────────────────────────────
//
// Every KitCategory must appear here. TypeScript Record<KitCategory, …>
// enforces exhaustiveness at build time — no silent fallthrough.

const SHELL_COPY_CONTRACTS: Record<KitCategory, ShellCopyContract> = {

  // ── Food Service ─────────────────────────────────────────────────────────────

  restaurant: {
    catalogLabel: "Menu",
    catalogPath:  "/menu",
    ctaLabel:     "View Menu",
    ctaPath:      "/menu",
    midLabel:     "Menu",
    midPath:      "/menu",
  },

  cafe: {
    catalogLabel: "Menu",
    catalogPath:  "/menu",
    ctaLabel:     "View Menu",
    ctaPath:      "/menu",
    midLabel:     "Menu",
    midPath:      "/menu",
  },

  diner: {
    catalogLabel: "Menu",
    catalogPath:  "/menu",
    ctaLabel:     "View Menu",
    ctaPath:      "/menu",
    midLabel:     "Menu",
    midPath:      "/menu",
  },

  pop_up: {
    catalogLabel: "Menu",
    catalogPath:  "/menu",
    ctaLabel:     "View Menu",
    ctaPath:      "/menu",
    midLabel:     "Menu",
    midPath:      "/menu",
  },

  food_truck: {
    catalogLabel: "Menu",
    catalogPath:  "/menu",
    ctaLabel:     "Find Us",
    ctaPath:      "/contact",
    midLabel:     "Find Us",
    midPath:      "/contact",
  },

  bar: {
    // Bar surfaces events/specials as the primary catalog hook, not a menu page.
    catalogLabel: "Events",
    catalogPath:  "",          // events section lives on the homepage
    ctaLabel:     "What's On",
    ctaPath:      "/contact",
    midLabel:     "Events",
    midPath:      "",
  },

  // ── Services ─────────────────────────────────────────────────────────────────

  on_demand: {
    // Fast-response local services: urgency + request channel.
    // "Call" is already left-side on mobile; mid differentiates with a lead form.
    catalogLabel: "Services",
    catalogPath:  "",
    ctaLabel:     "Request Service",
    ctaPath:      "/contact",
    midLabel:     "Request",
    midPath:      "/contact",
  },

  project: {
    // Project work: portfolio ("Work") is the trust signal; quote starts the funnel.
    catalogLabel: "Work",
    catalogPath:  "",
    ctaLabel:     "Request Quote",
    ctaPath:      "/contact",
    midLabel:     "Get Quote",
    midPath:      "/contact",
  },

  scheduled: {
    // Appointment-driven: booking is the conversion event.
    catalogLabel: "Services",
    catalogPath:  "",
    ctaLabel:     "Book Now",
    ctaPath:      "/contact",
    midLabel:     "Book",
    midPath:      "/contact",
  },

  professional: {
    // Knowledge-based: consultation is the action, not a booking widget.
    catalogLabel: "Services",
    catalogPath:  "",
    ctaLabel:     "Schedule a Call",
    ctaPath:      "/contact",
    midLabel:     "Schedule",
    midPath:      "/contact",
  },

  mobile: {
    // Location-flexible: quote + availability check before committing.
    catalogLabel: "Services",
    catalogPath:  "",
    ctaLabel:     "Get a Quote",
    ctaPath:      "/contact",
    midLabel:     "Quote",
    midPath:      "/contact",
  },

  // ── Retail & Products ────────────────────────────────────────────────────────

  artist: {
    // Visual-first; gallery IS the catalog. Commission is the CTA.
    catalogLabel: "Work",
    catalogPath:  "",
    ctaLabel:     "Inquire",
    ctaPath:      "/contact",
    midLabel:     "Gallery",
    midPath:      "",
  },

  maker: {
    // Handmade / craft: "Shop" signals product availability without genericness.
    catalogLabel: "Shop",
    catalogPath:  "",
    ctaLabel:     "Browse Pieces",
    ctaPath:      "/contact",
    midLabel:     "Shop",
    midPath:      "",
  },

  retail: {
    // Physical retail: visit + browse signal.
    catalogLabel: "Shop",
    catalogPath:  "",
    ctaLabel:     "Visit Us",
    ctaPath:      "/contact",
    midLabel:     "Shop",
    midPath:      "",
  },

  brand: {
    // Lifestyle / DTC brand: "Collection" elevates the product language.
    catalogLabel: "Collection",
    catalogPath:  "",
    ctaLabel:     "Explore",
    ctaPath:      "/contact",
    midLabel:     "Shop",
    midPath:      "",
  },

  vintage: {
    // Thrift / vintage: "Finds" is the category-native word.
    catalogLabel: "Finds",
    catalogPath:  "",
    ctaLabel:     "Browse Finds",
    ctaPath:      "/contact",
    midLabel:     "Browse",
    midPath:      "",
  },

  collector: {
    // Rare / collector: "Collection" + "Inquire" matches high-consideration buying.
    catalogLabel: "Collection",
    catalogPath:  "",
    ctaLabel:     "Inquire",
    ctaPath:      "/contact",
    midLabel:     "Inquire",
    midPath:      "/contact",
  },
};

// ─── RESOLVER ─────────────────────────────────────────────────────────────────

export function resolveShellCopy(category: KitCategory): ShellCopyContract {
  return SHELL_COPY_CONTRACTS[category];
}
