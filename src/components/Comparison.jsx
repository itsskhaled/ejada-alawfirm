"use client";
import { useTranslations } from "use-intl";

export default function ComparisonSection() {
    const t = useTranslations("ComparisonSection");
    return (
        <section className="w-full h-screen relative py-35">
            <div className="flex flex-col w-full items-center gap-10">
                <div
                    // ref={titleSectionRef}
                    className="flex gap-2 items-center text-center font-bold px-4 py-2 bg-black text-white rounded-xl select-none whitespace-nowrap overflow-hidden"
                >
                    <div
                        // ref={FlashingCircleRef}
                        className="w-2 h-2 bg-[#f9bb00] rounded-full"
                    />
                    <h1>{t("titleSection")}</h1>
                </div>

                <div
                    // ref={titleRef}
                    className="text-center text-4xl md:text-5xl font-bold capitalize"
                >
                    <h1>{t("title")}</h1>
                </div>

                <div className="w-full max-w-6xl mx-auto rounded-2xl bg-neutral-100 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                        {/* Company 1 */}
                        <div className="flex flex-col items-center text-center">
                            <h1 className="w-full pb-4 text-lg font-bold capitalize">
                                {t("ourCompany")}
                            </h1>

                            <div className="mt-6 w-full h-64 md:h-80 bg-neutral-200 rounded-xl" />
                        </div>

                        {/* Company 2 */}
                        <div className="flex flex-col items-center text-center">
                            <h1 className="w-full pb-4 text-lg font-bold capitalize">
                                {t("otherCompany")}
                            </h1>

                            <div className="mt-6 w-full h-64 md:h-80 bg-neutral-200 rounded-xl" />
                        </div>

                        {/* Vertical divider on desktop only */}
                        <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-black/20" />
                    </div>
                </div>

            </div>
        </section>
    );
}