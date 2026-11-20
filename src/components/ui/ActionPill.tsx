import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ActionPillProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "glass" | "outline";
  external?: boolean;
  className?: string;
}

const variantStyles: Record<NonNullable<ActionPillProps["variant"]>, string> = {
  solid:
    "bg-white text-black hover:bg-lightblue focus-visible:ring-white/70",
  glass:
    "glass-blur-black border border-white/20 text-white hover:bg-white/15 focus-visible:ring-white/70",
  outline:
    "border border-white/35 bg-transparent text-white hover:border-white hover:bg-white/10 focus-visible:ring-white/70",
};

/** Pill-shaped action button supporting internal Next.js routes and external links. */
export function ActionPill({
  href,
  children,
  variant = "glass",
  external = false,
  className,
}: ActionPillProps) {
  const baseClass = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2",
    variantStyles[variant],
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={baseClass}>
      {children}
    </Link>
  );
}
