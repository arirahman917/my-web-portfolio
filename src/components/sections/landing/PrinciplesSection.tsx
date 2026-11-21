"use client";

import { useRef, type RefObject } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { PRINCIPLES, PRINCIPLES_COPY } from "@/data/principles";
import type { Locale, PrincipleData } from "@/data/types";
import { RichText } from "@/components/ui/RichText";
import { HeroAmbientLight } from "@/components/motion/HeroAmbientLight";
import {
  gsap,
  ScrollTrigger,
  registerGsapPlugins,
  useGSAP,
} from "@/components/motion/gsapConfig";
import { cn } from "@/lib/utils";

const CARD_Z_INDEX_CLASSES: readonly string[] = [
  "z-10",
  "z-20",
  "z-30",
  "z-40",
];

interface PrincipleCardProps {
  item: PrincipleData;
  index: number;
  locale: Locale;
}

function PrincipleCard({ item, index, locale }: PrincipleCardProps) {
  const zIndexClass = CARD_Z_INDEX_CLASSES[index] ?? "z-10";

  return (
    <article
      data-principle-card={index}
      className={cn(
        "relative w-full border-t border-white/75 motion-safe:md:absolute motion-safe:md:inset-x-0 motion-safe:md:top-0 motion-safe:md:will-change-transform",
        index > 0 && "motion-safe:md:top-full",
        zIndexClass
      )}
    >
      {/* Always-open 2-column content layout matching principles.png */}
      <div
        data-principle-content={index}
        className="grid grid-cols-1 items-start gap-y-3.5 pb-7 sm:gap-y-4 sm:pb-9 md:grid-cols-[40%_1fr] md:gap-x-6 lg:grid-cols-[43.5%_1fr] lg:gap-x-8 lg:pb-[clamp(2rem,4.2dvh,3.25rem)]"
      >
        <div className="flex flex-col items-start">
          {/* Header strip that remains visible when the next card docks beneath it */}
          <div
            data-principle-header={index}
            className="pt-7 pb-2.5 sm:pt-9 sm:pb-3 lg:pt-[clamp(2rem,4.2dvh,3.25rem)] lg:pb-3.5"
          >
            <p
              data-principle-label={index}
              className="text-[13px] leading-snug font-normal tracking-[0.01em] text-white sm:text-sm lg:text-[clamp(0.875rem,1.05vw,1rem)]"
            >
              {item.indexLabel[locale]}
            </p>
          </div>

          <h3
            data-principle-title={index}
            className="pr-4 text-[clamp(1.375rem,2.15vw,1.9375rem)] leading-[1.2] font-medium tracking-[-0.02em] text-balance text-white lg:pr-8"
          >
            <RichText copy={item.title} />
          </h3>
        </div>

        <p
          data-principle-desc={index}
          className="text-base leading-[1.46] font-normal text-white/95 md:pt-9 lg:pt-[clamp(2rem,4.2dvh,3.25rem)] lg:text-[clamp(0.9375rem,1.08vw,1.0625rem)] lg:leading-[1.45]"
        >
          <RichText copy={item.description} />
        </p>
      </div>
    </article>
  );
}

interface PrinciplesMotionRefs {
  sectionRef: RefObject<HTMLElement | null>;
  pinWrapperRef: RefObject<HTMLDivElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  stageRef: RefObject<HTMLDivElement | null>;
}

function usePrinciplesMotion(refs: PrinciplesMotionRefs, locale: Locale) {
  useGSAP(
    () => {
      registerGsapPlugins();
      ScrollTrigger.config({ ignoreMobileResize: true });

      const sectionEl = refs.sectionRef.current;
      const pinWrapperEl = refs.pinWrapperRef.current;
      const panelEl = refs.panelRef.current;
      const headingEl = refs.headingRef.current;
      const stageEl = refs.stageRef.current;
      if (!sectionEl || !pinWrapperEl || !panelEl || !stageEl) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isStackEnabled: "(min-width: 768px) and (min-height: 580px)",
          isDesktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isStackEnabled, isDesktop, reduceMotion } =
            context.conditions ?? {};
          if (reduceMotion) return;

          // 1. Lightweight entrance text reveal on heading + Keunggulan 01
          if (headingEl) {
            gsap.from(headingEl, {
              y: 18,
              autoAlpha: 0,
              duration: 0.65,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: sectionEl,
                start: "top 80%",
                once: true,
              },
            });
          }

          const firstLabel = stageEl.querySelector<HTMLElement>(
            '[data-principle-label="0"]'
          );
          const firstTitle = stageEl.querySelector<HTMLElement>(
            '[data-principle-title="0"]'
          );
          const firstDesc = stageEl.querySelector<HTMLElement>(
            '[data-principle-desc="0"]'
          );
          const firstTargets = [firstLabel, firstTitle, firstDesc].filter(
            (el): el is HTMLElement => el !== null
          );

          if (firstTargets.length > 0) {
            gsap.from(firstTargets, {
              y: 14,
              autoAlpha: 0,
              duration: 0.58,
              stagger: 0.06,
              ease: "power2.out",
              clearProps: "transform,opacity,visibility",
              scrollTrigger: {
                trigger: stageEl,
                start: "top 84%",
                once: true,
              },
            });
          }

          if (!isStackEnabled) {
            // Mobile: lightweight reveal on cards 02..04 as user scrolls down
            for (let i = 1; i < PRINCIPLES.length; i += 1) {
              const cardEl = stageEl.querySelector<HTMLElement>(
                `[data-principle-card="${i}"]`
              );
              if (!cardEl) continue;
              gsap.from(cardEl, {
                y: 22,
                autoAlpha: 0,
                duration: 0.55,
                ease: "power2.out",
                clearProps: "transform,opacity,visibility",
                scrollTrigger: {
                  trigger: cardEl,
                  start: "top 88%",
                  once: true,
                },
              });
            }
            return;
          }

          // 3. Scroll-driven sticky stacking cards:
          //    Card 01 stays at the top while Card 02 slides up over Card 01's content
          //    and docks right under `( Keunggulan 01 )`, then Card 03 over 02, and Card 04 over 03.
          const cards = PRINCIPLES.map((_, idx) =>
            stageEl.querySelector<HTMLElement>(`[data-principle-card="${idx}"]`)
          ).filter((el): el is HTMLElement => el !== null);

          const headers = PRINCIPLES.map((_, idx) =>
            stageEl.querySelector<HTMLElement>(
              `[data-principle-header="${idx}"]`
            )
          ).filter((el): el is HTMLElement => el !== null);

          const [card0, card1, card2, card3] = cards;
          const [header0] = headers;

          if (!card0 || !card1 || !card2 || !card3 || !header0) {
            return;
          }

          const stackedCards = [card0, card1, card2, card3] as const;

          gsap.set(stackedCards, {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          });

          const getMetrics = () => {
            const stageH = Math.max(stageEl.clientHeight, 360);
            const slotH = Math.max(header0.offsetHeight, 44);
            const heights = stackedCards.map((el) => el.offsetHeight);
            return { stageH, slotH, heights };
          };

          let metrics = getMetrics();

          const syncClips = () => {
            const { slotH, heights } = metrics;
            for (let i = 0; i < 3; i += 1) {
              const currentCard = stackedCards[i];
              const nextCard = stackedCards[i + 1];
              const currentHeight = heights[i] ?? 0;
              if (!currentCard || !nextCard) continue;

              const currentTop = i * slotH;
              const currentBottom = currentTop + currentHeight;
              const nextY = Number(gsap.getProperty(nextCard, "y"));
              const maxCover = Math.max(0, currentHeight - slotH);
              const coveredPx = Math.max(
                0,
                Math.min(maxCover, currentBottom - nextY)
              );

              currentCard.style.clipPath =
                coveredPx > 0.5 ? `inset(0px 0px ${coveredPx}px 0px)` : "none";
            }
          };

          // Initial state: Card 01 at y=0, Cards 02..04 waiting just below the stage
          gsap.set(card0, { y: 0 });
          gsap.set([card1, card2, card3], {
            y: () => metrics.stageH,
          });
          syncClips();

          const tl = gsap.timeline({
            onUpdate: syncClips,
            scrollTrigger: {
              trigger: sectionEl,
              pin: pinWrapperEl,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              start: "top top",
              end: () =>
                `+=${Math.round(window.innerHeight * (isDesktop ? 2.8 : 2.3))}`,
              scrub: 0.1,
              onRefreshInit: () => {
                metrics = getMetrics();
              },
              onRefresh: () => {
                metrics = getMetrics();
                syncClips();
              },
            },
          });

          // Initial dwell on Keunggulan 01
          tl.addLabel("card-01", 0);

          // Card 02 slides up from bottom as a solid unit, covers Card 01's content, docks at 1 * slotH
          tl.fromTo(
            card1,
            { y: () => metrics.stageH },
            {
              y: () => metrics.slotH,
              duration: 0.27,
              ease: "none",
              immediateRender: false,
            },
            0.05
          );

          // Card 03 slides up from bottom, covers Card 02's content, docks at 2 * slotH
          tl.fromTo(
            card2,
            { y: () => metrics.stageH },
            {
              y: () => metrics.slotH * 2,
              duration: 0.27,
              ease: "none",
              immediateRender: false,
            },
            0.37
          );

          // Card 04 slides up from bottom, covers Card 03's content, docks at 3 * slotH
          tl.fromTo(
            card3,
            { y: () => metrics.stageH },
            {
              y: () => metrics.slotH * 3,
              duration: 0.25,
              ease: "none",
              immediateRender: false,
            },
            0.69
          );

          // Final dwell on Keunggulan 04 before unpinning into Footer
          tl.to({}, { duration: 0.06 }, 0.94);

          let isDisposed = false;
          void document.fonts?.ready.then(() => {
            if (isDisposed) return;
            metrics = getMetrics();
            ScrollTrigger.refresh();
          });

          let lastWidth = stageEl.clientWidth;
          let resizeTimer: ReturnType<typeof setTimeout> | null = null;
          const resizeObserver = new ResizeObserver((entries) => {
            const width = entries[0]?.contentRect.width ?? lastWidth;
            if (Math.abs(width - lastWidth) < 2) return;
            lastWidth = width;
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
              metrics = getMetrics();
              ScrollTrigger.refresh();
            }, 120);
          });
          resizeObserver.observe(stageEl);

          return () => {
            isDisposed = true;
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeObserver.disconnect();
            stackedCards.forEach((el) => {
              el.style.clipPath = "";
            });
          };
        }
      );

      return () => mm.revert();
    },
    {
      scope: refs.sectionRef,
      dependencies: [locale],
      revertOnUpdate: true,
    }
  );
}

/**
 * Cara Kerja & Prinsip section (`#principles`) matching
 * `assets/uiux/landingpage/principles.png`.
 *
 * - Overlaps `#about-me` smoothly as the section enters the viewport.
 * - Uses scroll-driven sticky stacking cards (no expand/collapse toggles):
 *   Keunggulan 01 appears open first; scrolling slides Keunggulan 02 up from below
 *   to cover 01's content and dock beneath `( Keunggulan 01 )`, continuing through 04.
 */
export function PrinciplesSection() {
  const { locale } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  usePrinciplesMotion(
    {
      sectionRef,
      pinWrapperRef,
      panelRef,
      headingRef,
      stageRef,
    },
    locale
  );

  return (
    <section
      ref={sectionRef}
      id="principles"
      aria-labelledby="principles-heading"
      className="relative z-30"
    >
      <div ref={pinWrapperRef} className="relative w-full">
        <div
          ref={panelRef}
          className="relative flex w-full flex-col overflow-x-clip bg-primary-black text-white shadow-[0_-28px_72px_rgba(8,11,24,0.45)] motion-safe:md:h-dvh motion-safe:md:overflow-hidden"
        >
          <HeroAmbientLight variant="principles" edgeFade="bottom" />

          <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 pt-16 pb-6 sm:px-8 sm:pt-18 sm:pb-8 lg:px-14 lg:pt-[clamp(3rem,6dvh,4.25rem)] lg:pb-8">
            <h2
              ref={headingRef}
              id="principles-heading"
              className="shrink-0 text-center text-[clamp(1.625rem,2.78vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.02em] text-white"
            >
              {PRINCIPLES_COPY.heading[locale]}
            </h2>

            <div
              ref={stageRef}
              className="relative mt-7 flex-1 motion-safe:md:overflow-hidden sm:mt-9 lg:mt-[clamp(2rem,5dvh,3.25rem)]"
            >
              {PRINCIPLES.map((item, index) => (
                <PrincipleCard
                  key={item.id}
                  item={item}
                  index={index}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
