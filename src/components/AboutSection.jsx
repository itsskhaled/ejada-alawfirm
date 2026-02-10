"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { BookCheck, FileText, Scale, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function AboutSection() {
    const t = useTranslations("AboutSection");
    const items = t.raw("itemsAbout");

    const ICONS = {
        "book-check": BookCheck,
        "users": Users,
        "file-text": FileText,
        "scale": Scale,
    };

    const FlashingCircleRef = useRef(null);
    const containerRef = useRef(null);
    const titleSectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);

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
                },
            });

            const titleSplit = new SplitText(titleRef.current, {
                type: "words",
                mask: "words",
            });

            const textSplit = new SplitText(textRef.current, {
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
                })
                .from(
                    textSplit.words,
                    {
                        y: 30,
                        opacity: 0,
                        ease: "power2.out",
                        duration: 0.6,
                        stagger: 0.015,
                    },
                    "<35%"
                );

            const mm = gsap.matchMedia();
            mm.add({
                isMobile: "(max-width: 640px)",
                isDesktop: "(min-width: 641px)",
            }, (context) => {
                const { isDesktop, isMobile } = context.conditions;
                const cards = gsap.utils.toArray(".about-card");
                cards.forEach((card) => {
                    const countEl = card.querySelector(".about-count");
                    const titleEl = card.querySelector(".about-card-title");
                    const iconEl = card.querySelector(".about-icon");


                    const endValue = Number(card.getAttribute("data-count") || "0");

                    if (countEl) countEl.textContent = "0";

                    const cardTL = gsap.timeline({
                        scrollTrigger: {
                            trigger: card,
                            start: isDesktop ? "top 90%" : "top 40%",
                            toggleActions: "play none none none",
                            // markers: true
                        },
                    });

                    cardTL
                        .from(card, {
                            y: 24,
                            opacity: 0,
                            duration: 0.5,
                            ease: "power2.out",
                        })
                        .from(
                            iconEl,
                            {
                                scale: 0.8,
                                opacity: 0,
                                duration: 0.35,
                                ease: "back.out(1.6)",
                            },
                            "<10%"
                        )
                        .from(
                            titleEl,
                            {
                                y: 10,
                                opacity: 0,
                                duration: 0.35,
                                ease: "power2.out",
                            },
                            "<10%"
                        )
                        // ✅ Count up 0 -> endValue
                        .to(
                            countEl,
                            {
                                duration: 1,
                                ease: "power1.out",
                                snap: { textContent: 1 },
                                textContent: endValue,
                            },
                            "<20%"
                        );
                });
            })


            // ✅ Cleanup SplitText (important)
            return () => {
                titleSplit.revert();
                textSplit.revert();
            };
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            id="about-section"
            className="w-full bg-[#0c0c0c] relative py-40"
        >
            
            <div className="flex flex-col w-full items-center gap-10">
                <div
                    ref={titleSectionRef}
                    className="flex gap-2 items-center text-center font-bold px-4 py-2 bg-white text-black rounded-xl select-none whitespace-nowrap overflow-hidden"
                >
                    <div
                        ref={FlashingCircleRef}
                        className="w-2 h-2 bg-[#f9bb00] rounded-full"
                    />
                    <h1>{t("titleSection")}</h1>
                </div>

                <div
                    ref={titleRef}
                    className="text-white text-center text-4xl md:text-5xl font-bold capitalize"
                >
                    <h1>{t("title")}</h1>
                </div>

                <div
                    ref={textRef}
                    className="text-white text-center text-2xl px-4 md:text-3xl md:w-2xl lg:w-6xl leading-relaxed capitalize"
                >
                    <p>{t("text")}</p>
                </div>

                <div className="flex gap-10 flex-wrap justify-center w-full my-10 px-4">
                    {items.map((item, i) => {
                        const Icon = ICONS[item.icon];
                        return (
                            <div
                                key={i}
                                className="about-card flex gap-3 items-center bg-white w-70 py-4 px-5 rounded-xl"
                                data-count={item.count}
                            >
                                {Icon && (
                                    <Icon className="about-icon bg-neutral-700 rounded-xl px-2 py-2 w-12 h-12 text-white" />
                                )}
                                <div>
                                    <h1 className="about-card-title text-[#f9bb00] font-bold text-xl capitalize">
                                        {item.title}
                                    </h1>
                                    <p className="about-count font-bold text-xl">0</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
