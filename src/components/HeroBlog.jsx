"use client";

import { useTranslations } from "next-intl";
import bgBlog from "@/app/Image/bgBlog.png";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);
export default function HeroBlogSection() {
    const t = useTranslations("BlogSection");

    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

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
            xPercent: 100,
            opacity: 0,
            duration: .8,
            stagger: 0.05,
            ease: "power3.out"
        })
            .from(textSplit.words, {
                xPercent: -100,
                opacity: 0,
                duration: .8,
                stagger: 0.05,
                ease: "power3.out"
            }, "<")
            .from(imageRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power1.out"
            },"<20%")
    })
    return (
        <section ref={containerRef} className="w-full h-screen relative py-35">
            <div className="flex flex-wrap w-full justify-center md:justify-between py-10 px-5 md:px-20 items-center gap-5">
                <h1 ref={titleRef} className="text-6xl font-bold">{t("title")}</h1>
                <p ref={textRef} className="md:w-xl text-3xl text-center md:text-start">{t("text")}</p>
            </div>
            <div ref={imageRef} className="w-full h-130 bg-black">
                <Image src={bgBlog} alt="bgBlog" className="w-full h-full object-cover" />
            </div>
        </section>
    );
}