"use client";

import type { MouseEvent } from "react";
import { PROJECT_SHARED_COPY } from "@/data/projects";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/lib/utils";

interface ProjectSubNavProps {
  activeSectionId: string;
  isStuck: boolean;
  onNavigate: (sectionId: string) => void;
}

/**
 * Floating electric-blue anchor pill navigation bar (`Masalah` .. `Hasil`).
 * Sticks to the top of the viewport while scrolling through the case study body
 * up to the Footer, and returns into document flow when scrolled back above
 * its initial position below the mockup showcase.
 */
export function ProjectSubNav({
  activeSectionId,
  isStuck,
  onNavigate,
}: ProjectSubNavProps) {
  const handleClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();
    onNavigate(sectionId);
  };

  return (
    <nav
      aria-label="Project case study sections"
      className={cn(
        "mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-x-1 gap-y-1 rounded-2xl bg-primary-blue-contrast px-3 py-2 text-xs font-semibold text-white transition-shadow duration-300 sm:flex-nowrap sm:gap-x-3 sm:rounded-[18px] sm:px-5 sm:py-2 sm:text-sm md:gap-x-5 lg:gap-x-7 lg:px-7 lg:text-[15px]",
        isStuck
          ? "shadow-[0_14px_34px_rgba(8,11,24,0.7)]"
          : "shadow-[0_10px_28px_rgba(18,53,216,0.35)]"
      )}
    >
      {PROJECT_SHARED_COPY.sectionNav.map((item) => {
        const isActive = activeSectionId === item.id;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(event) => handleClick(event, item.id)}
            aria-current={isActive ? "location" : undefined}
            className={cn(
              "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-2.5 py-1.5 whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:min-h-[38px] sm:px-3.5",
              isActive
                ? "text-white"
                : "text-white/85 hover:text-white"
            )}
          >
            {isActive ? (
              <svg
                viewBox="0 0 8 10"
                fill="currentColor"
                aria-hidden="true"
                className="h-2.5 w-2 shrink-0 text-white"
              >
                <path d="M0.5 0.8L7.5 5L0.5 9.2V0.8Z" />
              </svg>
            ) : null}
            <RichText copy={item.label} />
          </a>
        );
      })}
    </nav>
  );
}
