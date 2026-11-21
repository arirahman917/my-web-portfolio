"use client";

import { useRef, type ReactNode } from "react";
import {
  gsap,
  ScrollTrigger,
  registerGsapPlugins,
  useGSAP,
} from "@/components/motion/gsapConfig";
import { cn } from "@/lib/utils";

interface OrbSpec {
  id: string;
  anchorClass: string;
  gradient: string;
  rangeX: number;
  rangeY: number;
  minScale: number;
  maxScale: number;
  minDuration: number;
  maxDuration: number;
}

function buildSoftSharedGradient(
  coreRgba: string,
  midRgba: string,
  outerRgba: string,
  faintRgba: string
): string {
  return `radial-gradient(closest-side at center, ${coreRgba} 0%, ${midRgba} 24%, ${outerRgba} 52%, ${faintRgba} 76%, rgba(8, 11, 24, 0) 100%)`;
}

/**
 * Continuous PRD-palette blue ambient light orbs (#080B18, #1235D8, #2855FF, #6D8BFF)
 * shared across `#achievements` and `#organizations` so there is no visual seam.
 * Uses Gaussian-calibrated multi-stop gradients instead of CSS `blur()` shaders for smooth 60/120fps scrolling.
 */
const SHARED_ORBS: readonly OrbSpec[] = [
  {
    id: "top-left-aura",
    anchorClass:
      "top-[10%] left-[4%] h-[68vw] max-h-[980px] min-h-[400px] w-[76vw] max-w-[1120px] min-w-[440px]",
    gradient: buildSoftSharedGradient(
      "rgba(18, 53, 216, 0.48)",
      "rgba(18, 53, 216, 0.3)",
      "rgba(18, 53, 216, 0.13)",
      "rgba(18, 53, 216, 0.03)"
    ),
    rangeX: 95,
    rangeY: 75,
    minScale: 0.9,
    maxScale: 1.16,
    minDuration: 9,
    maxDuration: 15,
  },
  {
    id: "bottom-left-wash",
    anchorClass:
      "top-[88%] left-[6%] h-[80vw] max-h-[1220px] min-h-[460px] w-[92vw] max-w-[1400px] min-w-[520px]",
    gradient: buildSoftSharedGradient(
      "rgba(40, 85, 255, 0.68)",
      "rgba(18, 53, 216, 0.48)",
      "rgba(18, 53, 216, 0.2)",
      "rgba(18, 53, 216, 0.05)"
    ),
    rangeX: 120,
    rangeY: 90,
    minScale: 0.88,
    maxScale: 1.18,
    minDuration: 10,
    maxDuration: 16,
  },
  {
    id: "right-radiant-core",
    anchorClass:
      "top-[62%] left-[88%] h-[78vw] max-h-[1180px] min-h-[440px] w-[88vw] max-w-[1340px] min-w-[480px]",
    gradient: buildSoftSharedGradient(
      "rgba(109, 139, 255, 0.72)",
      "rgba(40, 85, 255, 0.5)",
      "rgba(18, 53, 216, 0.21)",
      "rgba(18, 53, 216, 0.05)"
    ),
    rangeX: 120,
    rangeY: 95,
    minScale: 0.88,
    maxScale: 1.18,
    minDuration: 8,
    maxDuration: 14,
  },
  {
    id: "center-drift-accent",
    anchorClass:
      "top-[36%] left-[56%] h-[60vw] max-h-[900px] min-h-[360px] w-[68vw] max-w-[1020px] min-w-[400px]",
    gradient: buildSoftSharedGradient(
      "rgba(40, 85, 255, 0.36)",
      "rgba(18, 53, 216, 0.22)",
      "rgba(18, 53, 216, 0.09)",
      "rgba(18, 53, 216, 0.02)"
    ),
    rangeX: 140,
    rangeY: 95,
    minScale: 0.86,
    maxScale: 1.2,
    minDuration: 9,
    maxDuration: 15,
  },
];

/**
 * Shared seamless dark-blue ambient canvas wrapping `#achievements` and `#organizations`.
 * Pins a viewport-sized light stage via GSAP `ScrollTrigger` (matching `ScrollSmoother` transforms)
 * so `#achievements` and `#organizations` share one unbroken blue atmosphere.
 */
export function AchievementsOrganizationsBackdrop({
  children,
}: {
  children: ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();

      const wrapperEl = wrapperRef.current;
      const stageEl = stageRef.current;
      if (!wrapperEl || !stageEl) return;

      const pinTrigger = ScrollTrigger.create({
        trigger: wrapperEl,
        start: "top top",
        end: "bottom bottom",
        pin: stageEl,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      const orbNodes = gsap.utils.toArray<HTMLElement>(
        "[data-shared-blue-orb]",
        wrapperEl
      );
      if (orbNodes.length === 0) {
        return () => pinTrigger.kill();
      }

      let isActive = false;
      const activeTweens = new Array<gsap.core.Tween | null>(
        orbNodes.length
      ).fill(null);

      const wanderOrb = (orbEl: HTMLElement, index: number) => {
        if (!isActive) return;
        const spec = SHARED_ORBS[index];
        if (!spec) return;

        activeTweens[index] = gsap.to(orbEl, {
          x: gsap.utils.random(-spec.rangeX, spec.rangeX),
          y: gsap.utils.random(-spec.rangeY, spec.rangeY),
          scale: gsap.utils.random(spec.minScale, spec.maxScale),
          opacity: gsap.utils.random(0.74, 1),
          duration: gsap.utils.random(spec.minDuration, spec.maxDuration),
          ease: "sine.inOut",
          force3D: true,
          onComplete: () => wanderOrb(orbEl, index),
        });
      };

      const setPlayback = (active: boolean) => {
        if (isActive === active) return;
        isActive = active;

        orbNodes.forEach((orbEl, index) => {
          orbEl.style.willChange = active ? "transform, opacity" : "auto";
          const tween = activeTweens[index];
          if (active) {
            if (tween) {
              tween.play();
            } else {
              wanderOrb(orbEl, index);
            }
          } else if (tween) {
            tween.pause();
          }
        });
      };

      const visibilityTrigger = ScrollTrigger.create({
        trigger: wrapperEl,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => setPlayback(self.isActive),
      });
      setPlayback(visibilityTrigger.isActive);

      return () => {
        isActive = false;
        pinTrigger.kill();
        visibilityTrigger.kill();
        activeTweens.forEach((tween) => tween?.kill());
        orbNodes.forEach((orbEl) => {
          orbEl.style.willChange = "";
        });
      };
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="relative bg-primary-black">
      {/* Continuous pinned blue light canvas spanning Achievements + Organizations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          ref={stageRef}
          className="h-dvh w-full overflow-hidden motion-reduce:sticky motion-reduce:top-0"
        >
          {SHARED_ORBS.map((orb) => (
            <div
              key={orb.id}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2",
                orb.anchorClass
              )}
            >
              <div
                data-shared-blue-orb
                className="size-full"
                style={{ background: orb.gradient }}
              />
            </div>
          ))}
        </div>

        {/* Soft top edge fade from ProjectsSection (#080B18) */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-primary-black to-transparent" />
      </div>

      {children}
    </div>
  );
}
