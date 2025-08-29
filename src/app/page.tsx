import { Navbar } from "@/components/navbar";
import DarkVeil from "@/components/DarkVeil";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { IntegrationsSection } from "@/components/landing/IntegrationsSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* DarkVeil Background */}
      <div className="fixed inset-0 z-0">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.02}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0.1}
          resolutionScale={1}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 pt-20">
        <Navbar />
        <HeroSection />
        <FeaturesGrid />

        {/* Workflow Section */}

        <IntegrationsSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
