"use client";

import { useRef, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ACHIEVEMENTS, ACHIEVEMENTS_COPY } from "@/data/achievements";
import type {
  AchievementData,
  AchievementSlug,
  Locale,
  TextSegment,
} from "@/data/types";
import { RichText } from "@/components/ui/RichText";
import {
  gsap,
  ScrollTrigger,
  registerGsapPlugins,
  useGSAP,
} from "@/components/motion/gsapConfig";
import { cn } from "@/lib/utils";

interface CardSlotLayout {
  desktopPositionClass: string;
  imagePositionClass: string;
  entryNormalizedTime: number;
}

/**
 * Staggered card coordinates matching `assets/uiux/landingpage/achievements-scroll.png`:
 * - joints (left outer): x=6.8%, y=0
 * - ifest (right outer): x=right 6.4%, y=1.145 * cardHeight
 * - jurnal (left inner): x=17%, y=1.923 * cardHeight
 * - pelita (right inner): x=right 13.9%, y=2.978 * cardHeight
 */
const CARD_LAYOUT: Record<AchievementSlug, CardSlotLayout> = {
  joints: {
    desktopPositionClass: "lg:top-0 lg:left-[6.8%]",
    imagePositionClass: "object-center",
    entryNormalizedTime: 0.0,
  },
  ifest: {
    desktopPositionClass:
      "lg:top-[calc(var(--ach-card-h)*1.145)] lg:right-[6.4%]",
    imagePositionClass: "object-center",
    entryNormalizedTime: 0.19,
  },
  jurnal: {
    desktopPositionClass:
      "lg:top-[calc(var(--ach-card-h)*1.923)] lg:left-[17%]",
    imagePositionClass: "object-top",
    entryNormalizedTime: 0.35,
  },
  pelita: {
    desktopPositionClass:
      "lg:top-[calc(var(--ach-card-h)*2.978)] lg:right-[13.9%]",
    imagePositionClass: "object-center",
    entryNormalizedTime: 0.54,
  },
};

function splitTitleSegments(
  segments: TextSegment[]
): [TextSegment[], TextSegment[]] {
  const firstLine: TextSegment[] = [];
  const secondLine: TextSegment[] = [];
  let hasSplit = false;

  for (const segment of segments) {
    if (hasSplit) {
      secondLine.push(segment);
      continue;
    }

    const rawText = typeof segment === "string" ? segment : segment.text;
    const dashIndex = rawText.indexOf(" — ");

    if (dashIndex === -1) {
      firstLine.push(segment);
      if (rawText.endsWith(" —")) hasSplit = true;
      continue;
    }

    const beforeDash = rawText.slice(0, dashIndex + 2);
    const afterDash = rawText.slice(dashIndex + 3);

    if (typeof segment === "string") {
      if (beforeDash) firstLine.push(beforeDash);
      if (afterDash) secondLine.push(afterDash);
    } else {
      if (beforeDash) firstLine.push({ ...segment, text: beforeDash });
      if (afterDash) secondLine.push({ ...segment, text: afterDash });
    }
    hasSplit = true;
  }

  if (secondLine.length > 0) {
    const first = secondLine[0];
    if (typeof first === "string" && first.startsWith(" ")) {
      secondLine[0] = first.trimStart();
    } else if (typeof first === "object" && first.text.startsWith(" ")) {
      secondLine[0] = { ...first, text: first.text.trimStart() };
    }
  }

  return [firstLine, secondLine];
}

function useAchievementsMotion(
  sectionRef: RefObject<HTMLElement | null>,
  viewportRef: RefObject<HTMLDivElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
  ctaRef: RefObject<HTMLDivElement | null>
) {
  useGSAP(
    () => {
      registerGsapPlugins();
      ScrollTrigger.config({ ignoreMobileResize: true });

      const sectionEl = sectionRef.current;
      const viewportEl = viewportRef.current;
      const trackEl = trackRef.current;
      const ctaEl = ctaRef.current;
      if (!sectionEl || !viewportEl || !trackEl || !ctaEl) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isCompact: "(max-width: 1023px)",
        },
        (context) => {
          const { isDesktop } = context.conditions ?? {};

          gsap.set(ctaEl, { autoAlpha: 0 });
          const revealCta = () => {
            gsap.to(ctaEl, {
              autoAlpha: 1,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          };
          const hideCta = () => {
            gsap.to(ctaEl, {
              autoAlpha: 0,
              duration: 0.25,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          const ctaRevealTrigger = ScrollTrigger.create({
            trigger: sectionEl,
            start: isDesktop ? "top 2%" : "top 15%",
            end: "bottom top",
            onEnter: revealCta,
            onEnterBack: revealCta,
            onLeaveBack: hideCta,
          });
          if (ctaRevealTrigger.isActive) {
            gsap.set(ctaEl, { autoAlpha: 1 });
          }

          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-achievement-card]",
            trackEl
          );

          if (isDesktop && cards.length > 0) {
            const getStartY = () => viewportEl.clientHeight + 32;
            const getEndY = () => {
              const viewportH = viewportEl.clientHeight;
              const trackH = trackEl.offsetHeight;
              return Math.min(-(trackH - viewportH * 0.56), -trackH * 0.65);
            };
            const getScrollDistance = () => {
              const travel = getStartY() - getEndY();
              return Math.round(
                Math.max(viewportEl.clientHeight * 1.9, travel * 1.2)
              );
            };

            const scrollTl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionEl,
                pin: viewportEl,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                start: "top top",
                end: () => `+=${getScrollDistance()}`,
                scrub: 0.75,
                onToggle: (self) => {
                  trackEl.style.willChange = self.isActive
                    ? "transform"
                    : "auto";
                },
              },
            });

            scrollTl.fromTo(
              trackEl,
              { y: getStartY },
              { y: getEndY, ease: "none", duration: 1 },
              0
            );

            cards.forEach((cardEl) => {
              const slug = cardEl.dataset.slug as AchievementSlug | undefined;
              const entryTime = slug
                ? (CARD_LAYOUT[slug]?.entryNormalizedTime ?? 0)
                : 0;

              scrollTl.fromTo(
                cardEl,
                { autoAlpha: 0, y: 28 },
                {
                  autoAlpha: 1,
                  y: 0,
                  ease: "power2.out",
                  duration: 0.14,
                },
                entryTime
              );
            });

            return () => {
              ctaRevealTrigger.kill();
              trackEl.style.willChange = "";
            };
          }

          if (cards.length > 0) {
            gsap.set(cards, { y: 32, autoAlpha: 0 });
            ScrollTrigger.batch(cards, {
              start: "top 88%",
              once: true,
              onEnter: (batch) => {
                gsap.to(batch, {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.6,
                  stagger: 0.12,
                  ease: "power3.out",
                  overwrite: "auto",
                  clearProps: "transform,opacity,visibility",
                });
              },
            });
          }

          return () => {
            ctaRevealTrigger.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );
}

function ExploreArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className="size-[1em] shrink-0"
    >
      <path d="M5 19L18.5 5.5" />
      <path d="M7 5H19V17" />
    </svg>
  );
}

function AchievementCard({
  item,
  index,
  locale,
}: {
  item: AchievementData;
  index: number;
  locale: Locale;
}) {
  const layout = CARD_LAYOUT[item.slug];
  const [line1Segments, line2Segments] = splitTitleSegments(item.title[locale]);

  return (
    <figure
      data-achievement-card
      data-slug={item.slug}
      className={cn(
        "relative mx-auto aspect-[1600/1239] w-full max-w-[440px] overflow-hidden rounded-[6px] bg-primary-black shadow-[0_18px_45px_rgba(8,11,24,0.45)] md:max-w-none lg:absolute lg:mx-0 lg:w-[31%]",
        index % 2 === 1 && "md:mt-12 lg:mt-0",
        layout.desktopPositionClass
      )}
    >
      <Image
        src={item.landingImage}
        alt={item.landingAlt[locale]}
        fill
        loading="eager"
        decoding="async"
        sizes="(max-width: 767px) 92vw, (max-width: 1023px) 45vw, min(31vw, 446px)"
        className={cn("object-cover select-none", layout.imagePositionClass)}
      />

      <figcaption className="absolute inset-x-2 bottom-2 z-10 rounded-[5px] bg-[#3A3A3A]/[0.48] px-3.5 py-2.5 text-center text-lightblue backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] sm:inset-x-2.5 sm:bottom-2.5 sm:px-4 sm:py-3">
        <p className="text-xs leading-[1.35] [text-shadow:0_1px_2px_rgba(8,11,24,0.3)] sm:text-[0.8125rem] lg:text-[clamp(0.75rem,0.92vw,0.875rem)]">
          <span className="block font-normal">
            <RichText segments={line1Segments} />
          </span>
          {line2Segments.length > 0 ? (
            <span className="block font-semibold">
              <RichText segments={line2Segments} />
            </span>
          ) : null}
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * Achievements Showcase (`#achievements`) matching `assets/uiux/landingpage/achievements.png`
 * and `achievements-scroll.png`.
 * Renders on the shared seamless blue backdrop (`AchievementsOrganizationsBackdrop`), locks the
 * full-viewport stage on desktop scroll, fades in the fixed bottom-center Explore CTA once full,
 * and scrolls 4 staggered cards from bottom to top.
 */
export function AchievementsSection() {
  const { locale } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useAchievementsMotion(sectionRef, viewportRef, trackRef, ctaRef);

  const exploreLabel = ACHIEVEMENTS_COPY.landingExploreCta[locale].replace(
    /\s*↗$/,
    ""
  );

  return (
    <section
      ref={sectionRef}
      id="achievements"
      aria-labelledby="achievements-heading"
      className="relative z-20 isolate bg-transparent text-lightblue"
    >
      <div
        ref={viewportRef}
        className="relative w-full bg-transparent px-5 py-16 sm:px-8 sm:py-20 lg:h-dvh lg:overflow-clip lg:px-0 lg:py-0"
      >
        {/* Centered section heading */}
        <div className="relative z-10 mb-10 flex justify-center sm:mb-12 lg:pointer-events-none lg:absolute lg:inset-0 lg:mb-0 lg:items-center lg:px-6">
          <h2
            id="achievements-heading"
            className="text-center text-[clamp(1.375rem,2.36vw,2.25rem)] leading-[1.15] font-medium tracking-[0.01em] text-lightblue uppercase select-none"
          >
            {ACHIEVEMENTS_COPY.landingHeading[locale]}
          </h2>
        </div>

        {/* Staggered floating achievement cards */}
        <div
          ref={trackRef}
          className="relative z-20 mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-6 [--ach-card-h:calc(min(100vw,1440px)*0.31*1239/1600)] md:grid-cols-2 md:gap-x-7 md:gap-y-10 lg:block lg:h-[calc(var(--ach-card-h)*3.978)] lg:translate-y-[100dvh]"
        >
          {ACHIEVEMENTS.map((item, index) => (
            <AchievementCard
              key={item.slug}
              item={item}
              index={index}
              locale={locale}
            />
          ))}
        </div>

        {/* Fixed bottom-center CTA inside this section; fades in when full layout enters view (no hover) */}
        <div
          ref={ctaRef}
          className="pointer-events-none sticky bottom-6 z-30 mt-10 flex justify-center pb-[env(safe-area-inset-bottom)] lg:absolute lg:inset-x-0 lg:bottom-8 lg:mt-0 lg:pb-0"
        >
          <Link
            href="/achievements"
            className="pointer-events-auto inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#3A3A3A]/70 px-6 py-2.5 text-sm font-medium tracking-[0.01em] whitespace-nowrap text-lightblue backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-black lg:bg-white/[0.46]"
          >
            <span>{exploreLabel}</span>
            <ExploreArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
