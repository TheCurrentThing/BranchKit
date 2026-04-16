import {
  Bebas_Neue,
  Cormorant_Garamond,
  DM_Sans,
  Inter,
  Lora,
  Merriweather,
  Playfair_Display,
  Sora,
} from "next/font/google";
import type { FontPack } from "@/lib/theme";
import type { BrandConfig } from "@/types/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-playfair-display",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant-garamond",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-bebas-neue",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-merriweather",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sora",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-lora",
});

export type FontKey =
  | "inter"
  | "playfair-display"
  | "cormorant-garamond"
  | "dm-sans"
  | "bebas-neue"
  | "merriweather"
  | "sora"
  | "lora";

type FontDefinition = {
  key: FontKey;
  family: string;
  fallback: string;
  cssVariable: string;
  variableClassName: string;
};

export const FONT_REGISTRY: Record<FontKey, FontDefinition> = {
  inter: {
    key: "inter",
    family: "Inter",
    fallback:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    cssVariable: "--font-inter",
    variableClassName: inter.variable,
  },
  "playfair-display": {
    key: "playfair-display",
    family: "Playfair Display",
    fallback: "Georgia, serif",
    cssVariable: "--font-playfair-display",
    variableClassName: playfairDisplay.variable,
  },
  "cormorant-garamond": {
    key: "cormorant-garamond",
    family: "Cormorant Garamond",
    fallback: "Georgia, serif",
    cssVariable: "--font-cormorant-garamond",
    variableClassName: cormorantGaramond.variable,
  },
  "dm-sans": {
    key: "dm-sans",
    family: "DM Sans",
    fallback: "Arial, sans-serif",
    cssVariable: "--font-dm-sans",
    variableClassName: dmSans.variable,
  },
  "bebas-neue": {
    key: "bebas-neue",
    family: "Bebas Neue",
    fallback: "Arial Narrow, sans-serif",
    cssVariable: "--font-bebas-neue",
    variableClassName: bebasNeue.variable,
  },
  merriweather: {
    key: "merriweather",
    family: "Merriweather",
    fallback: "Georgia, serif",
    cssVariable: "--font-merriweather",
    variableClassName: merriweather.variable,
  },
  sora: {
    key: "sora",
    family: "Sora",
    fallback: "Arial, sans-serif",
    cssVariable: "--font-sora",
    variableClassName: sora.variable,
  },
  lora: {
    key: "lora",
    family: "Lora",
    fallback: "Georgia, serif",
    cssVariable: "--font-lora",
    variableClassName: lora.variable,
  },
};

export function getFontDefinition(key: FontKey) {
  return FONT_REGISTRY[key];
}

export function getFontStack(key: FontKey) {
  const font = getFontDefinition(key);
  return `var(${font.cssVariable}), ${font.fallback}`;
}

export function getFontFamilyName(key: FontKey) {
  return getFontDefinition(key).family;
}

export function getFontVariableClassNames(keys: FontKey[]) {
  return Array.from(new Set(keys.map((key) => getFontDefinition(key).variableClassName))).join(
    " ",
  );
}

export function getFontVariableClassNamesForPack(fonts: FontPack) {
  return getFontVariableClassNames([fonts.heading, fonts.body]);
}

export function fontPackToFontStacks(fonts: FontPack) {
  return {
    heading: getFontStack(fonts.heading),
    body: getFontStack(fonts.body),
  };
}

export function detectFontKeyFromStack(value: string | null | undefined): FontKey | null {
  const normalized = value?.toLowerCase() ?? "";

  for (const font of Object.values(FONT_REGISTRY)) {
    if (normalized.includes(font.family.toLowerCase())) {
      return font.key;
    }
  }

  return null;
}

export function getBrandFontVariableClassNames(
  brand: Pick<BrandConfig, "headingFont" | "bodyFont" | "themePresetId">,
  presetFonts: FontPack,
) {
  const headingKey = detectFontKeyFromStack(brand.headingFont) ?? presetFonts.heading;
  const bodyKey = detectFontKeyFromStack(brand.bodyFont) ?? presetFonts.body;

  return getFontVariableClassNames([headingKey, bodyKey]);
}
