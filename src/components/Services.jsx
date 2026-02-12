"use client";

import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import ServicesImage from "@/app/Image/Services.png";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
export default function ServicesSection() {
    const t = useTranslations("ServicesSection");
    const items = t.raw("itemsService");

    const FlashingCircleRef = useRef(null);
    const containerRef = useRef(null);
    const titleSectionRef = useRef(null);
    const titleRef = useRef(null);
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
            const { isDesktop, isMobile } = context.conditions;


            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: isDesktop? "top center" : "top 10%",
                    toggleActions: "play none none none",
                    // markers: true
                }
            });

            const titleSplit = new SplitText(titleRef.current, {
                type: "words",
                mask: "words"
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
                }, "<50%")
                .from(cardsRef.current, {
                    xPercent: 100,
                    opacity: 0,
                    ease: "power2.out",
                    duration: 0.9,
                    stagger: 0.06,
                }, "<")
        })
    })

    return (
        <section ref={containerRef} className="w-full relative py-35 px-2">
            <div className="flex flex-col w-full items-center gap-10">
                <div ref={titleSectionRef} className="flex gap-2 items-center text-center font-bold px-4 py-2 bg-[#404250] text-white rounded-xl select-none whitespace-nowrap">
                    <div ref={FlashingCircleRef} className="w-2 h-2 bg-[#f9bb00] rounded-full" />
                    <h1>{t("titleSection")}</h1>
                </div>

                <h1 ref={titleRef} className="text-3xl md:w-2xl text-center font-bold">
                    {t("title")}
                </h1>

                <Swiper
                    modules={[Navigation, A11y]}
                    navigation={{
                        nextEl: ".services-next",
                        prevEl: ".services-prev",
                    }}
                    spaceBetween={20}
                    slidesPerView={1.1}
                    breakpoints={{
                        640: { slidesPerView: 2.1 },
                        1024: { slidesPerView: 3.1 },
                    }}
                    className="w-full"
                >
                    {items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div ref={el => cardsRef.current[i] = el} className="rounded-2xl bg-neutral-200 border border-black/5 overflow-hidden h-full cursor-grab">
                                <div className="h-70 sm:h-75 bg-neutral-800">
                                    <Image src={ServicesImage} alt="Services" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4 sm:p-6">
                                    <h3 className="text-base sm:text-xl font-bold">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm opacity-80 mt-2 leading-relaxed">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="flex gap-4 justify-center">
                    <button className="services-prev nav-btn cursor-pointer">‹</button>
                    <button className="services-next nav-btn cursor-pointer">›</button>
                </div>

            </div>
        </section>
    );
}
