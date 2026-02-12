"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import logo from "@/app/Image/LogoTeam.png";
import { BookCheck, FileCheck, SaudiRiyal } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
export default function OurNumberSection() {
  const t = useTranslations("OurNumberSection");
  const items = t.raw("itemsNumber");

  const ICONS = {
    "saudi-riyal": SaudiRiyal,
    "file-check": FileCheck,
    "book-check": BookCheck,
  };

  const FlashingCircleRef = useRef(null);
  const containerRef = useRef(null);
  const titleSectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(
      FlashingCircleRef.current,
      { scale: 1, opacity: 0.5 },
      {
        scale: 1.5,
        opacity: 1,
        repeat: -1,
        duration: 0.6,
        ease: "sine.inOut",
        yoyo: true,
      }
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
        // markers: true
      },
    });

    const titleSplit = new SplitText(titleRef.current, {
      type: "words",
      mask: "words",
    });

    tl
      .from(titleSectionRef.current, {
        width: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(titleSplit.words, {
        y: 40,
        opacity: 0,
        ease: "power2.out",
        duration: 0.9,
        stagger: 0.06,
      }, "<50%")
    const mm = gsap.matchMedia();
    mm.add({
      isMobile: "(max-width: 640px)",
      isDesktop: "(min-width: 641px)",
    }, (context) => {
      const { isDesktop, isMobile } = context.conditions;
      if (isDesktop) {
        tl.from(cardsRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          stagger: { each: .05 },
          ease: "back.out"
        }, "<")
      } else if (isMobile) {
        cardsRef.current.forEach((card) => {
          gsap.from(card, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: { each: .05 },
            ease: "back.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
              // markers: true
            }
          })
        })
      }
    })
  })

  return (
    <section ref={containerRef} className="w-full relative overflow-hidden py-16 md:py-40">
      <Image
        src={logo}
        alt="logo"
        fill
        priority
        className="object-cover"
      />
      <div className="flex flex-col w-full items-center gap-6 md:gap-10 relative z-10">
        <div ref={titleSectionRef} className="flex gap-2 items-center text-center font-bold px-4 py-2 bg-[#404250] text-white rounded-xl select-none whitespace-nowrap overflow-hidden">
          <div ref={FlashingCircleRef} className="w-2 h-2 bg-[#f9bb00] rounded-full" />
          <h1>{t("titleSection")}</h1>
        </div>

        <div ref={titleRef} className="text-center text-4xl md:text-5xl font-bold capitalize">
          <h1>{t("title")}</h1>
        </div>
      </div>

      <div className="relative mt-10 md:mt-14 px-4">

        <div
          className="
            relative z-10
            grid gap-4 sm:gap-5
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            max-w-6xl mx-auto
          "
        >
          {items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <div
                ref={el => cardsRef.current[i] = el}
                key={i}
                className="
                  bg-[#404250]  rounded-2xl text-white
                  flex flex-col justify-center items-center text-center gap-4
                  px-5 py-8
                  min-h-55 sm:min-h-60 md:min-h-65
                "
              >
                {Icon && (
                  <Icon className="w-12 h-12 md:w-14 md:h-14 text-[#f9bb00]" />
                )}

                <p className="text-4xl sm:text-5xl font-bold leading-none">
                  {item.number}
                </p>

                <p className="text-lg sm:text-xl md:text-2xl leading-snug">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
