"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function ScrollToStoredTarget({ offsetY = 40 }) {
  useEffect(() => {
    const id = sessionStorage.getItem("scrollTarget");
    if (!id) return;

    sessionStorage.removeItem("scrollTarget");

    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (!el) return;

      gsap.to(window, {
        duration: 1,
        ease: "power2.out",
        scrollTo: { y: el, offsetY },
      });
    });
  }, [offsetY]);

  return null;
}
