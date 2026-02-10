"use client";

import { useRef } from "react";
import { useTranslations } from "use-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation"; // عادي تتركه، بس احنا بنستخدم أزرارنا
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEAM = [
    {
        id: 1,
        name: "أحمد الزيان",
        role: "محامٍ / قضايا تجارية",
        bio: "خبرة في تمثيل الشركات أمام الجهات الرسمية.",
        exp: "8+ سنوات",
        location: "غزة",
    },
    {
        id: 2,
        name: "سارة النجار",
        role: "محامية / أحوال شخصية",
        bio: "متخصصة في قضايا الأسرة والمواريث وإجراءات المحاكم الشرعية",
        exp: "6+ سنوات",
        location: "خانيونس",
    },
    {
        id: 3,
        name: "محمد عوض",
        role: "مستشار قانوني",
        bio: "استشارات قانونية للشركات والأفراد مع تركيز على النزاعات والتحكيم.",
        exp: "10+ سنوات",
        location: "الوسطى",
    },
    {
        id: 4,
        name: "هبة سلامة",
        role: "محامية / قضايا عمالية",
        bio: "متابعة القضايا العمالية وصياغة لوائح الدعاوى وأصحاب العمل",
        exp: "5+ سنوات",
        location: "رفح",
    },
];


gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)
export default function TeamSection() {
    const t = useTranslations("TeamSection");

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
                )
            const slides = containerRef.current.querySelectorAll(".swiper-slide");

            // 🔴 نخفي الكروت فورًا
            gsap.set(slides, {
                xPercent: 100,
                opacity: 0,
            });
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
            )

            return () => {
                titleSplit.revert();
                textSplit.revert();
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);


    return (
        <section
            ref={containerRef}
            id="team-section"
            className="w-full bg-[#0c0c0c] relative py-35"
        >
            <div className="mx-auto max-w-7xl px-4">

                <div className="flex flex-col w-full items-center gap-5">
                    <div ref={titleSectionRef} className="flex gap-2 items-center text-center font-bold px-4 py-2 bg-white text-black rounded-xl select-none whitespace-nowrap overflow-hidden">
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
                        navigation={{
                            prevEl: ".team-prev",
                            nextEl: ".team-next",
                        }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {TEAM.map((member, i) => (
                            <SwiperSlide key={i}>
                                <TeamCard member={member} cardRef={(el) => { cardRef.current[i] = el }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>


                    <div className="mt-5 flex items-center justify-center gap-4">

                        <button
                            type="button"
                            aria-label="Next"
                            className="
      team-next
      w-11 h-11 rounded-xl
      bg-[#f9bb00] text-black
      flex items-center justify-center
      shadow active:scale-95 transition cursor-pointer
    "
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M9 6l6 6-6 6"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            aria-label="Prev"
                            className="
      team-prev
      w-11 h-11 rounded-xl
      bg-[#f9bb00] text-black
      flex items-center justify-center
      shadow active:scale-95 transition cursor-pointer
    "
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M15 18l-6-6 6-6"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}


function TeamCard({ member }) {
    return (
        <article
            className="
        rounded-2xl overflow-hidden
        border border-white/10 bg-white/5
        backdrop-blur-xl shadow-lg
        hover:bg-white/10 transition
      "
        >
            <div className="relative w-full h-72 sm:h-80 bg-white/5" />

            <div className="p-5">
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-sm text-white/80 mt-1">{member.role}</p>

                <p className="text-sm text-white/70 mt-3 leading-6 line-clamp-3">
                    {member.bio}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
                        {member.exp}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10">
                        {member.location}
                    </span>
                </div>
            </div>
        </article>
    );
}
