import { useTranslations } from "next-intl";
import Image from "next/image";
import AboutPhoto1 from "../app/Image/About1.png";
import AboutPhoto2 from "../app/Image/About2.png";
import AboutPhoto3 from "../app/Image/About3.jpg";

export default function HeroAboutSection() {

    const t = useTranslations("HeroAboutSection");
    return (
        <section className="w-full relative px-5 py-35">
            <div className="flex flex-col w-full items-center gap-5">
                <div
                    // ref={titleSectionRef}
                    className="flex gap-2 items-center text-center font-bold px-4 py-2 bg-black text-white rounded-xl select-none whitespace-nowrap overflow-hidden my-5"
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

                <div
                    // ref={textRef}
                    className="text-center text-2xl px-4 md:text-3xl md:w-2xl lg:w-6xl leading-relaxed capitalize"
                >
                    <p>{t("text")}</p>
                </div>
                <div
                    // ref={textRef}
                    className="text-center text-2xl px-4 md:text-3xl md:w-2xl lg:w-6xl leading-relaxed capitalize"
                >
                    <p>{t("subText")}</p>
                </div>
            </div>


            <div className="mx-auto max-w-6xl px-5 pt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
                    <div className="md:row-span-2 rounded-xl overflow-hidden aspect-4/5 md:aspect-auto md:min-h-130">
                        <Image src={AboutPhoto1} alt="AboutPhoto1" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-xl overflow-hidden aspect-video md:aspect-auto md:min-h-62.5">
                        <Image src={AboutPhoto2} alt="AboutPhoto2" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-xl overflow-hidden aspect-video md:aspect-auto md:min-h-62.5">
                        <Image src={AboutPhoto3} alt="AboutPhoto3" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

        </section>
    );
}