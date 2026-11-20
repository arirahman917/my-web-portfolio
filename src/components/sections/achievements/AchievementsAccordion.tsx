"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ACHIEVEMENTS_COPY } from "@/data/achievements";
import type { AchievementData } from "@/data/types";
import { HeroAmbientLight } from "@/components/motion/HeroAmbientLight";
import { BackButton } from "@/components/ui/BackButton";
import { AchievementPanel } from "./AchievementPanel";

interface AchievementsAccordionProps {
  achievements: AchievementData[];
}

/**
 * Consolidated Detail Achievements container (`/achievements`).
 * Keeps one achievement expanded at a time (defaulting to #1 JOINTS UGM 2026)
 * over Hero-style drifting PRD blue ambient light that blends seamlessly into the Footer.
 */
export function AchievementsAccordion({
  achievements,
}: AchievementsAccordionProps) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(
    achievements[0]?.slug ?? null
  );
  const { locale } = useLanguage();

  return (
    <div className="relative overflow-hidden bg-primary-black px-6 pt-24 pb-6 text-white sm:px-10 sm:pt-28 sm:pb-8 lg:px-12 lg:pt-28 lg:pb-10">
      <HeroAmbientLight variant="achievements" edgeFade="bottom" />

      <div className="relative z-10 mx-auto max-w-[1180px] space-y-8 sm:space-y-10">
        <div>
          <BackButton href="/#achievements" />
          <h1 className="mt-4 text-center text-3xl font-bold tracking-tight text-white sm:mt-5 sm:text-4xl lg:text-[2.75rem]">
            {ACHIEVEMENTS_COPY.detailPageHeading[locale]}
          </h1>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {achievements.map((item) => (
            <AchievementPanel
              key={item.slug}
              achievement={item}
              isExpanded={expandedSlug === item.slug}
              onToggle={() =>
                setExpandedSlug((prev) =>
                  prev === item.slug ? null : item.slug
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
