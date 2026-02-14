import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import HeroBlogSection from "@/components/HeroBlog";
import Navbar from "@/components/Navbar";

const DOMAIN = "https://your-domain.com"; // غيّره
const BRAND = {
  ar: "إجادة للمحاماة والاستشارات القانونية",
  en: "Ejada Law Firm",
};

export async function generateMetadata({ params }) {
  const { locale } = (await params) || "ar";

  const meta = {
    ar: {
      title: `المدونة القانونية | ${BRAND.ar}`,
      description:
        "مقالات قانونية تساعدك على فهم الأنظمة والإجراءات، ونصائح عملية لحماية حقوقك واتخاذ قرارات قانونية صحيحة بثقة.",
      ogLocale: "ar_SA",
    },
    en: {
      title: `Legal Blog | ${BRAND.en}`,
      description:
        "Legal articles and practical guidance to help you understand procedures, protect your rights, and make informed decisions with confidence.",
      ogLocale: "en_US",
    },
  };

  const m = meta[locale] || meta.ar;

  const canonical = `${DOMAIN}/${locale}/blog`;
  const ogImage = `${DOMAIN}/og/blog-${locale}.jpg`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical,
      languages: {
        ar: `${DOMAIN}/ar/blog`,
        en: `${DOMAIN}/en/blog`,
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
