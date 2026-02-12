"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Mail, MapPin, Phone } from "lucide-react";
import { useMemo, useRef } from "react";
import { useTranslations } from "use-intl";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
export default function ContactSection() {
    const t = useTranslations("ContactSection");
    const items = t.raw("itemsContact");
    const services = t.raw("services");
    const ICONS = {
        "phone": Phone,
        "mail": Mail,
        "map-pin": MapPin
    };

    const containerRef = useRef(null);
    const FlashingCircleRef = useRef(null);
    const titleSectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const formRef = useRef(null);
    const inputCol_1Ref = useRef(null);
    const inputCol_2Ref = useRef(null);
    const inputCol_3Ref = useRef(null);
    const inputCol_4Ref = useRef(null);
    const inputCol_5Ref = useRef(null);
    const inputCol_6Ref = useRef(null);
    const contactRef = useRef([]);


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
                }
            })
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
                    y: 50,
                    opacity: 0,
                    ease: "power2.out",
                    duration: 0.9,
                    stagger: 0.06,
                }, "<30%")
                .from(formRef.current, {
                    opacity: 0,
                    duration: .5,
                    ease: "power2.out"
                }, "<30%")
            if (isDesktop) {

                tl.from([inputCol_1Ref.current, inputCol_2Ref.current, inputCol_3Ref.current, inputCol_4Ref.current, inputCol_5Ref.current, inputCol_6Ref.current], {
                    y: 50,
                    opacity: 0,
                    ease: "power2.out",
                    duration: 0.9,
                    stagger: 0.06,
                }, "<")
            } else if (isMobile) {
                gsap.from([inputCol_1Ref.current, inputCol_2Ref.current, inputCol_3Ref.current, inputCol_4Ref.current, inputCol_5Ref.current, inputCol_6Ref.current], {
                    y: 50,
                    opacity: 0,
                    ease: "power2.out",
                    duration: 0.9,
                    stagger: 0.06,
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 10%",
                        // markers: true
                    }
                }, "<")
            }
            tl.from(textSplit.words, {
                y: 50,
                opacity: 0,
                ease: "power2.out",
                duration: 0.5,
                stagger: 0.06,
            }, "<")
                .from(contactRef.current, {
                    xPercent: 50,
                    opacity: 0,
                    ease: "power2.out",
                    duration: 0.5,
                    stagger: 0.06,
                })
        })
    })
    return (
        <section ref={containerRef} className="w-full relative py-35 px-10 md:px-20 ">
            <div>
                <div className="flex flex-col md:flex-row justify-center lg:justify-between gap-10">
                    <div className="w-full max-w-xl flex flex-col gap-5">
                        <div ref={titleSectionRef} className="inline-flex items-center gap-2 text-white bg-[#404250] rounded-xl select-none px-4 py-2 self-start whitespace-nowrap overflow-hidden">
                            <div ref={FlashingCircleRef} className="w-2 h-2 bg-[#f9bb00] rounded-full" />
                            <h1 className="font-bold">{t("titleSection")}</h1>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h1 ref={titleRef} className="text-2xl sm:text-2xl md:text-4xl lg:text-6xl font-bold leading-relaxed capitalize">{t("title")}</h1>
                            <p ref={textRef} className="text-2xs md:text-2xl text-neutral-600 leading-relaxed capitalize">{t("text")}</p>
                        </div>
                        {items.map((item, i) => {
                            const Icon = ICONS[item.icon];
                            return (
                                <div ref={el => contactRef.current[i] = el} key={i} className="flex gap-2 items-center">
                                    {Icon && <Icon className="px-2 py-2 w-10 md:w-12 h-10 md:h-12 text-[#f9bb00]" />}
                                    <div>
                                        <p className="text-xs md:text-base font-bold">{item.title}</p>
                                        <p className="text-xs md:text-base ">{item.info}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <form ref={formRef} noValidate className="mt-6 border px-10 py-15 rounded-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div ref={inputCol_1Ref}>
                                <label htmlFor="name" className="label">
                                    {t("name")}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="mt-2 bg-neutral-100 px-3 py-2 w-full rounded-md input outline-none focus:ring-2 focus:ring-[#F9BB00]"
                                    required
                                />
                            </div>

                            <div ref={inputCol_2Ref}>
                                <label htmlFor="phoneNumber" className="label">
                                    {t("phone")}
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    inputMode="tel"
                                    className="mt-2 bg-neutral-100 px-3 py-2 w-full rounded-md input outline-none focus:ring-2 focus:ring-[#F9BB00]"
                                    required
                                />
                            </div>

                            <div ref={inputCol_3Ref}>
                                <label htmlFor="email" className="label">
                                    {t("email")}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-2 bg-neutral-100 px-3 py-2 w-full rounded-md input outline-none focus:ring-2 focus:ring-[#F9BB00]"
                                    required
                                />
                            </div>

                            <div ref={inputCol_4Ref}>
                                <label htmlFor="service" className="label">
                                    {t("RequiredService")}
                                </label>
                                <select
                                    id="service"
                                    className="mt-2 bg-neutral-100 px-3 py-0.5 w-full rounded-md input outline-none focus:ring-2 focus:ring-[#F9BB00]"
                                    required
                                >
                                    <option value="">{t("typeOfService")}</option>
                                    {services.map((s) => (
                                        <option key={s.id} value={s.title} className="capitalize">
                                            {s.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div ref={inputCol_5Ref} className="mt-4">
                            <label htmlFor="details" className="label">
                                {t("CaseDetails")}
                            </label>
                            <textarea
                                id="details"
                                name="case_details"
                                placeholder={t("placeholder")}
                                className="mt-2 w-full min-h-37.5 sm:min-h-45 rounded-md px-4 py-3 bg-neutral-100 input outline-none focus:ring-2 focus:ring-[#F9BB00]"
                                required
                            />
                        </div>
                        <div ref={inputCol_6Ref} className="mt-5">
                            <button
                                type="submit"
                                className="font-bold w-full px-4 py-3 rounded-md cursor-pointer bg-[#F9BB00] disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {t("submit")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}