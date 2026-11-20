"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SOCIAL_LINKS } from "@/data/links";
import { CV_OPTIONS, NAV_COPY } from "@/data/navigation";
import type { Locale } from "@/data/types";
import { HeroAmbientLight } from "@/components/motion/HeroAmbientLight";

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

function FooterCvMenu({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const triggerLabel = NAV_COPY.footerDownloadCvButton[locale];

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex min-h-[44px] min-w-[136px] cursor-pointer items-center justify-center gap-2.5 rounded-[2px] border border-lightblue/80 bg-transparent px-4 py-1.5 text-sm font-semibold tracking-[0.01em] text-white transition-colors duration-200 hover:border-white hover:bg-lightblue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightblue sm:min-w-[144px] lg:min-h-[38px] lg:px-5 lg:text-[15px]"
      >
        <span>{triggerLabel}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="
              absolute top-full right-0 z-40 mt-3 w-[192px] rounded-none
              border border-lightblue/50 bg-transparent px-4 py-1
              shadow-[0_12px_30px_rgba(8,11,24,0.38)] backdrop-blur-md
              [-webkit-backdrop-filter:blur(12px)] sm:w-[200px]
            "
          >
            <div className="divide-y divide-lightblue/70">
              {CV_OPTIONS.map((cv) => (
                <a
                  key={cv.key}
                  role="menuitem"
                  href={cv.href}
                  download={cv.isAvailable ? cv.fileName : undefined}
                  aria-disabled={!cv.isAvailable || undefined}
                  title={
                    !cv.isAvailable
                      ? locale === "id"
                        ? "PDF segera tersedia"
                        : "PDF available soon"
                      : undefined
                  }
                  onClick={(event) => {
                    if (!cv.isAvailable) {
                      event.preventDefault();
                    }
                    setOpen(false);
                  }}
                  className="flex min-h-[44px] items-center justify-center py-2.5 text-center text-[13px] font-normal tracking-[0.02em] text-lightblue transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:text-[14px]"
                >
                  {cv.label[locale]}
                </a>
              ))}
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/**
 * Global Footer (`#footer`) matching `assets/uiux/landingpage/footer.png`.
 * Features PRD light-blue / electric-blue radial lighting on `#080B18`,
 * top row (`Github` + `Unduh CV` glassmorphic dropdown), left-aligned
 * oversized `LET'S CONNECT ↗` + email trigger, and bottom 3-column social row.
 */
export function Footer() {
  const { locale } = useLanguage();

  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-primary-black text-white"
    >
      <HeroAmbientLight variant="footer" edgeFade="top" />

      {/*
        Fits one viewport: height = 100dvh (clamped 480–960px).
        Top padding clears the fixed Navbar (py-5 + 44px button ≈ 84px)
        so `Github` / `Unduh CV` never sit under the logo or hamburger.
      */}
      <div className="relative z-10 mx-auto flex h-dvh max-h-[960px] min-h-[480px] w-full max-w-[1440px] flex-col justify-between px-6 pt-[5.75rem] pb-[clamp(1rem,3.5dvh,2.25rem)] sm:px-10 lg:px-16">
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

          <FooterCvMenu locale={locale} />
        </div>

        {/* Center-Left Hero CTA: LET'S CONNECT ↗ + email */}
        <div className="my-auto flex flex-col items-start py-4 text-left">
          <a
            href={SOCIAL_LINKS.emailHref}
            className="group inline-flex flex-wrap items-center gap-x-[0.34em] gap-y-2 text-[length:clamp(2.25rem,min(6.8vw,12dvh),6rem)] leading-[0.95] font-semibold tracking-[-0.015em] text-lightblue uppercase transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightblue"
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
