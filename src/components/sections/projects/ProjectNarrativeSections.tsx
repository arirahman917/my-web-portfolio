"use client";

import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PROJECT_SHARED_COPY } from "@/data/projects";
import type { BilingualRichText, ProjectData } from "@/data/types";
import { RichText } from "@/components/ui/RichText";
import { ProjectResultCard } from "./ProjectResultCard";
import { extractPlainText } from "./projectUtils";

interface ProjectNarrativeSectionsProps {
  project: ProjectData;
}

function stableSegmentKey(prefix: string, richText: BilingualRichText): string {
  return `${prefix}-${extractPlainText(richText.id).slice(0, 32)}`;
}

/**
 * Editorial case study body sections matching `det-project-*.png`:
 * `Masalah`, `Kontribusi`, `Proses`, `Keputusan & Trade-off`, `Hasil`, and `Refleksi Teknis`.
 */
export function ProjectNarrativeSections({
  project,
}: ProjectNarrativeSectionsProps) {
  const { locale } = useLanguage();

  return (
    <div className="mt-16 flex flex-col gap-20 sm:mt-20 sm:gap-24 lg:gap-28">
      {/* Masalah / Problem */}
      <section
        id="masalah"
        data-project-reveal
        className="grid scroll-mt-36 grid-cols-1 items-start gap-5 md:grid-cols-[260px_1fr] md:gap-12 lg:scroll-mt-28 lg:grid-cols-[340px_1fr]"
      >
        <h2 className="text-[clamp(1.75rem,3.2vw,2.65rem)] leading-tight font-semibold tracking-[-0.02em] text-white">
          <RichText copy={PROJECT_SHARED_COPY.sectionNav[0]!.label} />
        </h2>
        <div className="min-w-0 space-y-5 text-sm leading-[1.68] text-white/85 sm:text-[15px] lg:text-base">
          {project.problem.map((para) => (
            <p key={stableSegmentKey(`${project.slug}-problem`, para)}>
              <RichText copy={para} />
            </p>
          ))}
        </div>
      </section>

      {/* Kontribusi / Contribution */}
      <section
        id="kontribusi"
        data-project-reveal
        className="grid scroll-mt-36 grid-cols-1 items-start gap-5 md:grid-cols-[260px_1fr] md:gap-12 lg:scroll-mt-28 lg:grid-cols-[340px_1fr]"
      >
        <h2 className="text-[clamp(1.75rem,3.2vw,2.65rem)] leading-tight font-semibold tracking-[-0.02em] text-white">
          <RichText copy={PROJECT_SHARED_COPY.sectionNav[1]!.label} />
        </h2>
        <div className="min-w-0 space-y-5 text-sm leading-[1.68] text-white/85 sm:text-[15px] lg:text-base">
          {project.contribution.map((para) => (
            <p key={stableSegmentKey(`${project.slug}-contribution`, para)}>
              <RichText copy={para} />
            </p>
          ))}
        </div>
      </section>

      {/* Proses / Process */}
      <section
        id="proses"
        data-project-reveal
        className="scroll-mt-36 lg:scroll-mt-28"
      >
        <h2 className="mb-8 text-[clamp(1.75rem,3.2vw,2.65rem)] leading-tight font-semibold tracking-[-0.02em] text-white sm:mb-10">
          <RichText copy={PROJECT_SHARED_COPY.sectionNav[2]!.label} />
        </h2>
        <div className="divide-y divide-white/25 border-t border-white/25">
          {project.processSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="grid grid-cols-[56px_1fr] items-center gap-4 py-7 sm:grid-cols-[180px_1fr] sm:gap-8 sm:py-9 lg:grid-cols-[240px_1fr]"
            >
              <span className="text-2xl font-medium tracking-tight text-white tabular-nums sm:text-4xl lg:text-[2.5rem]">
                {step.stepNumber}
              </span>
              <div className="min-w-0">
                <h3 className="text-base leading-snug font-semibold text-white sm:text-lg lg:text-[1.2rem]">
                  <RichText copy={step.title} />
                </h3>
                <p className="mt-2 text-sm leading-[1.65] text-white/80 sm:text-[15px]">
                  <RichText copy={step.description} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Keputusan & Trade-off / Decisions & Trade-offs */}
      <section
        id="keputusan"
        data-project-reveal
        className="scroll-mt-36 lg:scroll-mt-28"
      >
        <h2 className="mb-8 text-[clamp(1.75rem,3.2vw,2.65rem)] leading-tight font-semibold tracking-[-0.02em] text-white sm:mb-10">
          <RichText copy={PROJECT_SHARED_COPY.sectionNav[3]!.label} />
        </h2>
        <div className="space-y-6 sm:space-y-8">
          {project.decisions.map((decision) => (
            <div key={stableSegmentKey(`${project.slug}-decision`, decision.title)}>
              <h3 className="flex items-start gap-2 text-base leading-snug font-semibold text-white sm:gap-2.5 sm:text-lg">
                <ChevronRight
                  aria-hidden="true"
                  className="mt-[3px] h-4 w-4 shrink-0 text-white sm:h-[18px] sm:w-[18px]"
                />
                <span>
                  <RichText copy={decision.title} />
                </span>
              </h3>
              <p className="mt-1.5 pl-6 text-sm leading-[1.65] text-white/80 sm:pl-7 sm:text-[15px]">
                <RichText copy={decision.description} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Hasil / Results */}
      <section
        id="hasil"
        data-project-reveal
        className="scroll-mt-36 lg:scroll-mt-28"
      >
        <h2 className="text-center text-[clamp(1.75rem,3.2vw,2.65rem)] leading-tight font-semibold tracking-[-0.02em] text-white">
          <RichText copy={PROJECT_SHARED_COPY.sectionNav[4]!.label} />
        </h2>
        <ProjectResultCard project={project} />
      </section>

      {/* Refleksi Teknis / Technical Reflection */}
      <section
        data-project-reveal
        className="grid grid-cols-1 items-start gap-5 pt-4 md:grid-cols-[260px_1fr] md:gap-12 lg:grid-cols-[340px_1fr]"
      >
        <h2 className="max-w-[220px] text-[clamp(1.75rem,3.2vw,2.65rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-white">
          {PROJECT_SHARED_COPY.reflectionHeading[locale]}
        </h2>
        <div className="min-w-0 space-y-5 text-sm leading-[1.68] text-white/85 sm:text-[15px] lg:text-base">
          {project.reflections.map((item) => (
            <p key={stableSegmentKey(`${project.slug}-reflection`, item)}>
              <RichText copy={item} />
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
