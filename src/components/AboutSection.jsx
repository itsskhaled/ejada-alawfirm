import { BookCheck, FileText, Scale, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutSection() {
    const t = useTranslations("AboutSection");
    const items = t.raw("itemsAbout");
    const ICONS = {
        "book-check": BookCheck,
        "users": Users,
        "file-text": FileText,
        "scale": Scale
    };
    return (
        <section id="about-section" className="w-full bg-[#0c0c0c] relative py-40">
            <div className="flex flex-col w-full items-center gap-10">
                <div className="flex gap-2 items-center text-center font-bold px-4 py-2 bg-white text-black rounded-xl select-none">
                    <div className="w-2 h-2 bg-[#f9bb00] rounded-full" />
                    <h1>{t("titleSection")}</h1>
                </div>
                <div className="text-white text-center text-4xl md:text-5xl font-bold capitalize">
                    <h1>{t("title")}</h1>
                </div>
                <div className="text-white text-center text-2xl px-4 md:text-3xl md:w-2xl lg:w-6xl leading-relaxed capitalize">
                    <p>{t("text")}</p>
                </div>
                <div className="flex gap-10 flex-wrap justify-center w-full my-10 px-4">
                    {items.map((item, i) => {
                        const Icon = ICONS[item.icon];
                        return (
                            <div key={i} className="flex gap-3 items-center bg-white w-70 py-4 px-5 rounded-xl">
                                {Icon && <Icon className="bg-neutral-700 rounded-xl px-2 py-2 w-12 h-12 text-white" />}
                                <div>
                                    <h1 className="text-[#f9bb00] font-bold text-xl capitalize">{item.title}</h1>
                                    <p className="font-bold text-xl">{item.count}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}


