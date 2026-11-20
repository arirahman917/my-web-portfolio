import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassBadgeProps {
  children: ReactNode;
  className?: string;
}

/** Frosted glassmorphic pill matching Figma's blur-black surface (#3A3A3A @ 30%). */
export function GlassBadge({ children, className }: GlassBadgeProps) {
  return (
    <span
      className={cn(
        "glass-blur-black inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium tracking-wide text-white sm:text-sm",
        className
      )}
    >
      {children}
    </span>
  );
}
