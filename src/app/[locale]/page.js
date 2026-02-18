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
import Footer from "@/components/Footer";
import ScrollToStoredTarget from "@/components/ScrollToStoredTarget";
import WhatsAppBtn from "@/components/WhatsAppBtn";

const DOMAIN = "https://your-domain.com"; // غيره
const PHONE = "+966920008433";

const BRAND = {
  ar: "إجادة للمحاماة والاستشارات القانونية",
  en: "Ejada Law Firm",
};

export async function generateMetadata({ params }) {
  const { locale } = (await params) || "ar";

  const META = {
    ar: {
      title: `${BRAND.ar} | حلول قانونية موثوقة تحمي حقوقك`,
      desc: "نقدّم خدمات قانونية احترافية مبنية على الخبرة والدقة والالتزام. تواصل معنا لحجز استشارة.",
      locale: "ar_SA",
    },
    en: {
      title: `${BRAND.en} | Trusted Legal Solutions`,
      desc: "Professional legal services built on experience and commitment. Contact us today.",
      locale: "en_US",
    },
  };

  const data = META[locale];
  const canonical = `${DOMAIN}/${locale}`;
  const ogImage = `${DOMAIN}/og/home-${locale}.jpg`;

  return {
    metadataBase: new URL(DOMAIN),
    title: data.title,
    description: data.desc,

    alternates: {
      canonical,
      languages: {
        ar: `${DOMAIN}/ar`,
        en: `${DOMAIN}/en`,
      },
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: data.title,
      description: data.desc,
      url: canonical,
      locale: data.locale,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: BRAND[locale],
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.desc,
      images: [ogImage],
    },
  };
}

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Page({ params }) {
  const locale = params.locale || "ar";
  const canonical = `${DOMAIN}/${locale}`;
  const ogImage = `${DOMAIN}/og/home-${locale}.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${DOMAIN}/#organization`,
        name: BRAND.en,
        alternateName: BRAND.ar,
        url: DOMAIN,
        logo: `${DOMAIN}/logo.png`,
      },
      {
        "@type": "LegalService",
        "@id": `${DOMAIN}/#legalservice`,
        name: BRAND[locale],
        url: canonical,
        image: ogImage,
        telephone: PHONE,
        areaServed: "Saudi Arabia",
        priceRange: "$$",
        parentOrganization: {
          "@id": `${DOMAIN}/#organization`,
        },
      },
    ],
  };
  return (
    <>
      <JsonLd data={structuredData} />
      <ScrollToStoredTarget />
      <Navbar />
      <WhatsAppBtn />
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
      <Footer />
    </>
  );
}
