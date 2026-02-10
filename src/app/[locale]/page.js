import AboutSection from "@/components/AboutSection";
import AnimationHero from "@/components/AnimationHero";
import CreditsSection from "@/components/Credits";
import FeaturesSection from "@/components/Features";
import HeroSection from "@/components/Hero";
import HowWeWorkSection from "@/components/HowWeWork";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/Services";
import TeamSection from "@/components/Team";
import QuestionsSection from "@/components/Questions";
import ContactSection from "@/components/Contact";
import CTASection from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="relative w-full overflow-hidden">
        <div className="absolute top-45">
          <AnimationHero />
        </div>
        <div className="absolute top-50">
          <AnimationHero />
        </div>
        <div className="absolute top-55">
          <AnimationHero />
        </div>
        <div className="absolute top-60">
          <AnimationHero />
        </div>
        <div className="absolute top-65">
          <AnimationHero />
        </div>
        <div className="absolute top-70">
          <AnimationHero />
        </div>
        <HeroSection />
      </div>
      <AboutSection />
      <FeaturesSection />
      <ServicesSection />
      <HowWeWorkSection />
      <CreditsSection />
      <TeamSection />
      <QuestionsSection />
      <ContactSection />
      {/* <CTASection /> */}
      <Footer />
    </>
  );
}
