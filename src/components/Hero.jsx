import { useTranslations } from "next-intl";
import Image from "next/image";
import JusticeWorkPlace from "@/app/Image/justiceWorkplace.jpg";
import HandShake from "@/app/Image/HandShake.jpg";

export default function HeroSection() {
    const t = useTranslations("HeroSection");
    return (
        <section className="w-full relative py-40">
            <div className="w-full flex flex-col items-center justify-center gap-10">
                <h1 className="py-2 bg-white/10 backdrop-blur-xl border border-white/20 font-bold capitalize">{t("HeadText")}</h1>
                <h1 className="text-3xl md:text-5xl font-bold text-center md:w-3xl lg:w-6xl px-6">{t("SubheadText")}</h1>
                <p className="text-2xl text-center px-6 md:w-5xl">{t("SupportingText")}</p>
                <div className="flex gap-3 md:gap-8">
                    <button className="border px-4 py-2 rounded-xl cursor-pointer font-bold">{t("ButtonLeft")}</button>
                    <button className="bg-[#f9bb00] px-4 py-2 rounded-xl cursor-pointer font-bold">{t("ButtonRight")}</button>
                </div>
            </div>
                <div className="flex flex-wrap w-full justify-center gap-1 md:gap-5 my-10 px-4">
                    <div className="w-100 h-100">
                        <Image src={JusticeWorkPlace} alt="JusticeWorkPlace" className="w-full h-full object-cover rounded-md"/>
                    </div>
                    <div className="w-150 h-100">
                        <Image src={HandShake} alt="HandShake" className="w-full h-full object-cover rounded-md"/>
                    </div>
                </div>
        </section>
    );
}