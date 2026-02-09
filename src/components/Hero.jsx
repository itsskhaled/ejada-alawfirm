"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import JusticeWorkPlace from "@/app/Image/justiceWorkplace.jpg";
import HandShake from "@/app/Image/HandShake.jpg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText);
export default function HeroSection() {
    const t = useTranslations("HeroSection");

    const headTextRef = useRef(null);
    const SubheadTextRef = useRef(null);
    const SupportingTextRef = useRef(null);


    useGSAP(() => {

        
        const headTextSplit = new SplitText(headTextRef.current, {
            type: "words",
            mask: "words"
        });
        const SubheadTextSplit = new SplitText(SubheadTextRef.current, {
            type: "words",
            mask: "words"
        });

        // console.log("lines:", SubheadTextSplit.words.length);

        const SupportingTextSplit = new SplitText(SupportingTextRef.current, {
            type: "lines",
            mask: "lines"
        });

        const tl = gsap.timeline();
        const ImageRef = gsap.utils.toArray(".ImageRef");
        const BtnsRef = gsap.utils.toArray(".btnsRef");
        const BtnText = gsap.utils.toArray(".btnText");

        tl.from(headTextSplit.words, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: { each: .07 },
            ease: "power2.out"
        })
            .from(SubheadTextSplit.words, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: { each: .05 },
                ease: "power2.out"
            }, "<50%")
            .from(SupportingTextSplit.lines, {
                y: 50,
                opacity: 0,
                duration: .5,
                stagger: { each: .05 },
                ease: "power2.out"
            }, "<60%")
            .from(ImageRef, {
                width: 0,
                opacity: 0,
                duration: 1,
                stagger: .1,
                ease: "power3.out"
            }, "<50%")
            .from(BtnsRef, {
                width: 0,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            }, "<50%")
            .from(BtnText, {
                y: 10,
                opacity: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.3");
    })
    return (
        <section className="w-full relative py-40">
            <div className="w-full flex flex-col items-center justify-center gap-10">
                <h1 ref={headTextRef} className="py-2 bg-white/10 backdrop-blur-xl border border-white/20 font-bold capitalize">{t("HeadText")}</h1>
                <h1 ref={SubheadTextRef} className="text-3xl md:text-5xl font-bold text-center md:w-3xl lg:w-6xl px-6 leading-relaxed">{t("SubheadText")}</h1>
                <p ref={SupportingTextRef} className="text-2xl text-center px-6 md:w-5xl">{t("SupportingText")}</p>
                <div className="flex gap-3 md:gap-8">
                    <button className="btnsRef border px-4 py-2 rounded-xl cursor-pointer font-bold overflow-hidden">
                        <span className="btnText whitespace-nowrap">{t("ButtonLeft")}</span>
                    </button>

                    <button className="btnsRef bg-[#f9bb00] px-4 py-2 rounded-xl cursor-pointer font-bold overflow-hidden">
                        <span className="btnText whitespace-nowrap">{t("ButtonRight")}</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap w-full justify-center gap-1 md:gap-5 my-10 px-4">
                <div className="ImageRef w-100 h-100">
                    <Image src={JusticeWorkPlace} alt="JusticeWorkPlace" width={900}
                        height={700}
                        className="w-full h-full object-cover rounded-md"
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 600px" />
                </div>
                <div className="ImageRef w-150 h-100">
                    <Image src={HandShake} alt="HandShake"
                        className="object-cover rounded-md w-full h-full"
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 70vw, 600px" />
                </div>
            </div>
        </section>
    );
}