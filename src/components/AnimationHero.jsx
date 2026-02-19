"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function AnimationHero() {
  const containerRef = useRef(null);

  const baseRef = useRef(null);
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);
  const grad1Ref = useRef(null);
  const grad2Ref = useRef(null);

  useGSAP(
    () => {
      const base = baseRef.current;
      const glow1 = glow1Ref.current;
      const glow2 = glow2Ref.current;
      const grad1 = grad1Ref.current;
      const grad2 = grad2Ref.current;

      if (!base || !glow1 || !glow2 || !grad1 || !grad2) return;

      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) return;

      const L = base.getTotalLength();

      const segment = 260;
      const dashArray = `${segment} ${Math.max(0, L - segment)}`;

      gsap.set([glow1, glow2], {
        strokeDasharray: dashArray,
        strokeDashoffset: 0,
      });

      const gW = 420;
      const svgW = 2038.994;
      const duration = 3.2;
      const overlap = 0.75;

      const makeRunner = (pathEl, gradEl, delay = 0) => {
        const tl = gsap.timeline({ repeat: -1, delay });

        tl.to(
          pathEl,
          {
            strokeDashoffset: -L,
            duration,
            ease: "none",
          },
          0
        );

        tl.fromTo(
          gradEl,
          { attr: { x1: -gW, x2: 0 } },
          {
            attr: { x1: svgW, x2: svgW + gW },
            duration,
            ease: "none",
          },
          0
        );

        return tl;
      };

      const tl1 = makeRunner(glow1, grad1, 0);
      const tl2 = makeRunner(glow2, grad2, duration * (1 - overlap));

      const el = containerRef.current;
      if (!el) return;

      const io = new IntersectionObserver(
        ([entry]) => {
          const visible = entry.isIntersecting && entry.intersectionRatio > 0;
          if (visible) {
            tl1.resume();
            tl2.resume();
          } else {
            tl1.pause();
            tl2.pause();
          }
        },
        { threshold: 0.1 }
      );

      io.observe(el);

      return () => {
        io.disconnect();
        tl1.kill();
        tl2.kill();
      };
    },
    { scope: containerRef }
  );

  const d =
    "M-66.344,550.375s357.576-78.072,657.6,44.09S1115.334,345.5,1115.334,345.5s305.956,189.11,481.918,56.327,374.889,135.251,374.889,135.251";

  return (
    <svg
      ref={containerRef}
      xmlns="http://www.w3.org/2000/svg"
      width="2038.994"
      height="274.871"
      viewBox="0 0 2038.994 274.871"
      style={{ contain: "paint" }}
    >
      <defs>
        <linearGradient
          id="glow1"
          gradientUnits="userSpaceOnUse"
          x1="-420"
          y1="0"
          x2="0"
          y2="0"
          ref={grad1Ref}
        >
          <stop offset="0%" stopColor="rgba(255,200,0,0)" />
          <stop offset="50%" stopColor="rgba(255,200,0,1)" />
          <stop offset="100%" stopColor="rgba(255,200,0,0)" />
        </linearGradient>

        <linearGradient
          id="glow2"
          gradientUnits="userSpaceOnUse"
          x1="-420"
          y1="0"
          x2="0"
          y2="0"
          ref={grad2Ref}
        >
          <stop offset="0%" stopColor="rgba(255,200,0,0)" />
          <stop offset="50%" stopColor="rgba(255,200,0,1)" />
          <stop offset="100%" stopColor="rgba(255,200,0,0)" />
        </linearGradient>
      </defs>

      <path
        ref={baseRef}
        d={d}
        transform="translate(66.45 -344.809)"
        fill="none"
        stroke="#D6D3CB"
        strokeWidth="1"
        opacity=".35"
      />

      <path
        ref={glow1Ref}
        d={d}
        transform="translate(66.45 -344.809)"
        fill="none"
        stroke="url(#glow1)"
        strokeWidth="5"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 6px rgba(255,200,0,0.6))" }}
      />

      <path
        ref={glow2Ref}
        d={d}
        transform="translate(66.45 -344.809)"
        fill="none"
        stroke="url(#glow2)"
        strokeWidth="5"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 6px rgba(255,200,0,0.6))" }}
      />
    </svg>
  );
}
