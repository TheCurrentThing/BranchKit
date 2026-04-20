import type { KitCategory } from "@/types/kit";

export type CategoryDefaults = {
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

const CATEGORY_DEFAULTS: Record<KitCategory, CategoryDefaults> = {
  // ── Food Service ─────────────────────────────────────────────────────────────
  restaurant: {
    heroEyebrow: "Now Open",
    heroHeadline: "Great food, made right.",
    heroSubheadline: "Fresh ingredients, made in-house. Come sit down.",
    heroPrimaryCtaLabel: "View Menu",
    aboutTitle: "About Us",
    aboutBody: [
      "We're a neighborhood restaurant focused on quality ingredients and honest cooking.",
      "Every dish is made from scratch. Come hungry.",
    ],
    galleryTitle: "From the Kitchen",
    menuPreviewTitle: "Our Menu",
    contactTitle: "Find Us",
  },
  cafe: {
    heroEyebrow: "Open Daily",
    heroHeadline: "Good coffee. Good company.",
    heroSubheadline: "A neighborhood café worth coming back to.",
    heroPrimaryCtaLabel: "See Our Menu",
    aboutTitle: "About the Café",
    aboutBody: [
      "We're a neighborhood café focused on quality coffee and a welcoming space.",
      "Sourced beans, made-from-scratch food, and a room worth sitting in.",
    ],
    galleryTitle: "The Café",
    menuPreviewTitle: "Menu",
    contactTitle: "Find Us",
  },
  diner: {
    heroEyebrow: "Open Early",
    heroHeadline: "Good food. No fuss.",
    heroSubheadline: "Classic comfort food done right. Open early, closed when we're done.",
    heroPrimaryCtaLabel: "See the Menu",
    aboutTitle: "About the Diner",
    aboutBody: [
      "We're a classic diner serving honest comfort food since day one.",
      "Big portions, fair prices, and coffee that's always hot.",
    ],
    galleryTitle: "The Diner",
    menuPreviewTitle: "Menu",
    contactTitle: "Find Us",
  },
  food_truck: {
    heroEyebrow: "Find Us Today",
    heroHeadline: "Find us. Eat well.",
    heroSubheadline: "Check our schedule and come find us at a location near you.",
    heroPrimaryCtaLabel: "See Today's Menu",
    aboutTitle: "About the Truck",
    aboutBody: [
      "We're a mobile food operation bringing fresh, handmade food to the streets.",
      "Follow our schedule and come find us — it's worth the trip.",
    ],
    galleryTitle: "On the Road",
    menuPreviewTitle: "Today's Menu",
    contactTitle: "Find Us",
  },
  bar: {
    heroEyebrow: "Open Tonight",
    heroHeadline: "Cold drinks. Good times.",
    heroSubheadline: "Your neighborhood bar. Drinks, bites, and a good room.",
    heroPrimaryCtaLabel: "See Our Menu",
    aboutTitle: "About the Bar",
    aboutBody: [
      "We're a neighborhood bar built around good drinks and good company.",
      "Cold beer, solid cocktails, and a kitchen that doesn't mess around.",
    ],
    galleryTitle: "The Bar",
    menuPreviewTitle: "Drinks & Food",
    contactTitle: "Find Us",
  },
  pop_up: {
    heroEyebrow: "Find Us This Weekend",
    heroHeadline: "Here today. Worth it.",
    heroSubheadline: "A pop-up worth showing up for. Check our next location.",
    heroPrimaryCtaLabel: "See Where We Are",
    aboutTitle: "About the Pop-Up",
    aboutBody: [
      "We're a pop-up food concept focused on doing one thing really well.",
      "Limited dates, limited spots. Follow along to catch our next location.",
    ],
    galleryTitle: "Recent Events",
    menuPreviewTitle: "This Week's Menu",
    contactTitle: "Get in Touch",
  },

  // ── Services ──────────────────────────────────────────────────────────────────
  on_demand: {
    heroEyebrow: "Licensed & Insured",
    heroHeadline: "Fast, reliable service when you need it.",
    heroSubheadline: "Available now — request a service and we'll be there.",
    heroPrimaryCtaLabel: "Request Service",
    aboutTitle: "About Our Service",
    aboutBody: [
      "We're a licensed, insured service provider available on short notice.",
      "Request what you need and we'll handle the rest.",
    ],
    galleryTitle: "Our Work",
    menuPreviewTitle: "Services",
    contactTitle: "Request Service",
  },
  project: {
    heroEyebrow: "Licensed & Insured",
    heroHeadline: "Built right, from start to finish.",
    heroSubheadline: "Project-based work with clear scopes and honest timelines.",
    heroPrimaryCtaLabel: "Request a Quote",
    aboutTitle: "About Our Work",
    aboutBody: [
      "We take on projects where quality matters and timelines are real.",
      "Clear scope, honest pricing, and work you can stand behind.",
    ],
    galleryTitle: "Past Projects",
    menuPreviewTitle: "Services",
    contactTitle: "Request a Quote",
  },
  scheduled: {
    heroEyebrow: "Now Booking",
    heroHeadline: "Book your next appointment.",
    heroSubheadline: "Appointments available — book online or give us a call.",
    heroPrimaryCtaLabel: "Book Now",
    aboutTitle: "About Our Service",
    aboutBody: [
      "We're a scheduled service provider with availability that fits your calendar.",
      "Book online or reach out directly — we'll get you set up.",
    ],
    galleryTitle: "Our Work",
    menuPreviewTitle: "Services",
    contactTitle: "Book or Inquire",
  },
  professional: {
    heroEyebrow: "Available for Engagements",
    heroHeadline: "Expert guidance when it matters.",
    heroSubheadline: "Strategy, planning, and execution — built around your goals.",
    heroPrimaryCtaLabel: "Get in Touch",
    aboutTitle: "About Our Work",
    aboutBody: [
      "We're an independent professional service firm working with clients who need real expertise, not generic advice.",
      "Straightforward engagements, clear deliverables, and a genuine focus on your outcomes.",
    ],
    galleryTitle: "Our Work",
    menuPreviewTitle: "Services",
    contactTitle: "Start a Conversation",
  },
  mobile: {
    heroEyebrow: "We Come to You",
    heroHeadline: "Professional service at your location.",
    heroSubheadline: "Mobile service delivered to your home, office, or wherever you need it.",
    heroPrimaryCtaLabel: "Check Availability",
    aboutTitle: "About Our Service",
    aboutBody: [
      "We're a fully mobile service bringing professional-grade work directly to your location.",
      "No appointments to drive to. We handle everything on-site.",
    ],
    galleryTitle: "Our Work",
    menuPreviewTitle: "Services",
    contactTitle: "Book or Inquire",
  },

  // ── Retail & Products ─────────────────────────────────────────────────────────
  artist: {
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
  maker: {
    heroEyebrow: "Handmade",
    heroHeadline: "Made by hand. Built to last.",
    heroSubheadline: "Every piece is crafted with care. Browse the collection.",
    heroPrimaryCtaLabel: "Shop Now",
    aboutTitle: "About My Craft",
    aboutBody: [
      "I'm an independent maker creating handmade goods from my studio.",
      "Each piece is made to order or in small batches. Quality over quantity — always.",
    ],
    galleryTitle: "The Work",
    menuPreviewTitle: "Shop",
    contactTitle: "Get in Touch",
  },
  retail: {
    heroEyebrow: "Now Open",
    heroHeadline: "Shop local. Shop well.",
    heroSubheadline: "Curated products, thoughtfully chosen. Stop in or browse online.",
    heroPrimaryCtaLabel: "Browse Products",
    aboutTitle: "About the Shop",
    aboutBody: [
      "We're an independent retail shop bringing thoughtfully curated products to our community.",
      "Every item on the shelf is here for a reason. Come see why.",
    ],
    galleryTitle: "In the Shop",
    menuPreviewTitle: "Featured Products",
    contactTitle: "Visit Us",
  },
  brand: {
    heroEyebrow: "New Collection",
    heroHeadline: "A brand with a point of view.",
    heroSubheadline: "Designed with intention. Built for the life you actually live.",
    heroPrimaryCtaLabel: "Shop the Collection",
    aboutTitle: "About the Brand",
    aboutBody: [
      "We're an independent brand built around a clear point of view.",
      "Every product we make reflects something we believe in. Browse the collection.",
    ],
    galleryTitle: "The Look",
    menuPreviewTitle: "Shop",
    contactTitle: "Contact",
  },
  vintage: {
    heroEyebrow: "New Arrivals Weekly",
    heroHeadline: "Old things, new homes.",
    heroSubheadline: "Carefully sourced vintage and secondhand. Inventory rotates constantly.",
    heroPrimaryCtaLabel: "See What's In",
    aboutTitle: "About the Shop",
    aboutBody: [
      "We're a curated vintage and thrift shop with a sharp eye for the good stuff.",
      "Inventory rotates weekly. Come back often — something new is always waiting.",
    ],
    galleryTitle: "Recent Finds",
    menuPreviewTitle: "Current Inventory",
    contactTitle: "Find Us",
  },
  collector: {
    heroEyebrow: "Curated Collection",
    heroHeadline: "Rare things, carefully chosen.",
    heroSubheadline: "A curated archive of rare and limited pieces. Inquire to acquire.",
    heroPrimaryCtaLabel: "Browse the Archive",
    aboutTitle: "About the Collection",
    aboutBody: [
      "We source, curate, and sell rare and collectible items for serious enthusiasts.",
      "Every piece in the archive has been vetted for authenticity and condition. Reach out to inquire.",
    ],
    galleryTitle: "The Archive",
    menuPreviewTitle: "Available Now",
    contactTitle: "Inquire",
  },
};

export function getCategoryDefaults(category: KitCategory): CategoryDefaults {
  return CATEGORY_DEFAULTS[category];
}
