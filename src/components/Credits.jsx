"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";

import imagePhoto1 from "@/app/Image/Credits/1.webp";
import imagePhoto2 from "@/app/Image/Credits/2.webp";
import imagePhoto3 from "@/app/Image/Credits/3.png";
import imagePhoto4 from "@/app/Image/Credits/4.png";
import imagePhoto5 from "@/app/Image/Credits/5.png";
import imagePhoto6 from "@/app/Image/Credits/6.png";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger)
export default function CreditsSection() {
    const t = useTranslations("CreditsSection");

    const containerRef = useRef(null);
    const FlashingCircleRef = useRef(null);
    const titleSectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const creditsRef = useRef([]);

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
                    start: isDesktop ? "top 70%" : "top 10%",
                    toggleActions: "play none none none",
                    // markers: true
                },
            });

            const titleSplit = new SplitText(titleRef.current, {
                type: "lines",
                mask: "lines"
            })
            const textSplit = new SplitText(textRef.current, {
                type: "words",
                mask: "words"
            })

            tl
                .from(titleSectionRef.current, {
                    width: 0,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                })
                .from(titleSplit.lines, {
                    y: 80,
                    opacity: 0,
                    duration: .5,
                    stagger: .05,
                    ease: "power2.out"
                }, "<50%")
                .from(textSplit.words, {
                    y: 80,
                    opacity: 0,
                    duration: .5,
                    stagger: .05,
                    ease: "power2.out"
                }, "<")
        })
    })
    return (
        <section ref={containerRef} className="w-full bg-neutral-200 py-35 px-5">
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
                <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-[#f9bb00] text-center leading-relaxed">{t("title")}</h1>
                <p ref={textRef} className="text-xl md:text-2xl text-center">{t("text")}</p>
            </div>

            <div className="w-full flex flex-wrap gap-5 justify-center my-20">
                {credits.map((credit, i) => {
                    return (
                        <div
                            key={i}
                            className="w-120 h-40 md:grayscale transition-all duration-300 hover:grayscale-0"
                        >
                            <Image
                                src={credit.image}
                                alt={credit.alt}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

const credits = [
    { id: 1, image: imagePhoto1, alt: "" },
    { id: 2, image: imagePhoto2, alt: "" },
    { id: 3, image: imagePhoto3, alt: "" },
    { id: 4, image: imagePhoto4, alt: "" },
    { id: 5, image: imagePhoto5, alt: "" },
    { id: 6, image: imagePhoto6, alt: "" },
]