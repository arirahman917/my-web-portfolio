"use client";

import { useCallback, useRef, useState } from "react";
import { PROJECT_SHARED_COPY } from "@/data/projects";
import type { ProjectData } from "@/data/types";
import {
  gsap,
  ScrollTrigger,
  registerGsapPlugins,
  useGSAP,
} from "@/components/motion/gsapConfig";
import { ProjectHeroHeader } from "./ProjectHeroHeader";
import { ProjectSubNav } from "./ProjectSubNav";
import { ProjectNarrativeSections } from "./ProjectNarrativeSections";

interface ProjectDetailTemplateProps {
  project: ProjectData;
}

/**
 * Shared Case Study Template for `/projects/{kasir,landeuh,ais,webgis}`.
 * Coordinates scroll-triggered section tracking, ScrollToPlugin smooth anchor jumps,
 * and sticky `ProjectSubNav` elevation up to the Footer.
 */
export function ProjectDetailTemplate({ project }: ProjectDetailTemplateProps) {
  const rootRef = useRef<HTMLElement>(null);
  const subNavSentinelRef = useRef<HTMLDivElement>(null);
  const subNavStickyRef = useRef<HTMLDivElement>(null);

  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [isSubNavStuck, setIsSubNavStuck] = useState<boolean>(false);

  const scrollToSection = useCallback((sectionId: string) => {
    const targetEl = document.getElementById(sectionId);
    if (!targetEl) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isDesktop = window.innerWidth >= 1024;
    const stickyTop = isDesktop ? 20 : 76;
    const navHeight = subNavStickyRef.current?.offsetHeight ?? 52;
    const offsetY = stickyTop + navHeight + 28;

    if (prefersReducedMotion) {
      const targetTop =
        targetEl.getBoundingClientRect().top + window.scrollY - offsetY;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
      return;
    }

    registerGsapPlugins();
    gsap.to(window, {
      duration: 0.75,
      ease: "power3.inOut",
      scrollTo: { y: targetEl, offsetY, autoKill: true },
    });
  }, []);

  useGSAP(
    () => {
      registerGsapPlugins();

      const rootEl = rootRef.current;
      const sentinelEl = subNavSentinelRef.current;
      if (!rootEl || !sentinelEl) return;

      const getStickyTop = () => (window.innerWidth >= 1024 ? 20 : 76);

      const stickyTrigger = ScrollTrigger.create({
        trigger: sentinelEl,
        start: () => `top ${getStickyTop()}px`,
        endTrigger: rootEl,
        end: "bottom top",
        invalidateOnRefresh: true,
        onEnter: () => setIsSubNavStuck(true),
        onLeaveBack: () => setIsSubNavStuck(false),
        onLeave: () => setIsSubNavStuck(false),
        onEnterBack: () => setIsSubNavStuck(true),
      });

      const sectionIds = PROJECT_SHARED_COPY.sectionNav.map((item) => item.id);
      const sectionTriggers = sectionIds.map((id, index) =>
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top 40%",
          end: "bottom 40%",
          onEnter: () => setActiveSectionId(id),
          onEnterBack: () => setActiveSectionId(id),
          onLeaveBack:
            index === 0 ? () => setActiveSectionId("") : undefined,
        })
      );

      const mm = gsap.matchMedia();
      mm.add(
        { canAnimate: "(prefers-reduced-motion: no-preference)" },
        (context) => {
          if (!context.conditions?.canAnimate) return;

          const revealNodes = gsap.utils.toArray<HTMLElement>(
            "[data-project-reveal]",
            rootEl
          );

          revealNodes.forEach((node) => {
            gsap.from(node, {
              y: 22,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: node,
                start: "top 88%",
                once: true,
              },
            });
          });
        }
      );

      return () => {
        stickyTrigger.kill();
        sectionTriggers.forEach((trigger) => trigger.kill());
        mm.revert();
      };
    },
    { scope: rootRef }
  );

  return (
    <article ref={rootRef} className="relative bg-primary-black text-white">
      <ProjectHeroHeader
        project={project}
        onScrollToDetails={() => scrollToSection("masalah")}
      />

      {/* Sticky Case Study Scope: stops cleanly at the bottom of `<article>` right above Footer */}
      <div className="relative mx-auto mt-8 max-w-[1440px] px-6 pb-24 sm:mt-10 sm:px-10 sm:pb-32">
        <div ref={subNavSentinelRef} aria-hidden="true" className="h-px w-full" />

        <div
          ref={subNavStickyRef}
          className="sticky top-[76px] z-30 mx-auto w-fit max-w-full lg:top-5"
        >
          <ProjectSubNav
            activeSectionId={activeSectionId}
            isStuck={isSubNavStuck}
            onNavigate={scrollToSection}
          />
        </div>

        <ProjectNarrativeSections project={project} />
      </div>
    </article>
  );
}
