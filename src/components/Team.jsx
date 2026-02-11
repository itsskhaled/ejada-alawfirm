"use client";

import { useRef } from "react";
import { useTranslations } from "use-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function TeamSection() {
    const t = useTranslations("TeamSection");
    const tGlobal = useTranslations();

    const rawItemsTeam = tGlobal.raw("itemsTeam");
    const TEAM = Array.isArray(rawItemsTeam) ? rawItemsTeam : [];


    const containerRef = useRef(null);
    const titleSectionRef = useRef(null);
    const FlashingCircleRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);

    const cardRef = useRef([]);

    useGSAP(() => {
        const ctx = gsap.context(() => {
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
                },
            });

            const titleSplit = new SplitText(titleRef.current, { type: "words" });
            const textSplit = new SplitText(textRef.current, { type: "words" });

            tl.from(titleSectionRef.current, {
                width: 0,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            })
                .from(
                    titleSplit.words,
                    {
                        y: 40,
                        opacity: 0,
                        duration: 0.9,
                        stagger: 0.06,
                        ease: "power2.out",
                    },
                    "<50%"
                )
                .from(
                    textSplit.words,
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.6,
                        stagger: 0.015,
                        ease: "power2.out",
                    },
                    "<35%"
                );

            const slides = containerRef.current.querySelectorAll(".swiper-slide");

            gsap.set(slides, { xPercent: 100, opacity: 0 });

            tl.fromTo(
                containerRef.current.querySelectorAll(".swiper-slide"),
                { xPercent: 100, opacity: 0 },
                {
                    xPercent: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    immediateRender: false,
                },
                "<20%"
            );

            return () => {
                titleSplit.revert();
                textSplit.revert();
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="team-section" className="w-full bg-[#0c0c0c] relative py-35">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-col w-full items-center gap-5">
                    <div
                        ref={titleSectionRef}
                        className="flex gap-2 items-center text-center font-bold px-4 py-2 bg-white text-black rounded-xl select-none whitespace-nowrap overflow-hidden"
                    >
                        <div ref={FlashingCircleRef} className="w-2 h-2 bg-[#f9bb00] rounded-full" />
                        <h1>{t("titleSection")}</h1>
                    </div>

                    <div ref={titleRef} className="text-white text-center text-4xl md:text-5xl font-bold capitalize">
                        <h1>{t("title")}</h1>
                    </div>

                    <div ref={textRef} className="text-white/80 text-center text-xl md:text-2xl lg:text-3xl max-w-3xl leading-relaxed capitalize">
                        <p>{t("text")}</p>
                    </div>
                </div>

                <div className="mt-12">
                    <Swiper
                        modules={[Navigation, A11y]}
                        spaceBetween={20}
                        grabCursor
                        navigation={{ prevEl: ".team-prev", nextEl: ".team-next" }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {TEAM.map((member, i) => (
                            <SwiperSlide key={member?.id ?? i}>
                                <TeamCard member={member} cardRef={(el) => (cardRef.current[i] = el)} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="mt-5 flex items-center justify-center gap-4">
                        <button type="button" aria-label="Next" className="team-next w-11 h-11 rounded-xl bg-[#f9bb00] text-black flex items-center justify-center shadow active:scale-95 transition cursor-pointer">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <button type="button" aria-label="Prev" className="team-prev w-11 h-11 rounded-xl bg-[#f9bb00] text-black flex items-center justify-center shadow active:scale-95 transition cursor-pointer">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TeamCard({ member }) {
    const positions = Array.isArray(member?.position)
        ? member.position
        : member?.position
            ? [member.position]
            : [];

    const photoSrc = TEAM_PHOTOS[member?.id]; 

    return (
        <article className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:bg-white/10 transition">
            <div className="relative w-full h-72 sm:h-80 bg-white/5 overflow-hidden">
                {photoSrc ? (
                    <Image
                        src={photoSrc}
                        alt={member?.name || "team member"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={member?.id === 1}
                    />
                ) : null}
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-white">{member?.name}</h3>

                <div className="mt-2 flex flex-wrap gap-2">
                    {positions.map((pos, i) => (
                        <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10"
                        >
                            {pos}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}

const TEAM_PHOTOS = {
    1: team1,
    2: team2,
    3: team3,
    4: team4,
    5: team5,
    6: team6,
    7: team7,
    8: team8,
    9: team9,
    10: team10,
    11: team11,
    12: team12,
    13: team13,
};
