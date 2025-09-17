import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

// const pastbg = "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Content */}
      <div className="relative z-10 pt-20">
        <Navbar />
        <HeroSection />
        <FeaturesGrid />
        <WorkflowSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
