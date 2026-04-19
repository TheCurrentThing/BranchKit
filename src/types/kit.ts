// ─── KIT FAMILY ──────────────────────────────────────────────────────────────
//
// Broad operational backbone. Families define a shared module architecture and
// the pool of categories (subtypes) that live within them.
//
// Current families:
//   food_service → Cafes, diners, restaurants, pop-ups, food trucks, bars
//   creative     → Artists, makers, studios
//   services     → Trades, contractors, home services
//   retail       → Shops, boutiques (future)

export type KitFamily = "food_service" | "creative" | "services" | "retail";

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
//
// Subtypes within a family. Categories act as presets on top of shared modules:
// same capabilities, different defaults, section order, and emphasis.
// They do NOT fork the product into separate codebases.

// Food Service — all share the Food Service module backbone
export type FoodServiceCategory =
  | "cafe"
  | "diner"
  | "restaurant"
  | "pop_up"
  | "food_truck"
  | "bar";

export type CreativeCategory = "artist";
export type ServicesCategory = "trade";

// Union of all categories across all families
export type KitCategory = FoodServiceCategory | CreativeCategory | ServicesCategory;

// ─── KIT IDENTITY ────────────────────────────────────────────────────────────
//
// A business's resolved kit identity. Stored as kit_family + kit_category in
// the businesses table. The legacy kit_type column is kept for transition.

export type KitIdentity = {
  family: KitFamily;
  category: KitCategory;
};

// ─── MODULES ─────────────────────────────────────────────────────────────────
//
// The actual shared capabilities within a family. Modules drive admin sidebar
// visibility and public section availability.
//
// Categories set module defaults. Feature flags in business_settings give each
// business per-instance overrides on top of category defaults.

export type KitModules = {
  homepage: boolean;
  branding: boolean;
  menu: boolean;
  specials: boolean;
  hours: boolean;
  photos: boolean;
  contact: boolean;
  google: boolean;
  launch: boolean;
  events: boolean;        // Events listing — bars, pop-ups, food trucks
  announcements: boolean; // Time-sensitive notices — pop-ups, seasonal closures
};

// ─── PUBLIC SECTIONS ─────────────────────────────────────────────────────────
//
// Section types that can render on the public homepage.
// Categories define the default order and inclusion per preset.
// Feature flags gate individual section visibility at render time.

export type PublicSectionType =
  | "hero"
  | "quick_info"      // Hours / key operating info bar
  | "announcements"   // Notice strip — pop-ups, closures, seasonal hours
  | "specials"        // Featured specials / happy hour
  | "events"          // Upcoming events listing — bars, pop-ups
  | "featured_menu"   // Featured items spotlight
  | "menu_preview"    // Full menu category browser
  | "gallery"         // Photo gallery
  | "about"           // About section
  | "contact";        // Contact / location / map

// ─── KIT CONFIG ──────────────────────────────────────────────────────────────
//
// Fully resolved configuration for a business. This is the shape all consuming
// code should work with — not raw family/category strings.

export type KitConfig = {
  family: KitFamily;
  category: KitCategory;
  familyLabel: string; // "Food Service", "Creative", etc.
  label: string;       // "Restaurant", "Café", "Bar", etc.
  modules: KitModules;
  publicSections: PublicSectionType[];
};

// ─── BACKWARD COMPATIBILITY ───────────────────────────────────────────────────
//
// KitType was the original flat model: "restaurant" | "food_truck" | "artist" | "trade".
// It is now a type alias for KitCategory so all existing callers compile without
// changes. The original four values remain valid categories in the new system.
//
// New code should use KitCategory or KitIdentity. Existing code can migrate gradually.

export type KitType = KitCategory;
