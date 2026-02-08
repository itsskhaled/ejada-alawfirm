import { CheckCheck, Headset, ScanHeart, SquareLibrary, UserStar } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FeaturesSection() {
    const t = useTranslations("FeaturesSection");
    const items = t.raw("itemsFeature");
    const ICONS = {
        "user-star": UserStar,
        "scan-heart": ScanHeart,
        "check-check": CheckCheck,
        "square-library": SquareLibrary,
        "head-set": Headset
    };
    return (
        <section className="w-full min-h-screen relative py-40 px-10 md:px-30">
            <div>
                <div className="flex flex-wrap justify-center lg:justify-between gap-10">
                    <div className="w-full max-w-xl flex flex-col gap-5">
                        <div className="inline-flex items-center gap-2 text-white bg-black rounded-xl select-none px-4 py-2 self-start">
                            <div className="w-2 h-2 bg-[#f9bb00] rounded-full" />
                            <h1 className="font-bold">{t("titleSection")}</h1>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h1 className="text-2xl sm:text-2xl md:text-4xl lg:text-6xl font-bold capitalize">{t("title")}</h1>
                            <p className="text-2xs md:text-base text-neutral-600 leading-5">{t("subTitle")}</p>
                        </div>
                    </div>
                    <div>
                        {items.map((item, i) => {
                            const Icon = ICONS[item.icon];
                            return (
                                <div key={i} className="my-5 w-70 md:w-150 h-40 md:h-35 bg-black rounded-xl py-6 px-6 select-none">
                                    <div className="flex gap-2 md:gap-5 items-center">
                                        {Icon && <Icon className="px-2 py-2 w-10 md:w-12 h-10 md:h-12 text-[#f9bb00]" />}
                                        <h1 className="text-white text-xl md:text-2xl font-bold capitalize">{item.title}</h1>
                                    </div>
                                    <p className="text-white px-6 text-xs md:text-base">{item.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
