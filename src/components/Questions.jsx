"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function QuestionsSection() {
    const t = useTranslations("QuestionsSection");
    const items = t.raw("itemsQuestions");

    const [activeId, setActiveId] = useState(null);

    const toggle = (id) => setActiveId((prev) => (prev === id ? null : id));

    const containerRef = useRef(null);
    const FlashingCircleRef = useRef(null);
    const titleSectionRef = useRef(null);
    const questionsRef = useRef([]);

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
        const mm = gsap.matchMedia();

        mm.add({
            isMobile: "(max-width: 640px)",
            isDesktop: "(min-width: 641px)",
        }, (context) => {
            const { isMobile, isDesktop } = context.conditions;
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: isDesktop ? "top 70%" : "top 20%",
                    toggleActions: "play none none none",
                    // markers: true
                }
            });
            tl.from(titleSectionRef.current, {
                width: 0,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            })
                .from(questionsRef.current, {
                    y: 40,
                    opacity: 0,
                    ease: "power2.out",
                    duration: 0.9,
                    stagger: 0.06,
                })

        })
    })
    return (
        <section ref={containerRef} className="w-full relative py-16 md:py-35">
            <div className="mx-auto max-w-4xl px-4">
                <div className="flex flex-col items-center gap-10 mb-10 md:mb-14">
                    <div ref={titleSectionRef} className="flex gap-2 items-center font-bold px-4 py-2 bg-[#404250] text-white rounded-xl select-none whitespace-nowrap">
                        <div ref={FlashingCircleRef} className="w-2 h-2 bg-[#f9bb00] rounded-full" />
                        <h1>{t("titleSection")}</h1>
                    </div>
                </div>


                <div className="flex flex-col gap-2">
                    {items.map((item, i) => {
                        const isOpen = activeId === item.id;

                        return (
                            <div ref={el => questionsRef.current[i] = el} key={i} className="border-b border-black/10">

                                <button
                                    type="button"
                                    onClick={() => toggle(item.id)}
                                    className="
                    relative z-10
                    w-full flex items-center justify-between gap-4
                    px-4 sm:px-5 py-4
                    text-start font-bold text-black
                    bg-white
                    cursor-pointer touch-manipulation
                    min-h-16
                    active:opacity-80
                  "
                                >
                                    <span className="flex-1">{item.Question}</span>


                                    <span
                                        className="
                      relative w-7 h-7 shrink-0
                      rounded-md
                      flex items-center justify-center
                      transition-transform duration-300
                      pointer-events-none
                    "
                                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                                    >
                                        <span className="absolute inset-x-1 top-1/2 h-0.5 bg-black -translate-y-1/2" />
                                        <span className="absolute inset-y-1 left-1/2 w-0.5 bg-black -translate-x-1/2" />
                                    </span>
                                </button>


                                <div
                                    className={`
                    px-4 sm:px-5 overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0 pb-0"}
                  `}
                                >
                                    <p className="text-black/80 leading-relaxed pt-2">
                                        {item.Answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
