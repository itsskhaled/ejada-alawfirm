"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";

export default function CreditsSection() {
    const t = useTranslations("CreditsSection");
    const FlashingCircleRef = useRef(null);
    const titleSectionRef = useRef(null);
    return (
        <section className="w-full h-screen py-35 px-5">
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
            </div>
        </section>
    );
}