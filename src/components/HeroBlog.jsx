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
                xPercent: 100,
                y:50,
                opacity: 0,
                duration: .8,
                stagger: 0.05,
                ease: "power3.out"
            }, "<")
    })
    return (
        <section ref={containerRef} className="w-full relative pt-35">
            <div className="flex flex-col w-full text-justify justify-center md:justify-between py-10 px-5 md:px-20 items-center gap-5">
                <h1 ref={titleRef} className="text-6xl font-bold">{t("title")}</h1>
                <p ref={textRef} className="md:w-3xl text-3xl text-center">{t("text")}</p>
            </div>
        </section>
    );
}