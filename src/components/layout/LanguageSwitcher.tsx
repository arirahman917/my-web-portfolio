"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { RollingText } from "./RollingText";

interface LanguageSwitcherProps {
  className?: string;
}

/** Bilingual IND - ENG switcher backed by LanguageContext + localStorage. */
export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className={cn("inline-flex items-center gap-2 text-sm tracking-wider", className)}
    >
      <button
        type="button"
        onClick={() => setLocale("id")}
        aria-pressed={locale === "id"}
        className={cn(
          "group inline-flex cursor-pointer items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded px-1",
          locale === "id" ? "font-bold text-white" : "font-normal text-white/60 hover:text-white"
        )}
      >
        <RollingText text="IND" />
      </button>
      <span aria-hidden="true" className="text-white/50">
        -
      </span>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={cn(
          "group inline-flex cursor-pointer items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded px-1",
          locale === "en" ? "font-bold text-white" : "font-normal text-white/60 hover:text-white"
        )}
      >
        <RollingText text="ENG" />
      </button>
    </div>
  );
}
