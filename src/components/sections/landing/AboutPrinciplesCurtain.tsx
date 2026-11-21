"use client";

import { useRef, type ReactNode } from "react";
import {
  gsap,
  ScrollTrigger,
  registerGsapPlugins,
  useGSAP,
} from "@/components/motion/gsapConfig";

interface AboutPrinciplesCurtainProps {
  aboutMe: ReactNode;
  principles: ReactNode;
}

/**
 * Shared scroll-over curtain container for `#about-me` and `#principles`.
 * Uses GSAP `ScrollTrigger` pinning (compatible with `ScrollSmoother`) so `#about-me`
 * pauses smoothly on the lower layer (`z-10`) during the dwell spacer until `#principles`
 * (`z-30`) rises from the bottom to cover it completely.
 */
export function AboutPrinciplesCurtain({
  aboutMe,
  principles,
}: AboutPrinciplesCurtainProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutSlotRef = useRef<HTMLDivElement>(null);
  const principlesSlotRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();

      const containerEl = containerRef.current;
      const aboutSlotEl = aboutSlotRef.current;
      const principlesSlotEl = principlesSlotRef.current;
      if (!containerEl || !aboutSlotEl || !principlesSlotEl) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          canAnimate: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (!context.conditions?.canAnimate) return;

          const pinTrigger = ScrollTrigger.create({
            trigger: aboutSlotEl,
            start: () =>
              `top ${Math.min(0, window.innerHeight - aboutSlotEl.offsetHeight)}px`,
            endTrigger: principlesSlotEl,
            end: "top top",
            pin: aboutSlotEl,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });

          let lastHeight = aboutSlotEl.offsetHeight;
          let refreshTimer: ReturnType<typeof setTimeout> | null = null;
          const resizeObserver = new ResizeObserver(() => {
            const nextHeight = aboutSlotEl.offsetHeight;
            if (Math.abs(nextHeight - lastHeight) < 2) return;
            lastHeight = nextHeight;
            if (refreshTimer) clearTimeout(refreshTimer);
            refreshTimer = setTimeout(() => {
              ScrollTrigger.refresh();
            }, 120);
          });
          resizeObserver.observe(aboutSlotEl);

          return () => {
            if (refreshTimer) clearTimeout(refreshTimer);
            resizeObserver.disconnect();
            pinTrigger.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative bg-lightblue">
      <div
        ref={aboutSlotRef}
        className="relative z-10 motion-reduce:sticky motion-reduce:top-0"
      >
        {aboutMe}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none h-[32dvh] sm:h-[40dvh] motion-reduce:hidden"
      />
      <div ref={principlesSlotRef} className="relative z-30">
        {principles}
      </div>
    </div>
  );
}
