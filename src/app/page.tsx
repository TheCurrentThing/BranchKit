import "@/app/landing.css";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import LiveControlPreview from "@/components/landing/LiveControlPreview";
import WhyBranchkit from "@/components/landing/WhyBranchkit";
import FeaturePillars from "@/components/landing/FeaturePillars";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";

export const metadata = {
  title: "BranchKit — Your business. Live. Under control.",
  description:
    "Update your menu, specials, hours, and branding in real time — without rebuilding your website.",
};

export default function LandingPage() {
  return (
    <div className="landing-root min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <LiveControlPreview />
        <WhyBranchkit />
        <FeaturePillars />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
