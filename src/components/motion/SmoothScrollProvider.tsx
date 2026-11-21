"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  ScrollSmoother,
  ScrollTrigger,
  registerGsapPlugins,
  useGSAP,
} from "@/components/motion/gsapConfig";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Global GSAP `ScrollSmoother` shell wrapping `<main>` and `<Footer />` across all routes
 * (`/`, `/projects/*`, `/achievements`), while keeping fixed overlays (`Navbar`, `Preloader`)
 * outside `#smooth-wrapper` so `position: fixed` works cleanly.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirstRouteMountRef = useRef(true);

  useGSAP(
    () => {
      registerGsapPlugins();

      const wrapperEl = wrapperRef.current;
      const contentEl = contentRef.current;
      if (!wrapperEl || !contentEl) return;

      const smoother = ScrollSmoother.create({
        wrapper: wrapperEl,
        content: contentEl,
        smooth: 1.05,
        effects: false,
        ignoreMobileResize: true,
      });

      let disposed = false;
      void document.fonts?.ready.then(() => {
        if (!disposed) {
          ScrollTrigger.refresh();
        }
      });

      return () => {
        disposed = true;
        smoother.kill();
      };
    },
    { scope: wrapperRef }
  );

  // Sync ScrollTrigger heights and scroll/hash position cleanly on client-side route transitions.
  useEffect(() => {
    registerGsapPlugins();

    const wrapperEl = wrapperRef.current;
    const isInitialMount = isFirstRouteMountRef.current;
    isFirstRouteMountRef.current = false;

    const hash = window.location.hash;

    if (!isInitialMount && !hash) {
      const smoother = ScrollSmoother.get();
      if (wrapperEl) wrapperEl.scrollTop = 0;
      if (smoother) {
        smoother.paused(false);
        smoother.scrollTop(0);
      }
      window.scrollTo(0, 0);
    }

    let rafId2: number | null = null;
    const rafId1 = window.requestAnimationFrame(() => {
      rafId2 = window.requestAnimationFrame(() => {
        if (wrapperEl) wrapperEl.scrollTop = 0;
        ScrollTrigger.refresh();

        if (hash) {
          const target = document.getElementById(hash.slice(1));
          if (target) {
            const smoother = ScrollSmoother.get();
            if (smoother) {
              const targetY = Math.max(0, smoother.offset(target, "top top"));
              smoother.scrollTop(targetY);
            } else {
              target.scrollIntoView({ behavior: "auto" });
            }
          }
        }
      });
    });

    return () => {
      window.cancelAnimationFrame(rafId1);
      if (rafId2 !== null) {
        window.cancelAnimationFrame(rafId2);
      }
    };
  }, [pathname]);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
