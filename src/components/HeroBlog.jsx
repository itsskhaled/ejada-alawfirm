import { useTranslations } from "next-intl";
import bgBlog from "@/app/Image/bgBlog.png";
import Image from "next/image";
export default function HeroBlogSection() {
    const t = useTranslations("BlogSection");
    return (
        <section className="w-full h-screen relative py-35">
            <div className="flex flex-wrap w-full justify-center md:justify-between py-10 px-5 md:px-20 items-center gap-5">
                <h1 className="text-6xl font-bold">{t("title")}</h1>
                <p className="md:w-xl text-3xl text-center md:text-start">{t("text")}</p>
            </div>
            <div className="w-full h-130 bg-black">
                <Image src={bgBlog} alt="bgBlog" className="w-full h-full object-cover" />
            </div>
        </section>
    );
}