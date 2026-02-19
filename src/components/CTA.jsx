"use client";
import Image from "next/image";
import imageCTA from "@/app/Image/bgCTA.png";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function CTASection() {
    const t = useTranslations("CTASection");

    const containerRef = useRef(null);
    const ImageRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const btnsRef = useRef(null);

    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add(
            {
                isMobile: "(max-width: 640px)",
                isDesktop: "(min-width: 641px)",
            },
            (context) => {
                const { isDesktop } = context.conditions;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: isDesktop ? "top center" : "top 50%",
                        end: "+=100%",
                    },
                });

                const titleSplit = new SplitText(titleRef.current, {
                    type: "lines",
                    mask: "lines",
                });
                const textSplit = new SplitText(textRef.current, {
                    type: "lines",
                    mask: "lines",
                });

                tl.from(ImageRef.current, {
                    width: 0,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power3.out",
                })
                    .from([titleSplit.lines, textSplit.lines], {
                        y: 50,
                        opacity: 0,
                        duration: 0.5,
                        stagger: 0.05,
                        ease: "power3.out",
                    })
                    .from(
                        btnsRef.current,
                        {
                            y: 50,
                            opacity: 0,
                            duration: 0.5,
                            ease: "power1.out",
                        },
                        "<50%"
                    );
            }
        );
    });

    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split("/")[1] || "ar";

    const handleBook = () => {
        sessionStorage.setItem("scrollTarget", "contact");
        router.push(`/${locale}`);
    };

    return (
        <section ref={containerRef} className="w-full relative py-10 px-5 md:px-20">
            <div className="w-full flex justify-start items-center relative">
                <div ref={ImageRef} className="w-full h-180">
                    <Image src={imageCTA} alt="imageCTA" className="w-full h-full object-cover rounded-xl" />
                </div>

                <div className="absolute px-5 md:px-20 py-20">
                    <div className="flex flex-col gap-5 md:gap-10">
                        <h1 ref={titleRef} className="text-[#f9bb00] font-bold text-3xl sm:text-3xl md:text-5xl lg:text-7xl leading-relaxed">{t("title")}</h1>
                        <h2 ref={textRef} className="text-white text-md sm:text-md md:text-2xl lg:text-3xl">{t("text")}</h2>
                    </div>
                    <div ref={btnsRef} className="flex flex-wrap gap-5 md:gap-10 mt-10">

                        <button
                            onClick={handleBook}
                            type="button"
                            className="bg-[#f9bb00] px-8 py-4 rounded-xl font-bold cursor-pointer text-black text-base sm:text-base md:text-xl"
                        >
                            {t("btnBook")}
                        </button>
                        <Link
                            href="https://wa.me/966920008433"
                            target="_blank"
                            className="text-white border px-8 py-4 rounded-xl font-bold cursor-pointer text-base sm:text-base md:text-xl"
                        >
                            {t("btnColl")}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
