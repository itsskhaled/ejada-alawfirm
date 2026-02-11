"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import Image from "next/image";

import team1 from "@/app/Image/Team/1.png";
import team2 from "@/app/Image/Team/2.png";
import team3 from "@/app/Image/Team/3.png";
import team4 from "@/app/Image/Team/4.png";
import team5 from "@/app/Image/Team/5.png";
import team6 from "@/app/Image/Team/6.png";
import team7 from "@/app/Image/Team/7.png";
import team8 from "@/app/Image/Team/8.png";
import team9 from "@/app/Image/Team/9.png";
import team10 from "@/app/Image/Team/10.png";
import team11 from "@/app/Image/Team/11.png";
import team12 from "@/app/Image/Team/11.png";
import team13 from "@/app/Image/Team/11.png";

gsap.registerPlugin(useGSAP);

export default function HeroTeamSection() {
  const t = useTranslations("TeamHeroSection");

  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const prefersReduced =
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      if (prefersReduced) return;

      const build = () => {
        tweenRef.current?.kill();

        const group = track.querySelector(".group");
        if (!group) return;

        // ✅ عرض المجموعة الأولى فقط (يشمل gap)
        const distance = group.scrollWidth;
        if (!distance) return;

        gsap.set(track, { x: 0, force3D: true });

        tweenRef.current = gsap.to(track, {
          x: -distance,
          duration: distance / 90, // ✅ السرعة: زيد الرقم = أبطأ / قلله = أسرع
          ease: "none",
          repeat: -1,
          force3D: true,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % -distance),
          },
        });
      };

      // ✅ بناء مضمون بعد ما الـ layout يستقر
      requestAnimationFrame(build);
      setTimeout(build, 200);
      setTimeout(build, 800);

      window.addEventListener("resize", build);
      return () => {
        window.removeEventListener("resize", build);
        tweenRef.current?.kill();
      };
    },
    { scope: wrapRef }
  );

  return (
    <section
      ref={wrapRef}
      className="w-full relative py-40 md:py-30 overflow-x-hidden"
    >
      <div className="flex flex-col items-center w-full px-10">
        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-9xl md:w-6xl leading-relaxed text-center font-bold">
          {t("title")}
        </h1>
        <p className="text-xs md:text-2xl md:w-6xl leading-relaxed text-center">
          {t("text")}
        </p>
      </div>

      {/* ✅ Wrapper */}
      <div className="mt-10 overflow-hidden" dir="ltr">
        {/* ✅ Track */}
        <div
          ref={trackRef}
          className="track flex flex-nowrap will-change-transform"
        >
          {/* ✅ Group 1 */}
          <div className="group flex flex-nowrap gap-5">
            {TeamMember.map((item, i) => (
              <Card key={item.id} item={item} priority={i < 3} />
            ))}
          </div>

          {/* ✅ Group 2 (duplicate) */}
          <div className="group flex flex-nowrap gap-5 mx-5" aria-hidden="true">
            {TeamMember.map((item) => (
              <Card key={`dup-${item.id}`} item={item} priority={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ item, priority }) {
  return (
    <div className="min-w-[400px] h-[400px] relative overflow-hidden bg-black rounded-2xl">
      <Image
        src={item.image}
        alt={item.alt || "team member"}
        fill
        className="object-cover"
        priority={priority}
        sizes="400px"
      />
    </div>
  );
}

const TeamMember = [
  { id: 1, image: team1, alt: "" },
  { id: 2, image: team2, alt: "" },
  { id: 3, image: team3, alt: "" },
  { id: 4, image: team4, alt: "" },
  { id: 5, image: team5, alt: "" },
  { id: 6, image: team6, alt: "" },
  { id: 7, image: team7, alt: "" },
  { id: 8, image: team8, alt: "" },
  { id: 9, image: team9, alt: "" },
  { id: 10, image: team10, alt: "" },
  { id: 11, image: team11, alt: "" },
  { id: 12, image: team12, alt: "" },
  { id: 13, image: team13, alt: "" },
];
