import type { Metadata } from "next";
import "@/app/globals.css";
import { buildBrandCssVariables } from "@/lib/brand";
import { getBrandFontVariableClassNames } from "@/lib/font-registry";
import { getSitePayload } from "@/lib/queries";
import { getThemePresetById } from "@/lib/theme";

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getSitePayload();

  return {
    title: `${payload.brand.businessName} | Local Restaurant Website System`,
    description: payload.brand.tagline,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const payload = await getSitePayload();
  const fontClassNames = getBrandFontVariableClassNames(
    payload.brand,
    getThemePresetById(payload.brand.themePresetId).fonts,
  );

  return (
    <html lang="en">
      <body
        className={fontClassNames}
        style={buildBrandCssVariables(payload.brand)}
      >
        {children}
      </body>
    </html>
  );
}
