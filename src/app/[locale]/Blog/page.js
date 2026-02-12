import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import HeroBlogSection from "@/components/HeroBlog";
import Navbar from "@/components/Navbar";

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <HeroBlogSection />
      <BlogSection />
      <Footer />
    </>
  );
}
