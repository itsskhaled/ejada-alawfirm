import ClientsSection from "@/components/Clients";
import ComparisonSection from "@/components/Comparison";
import Footer from "@/components/Footer";
import HeroAboutSection from "@/components/HeroAbout";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <HeroAboutSection />
      <ClientsSection />
      <ComparisonSection />
      <Footer />
    </>
  );
}
