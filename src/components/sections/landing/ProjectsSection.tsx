"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECT_SHARED_COPY, PROJECTS } from "@/data/projects";
import type { TextSegment } from "@/data/types";
import { RichText } from "@/components/ui/RichText";
import { ProjectCursorVideo } from "./ProjectCursorVideo";
import {
  gsap,
  ScrollSmoother,
  ScrollTrigger,
  registerGsapPlugins,
  useGSAP,
} from "@/components/motion/gsapConfig";

const TOTAL_SLIDES = PROJECTS.length + 1;

function extractPlainText(segments: TextSegment[]): string {
  return segments
    .map((segment) => (typeof segment === "string" ? segment : segment.text))
    .join("");
}

function normalizeWheelDelta(delta: number, deltaMode: number): number {
  if (deltaMode === 1) return delta * 16;
  if (deltaMode === 2) return delta * window.innerHeight;
  return delta;
}

function DiagonalArrowIcon({ direction }: { direction: "down-left" | "up-right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={
        direction === "down-left"
          ? "h-[1.05em] w-[1.05em] shrink-0 transition-transform duration-300 ease-out group-hover:-translate-x-0.5 group-hover:translate-y-0.5"
          : "h-[1.05em] w-[1.05em] shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      }
    >
      {direction === "down-left" ? (
        <>
          <path d="M19 5L5.5 18.5" />
          <path d="M5 7V19H17" />
        </>
      ) : (
        <>
          <path d="M5 19L18.5 5.5" />
          <path d="M7 5H19V17" />
        </>
      )}
    </svg>
  );
}

/**
 * Landing Projects showcase (`#projects`).
 * Starts on the full-viewport `PROYEK` / `PROJECTS` canvas (`proyek.png`),
 * pins to the viewport, and glides horizontally with subtle cover parallax
 * through the 4 project banners (`LP_kasir`, `LP_landeuh`, `LP_ais`, `LP_webgis`).
 */
export function ProjectsSection() {
  const { locale } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const introTitleRef = useRef<HTMLHeadingElement>(null);
  const horizontalTriggerRef = useRef<ScrollTrigger | null>(null);
  const trackListenersRef = useRef<Set<() => void>>(new Set());

  const subscribeTrackUpdate = useCallback((listener: () => void) => {
    const listeners = trackListenersRef.current;
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  useGSAP(
    () => {
      registerGsapPlugins();

      const sectionEl = sectionRef.current;
      const trackEl = trackRef.current;
      if (!sectionEl || !trackEl) return;

      if (introTitleRef.current) {
        gsap.fromTo(
          introTitleRef.current,
          { y: 28, scale: 0.94 },
          {
            y: 0,
            scale: 1,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: sectionEl,
              start: "top bottom",
              end: "top top",
              scrub: 0.12,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      const getScrollDistance = () =>
        (TOTAL_SLIDES - 1) * window.innerHeight * 1.35;

      const horizontalTween = gsap.to(trackEl, {
        x: () => -(trackEl.scrollWidth - window.innerWidth),
        ease: "none",
        force3D: true,
        onUpdate: () => {
          trackListenersRef.current.forEach((listener) => listener());
        },
        scrollTrigger: {
          trigger: sectionEl,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 0.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Subtle horizontal parallax window on each full-bleed project banner
      const projectImageWraps = gsap.utils.toArray<HTMLElement>(
        "[data-project-image]",
        trackEl
      );
      projectImageWraps.forEach((imgWrap) => {
        const slideEl = imgWrap.closest<HTMLElement>("[data-project-slug]");
        if (!slideEl) return;
        gsap.fromTo(
          imgWrap,
          { xPercent: -5, scale: 1.09 },
          {
            xPercent: 5,
            scale: 1.09,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: slideEl,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });

      horizontalTriggerRef.current = horizontalTween.scrollTrigger ?? null;

      return () => {
        horizontalTriggerRef.current = null;
      };
    },
    { scope: sectionRef }
  );

  // Support two-finger horizontal touchpad scroll (WheelEvent deltaX) while keeping vertical scroll intact
  useEffect(() => {
    const viewportEl = viewportRef.current;
    const trackEl = trackRef.current;
    if (!viewportEl || !trackEl) return;

    let wheelIdleTimer: number | null = null;
    let wheelTargetY: number | null = null;

    const handleWheel = (event: WheelEvent) => {
      const trigger = horizontalTriggerRef.current;
      if (!trigger || trigger.end <= trigger.start) return;

      const rect = viewportEl.getBoundingClientRect();
      const isStagePinned =
        trigger.isActive ||
        (rect.top <= 4 && rect.bottom >= window.innerHeight - 4);
      if (!isStagePinned) return;

      const dx = normalizeWheelDelta(event.deltaX, event.deltaMode);
      const dy = normalizeWheelDelta(event.deltaY, event.deltaMode);

      if (Math.abs(dx) <= Math.abs(dy) || dx === 0) {
        wheelTargetY = null;
        return;
      }

      const horizontalRange = trackEl.scrollWidth - window.innerWidth;
      if (horizontalRange <= 0) return;

      event.preventDefault();

      const smoother = ScrollSmoother.get();
      const currentScrollY = smoother ? smoother.scrollTop() : window.scrollY;
      const scrollPerHorizontalPx =
        (trigger.end - trigger.start) / horizontalRange;
      const clampedOrigin = gsap.utils.clamp(
        trigger.start,
        trigger.end,
        wheelTargetY ?? currentScrollY
      );

      if (dx < 0 && clampedOrigin <= trigger.start) return;
      if (dx > 0 && clampedOrigin >= trigger.end) return;

      const nextY = gsap.utils.clamp(
        trigger.start,
        trigger.end,
        clampedOrigin + dx * scrollPerHorizontalPx
      );
      wheelTargetY = nextY;

      if (smoother) {
        smoother.scrollTop(nextY);
      } else {
        window.scrollTo({ top: nextY, behavior: "instant" });
      }

      if (wheelIdleTimer !== null) {
        window.clearTimeout(wheelIdleTimer);
      }
      wheelIdleTimer = window.setTimeout(() => {
        wheelTargetY = null;
        wheelIdleTimer = null;
      }, 120);
    };

    viewportEl.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      if (wheelIdleTimer !== null) {
        window.clearTimeout(wheelIdleTimer);
      }
      viewportEl.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleSlideFocus = (slideIndex: number, target: HTMLElement) => {
    if (!target.matches(":focus-visible")) return;

    const trigger = horizontalTriggerRef.current;
    if (!trigger || trigger.end <= trigger.start) return;

    const targetProgress = slideIndex / (TOTAL_SLIDES - 1);
    if (Math.abs(trigger.progress - targetProgress) < 0.08) return;

    const targetY =
      trigger.start + (trigger.end - trigger.start) * targetProgress;
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(targetY, true);
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const visitLabel = PROJECT_SHARED_COPY.landingVisitCta[locale].replace(
    /^↙\s*/,
    ""
  );
  const approachLabel = PROJECT_SHARED_COPY.landingApproachCta[locale].replace(
    /\s*↗$/,
    ""
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-labelledby="projects-section-heading"
      className="relative z-20 bg-primary-black text-lightblue"
    >
      <div
        ref={viewportRef}
        className="relative h-screen h-[100dvh] w-full overflow-hidden overscroll-x-contain bg-primary-black"
      >
        <div
          ref={trackRef}
          className="flex h-full flex-row flex-nowrap"
          style={{ width: `${TOTAL_SLIDES * 100}vw` }}
        >
          {/* Slide 1: Full-viewport PROYEK / PROJECTS canvas (proyek.png) */}
          <div className="relative flex h-full w-screen shrink-0 items-center justify-center bg-primary-black px-6 select-none">
            <h2
              ref={introTitleRef}
              id="projects-section-heading"
              className="text-center text-[clamp(3.5rem,14vw,14rem)] leading-none font-medium tracking-[-0.02em] text-lightblue uppercase will-change-transform"
            >
              {PROJECT_SHARED_COPY.landingIntroTitle[locale]}
            </h2>
          </div>

          {/* Slides 2–5: Full-bleed project banners (LP_kasir..LP_webgis) */}
          {PROJECTS.map((project, index) => {
            const slideIndex = index + 1;
            const plainTitle = extractPlainText(project.title[locale]);

            return (
              <article
                key={project.slug}
                data-project-slug={project.slug}
                className="relative h-full w-screen shrink-0 overflow-hidden bg-primary-black"
              >
                <div
                  data-project-image
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    src={project.landingImage}
                    alt={project.landingAlt[locale]}
                    fill
                    priority={slideIndex <= 2}
                    loading={slideIndex <= 2 ? "eager" : "lazy"}
                    decoding="async"
                    sizes="100vw"
                    className="object-cover object-center select-none"
                  />
                </div>

                {/* Bottom contrast scrim & subtle radial-black atmosphere */}
                <div
                  aria-hidden="true"
                  className="bg-radial-black pointer-events-none absolute inset-0 opacity-60"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] bg-linear-to-t from-[#080B18]/85 via-[#080B18]/45 via-45% to-transparent"
                />

                {/* Bottom edge-to-edge action & title bar matching Figma LP_*.png */}
                <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-3 md:px-7 md:pb-4 lg:px-9 lg:pb-5">
                  <div className="flex flex-col gap-2.5 md:grid md:grid-cols-[1fr_auto_1fr] md:items-end md:gap-6">
                    <h3 className="text-center text-[clamp(1rem,1.5vw,1.875rem)] leading-[1.2] font-medium text-balance text-lightblue md:order-2 md:max-w-[51vw]">
                      <RichText copy={project.title} />
                    </h3>

                    <div className="flex items-end justify-between gap-4 md:contents">
                      <a
                        href={project.visitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-project-cta
                        aria-label={`${visitLabel} — ${plainTitle}`}
                        onFocus={(event) =>
                          handleSlideFocus(slideIndex, event.currentTarget)
                        }
                        className="group inline-flex min-h-[44px] items-end gap-[0.55em] justify-self-start rounded-md pt-3 pr-2 pb-0.5 text-[clamp(1rem,1.5vw,1.875rem)] leading-none font-medium text-lightblue transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-black md:order-1"
                      >
                        <DiagonalArrowIcon direction="down-left" />
                        <span>{visitLabel}</span>
                      </a>

                      <Link
                        href={project.route}
                        data-project-cta
                        aria-label={`${approachLabel} — ${plainTitle}`}
                        onFocus={(event) =>
                          handleSlideFocus(slideIndex, event.currentTarget)
                        }
                        className="group inline-flex min-h-[44px] items-end justify-end gap-[0.55em] justify-self-end rounded-md pt-3 pb-0.5 pl-2 text-[clamp(1rem,1.5vw,1.875rem)] leading-none font-medium text-lightblue transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-black md:order-3"
                      >
                        <span>{approachLabel}</span>
                        <DiagonalArrowIcon direction="up-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <ProjectCursorVideo
          sectionRef={sectionRef}
          viewportRef={viewportRef}
          trackRef={trackRef}
          projects={PROJECTS}
          subscribeTrackUpdate={subscribeTrackUpdate}
        />
      </div>
    </section>
  );
}
