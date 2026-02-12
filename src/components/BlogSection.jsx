"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import imageBlog from "@/app/Image/imageBlog.jpg";

export default function BlogSection() {
  const t = useTranslations("BlogSection");
  const items = t.raw("itemsBlogs");

  return (
    <section className="w-full py-16 md:py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-20">
          {items.map((item, i) => (
            <article
              key={i}
              className="group overflow-hidden rounded-2xl bg-neutral-200 shadow-sm border border-neutral-200/60"
            >
              {/* Top area (image placeholder) */}
              <div className="h-44 sm:h-52 lg:h-56 bg-neutral-300">
                <Image src={imageBlog} alt="imageBlog" className="w-full h-full object-cover" />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex flex-col gap-2">
                <h3 className="font-bold text-base sm:text-lg leading-snug wrap-break-words">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed wrap-break-words line-clamp-3">
                  {item.excerpt}
                </p>

                <div className="pt-2">
                  <Link
                    href={`Blog/${item.slug}`}
                    className="inline-flex items-center text-sm sm:text-base font-bold underline underline-offset-4 hover:opacity-80"
                  >
                    {item.more}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
