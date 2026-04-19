import type {
  KitFamily,
  KitCategory,
  FoodServiceCategory,
  CreativeCategory,
  ServicesCategory,
  KitIdentity,
  KitConfig,
  KitModules,
  PublicSectionType,
  KitType,
} from "@/types/kit";

// ─── FAMILY LABELS ────────────────────────────────────────────────────────────

const FAMILY_LABELS: Record<KitFamily, string> = {
  food_service: "Food Service",
  creative:     "Creative",
  services:     "Services",
  retail:       "Retail",
};

// ─── CATEGORY → FAMILY MAP ────────────────────────────────────────────────────
//
// Authoritative mapping — derives family from category so callers only need
// the category string to get a full KitIdentity.

const CATEGORY_FAMILY: Record<KitCategory, KitFamily> = {
  cafe:       "food_service",
  diner:      "food_service",
  restaurant: "food_service",
  pop_up:     "food_service",
  food_truck: "food_service",
  bar:        "food_service",
  artist:     "creative",
  trade:      "services",
};

// ─── FOOD SERVICE MODULE SYSTEM ───────────────────────────────────────────────
//
// All Food Service categories share this module base.
// Category presets merge into it — they override specific keys, not the whole map.
// This is what makes Food Service ONE system with multiple presets.

const FOOD_SERVICE_BASE: KitModules = {
  homepage:      true,
  branding:      true,
  menu:          true,
  specials:      true,
  hours:         true,
  photos:        true,
  contact:       true,
  google:        true,
  launch:        true,
  events:        false, // Off by default; enabled per category
  announcements: false, // Off by default; enabled per category
};

// ─── FOOD SERVICE CATEGORY PRESETS ───────────────────────────────────────────
//
// Each preset is a lens on the shared Food Service system:
//   modules       — partial override merged into FOOD_SERVICE_BASE
//   publicSections — homepage section order for this category (in render order)
//
// To add a new Food Service category: add a preset here. Nothing else changes.

type CategoryPreset = {
  label: string;
  modules: Partial<KitModules>;
  publicSections: PublicSectionType[];
};

const FOOD_SERVICE_PRESETS: Record<FoodServiceCategory, CategoryPreset> = {
  restaurant: {
    label: "Restaurant",
    modules: {},
    publicSections: [
      "hero",
      "quick_info",
      "specials",
      "featured_menu",
      "menu_preview",
      "gallery",
      "about",
      "contact",
    ],
  },

  cafe: {
    label: "Café",
    // Cafes emphasize menu + atmosphere. Specials are less central.
    modules: { specials: false },
    publicSections: [
      "hero",
      "quick_info",
      "menu_preview",
      "gallery",
      "about",
      "contact",
    ],
  },

  diner: {
    label: "Diner",
    modules: {},
    publicSections: [
      "hero",
      "quick_info",
      "specials",
      "menu_preview",
      "about",
      "contact",
    ],
  },

  pop_up: {
    label: "Pop-Up",
    // Pop-ups have no fixed hours; events and announcements are their primary signals.
    modules: { hours: false, events: true, announcements: true },
    publicSections: [
      "hero",
      "announcements",
      "events",
      "menu_preview",
      "about",
      "contact",
    ],
  },

  food_truck: {
    label: "Food Truck",
    // Food trucks are mobile — events signal where they'll be.
    modules: { events: true },
    publicSections: [
      "hero",
      "quick_info",
      "specials",
      "featured_menu",
      "menu_preview",
      "about",
      "contact",
    ],
  },

  bar: {
    label: "Bar",
    // Bars lead with hours, specials (happy hour), and events.
    // Menu is available but not the primary draw.
    modules: { events: true },
    publicSections: [
      "hero",
      "quick_info",
      "specials",
      "events",
      "gallery",
      "about",
      "contact",
    ],
  },
};

// ─── CREATIVE FAMILY ──────────────────────────────────────────────────────────

const CREATIVE_BASE: KitModules = {
  homepage:      true,
  branding:      true,
  menu:          false,
  specials:      false,
  hours:         false,
  photos:        true,
  contact:       true,
  google:        true,
  launch:        true,
  events:        false,
  announcements: false,
};

const CREATIVE_PRESETS: Record<CreativeCategory, CategoryPreset> = {
  artist: {
    label: "Artist / Creator",
    modules: {},
    publicSections: ["hero", "gallery", "about", "contact"],
  },
};

// ─── SERVICES FAMILY ──────────────────────────────────────────────────────────

const SERVICES_BASE: KitModules = {
  homepage:      true,
  branding:      true,
  menu:          false,
  specials:      false,
  hours:         true,
  photos:        true,
  contact:       true,
  google:        true,
  launch:        true,
  events:        false,
  announcements: false,
};

const SERVICES_PRESETS: Record<ServicesCategory, CategoryPreset> = {
  trade: {
    label: "Trade / Service",
    modules: {},
    publicSections: ["hero", "gallery", "quick_info", "about", "contact"],
  },
};

// ─── CORE RESOLVER ────────────────────────────────────────────────────────────
//
// All resolution paths lead here. Given a KitIdentity, returns the full
// resolved KitConfig. Add a new family by adding a case.

function resolveConfig(identity: KitIdentity): KitConfig {
  const { family, category } = identity;

  let base: KitModules;
  let preset: CategoryPreset;

  switch (family) {
    case "food_service":
      base   = FOOD_SERVICE_BASE;
      preset = FOOD_SERVICE_PRESETS[category as FoodServiceCategory]
             ?? FOOD_SERVICE_PRESETS.restaurant;
      break;
    case "creative":
      base   = CREATIVE_BASE;
      preset = CREATIVE_PRESETS[category as CreativeCategory]
             ?? CREATIVE_PRESETS.artist;
      break;
    case "services":
      base   = SERVICES_BASE;
      preset = SERVICES_PRESETS[category as ServicesCategory]
             ?? SERVICES_PRESETS.trade;
      break;
    default:
      base   = FOOD_SERVICE_BASE;
      preset = FOOD_SERVICE_PRESETS.restaurant;
  }

  return {
    family,
    category,
    familyLabel:    FAMILY_LABELS[family],
    label:          preset.label,
    modules:        { ...base, ...preset.modules },
    publicSections: preset.publicSections,
  };
}

// ─── PUBLIC API — NEW ─────────────────────────────────────────────────────────

// Preferred entry point for new code: resolve from explicit KitIdentity.
export function getKitFamilyConfig(identity: KitIdentity): KitConfig {
  return resolveConfig(identity);
}

// Shorthand: resolve from category alone (family derived automatically).
export function getCategoryConfig(category: KitCategory): KitConfig {
  return resolveConfig({
    family: CATEGORY_FAMILY[category] ?? "food_service",
    category,
  });
}

// Resolve a KitIdentity from raw DB column values.
// Handles the legacy → new transition: prefers kit_category, falls back to kit_type.
export function resolveKitIdentity({
  kitFamily,
  kitCategory,
  legacyKitType,
}: {
  kitFamily?: string | null;
  kitCategory?: string | null;
  legacyKitType?: string | null;
}): KitIdentity {
  const category = isKitCategory(kitCategory)    ? kitCategory
                 : isKitCategory(legacyKitType)   ? legacyKitType
                 : "restaurant" as KitCategory;
  return {
    family:   CATEGORY_FAMILY[category] ?? "food_service",
    category,
  };
}

// ─── PUBLIC API — BACKWARD COMPAT SHIMS ──────────────────────────────────────
//
// These preserve the existing API surface so all callers continue to compile
// without changes. They route through the new resolver internally.
//
// Callers are encouraged to migrate to getCategoryConfig() / getKitFamilyConfig()
// over time, but there is no urgency — these shims will remain stable.

export function getKitConfig(kitType: KitType): KitConfig {
  return getCategoryConfig(kitType);
}

export function getKitModules(kitType: KitType): KitModules {
  return getCategoryConfig(kitType).modules;
}

export function getPublicSections(kitType: KitType): PublicSectionType[] {
  return getCategoryConfig(kitType).publicSections;
}

export function getKitLabel(kitType: KitType): string {
  return getCategoryConfig(kitType).label;
}

// ─── TYPE GUARDS & COERCERS ───────────────────────────────────────────────────

export const ALL_KIT_CATEGORIES: readonly KitCategory[] = [
  "cafe", "diner", "restaurant", "pop_up", "food_truck", "bar",
  "artist",
  "trade",
];

export const ALL_KIT_FAMILIES: readonly KitFamily[] = [
  "food_service", "creative", "services", "retail",
];

export const FOOD_SERVICE_CATEGORIES: readonly FoodServiceCategory[] = [
  "cafe", "diner", "restaurant", "pop_up", "food_truck", "bar",
];

export function isKitCategory(value: unknown): value is KitCategory {
  return typeof value === "string"
    && (ALL_KIT_CATEGORIES as readonly string[]).includes(value);
}

export function isKitFamily(value: unknown): value is KitFamily {
  return typeof value === "string"
    && (ALL_KIT_FAMILIES as readonly string[]).includes(value);
}

// isKitType is now an alias for isKitCategory (KitType = KitCategory).
export function isKitType(value: unknown): value is KitType {
  return isKitCategory(value);
}

export function toKitType(value: unknown, fallback: KitType = "restaurant"): KitType {
  return isKitCategory(value) ? value : fallback;
}

export function toKitCategory(
  value: unknown,
  fallback: KitCategory = "restaurant",
): KitCategory {
  return isKitCategory(value) ? value : fallback;
}

export function toKitFamily(
  value: unknown,
  fallback: KitFamily = "food_service",
): KitFamily {
  return isKitFamily(value) ? value : fallback;
}
