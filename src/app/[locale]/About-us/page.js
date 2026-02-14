import ClientsSection from "@/components/Clients";
import ComparisonSection from "@/components/Comparison";
import CTASection from "@/components/CTA";
import Footer from "@/components/Footer";
import HeroAboutSection from "@/components/HeroAbout";
import Navbar from "@/components/Navbar";
const DOMAIN = "https://your-domain.com"; // غيّره
const BRAND = {
  ar: "إجادة للمحاماة والاستشارات القانونية",
  en: "Ejada Law Firm",
};

export async function generateMetadata({ params }) {
  const locale = params.locale || "ar";

  const meta = {
    ar: {
      title: `حول الشركة | ${BRAND.ar}`,
      description:
        "تعرف على إجادة للمحاماة والاستشارات القانونية: خبرة، التزام، ودقة في تقديم الحلول القانونية وتمثيل العملاء باحتراف.",
      ogLocale: "ar_SA",
    },
    en: {
      title: `About Us | ${BRAND.en}`,
      description:
        "Learn about Ejada Law Firm—experience, commitment, and precision in providing professional legal services and representation.",
      ogLocale: "en_US",
    },
  };

  const m = meta[locale] || meta.ar;
  const canonical = `${DOMAIN}/${locale}/about-us`;
  const ogImage = `${DOMAIN}/og/about-${locale}.jpg`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical,
      languages: {
        ar: `${DOMAIN}/ar/about-us`,
        en: `${DOMAIN}/en/about-us`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: canonical,
      locale: m.ogLocale,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [ogImage],
    },
  };
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <HeroAboutSection />
      <ClientsSection />
      <CTASection />
      <ComparisonSection />
      <Footer />
    </>
  );
}
