"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PRELOADER_DATA } from "@/data/preloader";
import { gsap, registerGsapPlugins, useGSAP } from "@/components/motion/gsapConfig";

export const PRELOADER_REVEAL_EVENT = "porto:preloader-reveal";

let preloaderRevealed = false;

/** Returns true once the intro preloader has started its fade-out reveal. */
export function hasPreloaderRevealed(): boolean {
  return preloaderRevealed;
}

/**
 * Fullscreen 4-second intro preloader on a primary-black canvas with dual corner
 * radial lights (white top-left, primary-blue bottom-right), bilingual tagline,
 * and a vertical-rolling milestone percentage counter (0%, 25%, 75%, 100%).
 */
export function Preloader() {
  const { locale } = useLanguage();
  const [isDone, setIsDone] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftTopLightRef = useRef<HTMLDivElement | null>(null);
  const rightBottomLightRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (isDone) return;
      registerGsapPlugins();

      const container = containerRef.current;
      const leftTop = leftTopLightRef.current;
      const rightBottom = rightBottomLightRef.current;
      const track = trackRef.current;

      if (!container || !leftTop || !rightBottom || !track) return;

      const total = PRELOADER_DATA.durationSec; // 4.0s
      const halfTime = total * 0.5; // 2.0s (1/2 time)
      const threeQuarterTime = total * 0.75; // 3.0s (3/4 time)
      const quarterTime = total * 0.25; // 1.0s (1/4 time)

      gsap.set(leftTop, {
        scaleX: 0.22,
        scaleY: 0.22,
        x: 0,
        y: 0,
        opacity: 0.62,
        force3D: true,
      });
      gsap.set(rightBottom, {
        scale: 0.22,
        x: 0,
        y: 0,
        opacity: 0.78,
        force3D: true,
      });
      gsap.set(track, { yPercent: 0, force3D: true });

      const tl = gsap.timeline({
        onComplete: () => {
          preloaderRevealed = true;
          window.dispatchEvent(new CustomEvent(PRELOADER_REVEAL_EVENT));
          setIsDone(true);
        },
      });

      // Phase 1 (0 -> 1/2 time):
      // Top-left white light expands gently to 25%; bottom-right primary-blue expands to 50%.
      tl.to(
        leftTop,
        {
          scaleX: 0.46,
          scaleY: 0.46,
          opacity: 0.75,
          duration: halfTime,
          ease: "sine.inOut",
        },
        0
      );
      tl.to(
        rightBottom,
        {
          scale: 0.9,
          opacity: 0.92,
          duration: halfTime,
          ease: "sine.inOut",
        },
        0
      );

      // Phase 2 (1/2 time -> 3/4 time):
      // Top-left white light widens by 50%; bottom-right primary-blue continues expanding.
      tl.to(
        leftTop,
        {
          scaleX: 1.2,
          scaleY: 0.92,
          x: "8vw",
          y: "4vh",
          opacity: 0.85,
          duration: quarterTime,
          ease: "power2.inOut",
        },
        halfTime
      );
      tl.to(
        rightBottom,
        {
          scale: 1.18,
          x: "-6vw",
          y: "-4vh",
          opacity: 0.96,
          duration: quarterTime,
          ease: "power2.inOut",
        },
        halfTime
      );

      // Phase 3 (3/4 time -> 4/4 time, remaining 1/4 time):
      // Both lights converge toward the center and fuse seamlessly together.
      tl.to(
        leftTop,
        {
          scaleX: 1.75,
          scaleY: 1.68,
          x: "40vw",
          y: "34vh",
          opacity: 0.72,
          duration: quarterTime,
          ease: "power2.inOut",
        },
        threeQuarterTime
      );
      tl.to(
        rightBottom,
        {
          scale: 1.85,
          x: "-40vw",
          y: "-34vh",
          opacity: 0.98,
          duration: quarterTime,
          ease: "power2.inOut",
        },
        threeQuarterTime
      );

      // Progress counter across 4 seconds displaying ONLY 0%, 25%, 75%, 100%
      // 4 stacked items -> yPercent steps: 0 -> -25 (25%) -> -50 (75%) -> -75 (100%)
      tl.to(
        track,
        {
          yPercent: -25,
          duration: 0.65,
          ease: "power3.inOut",
        },
        0.75
      );
      tl.to(
        track,
        {
          yPercent: -50,
          duration: 0.7,
          ease: "power3.inOut",
        },
        1.75
      );
      tl.to(
        track,
        {
          yPercent: -75,
          duration: 0.75,
          ease: "power3.inOut",
        },
        2.95
      );

      // Phase 4 (after 4.0s): Fade out the entire loader smoothly
      tl.to(
        container,
        {
          opacity: 0,
          duration: 0.55,
          ease: "power2.inOut",
          onStart: () => {
            container.style.pointerEvents = "none";
          },
        },
        total
      );
    },
    { scope: containerRef }
  );

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label={PRELOADER_DATA.ariaLabel[locale]}
      className="fixed inset-0 z-[100] flex h-dvh w-full items-center justify-center overflow-hidden bg-primary-black select-none"
    >
      {/* Dual light effects: white top-left + primary-blue bottom-right */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          ref={leftTopLightRef}
          className="absolute -top-[48vmax] -left-[48vmax] h-[96vmax] w-[96vmax] will-change-transform mix-blend-screen"
          style={{
            transform: "scale(0.22)",
            opacity: 0.62,
            background:
              "radial-gradient(closest-side at center, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.38) 38%, rgba(234, 240, 255, 0.14) 68%, rgba(255, 255, 255, 0) 100%)",
          }}
        />
        <div
          ref={rightBottomLightRef}
          className="absolute -right-[48vmax] -bottom-[48vmax] h-[96vmax] w-[96vmax] will-change-transform mix-blend-screen"
          style={{
            transform: "scale(0.22)",
            opacity: 0.78,
            background:
              "radial-gradient(closest-side at center, rgba(18, 53, 216, 0.98) 0%, rgba(18, 53, 216, 0.72) 42%, rgba(18, 53, 216, 0.28) 72%, rgba(18, 53, 216, 0) 100%)",
          }}
        />
      </div>

      {/* Center bilingual tagline (CSS-gated via html[data-porto-lang] to avoid SSR/hydration flash) */}
      <p className="relative z-10 px-6 text-center text-xl font-normal tracking-[-0.02em] text-lightblue [text-shadow:0_2px_20px_rgba(8,11,24,0.45)] sm:text-2xl md:text-[28px] lg:text-[32px]">
        <span className="preloader-tagline-id">{PRELOADER_DATA.tagline.id}</span>
        <span className="preloader-tagline-en">{PRELOADER_DATA.tagline.en}</span>
      </p>

      {/* Bottom-right rolling milestone counter (0%, 25%, 75%, 100%) */}
      <div
        aria-hidden="true"
        className="absolute right-6 bottom-6 z-10 flex items-baseline text-[clamp(3.25rem,11vw,7.5rem)] leading-[1.02] font-light tracking-[-0.03em] text-lightblue tabular-nums [text-shadow:0_2px_24px_rgba(8,11,24,0.45)] sm:right-10 sm:bottom-8 lg:right-12 lg:bottom-10"
      >
        <div className="h-[1.05em] overflow-hidden text-right">
          <div ref={trackRef} className="flex flex-col will-change-transform">
            {PRELOADER_DATA.steps.map((value) => (
              <span key={value} className="block h-[1.05em] leading-[1.05]">
                {value}
              </span>
            ))}
          </div>
        </div>
        <span className="ml-[0.04em] leading-[1.05]">%</span>
      </div>
    </div>
  );
}
