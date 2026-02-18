"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import imageBlog from "@/app/Image/imageBlog.jpg";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function BlogSection() {
  const t = useTranslations("BlogSection");
  const items = t.raw("itemsBlogs");

  const containerRef = useRef(null);
  const postsRef = useRef([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({
      isMobile: "(max-width: 640px)",
      isDesktop: "(min-width: 641px)",
    }, (context) => {
      const { isMobile, isDesktop } = context.conditions;
      if (isDesktop) {

        gsap.from(postsRef.current, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: { each: 0.1 },
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "+=100%",
            // markers: true
          }
        })
      } else if (isMobile) {
        postsRef.current.forEach((card) => {
          gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: { each: 0.1 },
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              end: "+=100%",
              // markers: true
            }
          })
        })
      }
    })
  })

  return (
    <section ref={containerRef} className="w-full py-20 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-20">
          {items.map((item, i) => (
            <article
              key={i}
              ref={el => postsRef.current[i] = el}
              className="group overflow-hidden rounded-2xl bg-neutral-200 shadow-sm border border-neutral-200/60"
            >
              <div className="h-44 sm:h-52 lg:h-56 bg-neutral-300">
                <Image src={imageBlog} alt="imageBlog" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 sm:p-5 flex flex-col gap-2">
                <h3 className="font-bold text-base sm:text-lg leading-snug wrap-break-words">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed wrap-break-words line-clamp-3">
                  {item.excerpt}
                </p>

                <div className="pt-2">
                  <Link
                    href={`blog/${item.slug}`}
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
