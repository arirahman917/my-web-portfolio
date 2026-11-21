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

function buildSoftOrbGradient(
  coreRgba: string,
  midRgba: string,
  outerRgba: string,
  faintRgba: string
): string {
  return `radial-gradient(closest-side at center, ${coreRgba} 0%, ${midRgba} 24%, ${outerRgba} 52%, ${faintRgba} 76%, rgba(8, 11, 24, 0) 100%)`;
}

// Multi-stop Gaussian-falloff radial gradients avoid expensive per-frame CSS blur() passes
// while preserving the exact soft atmospheric bloom across Hero, Achievements, Principles, and Footer.
const ORB_PRESETS: Record<
  "hero" | "achievements" | "principles" | "footer",
  readonly AmbientOrbSpec[]
> = {
  hero: [
    {
      id: "hero-top-right",
      className:
        "-top-[36%] -right-[18%] h-[78vw] max-h-[1200px] min-h-[440px] w-[86vw] max-w-[1320px] min-w-[480px]",
      background: buildSoftOrbGradient(
        "rgba(109, 139, 255, 0.8)",
        "rgba(40, 85, 255, 0.56)",
        "rgba(18, 53, 216, 0.24)",
        "rgba(18, 53, 216, 0.06)"
      ),
      bounds: {
        xRange: [-220, 100],
        yRange: [-80, 180],
        scaleRange: [0.88, 1.18],
        opacityRange: [0.74, 1.0],
        durationRange: [3.4, 5.4],
      },
    },
    {
      id: "hero-bottom-left",
      className:
        "-bottom-[40%] -left-[24%] h-[84vw] max-h-[1300px] min-h-[500px] w-[96vw] max-w-[1480px] min-w-[540px]",
      background: buildSoftOrbGradient(
        "rgba(40, 85, 255, 0.82)",
        "rgba(18, 53, 216, 0.64)",
        "rgba(18, 53, 216, 0.28)",
        "rgba(18, 53, 216, 0.07)"
      ),
      bounds: {
        xRange: [-110, 220],
        yRange: [-190, 80],
        scaleRange: [0.88, 1.2],
        opacityRange: [0.76, 1.0],
        durationRange: [3.6, 5.6],
      },
    },
    {
      id: "hero-center-halo",
      className:
        "top-[16%] left-[14%] h-[64vw] max-h-[980px] min-h-[380px] w-[72vw] max-w-[1100px] min-w-[400px] opacity-75",
      background: buildSoftOrbGradient(
        "rgba(40, 85, 255, 0.42)",
        "rgba(18, 53, 216, 0.26)",
        "rgba(18, 53, 216, 0.11)",
        "rgba(18, 53, 216, 0.03)"
      ),
      bounds: {
        xRange: [-200, 200],
        yRange: [-130, 130],
        scaleRange: [0.84, 1.22],
        opacityRange: [0.54, 0.92],
        durationRange: [3.2, 5.2],
      },
    },
  ],
  achievements: [
    {
      id: "achievements-top-right",
      className:
        "-top-[14%] -right-[16%] h-[70vw] max-h-[1040px] min-h-[400px] w-[78vw] max-w-[1160px] min-w-[440px]",
      background: buildSoftOrbGradient(
        "rgba(109, 139, 255, 0.72)",
        "rgba(40, 85, 255, 0.5)",
        "rgba(18, 53, 216, 0.2)",
        "rgba(18, 53, 216, 0.05)"
      ),
      bounds: {
        xRange: [-190, 110],
        yRange: [-70, 140],
        scaleRange: [0.9, 1.18],
        opacityRange: [0.72, 0.96],
        durationRange: [4.6, 7.6],
      },
    },
    {
      id: "achievements-upper-left",
      className:
        "top-[12%] -left-[20%] h-[68vw] max-h-[1000px] min-h-[400px] w-[76vw] max-w-[1120px] min-w-[440px]",
      background: buildSoftOrbGradient(
        "rgba(40, 85, 255, 0.68)",
        "rgba(18, 53, 216, 0.48)",
        "rgba(18, 53, 216, 0.19)",
        "rgba(18, 53, 216, 0.05)"
      ),
      bounds: {
        xRange: [-90, 190],
        yRange: [-120, 120],
        scaleRange: [0.88, 1.18],
        opacityRange: [0.68, 0.94],
        durationRange: [4.8, 7.8],
      },
    },
    {
      id: "achievements-center-halo",
      className:
        "top-[36%] left-[12%] h-[62vw] max-h-[920px] min-h-[360px] w-[72vw] max-w-[1060px] min-w-[400px]",
      background: buildSoftOrbGradient(
        "rgba(109, 139, 255, 0.54)",
        "rgba(40, 85, 255, 0.38)",
        "rgba(18, 53, 216, 0.15)",
        "rgba(18, 53, 216, 0.04)"
      ),
      bounds: {
        xRange: [-170, 170],
        yRange: [-120, 120],
        scaleRange: [0.86, 1.2],
        opacityRange: [0.62, 0.92],
        durationRange: [4.4, 7.2],
      },
    },
    {
      id: "achievements-lower-right",
      className:
        "top-[60%] -right-[18%] h-[70vw] max-h-[1040px] min-h-[400px] w-[78vw] max-w-[1160px] min-w-[440px]",
      background: buildSoftOrbGradient(
        "rgba(109, 139, 255, 0.72)",
        "rgba(40, 85, 255, 0.5)",
        "rgba(18, 53, 216, 0.2)",
        "rgba(18, 53, 216, 0.05)"
      ),
      bounds: {
        xRange: [-190, 100],
        yRange: [-130, 120],
        scaleRange: [0.88, 1.18],
        opacityRange: [0.7, 0.96],
        durationRange: [4.7, 7.7],
      },
    },
    {
      id: "achievements-bottom-left",
      className:
        "-bottom-[18%] -left-[18%] h-[68vw] max-h-[1000px] min-h-[400px] w-[80vw] max-w-[1200px] min-w-[440px]",
      background: buildSoftOrbGradient(
        "rgba(109, 139, 255, 0.62)",
        "rgba(40, 85, 255, 0.44)",
        "rgba(18, 53, 216, 0.17)",
        "rgba(18, 53, 216, 0.04)"
      ),
      bounds: {
        xRange: [-100, 190],
        yRange: [-130, 80],
        scaleRange: [0.88, 1.18],
        opacityRange: [0.66, 0.92],
        durationRange: [4.5, 7.5],
      },
    },
  ],
  principles: [
    {
      id: "principles-top-right",
      className:
        "-top-[26%] -right-[20%] h-[70vw] max-h-[1040px] min-h-[400px] w-[76vw] max-w-[1160px] min-w-[440px]",
      background: buildSoftOrbGradient(
        "rgba(109, 139, 255, 0.58)",
        "rgba(40, 85, 255, 0.4)",
        "rgba(18, 53, 216, 0.17)",
        "rgba(18, 53, 216, 0.04)"
      ),
      bounds: {
        xRange: [-200, 110],
        yRange: [-80, 160],
        scaleRange: [0.9, 1.18],
        opacityRange: [0.64, 0.92],
        durationRange: [6.0, 10.5],
      },
    },
    {
      id: "principles-bottom-left",
      className:
        "-bottom-[34%] -left-[24%] h-[74vw] max-h-[1100px] min-h-[420px] w-[84vw] max-w-[1280px] min-w-[460px]",
      background: buildSoftOrbGradient(
        "rgba(40, 85, 255, 0.58)",
        "rgba(18, 53, 216, 0.44)",
        "rgba(18, 53, 216, 0.19)",
        "rgba(18, 53, 216, 0.05)"
      ),
      bounds: {
        xRange: [-110, 200],
        yRange: [-160, 80],
        scaleRange: [0.88, 1.18],
        opacityRange: [0.62, 0.9],
        durationRange: [6.5, 11.0],
      },
    },
    {
      id: "principles-center-halo",
      className:
        "top-[14%] left-[16%] h-[60vw] max-h-[900px] min-h-[340px] w-[68vw] max-w-[1000px] min-w-[380px] opacity-70",
      background: buildSoftOrbGradient(
        "rgba(40, 85, 255, 0.32)",
        "rgba(18, 53, 216, 0.18)",
        "rgba(18, 53, 216, 0.08)",
        "rgba(18, 53, 216, 0.02)"
      ),
      bounds: {
        xRange: [-180, 180],
        yRange: [-120, 120],
        scaleRange: [0.86, 1.2],
        opacityRange: [0.46, 0.82],
        durationRange: [5.5, 9.5],
      },
    },
  ],
  footer: [
    {
      id: "footer-right-highlight",
      className:
        "-top-[18%] -right-[20%] h-[66vw] max-h-[980px] min-h-[380px] w-[72vw] max-w-[1080px] min-w-[420px]",
      background: buildSoftOrbGradient(
        "rgba(109, 139, 255, 0.36)",
        "rgba(40, 85, 255, 0.25)",
        "rgba(18, 53, 216, 0.1)",
        "rgba(18, 53, 216, 0.03)"
      ),
      bounds: {
        xRange: [-190, 100],
        yRange: [-70, 140],
        scaleRange: [0.9, 1.16],
        opacityRange: [0.52, 0.82],
        durationRange: [6.0, 10.5],
      },
    },
    {
      id: "footer-bottom-left",
      className:
        "-bottom-[34%] -left-[24%] h-[70vw] max-h-[1040px] min-h-[400px] w-[80vw] max-w-[1200px] min-w-[440px]",
      background: buildSoftOrbGradient(
        "rgba(40, 85, 255, 0.38)",
        "rgba(18, 53, 216, 0.28)",
        "rgba(18, 53, 216, 0.11)",
        "rgba(18, 53, 216, 0.03)"
      ),
      bounds: {
        xRange: [-100, 190],
        yRange: [-140, 70],
        scaleRange: [0.88, 1.16],
        opacityRange: [0.52, 0.82],
        durationRange: [6.5, 11.0],
      },
    },
    {
      id: "footer-center-halo",
      className:
        "top-[16%] left-[16%] h-[56vw] max-h-[820px] min-h-[320px] w-[64vw] max-w-[940px] min-w-[360px] opacity-60",
      background: buildSoftOrbGradient(
        "rgba(40, 85, 255, 0.19)",
        "rgba(18, 53, 216, 0.11)",
        "rgba(18, 53, 216, 0.04)",
        "rgba(18, 53, 216, 0.01)"
      ),
      bounds: {
        xRange: [-170, 170],
        yRange: [-110, 110],
        scaleRange: [0.86, 1.18],
        opacityRange: [0.42, 0.72],
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
 * Drifting PRD-palette radial ambient light orbs (`#080B18`, `#1235D8`, `#2855FF`, `#6D8BFF`)
 * using GPU-friendly multi-stop gradients and automatic viewport pause via `ScrollTrigger`.
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

      const orbNodes = gsap.utils.toArray<HTMLElement>(
        "[data-ambient-orb]",
        containerEl
      );
      orbNodes.forEach((node, index) => {
        const spec = orbs[index];
        if (!spec) return;
        gsap.set(node, {
          x: gsap.utils.random(
            spec.bounds.xRange[0] * 0.5,
            spec.bounds.xRange[1] * 0.5
          ),
          y: gsap.utils.random(
            spec.bounds.yRange[0] * 0.5,
            spec.bounds.yRange[1] * 0.5
          ),
          scale: gsap.utils.random(
            spec.bounds.scaleRange[0],
            spec.bounds.scaleRange[1]
          ),
          opacity: gsap.utils.random(
            spec.bounds.opacityRange[0],
            spec.bounds.opacityRange[1]
          ),
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
