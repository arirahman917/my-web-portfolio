"use client";

import { useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  registerGsapPlugins,
  useGSAP,
} from "@/components/motion/gsapConfig";
import { cn } from "@/lib/utils";

interface OrbDriftBounds {
  xRange: [number, number];
  yRange: [number, number];
  scaleRange: [number, number];
  opacityRange: [number, number];
  durationRange: [number, number];
}

interface AmbientOrbSpec {
  id: string;
  className: string;
  background: string;
  bounds: OrbDriftBounds;
}

const ORB_PRESETS: Record<
  "hero" | "achievements" | "principles" | "footer",
  readonly AmbientOrbSpec[]
> = {
  hero: [
    {
      id: "hero-top-right",
      className:
        "-top-[30%] -right-[12%] h-[66vw] max-h-[1020px] min-h-[380px] w-[72vw] max-w-[1120px] min-w-[420px] blur-[64px] sm:blur-[90px]",
      background:
        "radial-gradient(closest-side at center, rgba(109, 139, 255, 0.88) 0%, rgba(40, 85, 255, 0.68) 38%, rgba(18, 53, 216, 0.28) 70%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-260, 110],
        yRange: [-90, 210],
        scaleRange: [0.85, 1.22],
        opacityRange: [0.72, 1.0],
        durationRange: [3.0, 5.0],
      },
    },
    {
      id: "hero-bottom-left",
      className:
        "-bottom-[34%] -left-[18%] h-[72vw] max-h-[1120px] min-h-[440px] w-[84vw] max-w-[1300px] min-w-[480px] blur-[72px] sm:blur-[96px]",
      background:
        "radial-gradient(closest-side at center, rgba(40, 85, 255, 0.88) 0%, rgba(18, 53, 216, 0.78) 34%, rgba(18, 53, 216, 0.34) 68%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-120, 260],
        yRange: [-220, 90],
        scaleRange: [0.84, 1.24],
        opacityRange: [0.75, 1.0],
        durationRange: [3.2, 5.2],
      },
    },
    {
      id: "hero-center-halo",
      className:
        "top-[22%] left-[20%] h-[52vw] max-h-[820px] min-h-[320px] w-[60vw] max-w-[920px] min-w-[340px] opacity-75 blur-[72px] sm:blur-[96px]",
      background:
        "radial-gradient(closest-side at center, rgba(40, 85, 255, 0.45) 0%, rgba(18, 53, 216, 0.28) 50%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-240, 240],
        yRange: [-150, 150],
        scaleRange: [0.8, 1.28],
        opacityRange: [0.5, 0.95],
        durationRange: [2.8, 4.8],
      },
    },
  ],
  achievements: [
    {
      id: "achievements-top-right",
      className:
        "-top-[8%] -right-[10%] h-[58vw] max-h-[860px] min-h-[340px] w-[66vw] max-w-[980px] min-w-[380px] blur-[64px] sm:blur-[90px]",
      background:
        "radial-gradient(closest-side at center, rgba(109, 139, 255, 0.78) 0%, rgba(40, 85, 255, 0.6) 38%, rgba(18, 53, 216, 0.24) 70%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-220, 120],
        yRange: [-80, 160],
        scaleRange: [0.88, 1.2],
        opacityRange: [0.7, 0.98],
        durationRange: [4.2, 7.2],
      },
    },
    {
      id: "achievements-upper-left",
      className:
        "top-[14%] -left-[16%] h-[56vw] max-h-[840px] min-h-[340px] w-[64vw] max-w-[960px] min-w-[380px] blur-[68px] sm:blur-[92px]",
      background:
        "radial-gradient(closest-side at center, rgba(40, 85, 255, 0.74) 0%, rgba(18, 53, 216, 0.56) 42%, rgba(18, 53, 216, 0.22) 72%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-100, 220],
        yRange: [-140, 140],
        scaleRange: [0.86, 1.22],
        opacityRange: [0.68, 0.96],
        durationRange: [4.5, 7.5],
      },
    },
    {
      id: "achievements-center-halo",
      className:
        "top-[38%] left-[18%] h-[50vw] max-h-[760px] min-h-[300px] w-[60vw] max-w-[900px] min-w-[340px] blur-[72px] sm:blur-[96px]",
      background:
        "radial-gradient(closest-side at center, rgba(109, 139, 255, 0.58) 0%, rgba(40, 85, 255, 0.44) 44%, rgba(18, 53, 216, 0.18) 74%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-200, 200],
        yRange: [-140, 140],
        scaleRange: [0.84, 1.24],
        opacityRange: [0.6, 0.94],
        durationRange: [4.0, 6.8],
      },
    },
    {
      id: "achievements-mid-lower-left",
      className:
        "top-[54%] -left-[12%] h-[54vw] max-h-[820px] min-h-[320px] w-[62vw] max-w-[940px] min-w-[360px] blur-[68px] sm:blur-[92px]",
      background:
        "radial-gradient(closest-side at center, rgba(109, 139, 255, 0.76) 0%, rgba(40, 85, 255, 0.58) 40%, rgba(18, 53, 216, 0.22) 72%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-110, 210],
        yRange: [-140, 140],
        scaleRange: [0.88, 1.22],
        opacityRange: [0.68, 0.96],
        durationRange: [4.3, 7.3],
      },
    },
    {
      id: "achievements-lower-right",
      className:
        "top-[62%] -right-[14%] h-[58vw] max-h-[880px] min-h-[340px] w-[66vw] max-w-[980px] min-w-[380px] blur-[70px] sm:blur-[94px]",
      background:
        "radial-gradient(closest-side at center, rgba(40, 85, 255, 0.72) 0%, rgba(18, 53, 216, 0.54) 40%, rgba(18, 53, 216, 0.22) 72%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-220, 110],
        yRange: [-150, 130],
        scaleRange: [0.86, 1.2],
        opacityRange: [0.68, 0.96],
        durationRange: [4.6, 7.6],
      },
    },
    {
      id: "achievements-lower-right-accent",
      className:
        "top-[74%] -right-[10%] h-[52vw] max-h-[780px] min-h-[320px] w-[60vw] max-w-[900px] min-w-[360px] blur-[66px] sm:blur-[90px]",
      background:
        "radial-gradient(closest-side at center, rgba(109, 139, 255, 0.78) 0%, rgba(40, 85, 255, 0.6) 40%, rgba(18, 53, 216, 0.24) 72%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-200, 110],
        yRange: [-130, 130],
        scaleRange: [0.88, 1.2],
        opacityRange: [0.68, 0.98],
        durationRange: [4.1, 7.1],
      },
    },
    {
      id: "achievements-bottom-left",
      className:
        "-bottom-[14%] -left-[14%] h-[56vw] max-h-[840px] min-h-[340px] w-[68vw] max-w-[1020px] min-w-[380px] blur-[72px] sm:blur-[96px]",
      background:
        "radial-gradient(closest-side at center, rgba(109, 139, 255, 0.66) 0%, rgba(40, 85, 255, 0.5) 42%, rgba(18, 53, 216, 0.2) 72%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-110, 210],
        yRange: [-140, 90],
        scaleRange: [0.86, 1.2],
        opacityRange: [0.64, 0.92],
        durationRange: [4.4, 7.4],
      },
    },
  ],
  principles: [
    {
      id: "principles-top-right",
      className:
        "-top-[20%] -right-[14%] h-[58vw] max-h-[880px] min-h-[340px] w-[64vw] max-w-[980px] min-w-[380px] blur-[72px] sm:blur-[96px]",
      background:
        "radial-gradient(closest-side at center, rgba(109, 139, 255, 0.64) 0%, rgba(40, 85, 255, 0.46) 38%, rgba(18, 53, 216, 0.2) 70%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-240, 120],
        yRange: [-90, 190],
        scaleRange: [0.88, 1.2],
        opacityRange: [0.62, 0.92],
        durationRange: [6.0, 10.5],
      },
    },
    {
      id: "principles-bottom-left",
      className:
        "-bottom-[28%] -left-[18%] h-[62vw] max-h-[940px] min-h-[360px] w-[72vw] max-w-[1100px] min-w-[400px] blur-[76px] sm:blur-[104px]",
      background:
        "radial-gradient(closest-side at center, rgba(40, 85, 255, 0.64) 0%, rgba(18, 53, 216, 0.52) 36%, rgba(18, 53, 216, 0.22) 68%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-120, 240],
        yRange: [-190, 90],
        scaleRange: [0.86, 1.2],
        opacityRange: [0.6, 0.9],
        durationRange: [6.5, 11.0],
      },
    },
    {
      id: "principles-center-halo",
      className:
        "top-[20%] left-[22%] h-[48vw] max-h-[740px] min-h-[280px] w-[56vw] max-w-[840px] min-w-[320px] opacity-70 blur-[76px] sm:blur-[104px]",
      background:
        "radial-gradient(closest-side at center, rgba(40, 85, 255, 0.34) 0%, rgba(18, 53, 216, 0.2) 50%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-220, 220],
        yRange: [-140, 140],
        scaleRange: [0.84, 1.24],
        opacityRange: [0.44, 0.82],
        durationRange: [5.5, 9.5],
      },
    },
  ],
  footer: [
    {
      id: "footer-right-highlight",
      className:
        "-top-[12%] -right-[14%] h-[54vw] max-h-[820px] min-h-[320px] w-[60vw] max-w-[920px] min-w-[360px] blur-[72px] sm:blur-[96px]",
      background:
        "radial-gradient(closest-side at center, rgba(109, 139, 255, 0.38) 0%, rgba(40, 85, 255, 0.28) 38%, rgba(18, 53, 216, 0.12) 70%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-220, 110],
        yRange: [-80, 160],
        scaleRange: [0.88, 1.18],
        opacityRange: [0.5, 0.8],
        durationRange: [6.0, 10.5],
      },
    },
    {
      id: "footer-bottom-left",
      className:
        "-bottom-[28%] -left-[18%] h-[58vw] max-h-[880px] min-h-[340px] w-[68vw] max-w-[1040px] min-w-[380px] blur-[76px] sm:blur-[104px]",
      background:
        "radial-gradient(closest-side at center, rgba(40, 85, 255, 0.4) 0%, rgba(18, 53, 216, 0.32) 36%, rgba(18, 53, 216, 0.13) 68%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-110, 220],
        yRange: [-160, 80],
        scaleRange: [0.86, 1.18],
        opacityRange: [0.5, 0.82],
        durationRange: [6.5, 11.0],
      },
    },
    {
      id: "footer-center-halo",
      className:
        "top-[22%] left-[22%] h-[44vw] max-h-[680px] min-h-[260px] w-[52vw] max-w-[780px] min-w-[300px] opacity-60 blur-[76px] sm:blur-[104px]",
      background:
        "radial-gradient(closest-side at center, rgba(40, 85, 255, 0.2) 0%, rgba(18, 53, 216, 0.12) 50%, rgba(8, 11, 24, 0) 100%)",
      bounds: {
        xRange: [-200, 200],
        yRange: [-120, 120],
        scaleRange: [0.84, 1.2],
        opacityRange: [0.4, 0.72],
        durationRange: [5.5, 9.5],
      },
    },
  ],
};

const EDGE_MASK_STYLES: Record<"bottom" | "top" | "none", string | undefined> =
  {
    bottom:
      "linear-gradient(to bottom, #000 0%, #000 58%, rgba(0, 0, 0, 0.72) 74%, rgba(0, 0, 0, 0.28) 88%, rgba(0, 0, 0, 0) 100%)",
    top: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.14) 16%, rgba(0, 0, 0, 0.45) 32%, rgba(0, 0, 0, 0.82) 48%, #000 62%, #000 100%)",
    none: undefined,
  };

function startRandomOrbDrift(
  target: HTMLElement,
  bounds: OrbDriftBounds,
  isActive: () => boolean,
  initialDelay = 0
) {
  const step = (delay = 0) => {
    if (!isActive()) return;
    gsap.to(target, {
      x: gsap.utils.random(bounds.xRange[0], bounds.xRange[1]),
      y: gsap.utils.random(bounds.yRange[0], bounds.yRange[1]),
      scale: gsap.utils.random(bounds.scaleRange[0], bounds.scaleRange[1]),
      rotation: gsap.utils.random(-15, 15),
      opacity: gsap.utils.random(bounds.opacityRange[0], bounds.opacityRange[1]),
      duration: gsap.utils.random(
        bounds.durationRange[0],
        bounds.durationRange[1]
      ),
      delay,
      ease: "sine.inOut",
      overwrite: "auto",
      force3D: true,
      onComplete: () => step(0),
    });
  };

  step(initialDelay);
}

interface HeroAmbientLightProps {
  variant: "hero" | "achievements" | "principles" | "footer";
  edgeFade?: "bottom" | "top" | "none";
}

/**
 * Hero-style drifting PRD-palette radial ambient light orbs (`#080B18`, `#1235D8`, `#2855FF`, `#6D8BFF`).
 * Supports soft top/bottom edge masking so adjacent `bg-primary-black` sections connect without a seam.
 */
export function HeroAmbientLight({
  variant,
  edgeFade = "none",
}: HeroAmbientLightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbs = ORB_PRESETS[variant];
  const maskImage = EDGE_MASK_STYLES[edgeFade];

  useGSAP(
    () => {
      registerGsapPlugins();

      const containerEl = containerRef.current;
      if (!containerEl) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          canAnimate: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (!context.conditions?.canAnimate) return;

          const orbNodes = gsap.utils.toArray<HTMLElement>(
            "[data-ambient-orb]",
            containerEl
          );
          orbNodes.forEach((node, index) => {
            const spec = orbs[index];
            if (!spec) return;
            gsap.set(node, {
              x: gsap.utils.random(spec.bounds.xRange[0] * 0.5, spec.bounds.xRange[1] * 0.5),
              y: gsap.utils.random(spec.bounds.yRange[0] * 0.5, spec.bounds.yRange[1] * 0.5),
              scale: gsap.utils.random(spec.bounds.scaleRange[0], spec.bounds.scaleRange[1]),
              opacity: gsap.utils.random(spec.bounds.opacityRange[0], spec.bounds.opacityRange[1]),
              force3D: true,
            });
          });

          let isRunning = false;

          const setActive = (nextActive: boolean) => {
            if (nextActive === isRunning) return;
            isRunning = nextActive;

            if (nextActive) {
              orbNodes.forEach((node, index) => {
                const spec = orbs[index];
                if (!spec) return;
                node.style.willChange = "transform, opacity";
                startRandomOrbDrift(
                  node,
                  spec.bounds,
                  () => isRunning,
                  index === 0 ? 0 : gsap.utils.random(0.15, 0.9)
                );
              });
            } else {
              gsap.killTweensOf(orbNodes);
              orbNodes.forEach((node) => {
                node.style.willChange = "auto";
              });
            }
          };

          const visibilityTrigger = ScrollTrigger.create({
            trigger: containerEl,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => setActive(self.isActive),
          });

          setActive(visibilityTrigger.isActive);

          return () => {
            isRunning = false;
            visibilityTrigger.kill();
            gsap.killTweensOf(orbNodes);
            orbNodes.forEach((node) => {
              node.style.willChange = "";
            });
          };
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [variant] }
  );

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={
        maskImage
          ? {
              maskImage,
              WebkitMaskImage: maskImage,
            }
          : undefined
      }
    >
      {orbs.map((orb) => (
        <div
          key={orb.id}
          data-ambient-orb
          className={cn("absolute rounded-full", orb.className)}
          style={{ background: orb.background }}
        />
      ))}
    </div>
  );
}
