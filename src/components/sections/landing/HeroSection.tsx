"use client";

import { useRef, type RefObject } from "react";
import Image from "next/image";
import heroPortrait from "../../../../public/images/hero.webp";
import { useLanguage } from "@/context/LanguageContext";
import { HERO_DATA } from "@/data/hero";
import type { Locale } from "@/data/types";
import { RichText } from "@/components/ui/RichText";
import { gsap, registerGsapPlugins, useGSAP } from "@/components/motion/gsapConfig";
import { PRELOADER_REVEAL_EVENT, hasPreloaderRevealed } from "@/components/layout/Preloader";

interface HeroMotionRefs {
  wrapperRef: RefObject<HTMLDivElement | null>;
  containerRef: RefObject<HTMLElement | null>;
  orbTopRightRef: RefObject<HTMLDivElement | null>;
  orbBottomLeftRef: RefObject<HTMLDivElement | null>;
  orbCenterRef: RefObject<HTMLDivElement | null>;
  textParallaxRef: RefObject<HTMLDivElement | null>;
  rolesRef: RefObject<HTMLUListElement | null>;
  portraitParallaxRef: RefObject<HTMLDivElement | null>;
  portraitEntranceRef: RefObject<HTMLDivElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
}

interface OrbDriftBounds {
  xRange: [number, number];
  yRange: [number, number];
  scaleRange: [number, number];
  opacityRange: [number, number];
  durationRange: [number, number];
}

/** Animates a background orb through continuous, randomized waypoints for organic, silky drift. */
function startRandomOrbDrift(
  target: HTMLDivElement | null,
  bounds: OrbDriftBounds,
  isActive: () => boolean
) {
  if (!target || !isActive()) return;

  const step = () => {
    if (!isActive()) return;
    gsap.to(target, {
      x: gsap.utils.random(bounds.xRange[0], bounds.xRange[1]),
      y: gsap.utils.random(bounds.yRange[0], bounds.yRange[1]),
      scale: gsap.utils.random(bounds.scaleRange[0], bounds.scaleRange[1]),
      rotation: gsap.utils.random(-18, 18),
      opacity: gsap.utils.random(bounds.opacityRange[0], bounds.opacityRange[1]),
      duration: gsap.utils.random(bounds.durationRange[0], bounds.durationRange[1]),
      ease: "sine.inOut",
      force3D: true,
      onComplete: step,
    });
  };

  step();
}

/** Coordinates hero ambient light drift, preloader-synced reveal, and desktop scroll parallax. */
function useHeroMotion(refs: HeroMotionRefs) {
  useGSAP(
    () => {
      registerGsapPlugins();

      let removeRevealListener: (() => void) | undefined;
      let revealTl: gsap.core.Timeline | null = null;
      let active = true;
      const isActive = () => active;

      startRandomOrbDrift(
        refs.orbTopRightRef.current,
        {
          xRange: [-260, 110],
          yRange: [-90, 210],
          scaleRange: [0.85, 1.22],
          opacityRange: [0.72, 1.0],
          durationRange: [3.0, 5.0],
        },
        isActive
      );
      startRandomOrbDrift(
        refs.orbBottomLeftRef.current,
        {
          xRange: [-120, 260],
          yRange: [-220, 90],
          scaleRange: [0.84, 1.24],
          opacityRange: [0.75, 1.0],
          durationRange: [3.2, 5.2],
        },
        isActive
      );
      startRandomOrbDrift(
        refs.orbCenterRef.current,
        {
          xRange: [-240, 240],
          yRange: [-150, 150],
          scaleRange: [0.8, 1.28],
          opacityRange: [0.5, 0.95],
          durationRange: [2.8, 4.8],
        },
        isActive
      );

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
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1 (0 -> 0.4): Shrink all texts toward center and fade out completely.
        if (refs.textParallaxRef.current) {
          scrollTl.to(
            refs.textParallaxRef.current,
            {
              scale: 0.82,
              autoAlpha: 0,
              transformOrigin: "center center",
              duration: 0.4,
              ease: "power1.in",
            },
            0
          );
        }
        if (refs.overlayRef.current) {
          scrollTl.to(
            refs.overlayRef.current,
            {
              scale: 0.82,
              autoAlpha: 0,
              transformOrigin: "center center",
              duration: 0.4,
              ease: "power1.in",
            },
            0
          );
        }

        // Phase 2 (0.4 -> 1.0): While TechStackSection slides up over Hero, slowly zoom, blur, and fade portrait.
        if (refs.portraitParallaxRef.current) {
          scrollTl.fromTo(
            refs.portraitParallaxRef.current,
            { scale: 1, filter: "blur(0px)", opacity: 1 },
            {
              scale: 1.09,
              filter: "blur(14px)",
              opacity: 0.15,
              transformOrigin: "center 35%",
              duration: 0.6,
              ease: "none",
            },
            0.4
          );
        }
      }

      return () => {
        active = false;
        gsap.killTweensOf([
          refs.orbTopRightRef.current,
          refs.orbBottomLeftRef.current,
          refs.orbCenterRef.current,
        ]);
        scrollTl?.scrollTrigger?.kill();
        scrollTl?.kill();
        revealTl?.kill();
        removeRevealListener?.();
      };
    },
    { scope: refs.containerRef }
  );
}

function HeroAmbientOrbs({
  orbTopRightRef,
  orbBottomLeftRef,
  orbCenterRef,
}: {
  orbTopRightRef: RefObject<HTMLDivElement | null>;
  orbBottomLeftRef: RefObject<HTMLDivElement | null>;
  orbCenterRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Top-right vibrant blue-purple highlight keeping top-left dark */}
      <div
        ref={orbTopRightRef}
        className="absolute -top-[30%] -right-[12%] h-[66vw] max-h-[1020px] min-h-[380px] w-[72vw] max-w-[1120px] min-w-[420px] blur-[64px] will-change-transform sm:blur-[90px]"
        style={{
          background:
            "radial-gradient(closest-side at center, rgba(109, 139, 255, 0.88) 0%, rgba(40, 85, 255, 0.68) 38%, rgba(18, 53, 216, 0.28) 70%, rgba(8, 11, 24, 0) 100%)",
        }}
      />
      {/* Bottom-left electric blue wash keeping top-left primary-black */}
      <div
        ref={orbBottomLeftRef}
        className="absolute -bottom-[34%] -left-[18%] h-[72vw] max-h-[1120px] min-h-[440px] w-[84vw] max-w-[1300px] min-w-[480px] blur-[72px] will-change-transform sm:blur-[96px]"
        style={{
          background:
            "radial-gradient(closest-side at center, rgba(40, 85, 255, 0.88) 0%, rgba(18, 53, 216, 0.78) 34%, rgba(18, 53, 216, 0.34) 68%, rgba(8, 11, 24, 0) 100%)",
        }}
      />
      {/* Subtle center-lower atmospheric halo behind portrait shoulders */}
      <div
        ref={orbCenterRef}
        className="absolute top-[22%] left-[20%] h-[52vw] max-h-[820px] min-h-[320px] w-[60vw] max-w-[920px] min-w-[340px] opacity-75 blur-[72px] will-change-transform sm:blur-[96px]"
        style={{
          background:
            "radial-gradient(closest-side at center, rgba(40, 85, 255, 0.45) 0%, rgba(18, 53, 216, 0.28) 50%, rgba(8, 11, 24, 0) 100%)",
        }}
      />
    </div>
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
      className="relative z-10 flex w-full flex-col items-center pt-[var(--hero-lock-top)] select-none"
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
      className="relative z-30 mx-auto mt-auto w-full max-w-[1440px] px-5 pb-5 sm:px-7 sm:pb-6 lg:px-8 lg:pb-6"
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
 * Layers slow-drifting PRD-palette light orbs behind giant `SOFTWARE ENGINEER`
 * display typography, discipline labels, the centered `hero.webp` portrait,
 * and foreground availability + corner metadata.
 */
export function HeroSection() {
  const { locale } = useLanguage();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const orbTopRightRef = useRef<HTMLDivElement>(null);
  const orbBottomLeftRef = useRef<HTMLDivElement>(null);
  const orbCenterRef = useRef<HTMLDivElement>(null);
  const textParallaxRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLUListElement>(null);
  const portraitParallaxRef = useRef<HTMLDivElement>(null);
  const portraitEntranceRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useHeroMotion({
    wrapperRef,
    containerRef,
    orbTopRightRef,
    orbBottomLeftRef,
    orbCenterRef,
    textParallaxRef,
    rolesRef,
    portraitParallaxRef,
    portraitEntranceRef,
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
        <HeroAmbientOrbs
          orbTopRightRef={orbTopRightRef}
          orbBottomLeftRef={orbBottomLeftRef}
          orbCenterRef={orbCenterRef}
        />

        <HeroTypographyLockup
          locale={locale}
          textParallaxRef={textParallaxRef}
          rolesRef={rolesRef}
        />

        {/* Foreground transparent portrait overlapping display typography */}
        <div
          ref={portraitParallaxRef}
          className="pointer-events-none absolute inset-x-0 top-[var(--hero-portrait-top)] bottom-0 z-20 flex justify-center overflow-hidden will-change-[transform,filter,opacity]"
        >
          <div ref={portraitEntranceRef} className="flex h-full justify-center will-change-transform">
            <Image
              src={heroPortrait}
              alt={HERO_DATA.portrait.alt[locale]}
              priority
              sizes="(max-width: 767px) 150vw, (max-width: 1023px) 120vw, 110vw"
              className="h-[max(118%,min(75.6vw,98rem))] w-auto max-w-none shrink-0 select-none"
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
