"use client";

import { useRef, type RefObject } from "react";
import Image from "next/image";
import heroPortrait from "../../../../public/images/hero.webp";
import { useLanguage } from "@/context/LanguageContext";
import { HERO_DATA } from "@/data/hero";
import type { Locale } from "@/data/types";
import { RichText } from "@/components/ui/RichText";
import { HeroAmbientLight } from "@/components/motion/HeroAmbientLight";
import { gsap, registerGsapPlugins, useGSAP } from "@/components/motion/gsapConfig";
import { PRELOADER_REVEAL_EVENT, hasPreloaderRevealed } from "@/components/layout/Preloader";

interface HeroMotionRefs {
  wrapperRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLElement | null>;
  textParallaxRef: RefObject<HTMLDivElement | null>;
  rolesRef: RefObject<HTMLUListElement | null>;
  portraitParallaxRef: RefObject<HTMLDivElement | null>;
  portraitEntranceRef: RefObject<HTMLDivElement | null>;
  portraitCrispRef: RefObject<HTMLImageElement | null>;
  portraitBlurredRef: RefObject<HTMLImageElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
}

/** Coordinates preloader-synced reveal and GPU-composited desktop/mobile scroll parallax. */
function useHeroMotion(refs: HeroMotionRefs) {
  useGSAP(
    () => {
      registerGsapPlugins();

      let removeRevealListener: (() => void) | undefined;
      let revealTl: gsap.core.Timeline | null = null;

      const overlayItems = refs.overlayRef.current?.querySelectorAll("[data-hero-reveal]");
      const revealTextTargets: Element[] = [];
      if (refs.rolesRef.current) revealTextTargets.push(refs.rolesRef.current);
      if (overlayItems && overlayItems.length > 0) {
        revealTextTargets.push(...Array.from(overlayItems));
      }
      const portraitEl = refs.portraitEntranceRef.current;

      const playReveal = () => {
        revealTl?.kill();
        revealTl = gsap.timeline();

        if (revealTextTargets.length > 0) {
          revealTl.fromTo(
            revealTextTargets,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 2,
              ease: "power2.out",
              clearProps: "opacity,visibility",
            },
            0
          );
        }

        if (portraitEl) {
          revealTl.fromTo(
            portraitEl,
            { x: 24 },
            {
              x: 0,
              duration: 2,
              ease: "none",
              force3D: true,
              clearProps: "transform",
            },
            0
          );
        }
      };

      if (hasPreloaderRevealed()) {
        playReveal();
      } else {
        if (revealTextTargets.length > 0) {
          gsap.set(revealTextTargets, { autoAlpha: 0 });
        }
        if (portraitEl) {
          gsap.set(portraitEl, { x: 24 });
        }

        const handlePreloaderReveal = () => {
          playReveal();
        };
        window.addEventListener(PRELOADER_REVEAL_EVENT, handlePreloaderReveal, { once: true });
        removeRevealListener = () => {
          window.removeEventListener(PRELOADER_REVEAL_EVENT, handlePreloaderReveal);
        };
      }

      let scrollTl: gsap.core.Timeline | null = null;
      if (refs.wrapperRef.current && refs.containerRef.current) {
        scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: refs.wrapperRef.current,
            start: "top top",
            end: "bottom top",
            pin: refs.containerRef.current,
            pinSpacing: false,
            scrub: 0.12,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1 (0 -> 0.4): Shrink & subtly lift all texts toward center while fading out.
        if (refs.textParallaxRef.current) {
          scrollTl.to(
            refs.textParallaxRef.current,
            {
              scale: 0.82,
              y: -26,
              autoAlpha: 0,
              transformOrigin: "center center",
              duration: 0.4,
              ease: "power1.in",
              force3D: true,
            },
            0
          );
        }
        if (refs.overlayRef.current) {
          scrollTl.to(
            refs.overlayRef.current,
            {
              scale: 0.84,
              y: 14,
              autoAlpha: 0,
              transformOrigin: "center center",
              duration: 0.4,
              ease: "power1.in",
              force3D: true,
            },
            0
          );
        }

        // Phase 2 (0.4 -> 1.0): While TechStackSection slides up over Hero, zoom & fade portrait
        // by crossfading to a pre-blurred layer instead of animating per-frame CSS filter blur.
        if (refs.portraitParallaxRef.current) {
          scrollTl.fromTo(
            refs.portraitParallaxRef.current,
            { scale: 1, opacity: 1 },
            {
              scale: 1.09,
              opacity: 0.16,
              transformOrigin: "center 35%",
              duration: 0.6,
              ease: "none",
              force3D: true,
            },
            0.4
          );
        }
        if (refs.portraitCrispRef.current) {
          scrollTl.fromTo(
            refs.portraitCrispRef.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.55, ease: "none" },
            0.4
          );
        }
        if (refs.portraitBlurredRef.current) {
          scrollTl.fromTo(
            refs.portraitBlurredRef.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.55, ease: "none" },
            0.4
          );
        }
      }

      return () => {
        scrollTl?.scrollTrigger?.kill();
        scrollTl?.kill();
        revealTl?.kill();
        removeRevealListener?.();
      };
    },
    { scope: refs.wrapperRef }
  );
}

function HeroTypographyLockup({
  locale,
  textParallaxRef,
  rolesRef,
}: {
  locale: Locale;
  textParallaxRef: RefObject<HTMLDivElement | null>;
  rolesRef: RefObject<HTMLUListElement | null>;
}) {
  return (
    <div
      ref={textParallaxRef}
      className="relative z-10 flex w-full flex-col items-center pt-[var(--hero-lock-top)] will-change-transform select-none"
    >
      <div className="relative flex w-full flex-col items-center">
        <h1
          style={{ fontSize: "var(--hero-display-size)" }}
          className="flex flex-col items-center text-center leading-[0.82] font-medium tracking-[-0.02em] uppercase"
        >
          <span className="bg-gradient-to-b from-white via-lightblue via-65% to-lightblue/80 bg-clip-text text-transparent">
            {HERO_DATA.displayLines[0]}
          </span>{" "}
          <span className="mt-[max(1.75rem,0.16em)] bg-gradient-to-b from-white via-lightblue via-65% to-lightblue/80 bg-clip-text text-transparent">
            {HERO_DATA.displayLines[1]}
          </span>
        </h1>

        <ul
          ref={rolesRef}
          aria-label={locale === "id" ? "Bidang keahlian" : "Core disciplines"}
          style={{ fontSize: "var(--hero-display-size)" }}
          className="absolute top-1/2 left-1/2 flex w-[min(88vw,4.62em)] -translate-x-1/2 -translate-y-1/2 items-center justify-between"
        >
          {HERO_DATA.roles.map((role) => (
            <li
              key={role}
              className="text-[10px] font-bold tracking-[0.04em] text-white uppercase sm:text-xs md:text-sm lg:text-[15px] xl:text-base"
            >
              {role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HeroBottomMetadata({
  locale,
  overlayRef,
}: {
  locale: Locale;
  overlayRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={overlayRef}
      className="relative z-30 mx-auto mt-auto w-full max-w-[1440px] px-5 pb-5 will-change-transform sm:px-7 sm:pb-6 lg:px-8 lg:pb-6"
    >
      <div className="grid grid-cols-2 items-end gap-x-4 gap-y-5 sm:grid-cols-[1fr_auto_1fr]">
        <p
          data-hero-reveal
          className="col-span-2 text-center text-lg leading-[1.2] font-semibold tracking-[-0.015em] text-white [text-shadow:0_2px_16px_rgba(8,11,24,0.45)] sm:order-2 sm:col-span-1 sm:text-xl md:text-2xl lg:text-[26px] xl:text-[30px]"
        >
          <span className="block">{HERO_DATA.availabilityLabel[locale]}</span>{" "}
          <span className="block">{HERO_DATA.availabilityPeriod[locale]}</span>
        </p>

        <div
          data-hero-reveal
          className="order-2 text-left text-xs leading-snug font-medium tracking-[0.02em] uppercase sm:order-1 sm:text-sm lg:text-[15px]"
        >
          <p className="text-white">{HERO_DATA.bottomLeftPrimary[locale]}</p>
          <p className="mt-0.5 text-primary-purple">{HERO_DATA.bottomLeftSecondary[locale]}</p>
        </div>

        <div
          data-hero-reveal
          className="order-3 text-right text-xs leading-snug font-medium tracking-[0.02em] uppercase sm:text-sm lg:text-[15px]"
        >
          <p className="text-white">
            <RichText copy={HERO_DATA.bottomRightPrimary} />
          </p>
          <p className="mt-0.5 text-primary-purple">
            <RichText copy={HERO_DATA.bottomRightSecondary} />
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Full-viewport Hero section (`#hero`) matching `assets/uiux/landingpage/hero.png`.
 * Layers viewport-aware drifting PRD-palette light orbs behind giant `SOFTWARE ENGINEER`
 * display typography, discipline labels, the centered `hero.webp` portrait,
 * and foreground availability + corner metadata.
 */
export function HeroSection() {
  const { locale } = useLanguage();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const textParallaxRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLUListElement>(null);
  const portraitParallaxRef = useRef<HTMLDivElement>(null);
  const portraitEntranceRef = useRef<HTMLDivElement>(null);
  const portraitCrispRef = useRef<HTMLImageElement>(null);
  const portraitBlurredRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useHeroMotion({
    wrapperRef,
    containerRef,
    textParallaxRef,
    rolesRef,
    portraitParallaxRef,
    portraitEntranceRef,
    portraitCrispRef,
    portraitBlurredRef,
    overlayRef,
  });

  return (
    <div ref={wrapperRef} className="relative z-10">
      <section
        ref={containerRef}
        id="hero"
        aria-label={HERO_DATA.portrait.alt[locale]}
        className="relative flex min-h-dvh w-full flex-col justify-between overflow-hidden bg-primary-black [--hero-display-size:min(15.5vw,21dvh)] [--hero-lock-top:clamp(2.5rem,13dvh,7.75rem)] [--hero-portrait-top:calc(var(--hero-lock-top)_-_0.45*var(--hero-display-size))] md:[--hero-display-size:min(14.5vw,24dvh)] md:[--hero-lock-top:clamp(4.25rem,10dvh,7.5rem)] md:[--hero-portrait-top:calc(var(--hero-lock-top)_-_0.35*var(--hero-display-size))] lg:[--hero-display-size:min(13.7vw,31.5dvh,18rem)] lg:[--hero-lock-top:clamp(2.25rem,6.2dvh,4.75rem)] lg:[--hero-portrait-top:var(--hero-lock-top)]"
      >
        <HeroAmbientLight variant="hero" />

        <HeroTypographyLockup
          locale={locale}
          textParallaxRef={textParallaxRef}
          rolesRef={rolesRef}
        />

        {/* Foreground transparent portrait overlapping display typography */}
        <div
          ref={portraitParallaxRef}
          className="pointer-events-none absolute inset-x-0 top-[var(--hero-portrait-top)] bottom-0 z-20 flex justify-center overflow-hidden will-change-transform"
        >
          <div ref={portraitEntranceRef} className="relative flex h-full justify-center will-change-transform">
            <Image
              ref={portraitCrispRef}
              src={heroPortrait}
              alt={HERO_DATA.portrait.alt[locale]}
              priority
              sizes="(max-width: 767px) 150vw, (max-width: 1023px) 120vw, 110vw"
              className="h-[max(118%,min(75.6vw,98rem))] w-auto max-w-none shrink-0 select-none"
            />
            <Image
              ref={portraitBlurredRef}
              src={heroPortrait}
              alt=""
              aria-hidden="true"
              priority
              sizes="(max-width: 767px) 150vw, (max-width: 1023px) 120vw, 110vw"
              style={{ opacity: 0, visibility: "hidden" }}
              className="pointer-events-none absolute top-0 left-1/2 h-[max(118%,min(75.6vw,98rem))] w-auto max-w-none -translate-x-1/2 shrink-0 blur-[10px] select-none"
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-25 h-44 bg-gradient-to-t from-primary-black/80 via-primary-black/35 to-transparent lg:hidden"
        />

        <HeroBottomMetadata locale={locale} overlayRef={overlayRef} />
      </section>
      <div aria-hidden="true" className="pointer-events-none h-[65dvh] w-full" />
    </div>
  );
}
