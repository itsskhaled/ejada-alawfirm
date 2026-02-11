import { useTranslations } from "next-intl";
import Image from "next/image";
import ClientPhoto1 from "@/app/Image/Clients/1.webp";
import ClientPhoto2 from "@/app/Image/Clients/2.jpg";
import ClientPhoto3 from "@/app/Image/Clients/3.png";
import ClientPhoto4 from "@/app/Image/Clients/4.png";
import ClientPhoto5 from "@/app/Image/Clients/5.png";
import ClientPhoto6 from "@/app/Image/Clients/6.png";
import ClientPhoto7 from "@/app/Image/Clients/7.webp";
import ClientPhoto8 from "@/app/Image/Clients/8.png";
import ClientPhoto9 from "@/app/Image/Clients/9.png";
import ClientPhoto10 from "@/app/Image/Clients/10.png";
import ClientPhoto11 from "@/app/Image/Clients/11.png";
import ClientPhoto12 from "@/app/Image/Clients/12.png";
import ClientPhoto13 from "@/app/Image/Clients/13.png";
import ClientPhoto14 from "@/app/Image/Clients/14.png";
import ClientPhoto15 from "@/app/Image/Clients/15.png";
import ClientPhoto16 from "@/app/Image/Clients/16.png";
import ClientPhoto17 from "@/app/Image/Clients/17.png";
import ClientPhoto18 from "@/app/Image/Clients/18.png";

export default function ClientsSection() {
    const t = useTranslations("ClientsSection")
    return (
        <section className="w-full relative bg-neutral-100 py-35">
            <div className="flex flex-col w-full items-center gap-5">
                <div
                    // ref={titleSectionRef}
                    className="flex gap-2 items-center text-center text-2xl font-bold px-6 py-4 bg-black text-white rounded-xl select-none whitespace-nowrap overflow-hidden my-5"
                >
                    <div
                        // ref={FlashingCircleRef}
                        className="w-3 h-3 bg-[#f9bb00] rounded-full"
                    />
                    <h1>{t("titleSection")}</h1>
                </div>
            </div>
            <div className="flex justify-center w-full gap-15 flex-wrap">
                {Clients.map((client, i) => {
                    return (
                        <div key={i} className="w-50 h-50 md:grayscale hover:grayscale-0 transition duration-500 ease-in-out">
                            <Image className="w-full h-full object-contain" src={client.image} alt={client.alt} />
                        </div>
                    );
                })}

            </div>
        </section>
    );
}

const Clients = [
    { id: 1, image: ClientPhoto1, alt: "ClientPhoto1" },
    { id: 2, image: ClientPhoto2, alt: "ClientPhoto2" },
    { id: 3, image: ClientPhoto3, alt: "ClientPhoto3" },
    { id: 4, image: ClientPhoto4, alt: "ClientPhoto4" },
    { id: 5, image: ClientPhoto5, alt: "ClientPhoto5" },
    { id: 6, image: ClientPhoto6, alt: "ClientPhoto6" },
    { id: 7, image: ClientPhoto7, alt: "ClientPhoto7" },
    { id: 8, image: ClientPhoto8, alt: "ClientPhoto8" },
    { id: 9, image: ClientPhoto9, alt: "ClientPhoto9" },
    { id: 10, image: ClientPhoto10, alt: "ClientPhoto10" },
    { id: 11, image: ClientPhoto11, alt: "ClientPhoto11" },
    { id: 12, image: ClientPhoto12, alt: "ClientPhoto12" },
    { id: 13, image: ClientPhoto13, alt: "ClientPhoto13" },
    { id: 14, image: ClientPhoto14, alt: "ClientPhoto14" },
    { id: 15, image: ClientPhoto15, alt: "ClientPhoto15" },
    { id: 16, image: ClientPhoto16, alt: "ClientPhoto16" },
    { id: 17, image: ClientPhoto17, alt: "ClientPhoto17" },
    { id: 18, image: ClientPhoto18, alt: "ClientPhoto18" },
]