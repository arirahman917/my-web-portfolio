"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SOCIAL_LINKS } from "@/data/links";
import { NAV_COPY } from "@/data/navigation";
import type { CvOption } from "@/data/types";
import { HeroAmbientLight } from "@/components/motion/HeroAmbientLight";
import { gsap, registerGsapPlugins, useGSAP } from "@/components/motion/gsapConfig";
import { CvDropdown } from "./CvDropdown";

interface FooterProps {
  cvOptions?: CvOption[];
}

/** Crisp geometric diagonal arrow matching `LET'S CONNECT ↗` in `footer.png`. */
function ConnectArrowIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={4.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-[0.78em] shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
    >
      <path d="M12 52L52 12" />
      <path d="M17 12H52V47" />
    </svg>
  );
}

/**
 * Global Footer (`#footer`) matching `assets/uiux/landingpage/footer.png`.
 * Features PRD light-blue / electric-blue radial lighting on `#080B18`,
 * top row (`Github` + `Unduh CV` glassmorphic dropdown), left-aligned
 * oversized `LET'S CONNECT ↗` + email trigger, bottom 3-column social row,
 * and subtle GSAP scroll-unfold parallax.
 */
export function Footer({ cvOptions = [] }: FooterProps) {
  const { locale } = useLanguage();
  const footerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();

      const footerEl = footerRef.current;
      const innerEl = innerRef.current;
      if (!footerEl || !innerEl) return;

      gsap.fromTo(
        innerEl,
        { y: -36 },
        {
          y: 0,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: footerEl,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative overflow-hidden bg-primary-black text-white"
    >
      <HeroAmbientLight variant="footer" edgeFade="top" />

      {/*
        Fits one viewport: height = 100dvh (clamped 480–960px).
        Top padding clears the fixed Navbar (py-5 + 44px button ≈ 84px)
        so `Github` / `Unduh CV` never sit under the logo or hamburger.
      */}
      <div
        ref={innerRef}
        className="relative z-10 mx-auto flex h-dvh max-h-[960px] min-h-[480px] w-full max-w-[1440px] flex-col justify-between px-6 pt-[5.75rem] pb-[clamp(1rem,3.5dvh,2.25rem)] will-change-transform sm:px-10 lg:px-16"
      >
        {/* Top Row: Github (left) & Unduh CV dropdown (right) */}
        <div className="flex items-center justify-between gap-4">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center text-base font-semibold tracking-[-0.01em] text-lightblue transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightblue lg:text-[length:clamp(1rem,min(1.3vw,2.6dvh),1.25rem)]"
          >
            Github
          </a>

          <CvDropdown
            cvOptions={cvOptions}
            direction="down"
            labelVariant="footer"
          />
        </div>

        {/* Center-Left Hero CTA: LET'S CONNECT ↗ + email */}
        <div className="my-auto flex flex-col items-start py-4 text-left">
          <a
            href={SOCIAL_LINKS.emailHref}
            className="group inline-flex flex-nowrap items-center gap-x-[0.3em] text-[length:clamp(1.625rem,min(6.8vw,12dvh),6rem)] leading-[0.95] font-semibold tracking-[-0.015em] whitespace-nowrap text-lightblue uppercase transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightblue"
          >
            <span className="[text-shadow:0_0_36px_rgba(234,240,255,0.16)]">
              {NAV_COPY.footerHeadline[locale]}
            </span>
            <ConnectArrowIcon />
          </a>

          <a
            href={SOCIAL_LINKS.emailHref}
            className="mt-1.5 inline-flex min-h-[44px] items-center pl-0.5 text-sm font-normal tracking-[-0.01em] text-lightblue/95 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightblue sm:text-base lg:mt-2 lg:pl-1 lg:text-[length:clamp(1rem,min(1.3vw,2.6dvh),1.25rem)]"
          >
            {NAV_COPY.email}
          </a>
        </div>

        {/* Bottom Row: LinkedIn (left), WhatsApp (center), Instagram (right) */}
        <div className="grid grid-cols-3 items-center gap-4 text-sm font-semibold tracking-[-0.01em] text-lightblue sm:text-base lg:text-[length:clamp(1rem,min(1.3vw,2.6dvh),1.25rem)]">
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-self-start transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightblue"
          >
            LinkedIn
          </a>

          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-self-center transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightblue"
          >
            WhatsApp
          </a>

          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-self-end transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightblue"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
