import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProofStrip from "@/components/landing/ProofStrip";
import PainSection from "@/components/landing/PainSection";
import BeforeAfter from "@/components/landing/BeforeAfter";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import Comparison from "@/components/landing/Comparison";
import PricingSection from "@/components/landing/PricingSection";
import ClosingSection from "@/components/landing/ClosingSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProofStrip />
      <PainSection />
      <BeforeAfter />
      <HowItWorks />
      <Testimonials />
      <Comparison />
      <PricingSection />
      <ClosingSection />
    </div>
  );
};

export default Index;
