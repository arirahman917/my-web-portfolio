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

/**
 * Continuous PRD-palette blue ambient light orbs (#080B18, #1235D8, #2855FF, #6D8BFF)
 * shared across `#achievements` and `#organizations` so there is no visual seam.
 */
const SHARED_ORBS: readonly OrbSpec[] = [
  {
    id: "top-left-aura",
    anchorClass:
      "top-[10%] left-[4%] h-[56vw] max-h-[820px] min-h-[340px] w-[64vw] max-w-[940px] min-w-[380px]",
    gradient:
      "radial-gradient(closest-side at center, rgba(18, 53, 216, 0.5) 0%, rgba(18, 53, 216, 0.24) 42%, rgba(8, 11, 24, 0) 100%)",
    rangeX: 110,
    rangeY: 85,
    minScale: 0.88,
    maxScale: 1.18,
    minDuration: 9,
    maxDuration: 15,
  },
  {
    id: "bottom-left-wash",
    anchorClass:
      "top-[88%] left-[6%] h-[68vw] max-h-[1040px] min-h-[400px] w-[80vw] max-w-[1220px] min-w-[460px]",
    gradient:
      "radial-gradient(closest-side at center, rgba(40, 85, 255, 0.72) 0%, rgba(18, 53, 216, 0.56) 36%, rgba(18, 53, 216, 0.22) 68%, rgba(8, 11, 24, 0) 100%)",
    rangeX: 140,
    rangeY: 100,
    minScale: 0.86,
    maxScale: 1.2,
    minDuration: 10,
    maxDuration: 16,
  },
  {
    id: "right-radiant-core",
    anchorClass:
      "top-[62%] left-[88%] h-[66vw] max-h-[1020px] min-h-[380px] w-[76vw] max-w-[1160px] min-w-[420px]",
    gradient:
      "radial-gradient(closest-side at center, rgba(109, 139, 255, 0.76) 0%, rgba(40, 85, 255, 0.56) 38%, rgba(18, 53, 216, 0.24) 70%, rgba(8, 11, 24, 0) 100%)",
    rangeX: 140,
    rangeY: 110,
    minScale: 0.86,
    maxScale: 1.2,
    minDuration: 8,
    maxDuration: 14,
  },
  {
    id: "center-drift-accent",
    anchorClass:
      "top-[36%] left-[56%] h-[48vw] max-h-[760px] min-h-[300px] w-[56vw] max-w-[860px] min-w-[340px]",
    gradient:
      "radial-gradient(closest-side at center, rgba(40, 85, 255, 0.38) 0%, rgba(18, 53, 216, 0.22) 50%, rgba(8, 11, 24, 0) 100%)",
    rangeX: 160,
    rangeY: 110,
    minScale: 0.84,
    maxScale: 1.22,
    minDuration: 9,
    maxDuration: 15,
  },
];

/**
 * Shared seamless dark-blue ambient canvas wrapping `#achievements` and `#organizations`.
 * Keeps a single sticky viewport-sized blue light stage behind both sections so their
 * boundary never shows a cut or mismatched gradient, while orbs wander smoothly and randomly.
 */
export function AchievementsOrganizationsBackdrop({
  children,
}: {
  children: ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();

      const wrapperEl = wrapperRef.current;
      if (!wrapperEl) return;

      const orbNodes = gsap.utils.toArray<HTMLElement>(
        "[data-shared-blue-orb]",
        wrapperEl
      );
      if (orbNodes.length === 0) return;

      let isActive = false;
      const activeTweens = new Array<gsap.core.Tween | null>(orbNodes.length).fill(
        null
      );

      const wanderOrb = (orbEl: HTMLElement, index: number) => {
        if (!isActive) return;
        const spec = SHARED_ORBS[index];
        if (!spec) return;

        activeTweens[index] = gsap.to(orbEl, {
          x: gsap.utils.random(-spec.rangeX, spec.rangeX),
          y: gsap.utils.random(-spec.rangeY, spec.rangeY),
          scale: gsap.utils.random(spec.minScale, spec.maxScale),
          rotation: gsap.utils.random(-18, 18),
          opacity: gsap.utils.random(0.72, 1),
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
      {/* Continuous sticky blue light canvas spanning Achievements + Organizations */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="sticky top-0 h-dvh w-full overflow-hidden">
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
                className="size-full blur-[72px] sm:blur-[96px]"
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
