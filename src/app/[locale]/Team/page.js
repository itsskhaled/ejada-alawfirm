import CTASection from "@/components/CTA";
import Footer from "@/components/Footer";
import HeroTeamSection from "@/components/HeroTeam";
import Navbar from "@/components/Navbar";
import OurNumberSection from "@/components/OurNumber";

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <HeroTeamSection />
      <OurNumberSection />
      <CTASection />
      <Footer />
    </>
  );
}
