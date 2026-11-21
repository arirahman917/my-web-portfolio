"use client";

import { useRef } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import type { AchievementData, AchievementDetailBlock } from "@/data/types";
import { ActionPill } from "@/components/ui/ActionPill";
import { RichText } from "@/components/ui/RichText";
import {
  gsap,
  ScrollTrigger,
  registerGsapPlugins,
  useGSAP,
} from "@/components/motion/gsapConfig";

interface AchievementPanelProps {
  achievement: AchievementData;
  isExpanded: boolean;
  onToggle: () => void;
}

interface ZigZagRow {
  id: string;
  media: NonNullable<AchievementDetailBlock["media"]>;
  blocks: AchievementDetailBlock[];
}

const EXPAND_TRANSITION = {
  height: { duration: 0.75, ease: "linear" as const },
  opacity: { duration: 0.6, ease: "linear" as const },
};

/**
 * Groups consecutive text-only blocks (such as JTIK SINTA 4's DOI paragraph)
 * into the preceding media row so they stack together beside the image.
 */
function groupBlocksIntoRows(blocks: AchievementDetailBlock[]): ZigZagRow[] {
  const rows: ZigZagRow[] = [];

  for (const block of blocks) {
    const hasMedia = Boolean(block.media && block.media.length > 0);
    const lastRow = rows.at(-1);
    if (hasMedia || !lastRow) {
      rows.push({
        id: block.id,
        media: block.media ?? [],
        blocks: [block],
      });
    } else {
      lastRow.blocks.push(block);
    }
  }

  return rows;
}

/**
 * Individual numbered achievement accordion card (`1`–`4`) on `#EAF0FF` (`bg-lightblue`).
 * Renders a compact numbered bar when collapsed and unfurls the `_LP.webp` cover banner,
 * period badge, and zig-zag media/text grid with smooth scroll parallax when expanded.
 */
export function AchievementPanel({
  achievement,
  isExpanded,
  onToggle,
}: AchievementPanelProps) {
  const { locale } = useLanguage();
  const panelRef = useRef<HTMLElement>(null);
  const rows = groupBlocksIntoRows(achievement.detailBlocks);
  const panelId = `achievement-panel-${achievement.slug}`;
  const headerId = `achievement-header-${achievement.slug}`;

  useGSAP(
    () => {
      registerGsapPlugins();

      const panelEl = panelRef.current;
      if (!panelEl || !isExpanded) return;

      const bannerWrap = panelEl.querySelector<HTMLElement>(
        "[data-ach-banner-wrap]"
      );
      const bannerImg = panelEl.querySelector<HTMLElement>(
        "[data-ach-banner-img]"
      );
      if (bannerWrap && bannerImg) {
        gsap.fromTo(
          bannerImg,
          { yPercent: -6, scale: 1.12 },
          {
            yPercent: 6,
            scale: 1.12,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: bannerWrap,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      const rowNodes = gsap.utils.toArray<HTMLElement>(
        "[data-ach-row]",
        panelEl
      );
      rowNodes.forEach((rowEl) => {
        const mediaCol = rowEl.querySelector<HTMLElement>("[data-ach-media]");
        const copyCol = rowEl.querySelector<HTMLElement>("[data-ach-copy]");

        if (mediaCol) {
          gsap.fromTo(
            mediaCol,
            { y: 20 },
            {
              y: -20,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: rowEl,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        if (copyCol) {
          gsap.fromTo(
            copyCol,
            { y: 10 },
            {
              y: -10,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: rowEl,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });
    },
    {
      scope: panelRef,
      dependencies: [isExpanded, locale],
      revertOnUpdate: true,
    }
  );

  return (
    <section
      ref={panelRef}
      aria-labelledby={headerId}
      className="overflow-hidden rounded-[14px] bg-lightblue text-black shadow-[0_20px_60px_rgba(8,11,24,0.45)]"
    >
      {/* Top cover banner (`xxx_LP.webp`) with smooth fade into `#EAF0FF` */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <m.div
            key={`${achievement.slug}-banner`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={EXPAND_TRANSITION}
            className="overflow-hidden"
          >
            <div
              data-ach-banner-wrap
              className="relative h-[180px] w-full overflow-hidden sm:h-[260px] lg:h-[310px]"
            >
              <div
                data-ach-banner-img
                className="absolute inset-0 will-change-transform"
              >
                <Image
                  src={achievement.landingImage}
                  alt={achievement.landingAlt[locale]}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1160px"
                  priority={achievement.indexNumber === 1}
                  className="object-cover object-center"
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-lightblue"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent via-lightblue/80 to-lightblue"
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Clickable card header: compact bar when collapsed, sits over banner fade when expanded */}
      <button
        id={headerId}
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        className={`relative z-10 flex min-h-[44px] w-full cursor-pointer items-start gap-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-blue sm:gap-4 ${
          isExpanded
            ? "-mt-7 px-5 pt-1 pb-2 sm:-mt-10 sm:px-10 lg:px-12"
            : "px-5 py-4 hover:bg-black/[0.03] sm:px-10 sm:py-5 lg:px-12"
        }`}
      >
        <span className="w-7 shrink-0 pt-0.5 text-[1.75rem] font-normal leading-none tabular-nums text-black sm:w-10 sm:text-[2.25rem] lg:text-[2.5rem]">
          {achievement.indexNumber}
        </span>
        <h2 className="text-base font-medium leading-snug tracking-[-0.01em] text-black sm:text-xl lg:text-[1.4rem]">
          <RichText copy={achievement.title} />
        </h2>
      </button>

      {/* Expandable body: period badge + zig-zag media/text grid */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <m.div
            id={panelId}
            key={`${achievement.slug}-body`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={EXPAND_TRANSITION}
            onAnimationComplete={() => ScrollTrigger.refresh()}
            className="overflow-hidden"
          >
            <div className="px-5 pt-1 pb-10 sm:px-10 sm:pb-14 lg:px-12 lg:pb-16">
              <div className="pl-10 sm:pl-14">
                <span className="inline-block rounded-[6px] bg-[#BCC2D0]/85 px-3 py-1 text-xs font-normal text-black/90 sm:text-[13px]">
                  {achievement.period[locale]}
                </span>
              </div>

              <div className="mt-8 space-y-12 sm:mt-10 sm:space-y-16 lg:space-y-20">
                {rows.map((row, rowIndex) => {
                  const isMediaRight = rowIndex % 2 === 1;
                  const hasMultipleMedia = row.media.length > 1;

                  return (
                    <div
                      key={row.id}
                      data-ach-row
                      className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:gap-14"
                    >
                      {/* Media column */}
                      {row.media.length > 0 && (
                        <div
                          data-ach-media
                          className={`flex flex-col items-center justify-center gap-4 will-change-transform ${
                            isMediaRight ? "md:order-2" : "md:order-1"
                          }`}
                        >
                          {row.media.map((item, mediaIndex) => (
                            <div
                              key={item.src}
                              className={
                                hasMultipleMedia
                                  ? mediaIndex === 0
                                    ? "w-full max-w-[260px] sm:max-w-[300px]"
                                    : "w-full max-w-[320px] sm:max-w-[360px]"
                                  : "w-full max-w-[380px] lg:max-w-[440px]"
                              }
                            >
                              <Image
                                src={item.src}
                                alt={item.alt[locale]}
                                width={item.width ?? 1200}
                                height={item.height ?? 800}
                                sizes="(max-width: 768px) 90vw, 440px"
                                className="h-auto w-full object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Copy + action pills column */}
                      <div
                        data-ach-copy
                        className={`space-y-5 will-change-transform ${
                          isMediaRight ? "md:order-1" : "md:order-2"
                        }`}
                      >
                        {row.blocks.map((block) => (
                          <div key={block.id} className="space-y-4">
                            <p className="text-[15px] leading-relaxed text-black/90 sm:text-base lg:text-[1.125rem] lg:leading-[1.6]">
                              <RichText copy={block.text} />
                            </p>

                            {block.actions && block.actions.length > 0 && (
                              <div className="flex flex-wrap gap-2.5 pt-1">
                                {block.actions.map((action) => (
                                  <ActionPill
                                    key={action.href}
                                    href={action.href}
                                    external
                                    variant="outline"
                                    className="min-h-[38px] border-black/70 px-5 py-1.5 text-xs font-medium text-black hover:border-black hover:bg-black hover:text-lightblue sm:text-sm"
                                  >
                                    {action.label[locale]}
                                  </ActionPill>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
