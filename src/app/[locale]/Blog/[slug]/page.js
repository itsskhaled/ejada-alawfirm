import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";

import ar from "@/messages/ar.json";
import en from "@/messages/en.json"; // لازم يكون موجود عندك

const MESSAGES = { ar, en };

// ✅ توليد المسارات لكل اللغات من نفس المصدر
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
    }))
  );
}

export default async function BlogDetails({ params }) {
  const { locale, slug } = await params;

  const messages = MESSAGES[locale] ?? MESSAGES.ar;

  // ✅ يدعم الحالتين (BlogSection داخل BlogSection أو بدون)
  const blogSection =
    messages?.BlogSection?.BlogSection ??
    messages?.BlogSection ??
    null;

  const items = blogSection?.itemsBlogs ?? [];

  const blog = Array.isArray(items) ? items.find((b) => b.slug === slug) : null;
  if (!blog) return notFound();

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-35">
      <Navbar />

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
                      if (item.type === "paragraph") return <p key={idx}>{item.text}</p>;

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
  );
}
