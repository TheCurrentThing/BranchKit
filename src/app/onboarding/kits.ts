// Onboarding kit definitions — seed content and defaults per category.
//
// IMPORTANT: This file is distinct from src/lib/kit-config.ts.
//   kit-config.ts  — module visibility, section order, resolver logic (runtime)
//   kits.ts        — default content seeded once at business creation (onboarding only)
//
// Adding a new Food Service category:
//   1. Add a CategoryPreset in kit-config.ts  (module + section defaults)
//   2. Add a KitDefinition here               (seed content + feature flags)
//   That's it. Nothing else needs to change.

import type { KitCategory } from "@/types/kit";

// ─── SEED CONTENT TYPES ───────────────────────────────────────────────────────

export interface KitMenuCategory {
  name: string;
  slug: string;
  serviceWindow: string;
  sortOrder: number;
  items: Array<{
    name: string;
    description: string;
    price: number;
    tags: string[];
    isFeatured: boolean;
    sortOrder: number;
  }>;
}

export interface KitSpecial {
  title: string;
  description: string;
  price: number | null;
  label: string;
  isFeatured: boolean;
  sortOrder: number;
}

export interface KitDefinition {
  category: KitCategory;
  label: string;
  description: string;
  tags: string[];
  categories: KitMenuCategory[];
  specials: KitSpecial[];
  features: {
    showBreakfastMenu: boolean;
    showLunchMenu: boolean;
    showDinnerMenu: boolean;
    showSpecials: boolean;
    showGallery: boolean;
    showTestimonials: boolean;
    showMap: boolean;
    showOnlineOrdering: boolean;
    showStickyMobileBar: boolean;
  };
  defaults: {
    heroEyebrow: string;
    heroHeadline: string;
    heroSubheadline: string;
    heroPrimaryCtaLabel: string;
    aboutTitle: string;
    aboutBody: string[];
    galleryTitle: string;
    menuPreviewTitle: string;
    contactTitle: string;
  };
}

// ─── FOOD SERVICE KIT DEFINITIONS ────────────────────────────────────────────
//
// All six Food Service categories. Same module system, different defaults.
// These are seed values only — every field is editable after onboarding.

export const KITS: Record<KitCategory, KitDefinition> = {

  // ── Restaurant ─────────────────────────────────────────────────────────────

  restaurant: {
    category: "restaurant",
    label: "Restaurant",
    description: "Full-service dining — menu, specials, gallery, and hours.",
    tags: ["Menu", "Specials", "Gallery", "Hours"],
    categories: [
      {
        name: "Starters",
        slug: "starters",
        serviceWindow: "all-day",
        sortOrder: 1,
        items: [
          { name: "Chef's Seasonal Starter", description: "Ask your server about today's selection.", price: 12, tags: ["Chef's Pick"], isFeatured: true, sortOrder: 1 },
          { name: "Garlic Bread", description: "Toasted sourdough, garlic butter, fresh herbs.", price: 7, tags: [], isFeatured: false, sortOrder: 2 },
        ],
      },
      {
        name: "Mains",
        slug: "mains",
        serviceWindow: "all-day",
        sortOrder: 2,
        items: [
          { name: "House Signature Main", description: "Our chef's flagship dish — ask your server for details.", price: 24, tags: ["House Favorite"], isFeatured: true, sortOrder: 1 },
          { name: "Seasonal Pasta", description: "Fresh pasta with seasonal ingredients and house sauce.", price: 18, tags: [], isFeatured: false, sortOrder: 2 },
          { name: "Garden Plate", description: "Seasonal vegetables, house-made dressing, grain.", price: 16, tags: ["Vegetarian"], isFeatured: false, sortOrder: 3 },
        ],
      },
      {
        name: "Desserts",
        slug: "desserts",
        serviceWindow: "all-day",
        sortOrder: 3,
        items: [
          { name: "Seasonal Dessert", description: "Ask your server about today's dessert selection.", price: 9, tags: [], isFeatured: false, sortOrder: 1 },
        ],
      },
      {
        name: "Drinks",
        slug: "drinks",
        serviceWindow: "all-day",
        sortOrder: 4,
        items: [
          { name: "House Lemonade", description: "Fresh-squeezed, house-made.", price: 4, tags: [], isFeatured: false, sortOrder: 1 },
          { name: "Sparkling Water", description: "500ml, chilled.", price: 3, tags: [], isFeatured: false, sortOrder: 2 },
        ],
      },
    ],
    specials: [
      { title: "Chef's Special", description: "Our rotating daily special — ask your server for today's selection.", price: null, label: "Daily Special", isFeatured: true, sortOrder: 1 },
    ],
    features: {
      showBreakfastMenu: false,
      showLunchMenu: true,
      showDinnerMenu: true,
      showSpecials: true,
      showGallery: true,
      showTestimonials: false,
      showMap: true,
      showOnlineOrdering: false,
      showStickyMobileBar: true,
    },
    defaults: {
      heroEyebrow: "Now Open",
      heroHeadline: "Great food, made right.",
      heroSubheadline: "Dine in or take out — fresh, local, and made to order.",
      heroPrimaryCtaLabel: "View Menu",
      aboutTitle: "About Us",
      aboutBody: [
        "We're a local restaurant committed to fresh ingredients, honest cooking, and genuine hospitality.",
        "Every dish is made to order. Every visit matters.",
      ],
      galleryTitle: "Our Space",
      menuPreviewTitle: "Our Menu",
      contactTitle: "Find Us",
    },
  },

  // ── Café ────────────────────────────────────────────────────────────────────

  cafe: {
    category: "cafe",
    label: "Café",
    description: "Coffee, pastries, and a menu worth returning for.",
    tags: ["Coffee", "Menu", "Hours", "Gallery"],
    categories: [
      {
        name: "Coffee & Drinks",
        slug: "coffee-drinks",
        serviceWindow: "all-day",
        sortOrder: 1,
        items: [
          { name: "Espresso", description: "Double shot, house blend.", price: 3.5, tags: ["House Staple"], isFeatured: true, sortOrder: 1 },
          { name: "Latte", description: "Espresso, steamed milk, light foam.", price: 5, tags: [], isFeatured: false, sortOrder: 2 },
          { name: "Pour Over", description: "Single origin, brewed to order.", price: 5.5, tags: ["Single Origin"], isFeatured: true, sortOrder: 3 },
          { name: "Cold Brew", description: "Steeped 18 hours, served over ice.", price: 5, tags: [], isFeatured: false, sortOrder: 4 },
        ],
      },
      {
        name: "Pastries & Bites",
        slug: "pastries-bites",
        serviceWindow: "all-day",
        sortOrder: 2,
        items: [
          { name: "Butter Croissant", description: "Baked fresh daily, flaky and golden.", price: 4, tags: ["Baked Daily"], isFeatured: true, sortOrder: 1 },
          { name: "Seasonal Muffin", description: "Rotating seasonal flavors, baked in-house.", price: 3.5, tags: [], isFeatured: false, sortOrder: 2 },
          { name: "Avocado Toast", description: "Sourdough, smashed avocado, chili flake, lemon.", price: 9, tags: [], isFeatured: false, sortOrder: 3 },
        ],
      },
    ],
    specials: [],
    features: {
      showBreakfastMenu: true,
      showLunchMenu: true,
      showDinnerMenu: false,
      showSpecials: false,
      showGallery: true,
      showTestimonials: false,
      showMap: true,
      showOnlineOrdering: false,
      showStickyMobileBar: false,
    },
    defaults: {
      heroEyebrow: "Open Daily",
      heroHeadline: "Good coffee. Good company.",
      heroSubheadline: "Freshly roasted, carefully made. Pastries baked every morning.",
      heroPrimaryCtaLabel: "See Our Menu",
      aboutTitle: "About the Café",
      aboutBody: [
        "We're a neighborhood café built around one idea: coffee worth slowing down for.",
        "Everything on the menu is made in-house or sourced from people we trust.",
      ],
      galleryTitle: "Come In",
      menuPreviewTitle: "On the Menu",
      contactTitle: "Find Us",
    },
  },

  // ── Diner ───────────────────────────────────────────────────────────────────

  diner: {
    category: "diner",
    label: "Diner",
    description: "Comfort food, all-day breakfast, and honest value.",
    tags: ["Menu", "Specials", "Hours", "All-Day Breakfast"],
    categories: [
      {
        name: "Breakfast",
        slug: "breakfast",
        serviceWindow: "breakfast",
        sortOrder: 1,
        items: [
          { name: "Two Eggs Any Style", description: "Two eggs, toast, house potatoes.", price: 8, tags: ["All Day"], isFeatured: true, sortOrder: 1 },
          { name: "Stack of Pancakes", description: "Three buttermilk pancakes, maple syrup, butter.", price: 9, tags: ["House Favorite"], isFeatured: false, sortOrder: 2 },
          { name: "Veggie Scramble", description: "Seasonal vegetables, three eggs, toast.", price: 10, tags: ["Vegetarian"], isFeatured: false, sortOrder: 3 },
        ],
      },
      {
        name: "Burgers & Sandwiches",
        slug: "burgers-sandwiches",
        serviceWindow: "all-day",
        sortOrder: 2,
        items: [
          { name: "Classic Cheeseburger", description: "Beef patty, American cheese, pickles, onion, house sauce, brioche bun.", price: 13, tags: ["Best Seller"], isFeatured: true, sortOrder: 1 },
          { name: "Club Sandwich", description: "Turkey, bacon, lettuce, tomato, mayo on toasted white.", price: 12, tags: [], isFeatured: false, sortOrder: 2 },
          { name: "Grilled Cheese", description: "Three-cheese blend on sourdough, served with cup of soup.", price: 10, tags: [], isFeatured: false, sortOrder: 3 },
        ],
      },
      {
        name: "Sides",
        slug: "sides",
        serviceWindow: "all-day",
        sortOrder: 3,
        items: [
          { name: "House Fries", description: "Crispy, seasoned, served hot.", price: 4, tags: [], isFeatured: false, sortOrder: 1 },
          { name: "Onion Rings", description: "Beer-battered, golden fried.", price: 5, tags: [], isFeatured: false, sortOrder: 2 },
        ],
      },
    ],
    specials: [
      { title: "Blue Plate Special", description: "Daily rotating plate — a full meal at a fair price. Ask the server what's on today.", price: null, label: "Today's Plate", isFeatured: true, sortOrder: 1 },
    ],
    features: {
      showBreakfastMenu: true,
      showLunchMenu: true,
      showDinnerMenu: true,
      showSpecials: true,
      showGallery: false,
      showTestimonials: false,
      showMap: true,
      showOnlineOrdering: false,
      showStickyMobileBar: true,
    },
    defaults: {
      heroEyebrow: "Open Early",
      heroHeadline: "Good food. No fuss.",
      heroSubheadline: "Comfort classics, all-day breakfast, and a seat that's always ready.",
      heroPrimaryCtaLabel: "See the Menu",
      aboutTitle: "About the Diner",
      aboutBody: [
        "We've been feeding this neighborhood for years — honest food, fair prices, and no pretense.",
        "Breakfast runs all day. The coffee's always hot.",
      ],
      galleryTitle: "Inside",
      menuPreviewTitle: "The Menu",
      contactTitle: "Come Find Us",
    },
  },

  // ── Pop-Up ──────────────────────────────────────────────────────────────────

  pop_up: {
    category: "pop_up",
    label: "Pop-Up",
    description: "Here today. A rotating menu, location-driven experience.",
    tags: ["Events", "Menu", "Location", "Announcements"],
    categories: [
      {
        name: "This Week's Menu",
        slug: "this-weeks-menu",
        serviceWindow: "all-day",
        sortOrder: 1,
        items: [
          { name: "Signature Plate", description: "Our rotating weekly signature — check back for updates.", price: 16, tags: ["This Week"], isFeatured: true, sortOrder: 1 },
          { name: "Small Plate", description: "A curated bite to go alongside the main.", price: 8, tags: [], isFeatured: false, sortOrder: 2 },
        ],
      },
      {
        name: "Drinks",
        slug: "drinks",
        serviceWindow: "all-day",
        sortOrder: 2,
        items: [
          { name: "House Beverage", description: "Non-alcoholic, house-made, seasonal.", price: 4, tags: [], isFeatured: false, sortOrder: 1 },
        ],
      },
    ],
    specials: [],
    features: {
      showBreakfastMenu: false,
      showLunchMenu: true,
      showDinnerMenu: false,
      showSpecials: false,
      showGallery: true,
      showTestimonials: false,
      showMap: true,
      showOnlineOrdering: false,
      showStickyMobileBar: false,
    },
    defaults: {
      heroEyebrow: "Find Us This Weekend",
      heroHeadline: "Here today. Worth it.",
      heroSubheadline: "A rotating menu, a new location, and a reason to show up. Follow along.",
      heroPrimaryCtaLabel: "See Where We Are",
      aboutTitle: "Who We Are",
      aboutBody: [
        "We're a pop-up food operation that shows up where the food's good and the people are hungry.",
        "Follow us for location updates and this week's menu.",
      ],
      galleryTitle: "What We Make",
      menuPreviewTitle: "This Week's Menu",
      contactTitle: "Find Us",
    },
  },

  // ── Food Truck ──────────────────────────────────────────────────────────────

  food_truck: {
    category: "food_truck",
    label: "Food Truck",
    description: "Mobile menu with rotating specials and location updates.",
    tags: ["Menu", "Specials", "Location", "Hours"],
    categories: [
      {
        name: "Today's Menu",
        slug: "todays-menu",
        serviceWindow: "all-day",
        sortOrder: 1,
        items: [
          { name: "Signature Plate", description: "Our most-loved dish. Fresh today.", price: 14, tags: ["Best Seller"], isFeatured: true, sortOrder: 1 },
          { name: "Daily Special", description: "Rotating special — check back for updates.", price: 12, tags: ["Special"], isFeatured: false, sortOrder: 2 },
        ],
      },
      {
        name: "Drinks",
        slug: "drinks",
        serviceWindow: "all-day",
        sortOrder: 2,
        items: [
          { name: "House Drink", description: "Cold, fresh, made in-house.", price: 4, tags: [], isFeatured: false, sortOrder: 1 },
          { name: "Water", description: "Bottled, chilled.", price: 2, tags: [], isFeatured: false, sortOrder: 2 },
        ],
      },
    ],
    specials: [
      { title: "Today's Special", description: "Our rotating daily special — check back for today's selection.", price: null, label: "Daily", isFeatured: true, sortOrder: 1 },
    ],
    features: {
      showBreakfastMenu: false,
      showLunchMenu: true,
      showDinnerMenu: false,
      showSpecials: true,
      showGallery: false,
      showTestimonials: false,
      showMap: true,
      showOnlineOrdering: false,
      showStickyMobileBar: true,
    },
    defaults: {
      heroEyebrow: "Find Us Today",
      heroHeadline: "Find us. Eat well.",
      heroSubheadline: "Street food done right. Check back daily for specials and location.",
      heroPrimaryCtaLabel: "See Today's Menu",
      aboutTitle: "Who We Are",
      aboutBody: [
        "We're a mobile food operation bringing fresh, handmade food to the streets.",
        "Follow us for daily specials and location updates.",
      ],
      galleryTitle: "Our Food",
      menuPreviewTitle: "Today's Menu",
      contactTitle: "Find Us",
    },
  },

  // ── Bar ─────────────────────────────────────────────────────────────────────

  bar: {
    category: "bar",
    label: "Bar",
    description: "Drinks, events, and the neighborhood's go-to spot.",
    tags: ["Specials", "Events", "Hours", "Gallery"],
    categories: [
      {
        name: "Cocktails",
        slug: "cocktails",
        serviceWindow: "all-day",
        sortOrder: 1,
        items: [
          { name: "House Old Fashioned", description: "Bourbon, house bitters, orange, sugar. On the rocks.", price: 13, tags: ["House Classic"], isFeatured: true, sortOrder: 1 },
          { name: "Seasonal Spritz", description: "Rotating seasonal aperitivo, prosecco, soda. Ask the bartender.", price: 11, tags: ["Seasonal"], isFeatured: false, sortOrder: 2 },
          { name: "Mezcal Negroni", description: "Mezcal, Campari, sweet vermouth, orange peel.", price: 14, tags: [], isFeatured: false, sortOrder: 3 },
        ],
      },
      {
        name: "Beer & Wine",
        slug: "beer-wine",
        serviceWindow: "all-day",
        sortOrder: 2,
        items: [
          { name: "Draft Beer", description: "Ask your bartender what's on tap.", price: 7, tags: [], isFeatured: false, sortOrder: 1 },
          { name: "House Red", description: "Glass pour. Ask for tonight's selection.", price: 9, tags: [], isFeatured: false, sortOrder: 2 },
          { name: "House White", description: "Glass pour. Ask for tonight's selection.", price: 9, tags: [], isFeatured: false, sortOrder: 3 },
        ],
      },
      {
        name: "Small Plates",
        slug: "small-plates",
        serviceWindow: "all-day",
        sortOrder: 3,
        items: [
          { name: "Bar Nuts", description: "Spiced, warm, house blend.", price: 5, tags: [], isFeatured: false, sortOrder: 1 },
          { name: "Charcuterie Board", description: "Rotating selection of cured meats, pickles, and accompaniments.", price: 18, tags: ["Shareable"], isFeatured: true, sortOrder: 2 },
        ],
      },
    ],
    specials: [
      { title: "Happy Hour", description: "Half-price well drinks and $2 off drafts. Check our hours for when it runs.", price: null, label: "Happy Hour", isFeatured: true, sortOrder: 1 },
    ],
    features: {
      showBreakfastMenu: false,
      showLunchMenu: false,
      showDinnerMenu: true,
      showSpecials: true,
      showGallery: true,
      showTestimonials: false,
      showMap: true,
      showOnlineOrdering: false,
      showStickyMobileBar: true,
    },
    defaults: {
      heroEyebrow: "Open Tonight",
      heroHeadline: "Cold drinks. Good times.",
      heroSubheadline: "Your neighborhood bar. Pull up a stool.",
      heroPrimaryCtaLabel: "See Our Menu",
      aboutTitle: "About the Bar",
      aboutBody: [
        "We're your neighborhood bar — nothing fancy, just good drinks, good music, and people you'll want to come back for.",
        "Happy hour runs daily. Events on the weekends. Door's open.",
      ],
      galleryTitle: "The Bar",
      menuPreviewTitle: "Drinks & Bites",
      contactTitle: "Find Us",
    },
  },

  // ── Artist / Creator ────────────────────────────────────────────────────────

  artist: {
    category: "artist",
    label: "Artist / Creator",
    description: "Portfolio, gallery, and commission or booking info.",
    tags: ["Gallery", "Portfolio", "Commissions"],
    categories: [],
    specials: [],
    features: {
      showBreakfastMenu: false,
      showLunchMenu: false,
      showDinnerMenu: false,
      showSpecials: false,
      showGallery: true,
      showTestimonials: false,
      showMap: false,
      showOnlineOrdering: false,
      showStickyMobileBar: false,
    },
    defaults: {
      heroEyebrow: "Portfolio",
      heroHeadline: "Art made with intention.",
      heroSubheadline: "Original work, commissions open. See the work.",
      heroPrimaryCtaLabel: "View Portfolio",
      aboutTitle: "About My Work",
      aboutBody: [
        "I create original work from my studio.",
        "Available for commissions, collaborations, and exhibitions. Reach out to start a conversation.",
      ],
      galleryTitle: "Portfolio",
      menuPreviewTitle: "Work",
      contactTitle: "Get in Touch",
    },
  },

  // ── Trade / Service ─────────────────────────────────────────────────────────

  trade: {
    category: "trade",
    label: "Trade / Service",
    description: "Services, pricing, and booking for contractors and trade pros.",
    tags: ["Services", "Pricing", "Booking", "Hours"],
    categories: [],
    specials: [],
    features: {
      showBreakfastMenu: false,
      showLunchMenu: false,
      showDinnerMenu: false,
      showSpecials: false,
      showGallery: true,
      showTestimonials: false,
      showMap: true,
      showOnlineOrdering: false,
      showStickyMobileBar: true,
    },
    defaults: {
      heroEyebrow: "Licensed & Insured",
      heroHeadline: "Built right, every time.",
      heroSubheadline: "Quality work, honest pricing, and a team that shows up.",
      heroPrimaryCtaLabel: "Get a Quote",
      aboutTitle: "About Our Work",
      aboutBody: [
        "We are a licensed and insured trade business serving our local community.",
        "Every job done right, on time, and at a fair price. Call or message to get started.",
      ],
      galleryTitle: "Our Work",
      menuPreviewTitle: "Services",
      contactTitle: "Contact Us",
    },
  },
};
