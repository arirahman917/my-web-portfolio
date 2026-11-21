"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

let isRegistered = false;

/** Safely registers GSAP plugins once on the client before animations run. */
export function registerGsapPlugins(): void {
  if (typeof window === "undefined" || isRegistered) return;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, ScrollSmoother, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
  isRegistered = true;
}

/**
 * Scrolls to an element ID or Y position using active `ScrollSmoother` when available,
 * falling back cleanly to GSAP `ScrollToPlugin` or native `window.scrollTo`.
 */
export function scrollSmoothTo(
  target: string | Element | number,
  options?: { offsetY?: number; immediate?: boolean }
): void {
  if (typeof window === "undefined") return;
  registerGsapPlugins();

  const offsetY = options?.offsetY ?? 0;
  const immediate = options?.immediate ?? false;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const smoother = ScrollSmoother.get();

  let targetY: number | null = null;
  if (typeof target === "number") {
    targetY = Math.max(0, target - offsetY);
  } else {
    const el =
      typeof target === "string"
        ? document.querySelector(target)
        : target;
    if (!el) return;

    if (smoother) {
      targetY = Math.max(0, smoother.offset(el, "top top") - offsetY);
    } else {
      targetY = Math.max(
        0,
        el.getBoundingClientRect().top + window.scrollY - offsetY
      );
    }
  }

  if (targetY === null) return;

  if (smoother) {
    if (immediate || prefersReducedMotion) {
      smoother.scrollTop(targetY);
    } else {
      smoother.scrollTo(targetY, true);
    }
    return;
  }

  if (immediate || prefersReducedMotion) {
    window.scrollTo({ top: targetY, behavior: "auto" });
    return;
  }

  gsap.to(window, {
    duration: 0.75,
    ease: "power3.inOut",
    scrollTo: { y: targetY, autoKill: true },
  });
}

export { gsap, ScrollTrigger, ScrollToPlugin, ScrollSmoother, useGSAP };
