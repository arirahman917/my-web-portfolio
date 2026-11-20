import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

/** Ari Rahman monogram mark linking back to the landing page. */
export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Ari Rahman — Home"
      className={cn(
        "inline-flex items-center gap-2 transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-md",
        className
      )}
    >
      <Image
        src="/images/logo/white.webp"
        alt=""
        width={297}
        height={336}
        priority
        className="h-[34px] w-auto object-contain"
      />
    </Link>
  );
}
