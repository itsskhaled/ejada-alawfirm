import Image from "next/image";
import imageCTA from "@/app/Image/imageCTA.png"
export default function CTASection() {
    return (
        <section className="w-full relative py-20 px-20">
            <div className="w-full flex justify-center">
                <div className="w-full h-100">
                    <Image src={imageCTA} alt="imageCTA" className="w-full h-full object-cover rounded-xl"/>
                </div>
            </div>
        </section>
    );
}