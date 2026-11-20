"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  href: string;
  className?: string;
}

/**
 * Minimal text back-navigation link for detail pages (`/achievements`, `/projects/*`).
 */
export function BackButton({ href, className }: BackButtonProps) {
  const { locale } = useLanguage();
  const label = locale === "id" ? "Kembali" : "Back";

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-[44px] items-center gap-1.5 text-xs font-medium text-white/80 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:text-[13px]",
        className
      )}
    >
      <ArrowLeft
        className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5"
        aria-hidden="true"
      />
      <span>{label}</span>
    </Link>
  );
}
