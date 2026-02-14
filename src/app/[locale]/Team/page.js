import CTASection from "@/components/CTA";
import Footer from "@/components/Footer";
import HeroTeamSection from "@/components/HeroTeam";
import Navbar from "@/components/Navbar";
import OurNumberSection from "@/components/OurNumber";

const DOMAIN = "https://your-domain.com"; // غيّره
const BRAND = {
  ar: "إجادة للمحاماة والاستشارات القانونية",
  en: "Ejada Law Firm",
};

export async function generateMetadata({ params }) {
  const locale = params.locale || "ar";

  const meta = {
    ar: {
      title: `فريق العمل | ${BRAND.ar}`,
      description:
        "تعرّف على فريق إجادة من المحامين والمستشارين القانونيين بخبرة متنوعة، والتزام عالٍ بتقديم حلول قانونية دقيقة وتمثيل احترافي.",
      ogLocale: "ar_SA",
    },
    en: {
      title: `Our Team | ${BRAND.en}`,
      description:
        "Meet our team of lawyers and legal consultants—diverse expertise, high professionalism, and commitment to protecting your rights.",
      ogLocale: "en_US",
    },
  };

  const m = meta[locale] || meta.ar;

  const canonical = `${DOMAIN}/${locale}/team`;
  const ogImage = `${DOMAIN}/og/team-${locale}.jpg`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical,
      languages: {
        ar: `${DOMAIN}/ar/team`,
        en: `${DOMAIN}/en/team`,
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
