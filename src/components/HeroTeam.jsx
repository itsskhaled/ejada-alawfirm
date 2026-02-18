"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useTranslations } from "next-intl";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);
export default function HeroTeamSection() {
  const t = useTranslations("TeamHeroSection");

  const titleRef = useRef(null);
  const textRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline();

    const titleSplit = new SplitText(titleRef.current, {
      type: "words",
      mask: "words"
    })
    const textSplit = new SplitText(textRef.current, {
      type: "words",
      mask: "words"
    })
    tl.from(titleSplit.words, {
      y: 50,
      x: -50,
      opacity: 0,
      duration: .5,
      stagger: { each: 0.05 },
      ease: "power3.out"
    })
      .from(textSplit.words, {
        y: 50,
        x: 50,
        opacity: 0,
        duration: .5,
        stagger: { each: 0.02 },
        ease: "power3.out"
      }, "<50%")
  })
  return (
    <section
      className="w-full relative py-40 md:py-30"
    >
      <div className="flex flex-col items-center justify-center w-full px-10 gap-10 text-justify">
        <h1 ref={titleRef} className="text-4xl sm:text-4xl md:text-5xl lg:text-9xl md:w-7xl leading-relaxed text-center font-bold capitalize">
          {t("title")}
        </h1>
        <p ref={textRef} className="text-base md:text-2xl md:w-6xl leading-relaxed text-center capitalize">
          {t("text")}
        </p>
      </div>
    </section>
  );
}




