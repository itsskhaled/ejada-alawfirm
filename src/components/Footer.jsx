"use client";

import { useTranslations } from "next-intl";
import logoFooter from "@/app/Image/logo2.png";
import Image from "next/image";
import { Instagram, Linkedin, Mail, Map, MapPin, Phone, Twitter } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
export default function Footer() {
    const t = useTranslations("Footer");
    const items = t.raw("itemsFooter");
    const SocialMedia = t.raw("itemsSocialMedia");
    const ICONS = {
        "phone": Phone,
        "mail": Mail,
        "map-pin": MapPin
    };
    const IconSocialMedia = {
        "instagram": Instagram,
        "twitter": Twitter,
        "linkedin": Linkedin,
        "map": Map
    };


    return (
        <section className="w-full relative py-20 bg-[#404250] rounded-t-2xl">
            <div className="flex flex-wrap justify-center w-full md:justify-between px-30 items-center">
                <div className="w-50 h-50">
                    <Image src={logoFooter} alt="logoFooter" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col md:flex-row justify-center md:justify-start gap-5 md:gap-20 text-center md:text-start text-white">
                    <div>
                        <ul>
                            <Link href="/"><li className="my-3">{t("home")}</li></Link>
                            <Link href="/about-us"><li className="my-3">{t("aboutus")}</li></Link>
                            <Link href="/team"><li className="my-3">{t("features")}</li></Link>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <Link href="/blog"><li className="my-3">{t("services")}</li></Link>
                            <Link href="https://wa.me/966920008433" target="_blank"><li className="my-3">{t("contact")}</li></Link>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="text-white opacity-20 mx-5 md:mx-20 my-10" />

            <div className="flex w-full justify-center md:justify-between flex-wrap px-10 md:px-30 items-start gap-5">
                <div>
                    <h1 className="text-white md:w-80">{t("infoFooter")}</h1>
                </div>
                <div>
                    {items.map((item, i) => {
                        const Icon = ICONS[item.icon];
                        return (
                            <Link href={item.href} target="_blank" key={i} className="flex gap-2 items-center">
                                {Icon && <Icon className="px-2 py-2 w-10 md:w-10 h-10 md:h-10 text-white" />}
                                <div className="text-white">
                                    <p className="text-xs md:text-base ">{item.info}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className="flex">
                    {SocialMedia.map((item, i) => {
                        const Icon = IconSocialMedia[item.icon];
                        return (
                            <Link href={item.href} target="_blank" key={i} className="flex gap-2">
                                {Icon && <Icon className="px-2 py-2 w-10 md:w-10 h-10 md:h-10 text-white" />}
                            </Link>
                        );
                    })}
                </div>
            </div>
            <hr className="text-white opacity-10 mt-15" />
            <div className="absolute bottom-5 w-full flex flex-col-reverse md:flex-row justify-between px-20 text-center">
                <p className="text-white text-xs md:text-2xs text-center">{t("TermsAndConditions")}</p>
                <p className="text-white text-xs md:text-2xs text-nowrap text-center">Copyright © {new Date().getFullYear()} Ejadalawfirm. All Rights Reserved</p>
            </div>
        </section>
    );
}