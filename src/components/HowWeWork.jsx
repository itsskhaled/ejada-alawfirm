"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";
import { BookOpenText, FileCheck, HandHeart, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
export default function HowWeWorkSection() {
    const t = useTranslations("HowWeWorkSerction");
    const items = t.raw("itemsHowWeWork");
    const ICONS = {
        "file-check": FileCheck,
        "bookopen-text": BookOpenText,
        "hand-heart": HandHeart,
        "trophy": Trophy
    };

    const containerRef = useRef(null);
    const FlashingCircleRef = useRef(null);
    const titleSectionRef = useRef(null);
    const titleRef = useRef(null);
    const subTitleRef = useRef(null);
    const superTitleRef = useRef(null);
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
        const mm = gsap.matchMedia();
        mm.add({
            isMobile: "(max-width: 640px)",
            isDesktop: "(min-width: 641px)",
        }, (context) => {
            const { isMobile, isDesktop } = context.conditions;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none",
                    // markers: true
                }
            });
            const titleSplit = new SplitText(titleRef.current, {
                type: "words",
                mask: "words",
            });

            const subTitleSplit = new SplitText(subTitleRef.current, {
                type: "words",
                mask: "words",
            });
            const superTitleSplit = new SplitText(superTitleRef.current, {
                type: "words",
                mask: "words",
            });
            tl.from(titleSectionRef.current, {
                width: 0,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            })
                .from(titleSplit.words, {
                    y: 50,
                    opacity: 0,
                    ease: "power2.out",
                    duration: 0.9,
                    stagger: 0.06,
                }, "<30%")
                .from(subTitleSplit.words, {
                    y: 50,
                    opacity: 0,
                    ease: "power2.out",
                    duration: 0.9,
                    stagger: 0.06,
                }, "<50%")
            if (isDesktop) {
                tl.from(cardsRef.current, {
                    scale: 0,
                    opacity: 0,
                    duration: 1,
                    stagger: { each: .05, from: "random" },
                    ease: "back.out",
                }, "<")
            } else if (isMobile) {

                cardsRef.current.forEach((card) => {
                    gsap.from(card, {
                        scale: 0,
                        opacity: 0,
                        duration: 1,
                        stagger: { each: .05 },
                        ease: "back.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 30%",
                            toggleActions: "play none none none",
                            // markers: true
                        }
                    }, "<")
                })
            }
            tl.from(superTitleSplit.words, {
                y: 50,
                opacity: 0,
                ease: "power2.out",
                duration: 0.9,
                stagger: 0.06,
            }, "<50%")

        })
    })
    return (
        <section ref={containerRef} className="w-full py-35 px-10 md:px-20">
            <div>
                <div className="flex flex-wrap justify-center lg:justify-between gap-10">
                    <div className="w-full max-w-xl flex flex-col gap-5">
                        <div ref={titleSectionRef} className="inline-flex items-center gap-2 text-white bg-black rounded-xl select-none px-4 py-2 self-start whitespace-nowrap overflow-hidden">
                            <div ref={FlashingCircleRef} className="w-2 h-2 bg-[#f9bb00] rounded-full" />
                            <h1 className="font-bold">{t("titleSection")}</h1>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h1 ref={titleRef} className="text-2xl sm:text-2xl md:text-4xl lg:text-6xl font-bold capitalize">{t("title")}</h1>
                            <p ref={subTitleRef} className="text-2xs md:text-base text-neutral-600 leading-5 capitalize">{t("subTitle")}</p>
                            <p ref={superTitleRef} className="text-2xs md:text-base text-neutral-600 leading-5 capitalize">{t("superTitle")}</p>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-wrap justify-center items-center gap-10 md:w-150">
                            {items.map((item, i) => {
                                const Icon = ICONS[item.icon];
                                return (
                                    <div ref={el => cardsRef.current[i] = el} key={i} className="w-60 h-60 border rounded-xl px-4 py-4 relative select-none">
                                        <div className="flex justify-center items-center w-15 h-15 bg-neutral-600 rounded-xl">
                                            {Icon && <Icon className="px-2 py-2 w-10 md:w-12 h-10 md:h-12 text-white" />}
                                        </div>
                                        <div className="absolute bottom-5">
                                            <h1 className="text-xl md:text-2xl font-bold capitalize px-2">{item.title}</h1>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}