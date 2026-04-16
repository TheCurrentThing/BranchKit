import { ContactSection } from "@/components/sections/ContactSection";
import { getSitePayload } from "@/lib/queries";

export default async function PreviewContactPage() {
  const payload = await getSitePayload();

  return (
    <ContactSection
      brand={payload.brand}
      hours={payload.hours}
      title={payload.homePage.contactTitle}
      subtitle={payload.homePage.contactSubtitle}
    />
  );
}
