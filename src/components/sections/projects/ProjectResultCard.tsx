"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import type { ProjectData } from "@/data/types";
import { RichText } from "@/components/ui/RichText";
import { extractPlainText } from "./projectUtils";

interface ProjectResultCardProps {
  project: ProjectData;
}

/**
 * Composite `Hasil` showcase card matching `det-project-*.png`:
 * - Background wide banner (`result-banner.webp`) with readable dark scrim
 * - Left-protruding floating phone mockup (`result-object.webp`) overlapping the banner
 * - Outcome summary & frosted glassmorphic action pill links on the right
 */
export function ProjectResultCard({ project }: ProjectResultCardProps) {
  const { locale } = useLanguage();
  const plainTitle = extractPlainText(project.title[locale]);

  return (
    <div className="relative mx-auto mt-14 w-full sm:mt-16 md:my-10 lg:my-14">
      {/* Wide rounded banner backdrop (`result-banner.webp`) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-primary-black sm:rounded-[26px]">
        <Image
          src={project.resultBannerImage}
          alt={
            locale === "id"
              ? `Banner hasil proyek ${plainTitle}`
              : `Result banner for ${plainTitle}`
          }
          fill
          sizes="(max-width: 1040px) 92vw, 1040px"
          className="object-cover object-center select-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#080B18]/65 bg-linear-to-r from-[#080B18]/40 via-[#080B18]/65 to-[#080B18]/80"
        />
      </div>

      {/* Foreground grid: protruding phone cutout (left) + outcome copy & pills (right) */}
      <div className="relative z-10 grid grid-cols-1 items-center gap-6 px-6 pt-4 pb-8 sm:px-8 sm:pb-10 md:grid-cols-[250px_1fr] md:gap-8 md:px-10 md:py-8 lg:grid-cols-[295px_1fr] lg:gap-10 lg:px-12 lg:py-10">
        <div className="relative mx-auto -mt-14 w-[185px] sm:w-[210px] md:mx-0 md:my-[-5.5rem] md:-ml-4 md:w-full lg:my-[-6.25rem]">
          <Image
            src={project.resultObjectImage}
            alt={
              locale === "id"
                ? `Pratinjau perangkat hasil proyek ${plainTitle}`
                : `Device preview for ${plainTitle} results`
            }
            width={1024}
            height={1536}
            sizes="(max-width: 768px) 210px, 295px"
            className="h-auto w-full object-contain drop-shadow-[0_24px_42px_rgba(0,0,0,0.7)] select-none"
          />
        </div>

        <div className="min-w-0">
          <p className="text-sm leading-[1.68] text-white/95 sm:text-[15px] lg:text-base">
            <RichText copy={project.resultSummary} />
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
            {project.resultActions.map((action) => (
              <a
                key={action.href}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/25 bg-white/30 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition-colors duration-200 hover:border-white/45 hover:bg-white/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:min-h-[38px] sm:py-1.5 sm:text-sm"
              >
                {action.label[locale]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
