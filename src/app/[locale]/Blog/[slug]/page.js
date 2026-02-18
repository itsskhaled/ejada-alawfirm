import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

import ar from "@/messages/ar.json";
import en from "@/messages/en.json";
import Footer from "@/components/Footer";
import WhatsAppBtn from "@/components/WhatsAppBtn";

const MESSAGES = { ar, en };

export function generateStaticParams() {
  const items =
    ar?.BlogSection?.BlogSection?.itemsBlogs ??
    ar?.BlogSection?.itemsBlogs ??
    [];

  const locales = ["ar", "en"];

  if (!Array.isArray(items)) return [];

  return locales.flatMap((locale) =>
    items.map((item) => ({
      locale,
      slug: item.slug,
    })),
  );
}

// ===== SEO ADDITIONS ONLY =====
const DOMAIN = "https://your-domain.com";
const BRAND = {
  ar: "إجادة للمحاماة والاستشارات القانونية",
  en: "Ejada Law Firm",
};

function getExcerpt(blog) {
  if (blog?.excerpt) return String(blog.excerpt).trim().slice(0, 160);

  if (Array.isArray(blog?.content)) {
    const firstP = blog.content.find((b) => b?.type === "paragraph" && b?.text);
    if (firstP?.text) return String(firstP.text).trim().slice(0, 160);
  }

  if (blog?.text) return String(blog.text).trim().slice(0, 160);

  return "";
}

export async function generateMetadata({ params }) {
  const { locale, slug } = params;

  const messages = MESSAGES[locale] ?? MESSAGES.ar;

  const blogSection =
    messages?.BlogSection?.BlogSection ?? messages?.BlogSection ?? null;

  const items = blogSection?.itemsBlogs ?? [];
  const blog = Array.isArray(items) ? items.find((b) => b.slug === slug) : null;

  if (!blog) return {};

  const title = `${blog.title} | ${BRAND[locale] || BRAND.ar}`;
  const description =
    getExcerpt(blog) ||
    (locale === "en"
      ? "Legal article and practical guidance from our legal team."
      : "مقال قانوني وإرشادات عملية من فريقنا القانوني.");

  const canonical = `${DOMAIN}/${locale}/blog/${slug}`;

  const ogImage =
    blog.ogImage || blog.cover || `${DOMAIN}/og/blog-${locale}.jpg`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ar: `${DOMAIN}/ar/blog/${slug}`,
        en: `${DOMAIN}/en/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: locale === "en" ? "en_US" : "ar_SA",
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
// ===== END SEO ADDITIONS =====

export default async function BlogDetails({ params }) {
  const { locale, slug } = await params;

  const messages = MESSAGES[locale] ?? MESSAGES.ar;

  const blogSection =
    messages?.BlogSection?.BlogSection ?? messages?.BlogSection ?? null;

  const items = blogSection?.itemsBlogs ?? [];

  const blog = Array.isArray(items) ? items.find((b) => b.slug === slug) : null;
  if (!blog) return notFound();

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-35">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blog.title,
              description: blog.excerpt
                ? String(blog.excerpt).trim()
                : Array.isArray(blog.content)
                  ? blog.content.find((b) => b?.type === "paragraph" && b?.text)
                      ?.text || ""
                  : blog.text || "",
              inLanguage: locale,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${DOMAIN}/${locale}/blog/${slug}`,
              },
              image:
                blog.ogImage || blog.cover || `${DOMAIN}/og/blog-${locale}.jpg`,
              publisher: {
                "@type": "Organization",
                name: BRAND.en,
                alternateName: BRAND.ar,
                url: DOMAIN,
                logo: {
                  "@type": "ImageObject",
                  url: `${DOMAIN}/logo.png`,
                },
              },
              ...(blog.author
                ? { author: { "@type": "Person", name: blog.author } }
                : {}),
              ...(blog.datePublished
                ? { datePublished: blog.datePublished }
                : {}),
              ...(blog.dateModified
                ? { dateModified: blog.dateModified }
                : blog.datePublished
                  ? { dateModified: blog.datePublished }
                  : {}),
            }),
          }}
        />

        <Navbar />
        <WhatsAppBtn />

        <h1 className="text-3xl font-bold py-10">{blog.title}</h1>

        <div className="mt-8 space-y-5 leading-relaxed text-neutral-800">
          {Array.isArray(blog.content) ? (
            blog.content.map((block, i) => {
              if (block.type === "paragraph") {
                return <p key={i}>{block.text}</p>;
              }

              if (block.type === "heading") {
                return (
                  <h2 key={i} className="text-xl font-bold mt-10">
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "list") {
                return (
                  <ul key={i} className="list-disc pr-6 space-y-2">
                    {block.items?.map((li, idx) => (
                      <li key={idx}>{li}</li>
                    ))}
                  </ul>
                );
              }

              if (block.type === "qa") {
                return (
                  <div key={i} className="mt-10">
                    <div className="bg-neutral-200 px-4 py-2 font-bold rounded-md">
                      {block.question}
                    </div>

                    <div className="mt-6 space-y-4">
                      {block.answer?.map((item, idx) => {
                        if (item.type === "paragraph")
                          return <p key={idx}>{item.text}</p>;

                        if (item.type === "heading")
                          return (
                            <h3 key={idx} className="font-bold text-lg mt-6">
                              {item.text}
                            </h3>
                          );

                        if (item.type === "list")
                          return (
                            <ul key={idx} className="list-disc pr-6 space-y-2">
                              {item.items?.map((x, j) => (
                                <li key={j}>{x}</li>
                              ))}
                            </ul>
                          );

                        return null;
                      })}
                    </div>
                  </div>
                );
              }

              return null;
            })
          ) : (
            <p>{blog.content ?? blog.text}</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
