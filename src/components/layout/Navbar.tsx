"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { NAV_COPY, NAV_LINKS } from "@/data/navigation";
import type { CvOption } from "@/data/types";
import { ScrollSmoother, scrollSmoothTo } from "@/components/motion/gsapConfig";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CvDropdown } from "./CvDropdown";
import { RollingText } from "./RollingText";

const CLOSE_ARM_ANGLES = [
  "rotate-45",
  "rotate-[135deg]",
  "-rotate-[135deg]",
  "-rotate-45",
] as const;

function SocialIcon({ socialKey }: { socialKey: string }) {
  switch (socialKey) {
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m5.8 14.12c-.25.7-1.44 1.34-2 1.42-.51.08-1.16.11-1.87-.12-.43-.14-.99-.32-1.7-.63-2.98-1.29-4.93-4.29-5.08-4.49-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.6-.37.8-.37l.58.01c.19 0 .44-.07.69.52.25.6.86 2.09.94 2.24.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.53-.15.15-.31.31-.13.61.18.3.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.46 1.51.3.15.48.13.66-.08.18-.2.76-.89.96-1.19.2-.3.4-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.22.58.35.08.13.08.75-.17 1.45z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      );
    default:
      return null;
  }
}

interface NavbarProps {
  cvOptions?: CvOption[];
}

/**
 * Global Navbar shell (Phase 2 scaffold).
 * Full styling, scroll-contrast adaptation, and staggered menu polish follow in Phase 3 (`utils`).
 */
export function Navbar({ cvOptions = [] }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCloseDestroyed, setIsCloseDestroyed] = useState(false);
  const { locale } = useLanguage();
  const pathname = usePathname();

  const openMenu = () => {
    setIsCloseDestroyed(false);
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsCloseDestroyed(true);
    setIsOpen(false);
  };

  const handleNavLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    setIsOpen(false);
    const hashIndex = href.indexOf("#");
    if (hashIndex !== -1 && pathname === "/") {
      const targetSelector = href.slice(hashIndex);
      if (document.querySelector(targetSelector)) {
        event.preventDefault();
        ScrollSmoother.get()?.paused(false);
        window.history.replaceState(null, "", href);
        window.requestAnimationFrame(() => {
          scrollSmoothTo(targetSelector);
        });
      }
    }
  };

  useEffect(() => {
    const smoother = ScrollSmoother.get();
    smoother?.paused(isOpen);
    return () => {
      ScrollSmoother.get()?.paused(false);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 sm:px-10">
        <Logo className="pointer-events-auto" onClick={() => setIsOpen(false)} />

        <button
          type="button"
          onClick={openMenu}
          aria-label={NAV_COPY.openMenuAria[locale]}
          aria-expanded={isOpen}
          className="pointer-events-auto group inline-flex h-11 w-11 cursor-pointer items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <span className="flex w-6 flex-col items-end gap-[5px]" aria-hidden="true">
            <span className="h-[3px] w-full rounded-full bg-current" />
            <span className="h-[3px] w-full rounded-full bg-current transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-3" />
            <span className="h-[3px] w-full rounded-full bg-current" />
          </span>
        </button>
      </div>

      <div
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`fixed inset-0 z-50 flex flex-col justify-between bg-gradient-to-br from-primary-blue to-primary-blue-contrast px-6 pt-5 pb-6 transition-transform duration-700 ease-[cubic-bezier(0.8,0,0.95,0.2)] will-change-transform sm:px-10 ${
          isOpen ? "pointer-events-auto translate-y-0" : "pointer-events-none -translate-y-full"
        }`}
      >
            <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between">
              <Logo onClick={() => setIsOpen(false)} />
              <button
                type="button"
                onClick={closeMenu}
                aria-label={NAV_COPY.closeMenuAria[locale]}
                className="group inline-flex h-11 w-11 cursor-pointer items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span className="relative block h-7 w-7" aria-hidden="true">
                  {CLOSE_ARM_ANGLES.map((angleClass) => (
                    <span
                      key={angleClass}
                      className={`absolute left-1/2 top-1/2 -mt-[1.5px] -ml-[1.5px] origin-[1.5px_center] ${angleClass}`}
                    >
                      <span
                        className={`block h-[3px] rounded-full bg-current transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isCloseDestroyed
                            ? "w-[6.5px] translate-x-[9.5px]"
                            : "w-[16px] translate-x-0 group-hover:w-[11.5px] group-hover:translate-x-[4.5px] group-active:w-[6.5px] group-active:translate-x-[9.5px]"
                        }`}
                      />
                    </span>
                  ))}
                </span>
              </button>
            </div>

            <nav
              aria-label="Primary navigation"
              className="mx-auto flex flex-col items-center gap-4 text-center"
            >
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={(event) => handleNavLinkClick(event, item.href)}
                  className="group inline-flex text-3xl font-bold tracking-tight text-white sm:text-5xl"
                >
                  <RollingText text={item.label[locale]} />
                </Link>
              ))}
            </nav>

            <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-4 sm:grid-cols-3">
              <div className="flex items-center justify-center gap-3 text-white/90 sm:justify-self-start">
                {NAV_COPY.socialLinks.map((social) => (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white/90 transition-all hover:scale-110 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <SocialIcon socialKey={social.key} />
                  </a>
                ))}
              </div>

              <div className="justify-self-center">
                <LanguageSwitcher />
              </div>

              <div className="justify-self-center sm:justify-self-end">
                <CvDropdown
                  cvOptions={cvOptions}
                  direction="up"
                  labelVariant="navbar"
                />
              </div>
            </div>
      </div>
    </header>
  );
}
