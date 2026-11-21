"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Download } from "lucide-react";
import { AnimatePresence, m } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { NAV_COPY } from "@/data/navigation";
import type { CvOption } from "@/data/types";
import { cn } from "@/lib/utils";

interface CvDropdownProps {
  cvOptions?: CvOption[];
  direction?: "up" | "down";
  labelVariant?: "navbar" | "footer";
  className?: string;
}

/**
 * Shared two-level CV download dropdown for Navbar (upward) and Footer (downward).
 * Level 1 lists folders from `public/cv/`; clicking a folder reveals its ID/EN PDF options.
 */
export function CvDropdown({
  cvOptions = [],
  direction = "down",
  labelVariant = "footer",
  className,
}: CvDropdownProps) {
  const [open, setOpen] = useState(false);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const { locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setOpen(false);
    setExpandedKey(null);
  };

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const triggerLabel =
    labelVariant === "navbar"
      ? NAV_COPY.downloadCvButton[locale]
      : NAV_COPY.footerDownloadCvButton[locale];

  const offsetY = direction === "up" ? 6 : -6;

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => {
            if (prev) setExpandedKey(null);
            return !prev;
          });
        }}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex min-h-[44px] min-w-[136px] cursor-pointer items-center justify-center gap-2.5 rounded-[2px] border border-lightblue/80 bg-transparent px-4 py-1.5 text-sm font-semibold tracking-[0.01em] text-white transition-colors duration-200 hover:border-white hover:bg-lightblue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightblue sm:min-w-[144px] lg:min-h-[38px] lg:px-5 lg:text-[15px]"
      >
        <span>{triggerLabel}</span>
        {direction === "up" ? (
          <ChevronUp
            aria-hidden="true"
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-200",
              open ? "rotate-180" : "rotate-0"
            )}
          />
        ) : (
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-200",
              open ? "rotate-180" : "rotate-0"
            )}
          />
        )}
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            role="menu"
            initial={{ opacity: 0, y: offsetY, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: offsetY, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute z-50 max-h-[min(60dvh,360px)] w-[256px] max-w-[calc(100vw-3rem)] overflow-y-auto rounded-none border border-lightblue/50 bg-transparent px-4 py-1 shadow-[0_12px_30px_rgba(8,11,24,0.38)] backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] sm:w-[272px]",
              direction === "up" ? "bottom-full mb-3" : "top-full mt-3",
              labelVariant === "navbar"
                ? "left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0"
                : "right-0"
            )}
          >
            {cvOptions.length === 0 ? (
              <p className="flex min-h-[44px] items-center justify-center py-2.5 text-center text-[13px] text-lightblue/75">
                {NAV_COPY.cvUnavailable[locale]}
              </p>
            ) : (
              <div className="divide-y divide-lightblue/70">
                {cvOptions.map((cv) => {
                  const isExpanded = expandedKey === cv.key;
                  const subMenuId = `cv-sub-${labelVariant}-${cv.key}`;

                  return (
                    <div key={cv.key}>
                      <button
                        type="button"
                        role="menuitem"
                        aria-expanded={isExpanded}
                        aria-controls={subMenuId}
                        onClick={() =>
                          setExpandedKey((prev) =>
                            prev === cv.key ? null : cv.key
                          )
                        }
                        className="flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-2 py-2.5 text-left text-[13px] font-normal tracking-[0.02em] text-lightblue transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:text-[14px]"
                      >
                        <span className="truncate">{cv.label}</span>
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            "h-3.5 w-3.5 shrink-0 opacity-80 transition-transform duration-200",
                            isExpanded ? "rotate-180 text-white" : "rotate-0"
                          )}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded ? (
                          <m.div
                            id={subMenuId}
                            role="group"
                            aria-label={cv.label}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{
                              duration: 0.16,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="border-t border-lightblue/30 pb-1.5 pt-1"
                          >
                            {cv.variants.length > 0 ? (
                              <div className="flex flex-col gap-0.5">
                                {cv.variants.map((variant) => (
                                  <a
                                    key={variant.key}
                                    role="menuitem"
                                    href={variant.href}
                                    download={variant.fileName}
                                    onClick={closeMenu}
                                    className="group flex min-h-[44px] items-center justify-between gap-2 rounded-[2px] px-2 py-2 text-[12px] font-normal text-lightblue/90 transition-colors duration-150 hover:bg-lightblue/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:text-[13px]"
                                  >
                                    <span className="flex items-center gap-2">
                                      <span className="inline-flex min-w-[26px] items-center justify-center rounded-[2px] border border-lightblue/45 px-1 py-0.5 text-[10px] font-semibold tracking-wider text-white/90">
                                        {variant.langCode}
                                      </span>
                                      <span>{variant.label[locale]}</span>
                                    </span>
                                    <Download
                                      aria-hidden="true"
                                      className="h-3.5 w-3.5 shrink-0 opacity-70 transition-opacity duration-150 group-hover:opacity-100"
                                    />
                                  </a>
                                ))}
                              </div>
                            ) : (
                              <p className="flex min-h-[44px] items-center px-2 text-xs text-lightblue/65">
                                {NAV_COPY.cvUnavailable[locale]}
                              </p>
                            )}
                          </m.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
