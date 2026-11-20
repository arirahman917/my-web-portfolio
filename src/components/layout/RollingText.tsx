import { cn } from "@/lib/utils";

interface RollingTextProps {
  text: string;
  className?: string;
}

/**
 * Split-slide hover text animation: primary text shifts upward out of view
 * while a duplicate enters from below, reversing cleanly on mouse leave.
 * Requires `group` on the interactive parent element.
 */
export function RollingText({ text, className }: RollingTextProps) {
  return (
    <span
      className={cn(
        "relative inline-flex overflow-hidden leading-[1.15]",
        className
      )}
    >
      <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 inline-block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 motion-reduce:hidden"
      >
        {text}
      </span>
    </span>
  );
}
