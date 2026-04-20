import { Fragment } from "react";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FeaturedMenuSection } from "@/components/sections/FeaturedMenuSection";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { MenuPreviewSection } from "@/components/sections/MenuPreviewSection";
import { OfferingsSection } from "@/components/sections/OfferingsSection";
import { QuickInfoBar } from "@/components/sections/QuickInfoBar";
import { ServiceAreasSection } from "@/components/sections/ServiceAreasSection";
import { SpecialsSection } from "@/components/sections/SpecialsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { LocalBusinessJsonLd } from "@/components/layout/LocalBusinessJsonLd";
import { getCategoryConfig } from "@/lib/kit-config";
import type { PublicSectionType } from "@/types/kit";
import type { SitePayload } from "@/types/site";
import type { SiteRendererProps } from "@/types/renderer";

// One function per PublicSectionType.
// Each receives the full payload + basePath and returns a React node (or null).
// Returning null is always safe — the section simply doesn't render.
type SectionFn = (payload: SitePayload, basePath: string) => React.ReactNode;

const SECTION_RENDERERS: Partial<Record<PublicSectionType, SectionFn>> = {
  hero: (p) => (
    <HeroSection brand={p.brand} settings={p.settings} homePage={p.homePage} />
  ),

  quick_info: (p) => (
    <QuickInfoBar brand={p.brand} settings={p.settings} hours={p.hours} />
  ),

  specials: (p) =>
    p.features.showSpecials ? (
      <SpecialsSection specials={p.specials} intro={p.homePage.specialsIntro} />
    ) : null,

  featured_menu: (p) => (
    <FeaturedMenuSection
      categories={p.menuCategories}
      title={p.homePage.featuredMenuTitle}
      intro={p.homePage.featuredMenuIntro}
    />
  ),

  menu_preview: (p, basePath) => (
    <MenuPreviewSection
      categories={p.menuCategories}
      title={p.homePage.menuPreviewTitle}
      subtitle={p.homePage.menuPreviewSubtitle}
      basePath={basePath}
    />
  ),

  offerings: (p) => (
    <OfferingsSection offerings={p.serviceOfferings} />
  ),

  service_areas: (p) => (
    <ServiceAreasSection areas={p.serviceAreas} />
  ),

  // publicSections inclusion is the primary gate. Only render when data exists.
  testimonials: (p) =>
    p.testimonials.length > 0 ? (
      <TestimonialsSection testimonials={p.testimonials} />
    ) : null,

  gallery: (p) =>
    p.features.showGallery ? (
      <GallerySection
        images={p.galleryImages}
        title={p.homePage.galleryTitle}
        subtitle={p.homePage.gallerySubtitle}
      />
    ) : null,

  about: (p) => <AboutSection about={p.aboutPage} />,

  contact: (p) => (
    <ContactSection
      brand={p.brand}
      hours={p.hours}
      title={p.homePage.contactTitle}
      subtitle={p.homePage.contactSubtitle}
    />
  ),

  featured_products: () => <FeaturedProductsSection />,

  // Not yet implemented — render nothing rather than crashing
  products: () => null,
  collections: () => null,
  events: () => null,
  announcements: () => null,
};

// Kit-driven renderer: sections are ordered and selected by the kit's publicSections.
// Feature flags provide a secondary gate within individual sections.
// No food assumptions here — section rendering is data-driven end to end.
export function StandardRenderer({ payload, basePath }: SiteRendererProps) {
  const kitConfig = getCategoryConfig(payload.kitCategory);

  return (
    <>
      <LocalBusinessJsonLd brand={payload.brand} hours={payload.hours} />

      {kitConfig.publicSections.map((sectionType) => {
        const render = SECTION_RENDERERS[sectionType];
        if (!render) return null;
        const node = render(payload, basePath);
        if (!node) return null;
        return <Fragment key={sectionType}>{node}</Fragment>;
      })}
    </>
  );
}
