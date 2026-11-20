"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CV_OPTIONS, NAV_COPY } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface CvDropdownProps {
  direction?: "up" | "down";
  labelVariant?: "navbar" | "footer";
  className?: string;
}

/** Shared 3-role CV download dropdown for Navbar (upward) and Footer (downward). */
export function CvDropdown({
  direction = "down",
  labelVariant = "footer",
  className,
}: CvDropdownProps) {
  const [open, setOpen] = useState(false);
  const { locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
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

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
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

      {open && (
        <div
          role="menu"
          className={cn(
            "absolute right-0 z-50 w-[192px] rounded-none border border-lightblue/50 bg-transparent px-4 py-1 shadow-[0_12px_30px_rgba(8,11,24,0.38)] backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] sm:w-[200px]",
            direction === "up" ? "bottom-full mb-3" : "top-full mt-3"
          )}
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
        </div>
      )}
    </div>
  );
}
