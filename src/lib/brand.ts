import type { CSSProperties } from "react";
import { fontPackToFontStacks } from "@/lib/font-registry";
import { getThemePresetById } from "@/lib/theme";
import {
  buildThemeCssVars,
  themeTokensToLegacyFields,
} from "@/lib/theme-utils";
import type { BrandConfig } from "@/types/site";

// Use this file as the baseline brand source when cloning the template for a new client.
// The admin can persist matching values to Supabase, but this config remains the fallback.
const defaultThemePreset = getThemePresetById();
const defaultLegacyColors = themeTokensToLegacyFields(defaultThemePreset.colors);
const defaultFontStacks = fontPackToFontStacks(defaultThemePreset.fonts);

export const brandConfig: BrandConfig = {
  businessName: "Gresa's Cafe",
  tagline: "Hometown Cooking, Served Fresh Daily",
  logoText: "Gresa's Cafe",
  logoAlignment: "left",
  email: "hello@gresascafe.com",
  phone: "(618) 867-3175",
  addressLine1: "108 N Chestnut St",
  city: "De Soto",
  state: "IL",
  zip: "62924",
  socialLinks: {
    facebook: "",
    instagram: "",
  },
  themeMode: "preset",
  themePresetId: defaultThemePreset.id,
  themeTokens: defaultThemePreset.colors,
  backgroundColor: defaultLegacyColors.backgroundColor,
  foregroundColor: defaultLegacyColors.foregroundColor,
  cardColor: defaultLegacyColors.cardColor,
  mutedSectionColor: defaultLegacyColors.mutedSectionColor,
  highlightSectionColor: defaultLegacyColors.highlightSectionColor,
  headerBackgroundColor: defaultLegacyColors.headerBackgroundColor,
  announcementBackgroundColor: defaultLegacyColors.announcementBackgroundColor,
  announcementTextColor: defaultLegacyColors.announcementTextColor,
  borderColor: defaultLegacyColors.borderColor,
  primaryColor: defaultLegacyColors.primaryColor,
  secondaryColor: defaultLegacyColors.secondaryColor,
  accentColor: defaultLegacyColors.accentColor,
  headingFont: defaultFontStacks.heading,
  bodyFont: defaultFontStacks.body,
};

export function buildBrandCssVariables(brand: BrandConfig) {
  return {
    ...buildThemeCssVars(brand.themeTokens, defaultThemePreset.fonts),
    "--font-heading": brand.headingFont,
    "--font-body": brand.bodyFont,
  } as CSSProperties;
}

export function getBusinessAddress(brand: BrandConfig) {
  return `${brand.addressLine1}, ${brand.city}, ${brand.state} ${brand.zip}`;
}
