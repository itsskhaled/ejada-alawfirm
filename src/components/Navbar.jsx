"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import LocaleSwitch from "./LocaleSwitch";
import LogoHeader from "@/app/Image/Logo.png";
import Image from "next/image";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Navbar() {
  const t = useTranslations("navbar");
  const [open, setOpen] = useState(false);

  const panelRef = useRef(null);
  const lineTopRef = useRef(null);
  const lineBottomRef = useRef(null);
  const tlRef = useRef(null);

  const headerRef = useRef(null);
  const navRef = useRef(null); // Desktop links container
  const mobileNavRef = useRef(null); // Mobile links container

  useGSAP(() => {
    // ===== Mobile Menu (panel + X) =====
    gsap.set(panelRef.current, {
      y: -24,
      autoAlpha: 0,
      pointerEvents: "none",
    });

    gsap.set([lineTopRef.current, lineBottomRef.current], {
      transformOrigin: "50% 50%",
      xPercent: -50,
      yPercent: -50,
      left: "50%",
      top: "50%",
    });

    gsap.set(lineTopRef.current, { y: -6, rotation: 0 });
    gsap.set(lineBottomRef.current, { y: 6, rotation: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(lineTopRef.current, { y: 0, rotation: 45, duration: 0.25, ease: "power2.out" }, 0)
      .to(lineBottomRef.current, { y: 0, rotation: -45, duration: 0.25, ease: "power2.out" }, 0)
      .to(
        panelRef.current,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.35,
          ease: "power3.out",
          pointerEvents: "auto",
        },
        0.05
      )
      .fromTo(
        panelRef.current.querySelectorAll("[data-menu-item]"),
        { y: -8, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.25, ease: "power2.out", stagger: 0.06 },
        0.15
      );

    tlRef.current = tl;
    tl.progress(0).pause();

    // ===== Links color change on sections (About + Team) =====
    const desktopLinks = navRef.current?.querySelectorAll("a") || [];
    const mobileLinks = mobileNavRef.current?.querySelectorAll("a") || [];
    const allLinks = [...desktopLinks, ...mobileLinks];

    if (!allLinks.length) return;

    gsap.set(allLinks, { color: "#000" });

    const sections = ["#about-section", "#team-section"];
    let activeCount = 0;

    const setLinksColor = () => {
      gsap.to(allLinks, {
        color: activeCount > 0 ? "#fff" : "#000",
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const triggers = sections.map((selector) =>
      ScrollTrigger.create({
        trigger: selector,
        start: "top 80px",
        end: "bottom 80px",
        onEnter: () => {
          activeCount++;
          setLinksColor();
        },
        onLeave: () => {
          activeCount = Math.max(0, activeCount - 1);
          setLinksColor();
        },
        onEnterBack: () => {
          activeCount++;
          setLinksColor();
        },
        onLeaveBack: () => {
          activeCount = Math.max(0, activeCount - 1);
          setLinksColor();
        },
      })
    );

    // Cleanup: kill only our triggers
    return () => {
      triggers.forEach((tr) => tr?.kill());
    };
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (open) tl.play();
    else tl.reverse();

    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <div className="fixed top-5 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-3">
        <header
          ref={headerRef}
          className="
            flex items-center justify-between
            rounded-2xl
            bg-white/10
            backdrop-blur-xl
            border border-white/20
            shadow
            px-5 md:px-10 lg:px-20
            py-4 md:py-5
          "
        >
          <div className="w-20 h-15">
            <Image src={LogoHeader} alt="" className="w-full h-full object-cover" />
          </div>

          {/* Desktop links */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-10">
            <a className="transition-opacity hover:opacity-100 opacity-90" href="#">
              {t("Home")}
            </a>
            <a className="transition-opacity hover:opacity-100 opacity-90" href="#about-section">
              {t("About")}
            </a>
            <a className="transition-opacity hover:opacity-100 opacity-90" href="#">
              {t("Service")}
            </a>
            <a className="transition-opacity hover:opacity-100 opacity-90" href="#team-section">
              {t("Team")}
            </a>
            <a className="transition-opacity hover:opacity-100 opacity-90" href="#">
              {t("Blog")}
            </a>
          </nav>

          <div className="flex gap-3 md:gap-5 items-center">
            <LocaleSwitch />

            <button className="hidden md:inline-flex rounded-lg bg-[#f9bb00] px-6 py-2 font-bold text-black">
              {t("btnHeader")}
            </button>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="
                lg:hidden
                relative
                w-12 h-12
                rounded-xl
                bg-white/10
                border border-white/15
                backdrop-blur-xl
                flex items-center justify-center
                overflow-visible
              "
            >
              <span ref={lineTopRef} className="absolute w-5 h-0.5 bg-black/90 rounded-full" />
              <span ref={lineBottomRef} className="absolute w-5 h-0.5 bg-black/90 rounded-full" />
            </button>
          </div>
        </header>

        {/* Mobile drop-down panel */}
        <div
          ref={panelRef}
          className="lg:hidden mt-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow overflow-hidden opacity-0 -translate-y-6 pointer-events-none"
        >
          <div ref={mobileNavRef} className="px-5 py-5 flex flex-col gap-4">
            <a data-menu-item href="#" onClick={closeMenu} className="py-2">
              {t("Home")}
            </a>
            <a data-menu-item href="#about-section" onClick={closeMenu} className="py-2">
              {t("About")}
            </a>
            <a data-menu-item href="#" onClick={closeMenu} className="py-2">
              {t("Service")}
            </a>
            <a data-menu-item href="#team-section" onClick={closeMenu} className="py-2">
              {t("Team")}
            </a>
            <a data-menu-item href="#" onClick={closeMenu} className="py-2">
              {t("Blog")}
            </a>

            <button
              data-menu-item
              onClick={closeMenu}
              className="mt-2 rounded-xl bg-[#f9bb00] px-6 py-3 font-bold text-black"
            >
              {t("btnHeader")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
