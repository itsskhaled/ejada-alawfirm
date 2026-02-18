"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import AboutPhoto1 from "../app/Image/About1.png";
import AboutPhoto2 from "../app/Image/About2.png";
import AboutPhoto3 from "../app/Image/About3.jpg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);
export default function HeroAboutSection() {
    const t = useTranslations("HeroAboutSection");

    const titleSectionRef = useRef(null);
    const FlashingCircleRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const subTextRef = useRef(null);

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

        const tl = gsap.timeline();

        const titleSplit = new SplitText(titleRef.current, {
            type: "words",
            mask: "words",
        });

        const textSplit = new SplitText(textRef.current, {
            type: "words",
            mask: "words",
        });
        const subTextSplit = new SplitText(subTextRef.current, {
            type: "words",
            mask: "words",
        });
        const ImageRef = gsap.utils.toArray(".ImageAboutRef");

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
                    stagger: 0.05,
                },
                "<25%"
            )
            .from(
                subTextSplit.words,
                {
                    y: 30,
                    opacity: 0,
                    ease: "power2.out",
                    duration: 0.6,
                    stagger: 0.05,
                },
                "<50%"
            )
            .from(ImageRef, {
                width: 0,
                opacity: 0,
                duration: 1,
                stagger: .1,
                ease: "power3.out"
            }, "<")


    })
    return (
        <section className="w-full relative px-5 py-35">
            <div className="flex flex-col w-full items-center gap-5">
                <div
                    ref={titleSectionRef}
                    className="flex gap-2 items-center text-center font-bold px-4 py-2 bg-[#404250] text-white rounded-xl select-none whitespace-nowrap overflow-hidden my-5"
                >
                    <div
                        ref={FlashingCircleRef}
                        className="w-2 h-2 bg-[#f9bb00] rounded-full"
                    />
                    <h1>{t("titleSection")}</h1>
                </div>

                <div
                    ref={titleRef}
                    className="text-center text-5xl md:text-5xl font-bold leading-relaxed capitalize"
                >
                    <h1>{t("title")}</h1>
                </div>

                <div
                    ref={textRef}
                    className="text-center text-base px-4 md:text-3xl md:w-2xl lg:w-6xl leading-relaxed capitalize"
                >
                    <p>{t("text")}</p>
                </div>
                <div
                    ref={subTextRef}
                    className="text-center text-base px-4 md:text-3xl md:w-2xl lg:w-6xl leading-relaxed capitalize"
                >
                    <p>{t("subText")}</p>
                </div>
            </div>


            <div className="mx-auto max-w-6xl px-5 pt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
                    <div className="ImageAboutRef md:row-span-2 rounded-xl overflow-hidden aspect-4/5 md:aspect-auto md:min-h-130">
                        <Image src={AboutPhoto1} alt="AboutPhoto1" className="w-full h-full object-cover" />
                    </div>
                    <div className="ImageAboutRef rounded-xl overflow-hidden aspect-video md:aspect-auto md:min-h-62.5">
                        <Image src={AboutPhoto2} alt="AboutPhoto2" className="w-full h-full object-cover" />
                    </div>
                    <div className="ImageAboutRef rounded-xl overflow-hidden aspect-video md:aspect-auto md:min-h-62.5">
                        <Image src={AboutPhoto3} alt="AboutPhoto3" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

        </section>
    );
}