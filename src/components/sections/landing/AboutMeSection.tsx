"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";
import { AnimatePresence, m, type Variants } from "framer-motion";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";
import { useLanguage } from "@/context/LanguageContext";
import { ABOUT_ME_DATA } from "@/data/aboutme";
import type { Locale } from "@/data/types";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/lib/utils";

const CAROUSEL_INTERVAL_MS = 4500;
const SWIPE_THRESHOLD_PX = 44;

const CARD_EASE = [0.16, 1, 0.3, 1] as const;
const TEXT_EASE = [0.22, 1, 0.36, 1] as const;
const CROSSFADE_EASE = [0.25, 1, 0.5, 1] as const;

interface SlideVisualConfig {
  mode: "landscape" | "portrait";
  objectPositionClass: string;
  portraitFrameWidthClass: string;
}

const FALLBACK_VISUAL_CONFIG: SlideVisualConfig = {
  mode: "landscape",
  objectPositionClass: "object-[50%_54%]",
  portraitFrameWidthClass: "w-full",
};

const FALLBACK_IMAGE: (typeof ABOUT_ME_DATA.images)[number] = {
  src: "/images/aboutme/1.webp",
  alt: {
    id: "Foto profil Ari Rahman 1",
    en: "Ari Rahman portrait 1",
  },
};

/**
 * Per-slide framing so `1.webp` (landscape) matches `aboutme.png` 1:1 while
 * `2.webp` and `3.webp` (vertical portraits) keep Ari's face and upper torso
 * centered at the exact same visual scale between the left and right text columns.
 */
const SLIDE_VISUAL_CONFIG: readonly SlideVisualConfig[] = [
  FALLBACK_VISUAL_CONFIG,
  {
    mode: "portrait",
    objectPositionClass: "object-[50%_38%]",
    portraitFrameWidthClass: "w-full sm:w-[68%] lg:w-[56%]",
  },
  {
    mode: "portrait",
    objectPositionClass: "object-[50%_34%]",
    portraitFrameWidthClass: "w-full sm:w-[64%] lg:w-[52%]",
  },
];

const LEFT_COLUMN_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.18,
    },
  },
};

const RIGHT_COLUMN_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.24,
    },
  },
};

const TEXT_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.68,
      ease: TEXT_EASE,
    },
  },
};

const PILL_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.62,
      ease: TEXT_EASE,
    },
  },
};

const STATUS_PILL_CLASS =
  "inline-flex items-center rounded-[6px] bg-[#3A3A3A]/52 px-4 py-2 text-[15px] leading-[1.35] font-normal tracking-[0.01em] text-white shadow-[0_4px_16px_rgba(8,11,24,0.22)] backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] sm:px-4 sm:py-2 sm:text-base lg:px-[clamp(0.95rem,1.25vw,1.25rem)] lg:py-[clamp(0.45rem,0.6vw,0.625rem)] lg:text-[clamp(0.9375rem,1.18vw,1.1875rem)]";

interface CarouselBackgroundProps {
  activeIndex: number;
  locale: Locale;
  shouldReduceMotion: boolean;
}

function CarouselBackground({
  activeIndex,
  locale,
  shouldReduceMotion,
}: CarouselBackgroundProps) {
  const images = ABOUT_ME_DATA.images;
  const activeImage = images[activeIndex] ?? FALLBACK_IMAGE;
  const visualConfig =
    SLIDE_VISUAL_CONFIG[activeIndex] ?? FALLBACK_VISUAL_CONFIG;

  return (
    <div className="relative h-[300px] w-full overflow-hidden sm:h-[360px] lg:absolute lg:inset-0 lg:h-full">
      {/* Hidden prefetch for instant zero-latency slide transitions across all 3 portraits */}
      <div className="sr-only" aria-hidden="true">
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt=""
            width={32}
            height={32}
            priority={i === 0}
          />
        ))}
      </div>

      <AnimatePresence initial={false}>
        <m.div
          key={activeImage.src}
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 0,
                  scale: 1.035,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: shouldReduceMotion ? 0.2 : 1.15,
              ease: CROSSFADE_EASE,
            },
          }}
          exit={
            shouldReduceMotion
              ? { opacity: 0, transition: { duration: 0.2 } }
              : {
                  opacity: 0,
                  scale: 0.985,
                  transition: {
                    duration: 0.85,
                    ease: CROSSFADE_EASE,
                  },
                }
          }
          className="absolute inset-0 h-full w-full"
        >
          {visualConfig.mode === "portrait" ? (
            <>
              {/* Soft atmospheric backdrop filling side gutters for portrait slides on wide viewports */}
              <Image
                src={activeImage.src}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 1023px) 95vw, 1380px"
                className={cn(
                  "hidden scale-110 object-cover opacity-70 blur-2xl saturate-110 select-none sm:block",
                  visualConfig.objectPositionClass
                )}
              />
              <div
                className={cn(
                  "relative mx-auto h-full overflow-hidden sm:[mask-image:linear-gradient(90deg,transparent_0%,black_16%,black_84%,transparent_100%)] sm:[-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_16%,black_84%,transparent_100%)]",
                  visualConfig.portraitFrameWidthClass
                )}
              >
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt[locale]}
                  fill
                  sizes="(max-width: 639px) 95vw, (max-width: 1023px) 68vw, 780px"
                  className={cn(
                    "object-cover select-none",
                    visualConfig.objectPositionClass
                  )}
                />
              </div>
            </>
          ) : (
            <Image
              src={activeImage.src}
              alt={activeImage.alt[locale]}
              fill
              priority
              sizes="(max-width: 1023px) 95vw, 1380px"
              className={cn(
                "object-cover select-none",
                visualConfig.objectPositionClass
              )}
            />
          )}
        </m.div>
      </AnimatePresence>

      {/* Mobile bottom blend into the card reading surface */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#080B18] via-[#080B18]/70 to-transparent lg:hidden"
      />
    </div>
  );
}

interface CardAmbientVignettesProps {
  shouldReduceMotion: boolean;
}

/**
 * Diagonal electric-blue (#1235D8 / #2855FF) and deep-black (#080B18) side vignettes
 * matching `assets/uiux/landingpage/aboutme.png`:
 * - Top-Left: electric blue glow
 * - Bottom-Left: deep dark navy behind "ARI RAHMAN" & bio
 * - Top-Right: deep dark navy vignette
 * - Bottom-Right: vibrant electric blue glow behind "IPB UNIVERSITY" & bio
 * - Center column (~34%–66%): clear natural portrait window
 */
function CardAmbientVignettes({
  shouldReduceMotion,
}: CardAmbientVignettesProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      {/* Required Figma radial-black overlay */}
      <div className="bg-radial-black absolute inset-0" />

      {/* Left readability gradient (top-left electric blue -> bottom-left deep primary-black) */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(8, 11, 24, 0.88) 0%, rgba(8, 11, 24, 0.72) 17%, rgba(8, 11, 24, 0.28) 31%, rgba(8, 11, 24, 0) 44%)",
        }}
      />
      <div
        className="absolute -top-[22%] -left-[10%] hidden h-[82%] w-[46%] rounded-full lg:block"
        style={{
          background:
            "radial-gradient(circle at 24% 24%, rgba(40, 85, 255, 0.92) 0%, rgba(18, 53, 216, 0.82) 34%, rgba(18, 53, 216, 0.28) 62%, rgba(8, 11, 24, 0) 82%)",
        }}
      />
      <div
        className="absolute -bottom-[26%] -left-[10%] hidden h-[84%] w-[48%] rounded-full lg:block"
        style={{
          background:
            "radial-gradient(circle at 22% 82%, rgba(8, 11, 24, 0.96) 0%, rgba(8, 11, 24, 0.82) 42%, rgba(8, 11, 24, 0) 78%)",
        }}
      />

      {/* Right readability gradient (top-right deep primary-black -> bottom-right electric blue) */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(270deg, rgba(8, 11, 24, 0.84) 0%, rgba(12, 28, 112, 0.66) 18%, rgba(18, 53, 216, 0.24) 33%, rgba(8, 11, 24, 0) 46%)",
        }}
      />
      <div
        className="absolute -top-[24%] -right-[10%] hidden h-[82%] w-[46%] rounded-full lg:block"
        style={{
          background:
            "radial-gradient(circle at 78% 20%, rgba(8, 11, 24, 0.96) 0%, rgba(8, 11, 24, 0.8) 40%, rgba(8, 11, 24, 0) 76%)",
        }}
      />
      <div
        className="absolute -right-[12%] -bottom-[26%] hidden h-[90%] w-[52%] rounded-full lg:block"
        style={{
          background:
            "radial-gradient(circle at 78% 80%, rgba(40, 85, 255, 0.95) 0%, rgba(18, 53, 216, 0.86) 36%, rgba(18, 53, 216, 0.34) 64%, rgba(8, 11, 24, 0) 84%)",
        }}
      />

      {/* Mobile & tablet ambient blue/dark surface glow */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(40, 85, 255, 0.52) 0%, rgba(18, 53, 216, 0.22) 38%, rgba(8, 11, 24, 0) 70%), radial-gradient(circle at 100% 100%, rgba(40, 85, 255, 0.64) 0%, rgba(18, 53, 216, 0.36) 42%, rgba(8, 11, 24, 0) 76%)",
        }}
      />

      {/* Subtle one-shot entrance sheen sweep across the big card */}
      {!shouldReduceMotion ? (
        <m.div
          initial={{ x: "-130%", opacity: 0 }}
          whileInView={{ x: "145%", opacity: [0, 0.22, 0] }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.15, delay: 0.12, ease: CARD_EASE }}
          className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-lightblue/35 to-transparent"
        />
      ) : null}
    </div>
  );
}

/**
 * About Me Section (`#about-me`) matching `assets/uiux/landingpage/aboutme.png`.
 * Features a large rounded portrait card on the `#EAF0FF` (`lightblue`) bridge canvas,
 * an automatic smoothly cycling 3-photo carousel (`1.webp`, `2.webp`, `3.webp`),
 * diagonal `#1235D8`/`#080B18` side vignettes, and smooth Framer Motion typography reveals.
 */
export function AboutMeSection() {
  const { locale } = useLanguage();
  const shouldReduceMotion = useHydratedReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [stickyTop, setStickyTop] = useState<number>(0);

  const totalSlides = ABOUT_ME_DATA.images.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [pointerStartX, setPointerStartX] = useState<number | null>(null);

  // Stick at `top: 0` when `#about-me` fits the viewport; if taller (mobile/tablet),
  // stick at a negative `top` so it freezes only once its bottom reaches the viewport bottom.
  useEffect(() => {
    if (shouldReduceMotion) return;
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const updateStickyTop = () => {
      const nextTop = Math.min(0, window.innerHeight - sectionEl.offsetHeight);
      setStickyTop((prev) => (Math.abs(prev - nextTop) < 1 ? prev : nextTop));
    };

    updateStickyTop();
    const resizeObserver = new ResizeObserver(updateStickyTop);
    resizeObserver.observe(sectionEl);
    window.addEventListener("resize", updateStickyTop);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateStickyTop);
    };
  }, [shouldReduceMotion]);

  const stepSlide = useCallback(
    (delta: number) => {
      setActiveIndex((prevIndex) => {
        return ((prevIndex + delta) % totalSlides + totalSlides) % totalSlides;
      });
    },
    [totalSlides]
  );

  // Automatically cycles through photos (1 -> 2 -> 3 -> 1...)
  useEffect(() => {
    if (totalSlides <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, CAROUSEL_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [totalSlides]);

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepSlide(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepSlide(-1);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setPointerStartX(event.clientX);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX === null) return;
    const deltaX = event.clientX - pointerStartX;
    setPointerStartX(null);

    if (Math.abs(deltaX) >= SWIPE_THRESHOLD_PX) {
      stepSlide(deltaX < 0 ? 1 : -1);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about-me"
      aria-labelledby="about-me-heading"
      onKeyDown={handleKeyDown}
      style={shouldReduceMotion ? undefined : { top: stickyTop }}
      className={cn(
        "z-10 bg-lightblue text-white md:min-h-dvh",
        shouldReduceMotion ? "relative" : "sticky top-0"
      )}
    >
      <div
        className="flex w-full items-center bg-lightblue py-8 sm:py-10 md:min-h-dvh lg:py-[clamp(1.75rem,2.4vw,2.5rem)]"
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[clamp(1.75rem,2.6vw,2.75rem)]">
        <m.div
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 40, scale: 0.96 }
          }
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.92, ease: CARD_EASE }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="relative w-full overflow-hidden rounded-[24px] bg-primary-black shadow-[0_12px_32px_rgba(8,11,24,0.18)] sm:rounded-[28px] lg:min-h-[clamp(30.5rem,39.4vw,35.75rem)] lg:rounded-[34px]"
        >
          {/* Layer 0: 3-Image Portrait Carousel (1.webp, 2.webp, 3.webp) */}
          <CarouselBackground
            activeIndex={activeIndex}
            locale={locale}
            shouldReduceMotion={shouldReduceMotion}
          />

          {/* Layer 1: Diagonal Blue (#1235D8/#2855FF) & Dark (#080B18) Vignettes + Radial-Black */}
          <CardAmbientVignettes shouldReduceMotion={shouldReduceMotion} />

          {/* Layer 2: Foreground Editorial Content Layout (8 Design Principles) */}
          <div className="relative z-20 flex flex-col justify-between gap-8 px-6 pt-4 pb-6 sm:px-9 sm:pt-6 sm:pb-8 lg:min-h-[clamp(30.5rem,39.4vw,35.75rem)] lg:px-[clamp(2rem,3.1vw,2.875rem)] lg:pt-[clamp(10.5rem,13.8vw,12.75rem)] lg:pb-[clamp(1.625rem,2.2vw,2.125rem)]">
            {/* Main two-column editorial row (leaves center column open on desktop for portrait) */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-[minmax(0,23.5rem)_1fr_minmax(0,25rem)] lg:items-start lg:gap-6">
              {/* Left Column: ARI RAHMAN + origin bio */}
              <m.div
                variants={LEFT_COLUMN_VARIANTS}
                initial={shouldReduceMotion ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="flex flex-col items-start text-left"
              >
                <m.h2
                  id="about-me-heading"
                  variants={TEXT_ITEM_VARIANTS}
                  className="text-[clamp(2rem,3.75vw,3.375rem)] leading-[1.08] font-bold tracking-[0.01em] text-white uppercase [text-shadow:0_2px_14px_rgba(8,11,24,0.35)]"
                >
                  {ABOUT_ME_DATA.leftTitle}
                </m.h2>

                <m.p
                  variants={TEXT_ITEM_VARIANTS}
                  className="mt-3.5 max-w-[33.5ch] text-base leading-[1.46] font-normal text-white/95 [text-shadow:0_1px_8px_rgba(8,11,24,0.38)] sm:mt-4 lg:mt-[clamp(0.875rem,1.15vw,1.125rem)] lg:text-[clamp(0.9375rem,1.18vw,1.125rem)]"
                >
                  <RichText copy={ABOUT_ME_DATA.leftBio} />
                </m.p>
              </m.div>

              {/* Center Desktop Spacer: preserves clear visual window for Ari's portrait */}
              <div aria-hidden="true" className="hidden lg:block" />

              {/* Right Column: IPB UNIVERSITY + degree + period + approach bio */}
              <m.div
                variants={RIGHT_COLUMN_VARIANTS}
                initial={shouldReduceMotion ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="flex flex-col items-start text-left md:items-end md:text-right"
              >
                <m.h3
                  variants={TEXT_ITEM_VARIANTS}
                  className="text-[clamp(1.375rem,2.15vw,2rem)] leading-[1.18] font-semibold tracking-[0.01em] text-white uppercase [text-shadow:0_2px_12px_rgba(8,11,24,0.38)]"
                >
                  {ABOUT_ME_DATA.rightTitle}
                </m.h3>

                <m.p
                  variants={TEXT_ITEM_VARIANTS}
                  className="mt-1 text-base leading-[1.4] font-normal text-white/95 [text-shadow:0_1px_8px_rgba(8,11,24,0.38)] lg:text-[clamp(0.9375rem,1.18vw,1.125rem)]"
                >
                  {ABOUT_ME_DATA.rightDegree[locale]}
                </m.p>

                <m.p
                  variants={TEXT_ITEM_VARIANTS}
                  className="mt-0.5 text-base leading-[1.4] font-normal text-white/95 [text-shadow:0_1px_8px_rgba(8,11,24,0.38)] lg:text-[clamp(0.9375rem,1.18vw,1.125rem)]"
                >
                  <RichText copy={ABOUT_ME_DATA.rightPeriod} />
                </m.p>

                <m.p
                  variants={TEXT_ITEM_VARIANTS}
                  className="mt-5 max-w-[36ch] text-base leading-[1.46] font-normal text-white/95 [text-shadow:0_1px_8px_rgba(8,11,24,0.38)] sm:mt-6 lg:mt-[clamp(1.375rem,1.9vw,1.875rem)] lg:text-[clamp(0.9375rem,1.18vw,1.125rem)]"
                >
                  <RichText copy={ABOUT_ME_DATA.rightBio} />
                </m.p>
              </m.div>
            </div>

            {/* Bottom Baseline Bar: Left Status Pill | Right Status Pill (matches aboutme.png 1:1) */}
            <m.div
              variants={LEFT_COLUMN_VARIANTS}
              initial={shouldReduceMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mt-6"
            >
              <m.div variants={PILL_ITEM_VARIANTS} className="flex items-center">
                <span className={STATUS_PILL_CLASS}>
                  {ABOUT_ME_DATA.leftPill[locale]}
                </span>
              </m.div>

              <m.div
                variants={PILL_ITEM_VARIANTS}
                className="flex items-center sm:justify-end"
              >
                <span className={STATUS_PILL_CLASS}>
                  <RichText copy={ABOUT_ME_DATA.rightPill} />
                </span>
              </m.div>
            </m.div>
          </div>
        </m.div>
        </div>
      </div>
    </section>
  );
}
