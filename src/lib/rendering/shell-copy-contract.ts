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

  // Header nav third item — null means hide for categories with no gallery section
  galleryNavLabel: string | null;
  galleryNavPath: string;

  // Header nav fourth item
  contactNavLabel: string;
  contactNavPath: string;
};

// ─── PER-CATEGORY TABLE ───────────────────────────────────────────────────────
//
// Every KitCategory must appear here. TypeScript Record<KitCategory, …>
// enforces exhaustiveness at build time — no silent fallthrough.

const SHELL_COPY_CONTRACTS: Record<KitCategory, ShellCopyContract> = {

  // ── Food Service ─────────────────────────────────────────────────────────────

  restaurant: {
    catalogLabel:    "Menu",
    catalogPath:     "/menu",
    ctaLabel:        "View Menu",
    ctaPath:         "/menu",
    midLabel:        "Menu",
    midPath:         "/menu",
    galleryNavLabel: null,
    galleryNavPath:  "#gallery",
    contactNavLabel: "Find Us",
    contactNavPath:  "#contact",
  },

  cafe: {
    catalogLabel:    "Menu",
    catalogPath:     "/menu",
    ctaLabel:        "View Menu",
    ctaPath:         "/menu",
    midLabel:        "Menu",
    midPath:         "/menu",
    galleryNavLabel: null,
    galleryNavPath:  "#gallery",
    contactNavLabel: "Find Us",
    contactNavPath:  "#contact",
  },

  diner: {
    catalogLabel:    "Menu",
    catalogPath:     "/menu",
    ctaLabel:        "View Menu",
    ctaPath:         "/menu",
    midLabel:        "Menu",
    midPath:         "/menu",
    galleryNavLabel: null,
    galleryNavPath:  "#gallery",
    contactNavLabel: "Find Us",
    contactNavPath:  "#contact",
  },

  pop_up: {
    catalogLabel:    "Menu",
    catalogPath:     "/menu",
    ctaLabel:        "View Menu",
    ctaPath:         "/menu",
    midLabel:        "Menu",
    midPath:         "/menu",
    galleryNavLabel: null,
    galleryNavPath:  "#gallery",
    contactNavLabel: "Find Us",
    contactNavPath:  "#contact",
  },

  food_truck: {
    catalogLabel:    "Menu",
    catalogPath:     "/menu",
    ctaLabel:        "Find Us",
    ctaPath:         "/contact",
    midLabel:        "Find Us",
    midPath:         "/contact",
    galleryNavLabel: null,
    galleryNavPath:  "#gallery",
    contactNavLabel: "Find Us",
    contactNavPath:  "#contact",
  },

  bar: {
    // Bar surfaces events/specials as the primary catalog hook, not a menu page.
    catalogLabel:    "Events",
    catalogPath:     "",          // events section lives on the homepage
    ctaLabel:        "What's On",
    ctaPath:         "/contact",
    midLabel:        "Events",
    midPath:         "",
    galleryNavLabel: null,
    galleryNavPath:  "#gallery",
    contactNavLabel: "Find Us",
    contactNavPath:  "#contact",
  },

  // ── Services ─────────────────────────────────────────────────────────────────

  on_demand: {
    // Fast-response local services: urgency + request channel.
    // "Call" is already left-side on mobile; mid differentiates with a lead form.
    catalogLabel:    "Services",
    catalogPath:     "",
    ctaLabel:        "Request Service",
    ctaPath:         "/contact",
    midLabel:        "Request",
    midPath:         "/contact",
    galleryNavLabel: null,
    galleryNavPath:  "#gallery",
    contactNavLabel: "Contact",
    contactNavPath:  "#contact",
  },

  project: {
    // Project work: portfolio ("Work") is the trust signal; quote starts the funnel.
    catalogLabel:    "Work",
    catalogPath:     "",
    ctaLabel:        "Request Quote",
    ctaPath:         "/contact",
    midLabel:        "Get Quote",
    midPath:         "/contact",
    galleryNavLabel: null,
    galleryNavPath:  "#gallery",
    contactNavLabel: "Contact",
    contactNavPath:  "#contact",
  },

  scheduled: {
    // Appointment-driven: booking is the conversion event.
    catalogLabel:    "Services",
    catalogPath:     "",
    ctaLabel:        "Book Now",
    ctaPath:         "/contact",
    midLabel:        "Book",
    midPath:         "/contact",
    galleryNavLabel: null,
    galleryNavPath:  "#gallery",
    contactNavLabel: "Contact",
    contactNavPath:  "#contact",
  },

  professional: {
    // Knowledge-based: consultation is the action, not a booking widget.
    catalogLabel:    "Services",
    catalogPath:     "",
    ctaLabel:        "Schedule a Call",
    ctaPath:         "/contact",
    midLabel:        "Schedule",
    midPath:         "/contact",
    galleryNavLabel: null,
    galleryNavPath:  "#gallery",
    contactNavLabel: "Contact",
    contactNavPath:  "#contact",
  },

  mobile: {
    // Location-flexible: quote + availability check before committing.
    catalogLabel:    "Services",
    catalogPath:     "",
    ctaLabel:        "Get a Quote",
    ctaPath:         "/contact",
    midLabel:        "Quote",
    midPath:         "/contact",
    galleryNavLabel: null,
    galleryNavPath:  "#gallery",
    contactNavLabel: "Contact",
    contactNavPath:  "#contact",
  },

  // ── Retail & Products ────────────────────────────────────────────────────────

  artist: {
    // Visual-first; gallery IS the catalog. Commission is the CTA.
    catalogLabel:    "Work",
    catalogPath:     "",
    ctaLabel:        "Inquire",
    ctaPath:         "/contact",
    midLabel:        "Gallery",
    midPath:         "",
    galleryNavLabel: "Portfolio",
    galleryNavPath:  "#gallery",
    contactNavLabel: "Contact",
    contactNavPath:  "#contact",
  },

  maker: {
    // Handmade / craft: "Shop" signals product availability without genericness.
    catalogLabel:    "Shop",
    catalogPath:     "",
    ctaLabel:        "Browse Pieces",
    ctaPath:         "/contact",
    midLabel:        "Shop",
    midPath:         "",
    galleryNavLabel: "Work",
    galleryNavPath:  "#gallery",
    contactNavLabel: "Contact",
    contactNavPath:  "#contact",
  },

  retail: {
    // Physical retail: visit + browse signal.
    catalogLabel:    "Shop",
    catalogPath:     "",
    ctaLabel:        "Visit Us",
    ctaPath:         "/contact",
    midLabel:        "Shop",
    midPath:         "",
    galleryNavLabel: "Gallery",
    galleryNavPath:  "#gallery",
    contactNavLabel: "Visit",
    contactNavPath:  "#contact",
  },

  brand: {
    // Lifestyle / DTC brand: "Collection" elevates the product language.
    catalogLabel:    "Collection",
    catalogPath:     "",
    ctaLabel:        "Explore",
    ctaPath:         "/contact",
    midLabel:        "Shop",
    midPath:         "",
    galleryNavLabel: "Lookbook",
    galleryNavPath:  "#gallery",
    contactNavLabel: "Contact",
    contactNavPath:  "#contact",
  },

  vintage: {
    // Thrift / vintage: "Finds" is the category-native word.
    catalogLabel:    "Finds",
    catalogPath:     "",
    ctaLabel:        "Browse Finds",
    ctaPath:         "/contact",
    midLabel:        "Browse",
    midPath:         "",
    galleryNavLabel: "Gallery",
    galleryNavPath:  "#gallery",
    contactNavLabel: "Visit",
    contactNavPath:  "#contact",
  },

  collector: {
    // Rare / collector: "Collection" + "Inquire" matches high-consideration buying.
    catalogLabel:    "Collection",
    catalogPath:     "",
    ctaLabel:        "Inquire",
    ctaPath:         "/contact",
    midLabel:        "Inquire",
    midPath:         "/contact",
    galleryNavLabel: "Archive",
    galleryNavPath:  "#gallery",
    contactNavLabel: "Inquire",
    contactNavPath:  "#contact",
  },
};

// ─── RESOLVER ─────────────────────────────────────────────────────────────────

export function resolveShellCopy(category: KitCategory): ShellCopyContract {
  return SHELL_COPY_CONTRACTS[category];
}
