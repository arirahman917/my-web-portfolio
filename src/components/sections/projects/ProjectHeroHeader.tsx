"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECT_SHARED_COPY } from "@/data/projects";
import type { ProjectData } from "@/data/types";
import { BackButton } from "@/components/ui/BackButton";
import { RichText } from "@/components/ui/RichText";
import { extractPlainText } from "./projectUtils";

interface ProjectHeroHeaderProps {
  project: ProjectData;
  onScrollToDetails: () => void;
}

/**
 * Top case study hero header (`xxx_LP.webp` cover fade, title + `↓` CTA,
 * 3-column metadata strip, and centered `mockup.webp` showcase over ambient blue glow).
 */
export function ProjectHeroHeader({
  project,
  onScrollToDetails,
}: ProjectHeroHeaderProps) {
  const { locale } = useLanguage();
  const plainTitle = extractPlainText(project.title[locale]);

  return (
    <>
      <header className="relative w-full">
        {/* Full-bleed cover image (`xxx_LP.webp`) fading seamlessly into `#080B18` */}
        <div className="relative h-[220px] w-full overflow-hidden sm:h-[280px] lg:h-[330px]">
          <Image
            src={project.landingImage}
            alt={project.landingAlt[locale]}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center select-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-b from-[#080B18]/45 via-[#080B18]/50 to-[#080B18]"
          />
          <div className="absolute inset-x-0 top-20 z-20 mx-auto max-w-[1440px] px-6 sm:top-24 sm:px-10">
            <BackButton href="/#projects" />
          </div>
        </div>

        {/* Title & circular `↓` button pulled into the lower fade of the cover */}
        <div className="relative z-10 mx-auto -mt-20 max-w-[1440px] px-6 sm:-mt-24 sm:px-10 lg:-mt-28">
          <div className="flex items-start justify-between gap-4 sm:gap-8">
            <h1 className="max-w-[1020px] text-[clamp(1.65rem,4vw,3.15rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-white">
              <RichText copy={project.title} />
            </h1>

            <button
              type="button"
              onClick={onScrollToDetails}
              aria-label={
                locale === "id"
                  ? "Gulir ke isi studi kasus"
                  : "Scroll to case study details"
              }
              className="mt-1 inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-white/5 text-white backdrop-blur-sm transition-colors duration-200 hover:border-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-13 sm:w-13"
            >
              <ArrowDown className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-4 max-w-[900px] text-sm leading-[1.6] text-white/85 sm:mt-5 sm:text-base">
            <RichText copy={project.subtitle} />
          </p>

          {/* 3-column metadata strip (`Fokus` | `Tech Stack` | `Periode`) */}
          <div className="mt-10 border-t border-white/25 pt-5 sm:mt-12">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1.15fr_1.75fr_auto] sm:gap-8">
              <div className="min-w-0">
                <p className="text-xs font-normal text-white/55">
                  {PROJECT_SHARED_COPY.metaLabels.focus[locale]}
                </p>
                <p className="mt-1 text-xs leading-relaxed font-medium text-white sm:text-sm">
                  {project.focus[locale]}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-xs font-normal text-white/55">
                  {PROJECT_SHARED_COPY.metaLabels.techStack[locale]}
                </p>
                <p className="mt-1 text-xs leading-relaxed font-medium text-white sm:text-sm">
                  {project.techStack}
                </p>
              </div>

              <div className="min-w-0 sm:justify-self-end">
                <p className="text-xs font-normal text-white/55">
                  {PROJECT_SHARED_COPY.metaLabels.period[locale]}
                </p>
                <p className="mt-1 text-xs leading-relaxed font-medium whitespace-nowrap text-white sm:text-sm">
                  {project.period[locale]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Centered Multi-Device Mockup Showcase (`mockup.webp`) with ambient blue glow */}
      <div className="relative mx-auto mt-10 max-w-[960px] px-6 sm:mt-14 sm:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-[118%] w-[92%] max-w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-95"
          style={{
            background:
              "radial-gradient(ellipse 68% 60% at 50% 52%, rgba(40, 85, 255, 0.34) 0%, rgba(18, 53, 216, 0.16) 46%, rgba(8, 11, 24, 0) 76%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[720px]">
          <Image
            src={project.mockupImage}
            alt={
              locale === "id"
                ? `Mockup antarmuka ${plainTitle}`
                : `Interface mockup of ${plainTitle}`
            }
            width={1600}
            height={1100}
            priority
            sizes="(max-width: 768px) 92vw, 720px"
            className="h-auto w-full object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.55)] select-none"
          />
        </div>
      </div>
    </>
  );
}
