"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

let isRegistered = false;

/** Safely registers GSAP plugins once on the client before animations run. */
export function registerGsapPlugins(): void {
  if (typeof window === "undefined" || isRegistered) return;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
  isRegistered = true;
}

export { gsap, ScrollTrigger, ScrollToPlugin, useGSAP };
