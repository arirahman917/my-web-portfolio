import type { ReactNode } from "react";

interface AboutPrinciplesCurtainProps {
  aboutMe: ReactNode;
  principles: ReactNode;
}

/**
 * Shared scroll-over curtain container for `#about-me` and `#principles`.
 * Keeps `#about-me` sticky on the lower layer (`z-10`) during the dwell spacer
 * so the viewport pauses on `#about-me` before `#principles` (`z-30`) rises
 * from the bottom to cover it.
 */
export function AboutPrinciplesCurtain({
  aboutMe,
  principles,
}: AboutPrinciplesCurtainProps) {
  return (
    <div className="relative bg-lightblue">
      {aboutMe}
      <div
        aria-hidden="true"
        className="pointer-events-none h-[32dvh] sm:h-[40dvh] motion-reduce:hidden"
      />
      {principles}
    </div>
  );
}
