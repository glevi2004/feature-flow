import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { IntegrationsSection } from "@/components/landing/IntegrationsSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

// const pastbg = "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Content */}
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
