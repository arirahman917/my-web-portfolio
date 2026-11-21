"use client";

import { useCallback, useRef, useState } from "react";
import { PROJECT_SHARED_COPY } from "@/data/projects";
import type { ProjectData } from "@/data/types";
import {
  gsap,
  ScrollTrigger,
  registerGsapPlugins,
  scrollSmoothTo,
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
 * Coordinates scroll-triggered section tracking, smooth `ScrollSmoother` anchor jumps,
 * pinned `ProjectSubNav` up to the Footer, and GPU parallax across hero, mockup, and results.
 */
export function ProjectDetailTemplate({ project }: ProjectDetailTemplateProps) {
  const rootRef = useRef<HTMLElement>(null);
  const subNavStickyRef = useRef<HTMLDivElement>(null);

  const [activeSectionId, setActiveSectionId] = useState<string>("");
  const [isSubNavStuck, setIsSubNavStuck] = useState<boolean>(false);

  const scrollToSection = useCallback((sectionId: string) => {
    const isDesktop = window.innerWidth >= 1024;
    const stickyTop = isDesktop ? 20 : 76;
    const navHeight = subNavStickyRef.current?.offsetHeight ?? 52;
    const offsetY = stickyTop + navHeight + 28;

    scrollSmoothTo(`#${sectionId}`, { offsetY });
  }, []);

  useGSAP(
    () => {
      registerGsapPlugins();

      const rootEl = rootRef.current;
      const subNavEl = subNavStickyRef.current;
      if (!rootEl || !subNavEl) return;

      const getStickyTop = () => (window.innerWidth >= 1024 ? 20 : 76);

      const stickyTrigger = ScrollTrigger.create({
        trigger: subNavEl,
        start: () => `top ${getStickyTop()}px`,
        endTrigger: rootEl,
        end: () =>
          `bottom ${getStickyTop() + (subNavEl.offsetHeight || 52) + 80}px`,
        pin: subNavEl,
        pinSpacing: false,
        invalidateOnRefresh: true,
        onToggle: (self) => setIsSubNavStuck(self.isActive),
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

      const headerEl = rootEl.querySelector<HTMLElement>(
        "[data-project-hero-header]"
      );
      const coverEl = rootEl.querySelector<HTMLElement>(
        "[data-project-cover]"
      );
      if (headerEl && coverEl) {
        gsap.fromTo(
          coverEl,
          { yPercent: -5, scale: 1.12 },
          {
            yPercent: 8,
            scale: 1.12,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: headerEl,
              start: "top top",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      const mockupWrapEl = rootEl.querySelector<HTMLElement>(
        "[data-project-mockup-wrap]"
      );
      const mockupEl = rootEl.querySelector<HTMLElement>(
        "[data-project-mockup]"
      );
      const glowEl = rootEl.querySelector<HTMLElement>("[data-project-glow]");
      if (mockupWrapEl && mockupEl) {
        gsap.fromTo(
          mockupEl,
          { y: 24 },
          {
            y: -24,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: mockupWrapEl,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
      if (mockupWrapEl && glowEl) {
        gsap.fromTo(
          glowEl,
          { y: -16 },
          {
            y: 16,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: mockupWrapEl,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      const resultCardEl = rootEl.querySelector<HTMLElement>(
        "[data-project-result-card]"
      );
      const resultBgEl = rootEl.querySelector<HTMLElement>(
        "[data-project-result-bg]"
      );
      const resultObjectEl = rootEl.querySelector<HTMLElement>(
        "[data-project-result-object]"
      );
      if (resultCardEl && resultBgEl) {
        gsap.fromTo(
          resultBgEl,
          { yPercent: -5, scale: 1.1 },
          {
            yPercent: 5,
            scale: 1.1,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: resultCardEl,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }
      if (resultCardEl && resultObjectEl) {
        gsap.fromTo(
          resultObjectEl,
          { y: 22 },
          {
            y: -22,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: resultCardEl,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

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
              force3D: true,
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
        <div ref={subNavStickyRef} className="relative z-30 w-full">
          <div className="mx-auto w-fit max-w-full">
            <ProjectSubNav
              activeSectionId={activeSectionId}
              isStuck={isSubNavStuck}
              onNavigate={scrollToSection}
            />
          </div>
        </div>

        <ProjectNarrativeSections project={project} />
      </div>
    </article>
  );
}
