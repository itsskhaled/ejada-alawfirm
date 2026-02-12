"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { BadgeCheck, BadgeMinus } from "lucide-react";
import { useRef } from "react";
import { useTranslations } from "use-intl";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)
export default function ComparisonSection() {
    const t = useTranslations("ComparisonSection");
    const myOurCompany = t.raw("FeaturesOurCompany");
    const OtherCompany = t.raw("FeaturesOtherCompanies");
    const IconOurCompany = {
        "badge-check": BadgeCheck,
    };
    const IconOtherCompany = {
        "badge-minus": BadgeMinus,
    };

    const containerRef = useRef(null);
    const titleSectionRef = useRef(null);
    const FlashingCircleRef = useRef(null);
    const titleRef = useRef(null);
    const BoxDataRef = useRef(null);
    const calum1Ref = useRef(null);
    const calum2Ref = useRef(null);
    const ourCompanyRef = useRef([]);
    const otherCompanyRef = useRef([]);

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
                    start: isDesktop ? "top 30%" : "top -20%",
                    // markers: true
                }
            });
            tl.from(titleSectionRef.current, {
                width: 0,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            })
                .from(titleRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                }, "<50%")
                .from(BoxDataRef.current, {
                    width: 0,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                }, "<")
                .from([calum1Ref.current, calum2Ref.current], {
                    width: 0,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                })
                .from([ourCompanyRef.current, otherCompanyRef.current], {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: { each: .07 },
                    ease: "power2.out"
                }, "<50%")
        })
    })
    return (
        <section ref={containerRef} className="w-full relative py-35">
            <div className="flex flex-col w-full items-center gap-10">
                <div
                    ref={titleSectionRef}
                    className="flex gap-2 items-center text-center font-bold px-4 py-2 bg-[#404250] text-white rounded-xl select-none whitespace-nowrap overflow-hidden"
                >
                    <div
                        ref={FlashingCircleRef}
                        className="w-2 h-2 bg-[#f9bb00] rounded-full"
                    />
                    <h1>{t("titleSection")}</h1>
                </div>

                <div
                    ref={titleRef}
                    className="text-center text-4xl md:text-5xl font-bold capitalize"
                >
                    <h1>{t("title")}</h1>
                </div>

                <div ref={BoxDataRef} className="w-full max-w-6xl mx-auto rounded-2xl bg-neutral-100 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                        {/* Company 1 */}
                        <div ref={calum1Ref} className="flex flex-col items-center text-center">
                            <h1 className="w-full pb-4 text-lg font-bold capitalize">
                                {t("ourCompany")}
                            </h1>

                            <div className="mt-6 w-full h-64 md:h-80 bg-neutral-200 rounded-xl flex flex-col justify-center px-10" >
                                {myOurCompany.map((item, i) => {
                                    const Icon = IconOurCompany[item.icon];
                                    return (
                                        <div ref={el => ourCompanyRef.current[i] = el} key={i}>
                                            <div className="flex gap-3 items-center">
                                                {Icon && <Icon className="px-2 py-2 w-10 md:w-12 h-10 md:h-12 text-[#f9bb00]" />}
                                                <h1>{item.title}</h1>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>

                        {/* Company 2 */}
                        <div ref={calum2Ref} className="flex flex-col items-center text-center">
                            <h1 className="w-full pb-4 text-lg font-bold capitalize">
                                {t("otherCompany")}
                            </h1>

                            <div className="mt-6 w-full h-64 md:h-80 bg-neutral-200 rounded-xl flex flex-col justify-center px-10" >
                                {OtherCompany.map((item, i) => {
                                    const Icon = IconOtherCompany[item.icon];
                                    return (
                                        <div ref={el => otherCompanyRef.current[i] = el} key={i}>
                                            <div className="flex gap-5 items-center">
                                                {Icon && <Icon className="px-2 py-2 w-10 md:w-12 h-10 md:h-12 text-neutral-500" />}
                                                <h1 className="text-neutral-500">{item.title}</h1>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>

                        <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-black/20" />
                    </div>
                </div>
            </div>
        </section>
    );
}