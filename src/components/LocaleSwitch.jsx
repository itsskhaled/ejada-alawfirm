"use client";

import {useLocale} from "next-intl";
import {usePathname, useRouter} from "next/navigation";

export default function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const nextLocale = locale === "ar" ? "en" : "ar";

  const onToggle = () => {
    const segments = pathname.split("/");
    segments[1] = nextLocale;        
    router.push(segments.join("/"));
    router.refresh();                
  };

  return (
    <button onClick={onToggle} className="cursor-pointer bg-[#f9bb00] font-bold py-2 px-2 rounded-md">
      {nextLocale.toUpperCase()}
    </button>
  );
}
