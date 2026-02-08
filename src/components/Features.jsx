"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";
import { CheckCheck, Headset, ScanHeart, SquareLibrary, UserStar } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger)
export default function FeaturesSection() {
    const t = useTranslations("FeaturesSection");
    const items = t.raw("itemsFeature");
    const ICONS = {
        "user-star": UserStar,
        "scan-heart": ScanHeart,
        "check-check": CheckCheck,
        "square-library": SquareLibrary,
        "head-set": Headset
    };

    const FlashingCircleRef = useRef(null);
    const containerRef = useRef(null);
    const titleSectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
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

            const textSplit = new SplitText(textRef.current, {
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
                )
            if (isDesktop) {
                tl.from(cardsRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: .7,
                    stagger: { each: .04 },
                    ease: "power2.out"
                }, "<")
            } else if (isMobile) {
                cardsRef.current.forEach((card) => {
                    gsap.from(card, {
                        y: 50,
                        opacity: 0,
                        duration: 0.7,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 40%",
                            toggleActions: "play none none none",
                            markers: true
                        },
                    });
                });
            }

        })


    })
    return (
        <section ref={containerRef} className="w-full min-h-screen relative py-40 px-10 md:px-30">
            <div>
                <div className="flex flex-wrap justify-center lg:justify-between gap-10">
                    <div className="w-full max-w-xl flex flex-col gap-5">
                        <div ref={titleSectionRef} className="inline-flex items-center gap-2 text-white bg-black rounded-xl select-none px-4 py-2 self-start whitespace-nowrap overflow-hidden">
                            <div ref={FlashingCircleRef} className="w-2 h-2 bg-[#f9bb00] rounded-full" />
                            <h1 className="font-bold">{t("titleSection")}</h1>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h1 ref={titleRef} className="text-2xl sm:text-2xl md:text-4xl lg:text-6xl font-bold capitalize">{t("title")}</h1>
                            <p ref={textRef} className="text-2xs md:text-base text-neutral-600 leading-5">{t("subTitle")}</p>
                        </div>
                    </div>
                    <div>
                        {items.map((item, i) => {
                            const Icon = ICONS[item.icon];
                            return (
                                <div ref={el => cardsRef.current[i] = el} key={i} className="my-5 w-70 md:w-150 h-40 md:h-35 bg-black rounded-xl py-6 px-6 select-none">
                                    <div className="flex gap-2 md:gap-5 items-center">
                                        {Icon && <Icon className="px-2 py-2 w-10 md:w-12 h-10 md:h-12 text-[#f9bb00]" />}
                                        <h1 className="text-white text-xl md:text-2xl font-bold capitalize">{item.title}</h1>
                                    </div>
                                    <p className="text-white px-6 text-xs md:text-base">{item.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
