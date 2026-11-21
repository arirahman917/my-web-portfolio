"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { TECH_STACK_CARDS, TECH_STACK_COPY } from "@/data/techstack";
import { RichText } from "@/components/ui/RichText";
import {
  gsap,
  registerGsapPlugins,
  ScrollTrigger,
  useGSAP,
} from "@/components/motion/gsapConfig";
import { cn } from "@/lib/utils";

interface CardVisualConfig {
  surfaceClass: string;
  imageBgClass: string;
  imagePositionClass: string;
  zIndexClass: string;
  desktopOffsetClass: string;
  rotationClass: string;
  desktopTiltDeg: number;
}

const CARD_VISUAL_CONFIG: Record<string, CardVisualConfig> = {
  frontend: {
    surfaceClass: "bg-lightblue",
    imageBgClass: "bg-white",
    imagePositionClass: "object-center",
    zIndexClass: "z-10",
    desktopOffsetClass: "lg:translate-y-0",
    rotationClass: "rotate-0",
    desktopTiltDeg: 0,
  },
  backend: {
    surfaceClass: "bg-white",
    imageBgClass: "bg-[#181818]",
    imagePositionClass: "object-[32%_center]",
    zIndexClass: "z-20",
    desktopOffsetClass: "lg:translate-y-[1.125rem]",
    rotationClass: "rotate-[2.5deg] md:rotate-[3.5deg] lg:rotate-[8.8deg]",
    desktopTiltDeg: 8.8,
  },
  uiux: {
    surfaceClass: "bg-lightblue",
    imageBgClass: "bg-[#1E1E1E]",
    imagePositionClass: "object-center",
    zIndexClass: "z-30",
    desktopOffsetClass: "lg:translate-y-[1.25rem]",
    rotationClass: "-rotate-[2deg] md:-rotate-[2.5deg] lg:rotate-[-3.5deg]",
    desktopTiltDeg: -3.5,
  },
  tools: {
    surfaceClass: "bg-white",
    imageBgClass: "bg-white",
    imagePositionClass: "object-center",
    zIndexClass: "z-40",
    desktopOffsetClass: "lg:translate-y-[1.125rem]",
    rotationClass: "rotate-[2.5deg] md:rotate-[3deg] lg:rotate-[4.7deg]",
    desktopTiltDeg: 4.7,
  },
  "ai-assisted": {
    surfaceClass: "bg-lightblue",
    imageBgClass: "bg-[#181818]",
    imagePositionClass: "object-left",
    zIndexClass: "z-50",
    desktopOffsetClass: "lg:translate-y-[0.625rem]",
    rotationClass: "rotate-0",
    desktopTiltDeg: 0,
  },
};

const DEFAULT_VISUAL: CardVisualConfig = {
  surfaceClass: "bg-lightblue",
  imageBgClass: "bg-white",
  imagePositionClass: "object-center",
  zIndexClass: "z-10",
  desktopOffsetClass: "lg:translate-y-0",
  rotationClass: "rotate-0",
  desktopTiltDeg: 0,
};

/**
 * Tech Stack & Kemampuan section (`#tech-stack`) matching `assets/uiux/landingpage/techstack.png`.
 * On desktop (`>= 1024px`), pairs smoothly with `ScrollSmoother` to glide all five Polaroid cards
 * upward with alternating vertical parallax (odd cards lead, even cards trail and catch up)
 * before settling cleanly ahead of `ProjectsSection`.
 */
export function TechStackSection() {
  const { locale } = useLanguage();

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();

      const sectionEl = sectionRef.current;
      const viewportEl = viewportRef.current;
      const cardsRowEl = cardsRowRef.current;
      if (!sectionEl || !viewportEl || !cardsRowEl) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isCompact: "(max-width: 1023px)",
        },
        (context) => {
          const { isDesktop, isCompact } = context.conditions ?? {};
          const slots = gsap.utils.toArray<HTMLElement>(
            "[data-tech-slot]",
            cardsRowEl
          );

          if (isDesktop && slots.length > 0) {
            const stackTl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionEl,
                start: "top 95%",
                end: "top 16%",
                scrub: 0.12,
                invalidateOnRefresh: true,
              },
            });

            if (headingRef.current) {
              stackTl.fromTo(
                headingRef.current,
                { y: 34, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.55,
                  ease: "power1.out",
                  force3D: true,
                },
                0
              );
            }

            // Alternating vertical parallax: odd cards (1, 3, 5) lead while even cards (2, 4) trail and catch up.
            const startYOffsets = [105, 240, 145, 275, 180];

            slots.forEach((slotEl, index) => {
              const cardId = TECH_STACK_CARDS[index]?.id ?? "";
              const tilt = CARD_VISUAL_CONFIG[cardId]?.desktopTiltDeg ?? 0;
              const startY = startYOffsets[index] ?? 170;

              stackTl.fromTo(
                slotEl,
                {
                  y: startY,
                  rotation: -tilt * 0.42,
                },
                {
                  y: 0,
                  rotation: 0,
                  duration: 1,
                  ease: "power1.out",
                  force3D: true,
                },
                0
              );
            });

            return undefined;
          }

          if (isCompact) {
            if (headingRef.current) {
              gsap.fromTo(
                headingRef.current,
                { y: 20, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.65,
                  ease: "power3.out",
                  force3D: true,
                  clearProps: "transform,opacity,visibility",
                  scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 86%",
                    once: true,
                  },
                }
              );
            }

            if (slots.length > 0) {
              gsap.set(slots, {
                x: 36,
                y: 34,
                autoAlpha: 0,
                force3D: true,
              });

              ScrollTrigger.batch(slots, {
                start: "top 88%",
                once: true,
                onEnter: (batch) => {
                  gsap.to(batch, {
                    x: 0,
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.65,
                    stagger: 0.12,
                    ease: "power3.out",
                    force3D: true,
                    overwrite: "auto",
                    clearProps: "transform,opacity,visibility",
                  });
                },
              });
            }
          }

          return undefined;
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="relative z-20 bg-primary-black text-white"
    >
      <div
        ref={viewportRef}
        className="w-full overflow-x-clip bg-primary-black pt-20 pb-14 sm:pt-24 sm:pb-16 lg:flex lg:h-dvh lg:min-h-[640px] lg:flex-col lg:justify-center lg:overflow-x-clip lg:pt-14 lg:pb-8"
      >
        <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-12">
          <h2
            ref={headingRef}
            id="tech-stack-heading"
            className="text-center text-xl font-semibold tracking-[0.02em] text-white uppercase sm:text-2xl lg:text-[28px]"
          >
            {TECH_STACK_COPY.heading[locale]}
          </h2>

          <div
            ref={cardsRowRef}
            className="mx-auto mt-10 flex max-w-[320px] flex-col gap-7 sm:max-w-[340px] md:mt-11 md:max-w-none md:flex-row md:flex-wrap md:justify-center md:gap-7 lg:mt-8 lg:flex-nowrap lg:items-start lg:justify-center lg:gap-0 lg:pb-10"
          >
            {TECH_STACK_CARDS.map((card) => {
              const visual = CARD_VISUAL_CONFIG[card.id] ?? DEFAULT_VISUAL;

              return (
                <div
                  key={card.id}
                  data-tech-slot
                  className={cn(
                    "relative w-full lg:will-change-transform md:w-[calc(50%-0.875rem)] md:max-w-[320px] lg:w-[21.3%] lg:max-w-none lg:shrink-0 lg:-ml-[1.55%] lg:first:ml-0",
                    visual.zIndexClass
                  )}
                >
                  <article
                    data-tech-card
                    className={cn(
                      "flex flex-col rounded-[4px] px-2.5 pt-3.5 pb-7 text-black shadow-[0_2px_10px_rgba(8,11,24,0.06)] sm:px-3 sm:pt-4 sm:pb-8 lg:min-h-[clamp(22rem,33vw,27.875rem)] lg:px-[clamp(0.45rem,0.7vw,0.625rem)] lg:pt-[clamp(0.625rem,0.97vw,0.875rem)] lg:pb-[clamp(1.75rem,2.5vw,2.375rem)]",
                      visual.surfaceClass,
                      visual.desktopOffsetClass,
                      visual.rotationClass
                    )}
                  >
                    <div
                      className={cn(
                        "relative aspect-[11/10] w-full overflow-hidden",
                        visual.imageBgClass
                      )}
                    >
                      <Image
                        src={card.image}
                        alt={card.imageAlt[locale]}
                        fill
                        sizes="(max-width: 767px) 85vw, (max-width: 1023px) 44vw, 22vw"
                        className={cn("object-cover", visual.imagePositionClass)}
                      />
                    </div>

                    <div className="pl-2.5 pr-4 lg:pl-[clamp(0.45rem,0.85vw,0.8rem)] lg:pr-[clamp(0.9rem,1.9vw,1.75rem)]">
                      <h3 className="mt-4 text-xl leading-[1.15] font-bold tracking-[-0.02em] text-black sm:mt-5 sm:text-2xl lg:mt-[clamp(0.875rem,1.4vw,1.3rem)] lg:text-[clamp(1rem,1.55vw,1.425rem)]">
                        {card.title}
                      </h3>

                      <p className="mt-2 text-[13.5px] leading-[1.42] font-normal text-black sm:text-sm lg:mt-[clamp(0.4rem,0.65vw,0.625rem)] lg:text-[clamp(0.6875rem,0.92vw,0.84rem)]">
                        <RichText copy={card.items} />
                      </p>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
