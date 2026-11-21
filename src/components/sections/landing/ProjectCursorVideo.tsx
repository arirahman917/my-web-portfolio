"use client";

import {
  memo,
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import type { ProjectData, ProjectSlug } from "@/data/types";
import { gsap, registerGsapPlugins, useGSAP } from "@/components/motion/gsapConfig";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";
import { cn } from "@/lib/utils";

const DESKTOP_HOVER_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine)";
const BOTTOM_CLEAR_RATIO = 0.8;

function subscribeDesktopHover(callback: () => void): () => void {
  const mediaQuery = window.matchMedia(DESKTOP_HOVER_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getDesktopHoverSnapshot(): boolean {
  return window.matchMedia(DESKTOP_HOVER_QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

interface ProjectCursorVideoProps {
  sectionRef: RefObject<HTMLElement | null>;
  viewportRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  projects: ProjectData[];
  subscribeTrackUpdate?: (listener: () => void) => () => void;
}

/**
 * Cursor-following floating video preview for `ProjectsSection`.
 * Activates only on desktop (`>= 1024px`) fine-pointer hover devices (disabled
 * on mobile and tablet viewports or touch-only inputs), preloads lazily when
 * `#projects` approaches the viewport, plays only the active project's video,
 * and steps out of the way when hovering `Kunjungi` or `Pendekatan` links.
 */
export const ProjectCursorVideo = memo(function ProjectCursorVideo({
  sectionRef,
  viewportRef,
  trackRef,
  projects,
  subscribeTrackUpdate,
}: ProjectCursorVideoProps) {
  const canHoverCursor = useSyncExternalStore(
    subscribeDesktopHover,
    getDesktopHoverSnapshot,
    getServerSnapshot
  );
  const prefersReducedMotion = useHydratedReducedMotion();

  const [shouldPrepareVideos, setShouldPrepareVideos] = useState(false);
  const [displayedSlug, setDisplayedSlug] = useState<ProjectSlug | null>(null);
  const [readyVideos, setReadyVideos] = useState<Partial<Record<ProjectSlug, boolean>>>({});

  const overlayRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Partial<Record<ProjectSlug, HTMLDivElement | null>>>({});
  const videoRefs = useRef<Partial<Record<ProjectSlug, HTMLVideoElement | null>>>({});
  const activePlaybackSlugRef = useRef<ProjectSlug | null>(null);
  const slotDimensionsRef = useRef<
    Partial<Record<ProjectSlug, { halfW: number; halfH: number }>>
  >({});

  const markVideoReady = useCallback((slug: ProjectSlug) => {
    setReadyVideos((prev) => (prev[slug] ? prev : { ...prev, [slug]: true }));
  }, []);

  const handleVideoReady = useCallback(
    (slug: ProjectSlug) => {
      markVideoReady(slug);
      const videoEl = videoRefs.current[slug];
      if (videoEl && activePlaybackSlugRef.current === slug && videoEl.paused) {
        const playPromise = videoEl.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Ignore AbortError from rapid slide switches or blocked autoplay
          });
        }
      }
    },
    [markVideoReady]
  );

  useGSAP(
    (_context, contextSafe) => {
      if (!canHoverCursor) return;

      registerGsapPlugins();

      const sectionEl = sectionRef.current;
      const viewportEl = viewportRef.current;
      const followerEl = followerRef.current;
      const cardEl = cardRef.current;
      if (!sectionEl || !viewportEl || !followerEl || !cardEl) return;

      let active = true;
      let isPreviewVisible = false;
      let currentSlug: ProjectSlug | null = null;
      let scrollRafId: number | null = null;

      const lastPointer = { x: 0, y: 0, hasMoved: false };
      const followDuration = prefersReducedMotion ? 0.14 : 0.42;
      const revealScaleFrom = prefersReducedMotion ? 1 : 0.86;
      const revealDuration = prefersReducedMotion ? 0.12 : 0.24;
      const hideDuration = prefersReducedMotion ? 0.1 : 0.18;

      gsap.set(followerEl, { xPercent: -50, yPercent: -50, force3D: true });
      gsap.set(cardEl, { autoAlpha: 0, scale: revealScaleFrom, force3D: true });

      const xTo = gsap.quickTo(followerEl, "x", {
        duration: followDuration,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(followerEl, "y", {
        duration: followDuration,
        ease: "power3.out",
      });

      const cacheSlotDimensions = () => {
        for (const project of projects) {
          const slotEl = slotRefs.current[project.slug];
          if (!slotEl) continue;
          const width = slotEl.offsetWidth;
          const height = slotEl.offsetHeight;
          if (width > 0 && height > 0) {
            slotDimensionsRef.current[project.slug] = {
              halfW: width / 2,
              halfH: height / 2,
            };
          }
        }
      };

      cacheSlotDimensions();

      const pauseAllVideos = () => {
        activePlaybackSlugRef.current = null;
        for (const project of projects) {
          const videoEl = videoRefs.current[project.slug];
          if (videoEl && !videoEl.paused) {
            videoEl.pause();
          }
        }
      };

      const syncVideoPlayback = (targetSlug: ProjectSlug | null) => {
        activePlaybackSlugRef.current = targetSlug;
        if (targetSlug) {
          setShouldPrepareVideos(true);
        }

        for (const project of projects) {
          const videoEl = videoRefs.current[project.slug];
          if (!videoEl) continue;

          if (project.slug === targetSlug) {
            if (!videoEl.getAttribute("src")) {
              videoEl.src = project.previewVideo.src;
            }
            if (videoEl.preload !== "auto") {
              videoEl.preload = "auto";
            }
            if (videoEl.readyState >= 2) {
              markVideoReady(project.slug);
            }
            if (videoEl.paused) {
              const playPromise = videoEl.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {
                  // Ignore AbortError from rapid slide switches or blocked autoplay
                });
              }
            }
          } else if (!videoEl.paused) {
            videoEl.pause();
          }
        }
      };

      const runCardVisibility = (visible: boolean) => {
        if (!active) return;
        gsap.to(cardEl, {
          autoAlpha: visible ? 1 : 0,
          scale: visible ? 1 : revealScaleFrom,
          duration: visible ? revealDuration : hideDuration,
          ease: visible ? "power3.out" : "power2.in",
          overwrite: "auto",
        });
      };

      const animateCardVisibility = contextSafe
        ? contextSafe(runCardVisibility)
        : runCardVisibility;

      const hidePreview = () => {
        if (!isPreviewVisible && currentSlug === null) return;
        isPreviewVisible = false;
        currentSlug = null;
        followerEl.style.willChange = "auto";
        pauseAllVideos();
        animateCardVisibility(false);
      };

      const isViewportVisible = (rect: DOMRect) =>
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.top < window.innerHeight &&
        rect.right > 0 &&
        rect.left < window.innerWidth;

      const resolveProjectAtPoint = (
        clientX: number,
        clientY: number,
        viewportRect: DOMRect,
        eventTarget?: EventTarget | null
      ): ProjectSlug | null => {
        const bottomZoneTop =
          viewportRect.top + viewportRect.height * BOTTOM_CLEAR_RATIO;
        if (
          !isViewportVisible(viewportRect) ||
          clientX < viewportRect.left ||
          clientX > viewportRect.right ||
          clientY < viewportRect.top ||
          clientY >= bottomZoneTop
        ) {
          return null;
        }

        const hitNode =
          eventTarget instanceof Element
            ? eventTarget
            : document.elementFromPoint(clientX, clientY);

        if (!hitNode || !viewportEl.contains(hitNode)) return null;
        if (hitNode.closest("[data-project-cta]")) return null;

        const slideEl = hitNode.closest<HTMLElement>("[data-project-slug]");
        return (slideEl?.dataset.projectSlug as ProjectSlug | undefined) ?? null;
      };

      const resolveProjectFromTrackX = (
        clientX: number,
        clientY: number,
        viewportRect: DOMRect
      ): ProjectSlug | null => {
        const bottomZoneTop =
          viewportRect.top + viewportRect.height * BOTTOM_CLEAR_RATIO;
        if (
          !isViewportVisible(viewportRect) ||
          clientX < viewportRect.left ||
          clientX > viewportRect.right ||
          clientY < viewportRect.top ||
          clientY >= bottomZoneTop
        ) {
          return null;
        }

        const trackEl = trackRef.current;
        if (!trackEl || viewportRect.width <= 0) return null;

        const trackX = Number(gsap.getProperty(trackEl, "x")) || 0;
        const slideIndex = Math.floor(
          (clientX - viewportRect.left - trackX) / viewportRect.width
        );
        const projectIndex = slideIndex - 1;
        return projects[projectIndex]?.slug ?? null;
      };

      const syncPreviewAtPoint = (
        clientX: number,
        clientY: number,
        eventTarget?: EventTarget | null,
        skipHitTest = false
      ) => {
        if (!active) {
          hidePreview();
          return;
        }

        const viewportRect = viewportEl.getBoundingClientRect();
        const nextSlug = skipHitTest
          ? resolveProjectFromTrackX(clientX, clientY, viewportRect)
          : resolveProjectAtPoint(
              clientX,
              clientY,
              viewportRect,
              eventTarget
            );

        if (!nextSlug) {
          hidePreview();
          return;
        }

        const cachedSize = slotDimensionsRef.current[nextSlug];
        const slotEl = slotRefs.current[nextSlug];
        const halfW = cachedSize?.halfW ?? (slotEl ? slotEl.offsetWidth / 2 : 160);
        const halfH = cachedSize?.halfH ?? (slotEl ? slotEl.offsetHeight / 2 : 90);

        const localX = clientX - viewportRect.left;
        const localY = clientY - viewportRect.top;
        const safePadX = Math.min(halfW + 16, viewportRect.width / 2);
        const safePadY = Math.min(halfH + 16, viewportRect.height / 2);
        const targetX = gsap.utils.clamp(
          safePadX,
          viewportRect.width - safePadX,
          localX
        );
        const targetY = gsap.utils.clamp(
          safePadY,
          viewportRect.height - safePadY,
          localY
        );

        const wasHidden = !isPreviewVisible;
        isPreviewVisible = true;
        followerEl.style.willChange = "transform";

        if (wasHidden) {
          xTo(targetX, targetX);
          yTo(targetY, targetY);
          animateCardVisibility(true);
        } else {
          xTo(targetX);
          yTo(targetY);
        }

        if (currentSlug !== nextSlug) {
          currentSlug = nextSlug;
          setDisplayedSlug((prev) => (prev === nextSlug ? prev : nextSlug));
          syncVideoPlayback(nextSlug);
        } else if (wasHidden) {
          syncVideoPlayback(nextSlug);
        }
      };

      const preloadObserver = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setShouldPrepareVideos(true);
            preloadObserver.disconnect();
          }
        },
        { rootMargin: "100% 0px" }
      );
      preloadObserver.observe(viewportEl);

      const viewportObserver = new IntersectionObserver(
        (entries) => {
          const intersecting = entries.some((entry) => entry.isIntersecting);
          if (!intersecting) {
            hidePreview();
          } else if (lastPointer.hasMoved) {
            syncPreviewAtPoint(lastPointer.x, lastPointer.y);
          }
        },
        { threshold: 0 }
      );
      viewportObserver.observe(viewportEl);

      const handlePointerMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") {
          hidePreview();
          return;
        }
        lastPointer.x = event.clientX;
        lastPointer.y = event.clientY;
        lastPointer.hasMoved = true;

        syncPreviewAtPoint(event.clientX, event.clientY, event.target);
      };

      const handleScroll = () => {
        if (!lastPointer.hasMoved || scrollRafId !== null) return;
        const rect = viewportEl.getBoundingClientRect();
        if (!isViewportVisible(rect)) {
          hidePreview();
          return;
        }
        scrollRafId = window.requestAnimationFrame(() => {
          scrollRafId = null;
          if (active && lastPointer.hasMoved) {
            syncPreviewAtPoint(lastPointer.x, lastPointer.y);
          }
        });
      };

      const handleResize = () => {
        cacheSlotDimensions();
        if (isPreviewVisible && lastPointer.hasMoved) {
          syncPreviewAtPoint(lastPointer.x, lastPointer.y);
        }
      };

      const handleVisibilityChange = () => {
        if (document.hidden) hidePreview();
      };

      const handleTrackUpdate = () => {
        if (!active || !lastPointer.hasMoved) return;
        const rect = viewportEl.getBoundingClientRect();
        if (!isViewportVisible(rect)) {
          hidePreview();
          return;
        }
        syncPreviewAtPoint(lastPointer.x, lastPointer.y, undefined, true);
      };

      const unsubscribeTrack = subscribeTrackUpdate?.(handleTrackUpdate);

      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleResize, { passive: true });
      window.addEventListener("blur", hidePreview);
      document.documentElement.addEventListener("mouseleave", hidePreview);
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        active = false;
        unsubscribeTrack?.();
        if (scrollRafId !== null) {
          window.cancelAnimationFrame(scrollRafId);
        }
        preloadObserver.disconnect();
        viewportObserver.disconnect();
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("blur", hidePreview);
        document.documentElement.removeEventListener("mouseleave", hidePreview);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        followerEl.style.willChange = "";
        pauseAllVideos();
      };
    },
    {
      scope: overlayRef,
      dependencies: [
        canHoverCursor,
        prefersReducedMotion,
        projects,
        subscribeTrackUpdate,
      ],
      revertOnUpdate: true,
    }
  );

  if (!canHoverCursor) return null;

  const activeIndex = displayedSlug
    ? projects.findIndex((item) => item.slug === displayedSlug)
    : -1;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      <div
        ref={followerRef}
        className="pointer-events-none absolute top-0 left-0"
      >
        <div
          ref={cardRef}
          style={{ opacity: 0, visibility: "hidden" }}
          className="pointer-events-none relative"
        >
          {projects.map((project, index) => {
            const isPortrait =
              project.previewVideo.height > project.previewVideo.width;
            const isSlotActive = displayedSlug === project.slug;
            const isNextAdjacent =
              activeIndex >= 0
                ? index === activeIndex || index === activeIndex + 1
                : index === 0;
            const isReady = Boolean(readyVideos[project.slug]);

            return (
              <div
                key={project.slug}
                ref={(el) => {
                  slotRefs.current[project.slug] = el;
                }}
                style={{
                  aspectRatio: `${project.previewVideo.width} / ${project.previewVideo.height}`,
                }}
                className={cn(
                  "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10px] bg-primary-black shadow-[0_24px_64px_rgba(0,0,0,0.65)] ring-1 ring-white/20 transition-[opacity,transform] duration-250 ease-out",
                  isPortrait
                    ? "w-[clamp(142px,11.8vw,186px)]"
                    : "w-[clamp(260px,25.5vw,396px)]",
                  isSlotActive ? "scale-100 opacity-100" : "scale-95 opacity-0"
                )}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[project.slug] = el;
                  }}
                  src={shouldPrepareVideos ? project.previewVideo.src : undefined}
                  muted
                  loop
                  playsInline
                  preload={
                    !shouldPrepareVideos
                      ? "none"
                      : isNextAdjacent
                        ? "auto"
                        : "metadata"
                  }
                  disablePictureInPicture
                  disableRemotePlayback
                  onLoadedData={() => handleVideoReady(project.slug)}
                  onCanPlay={() => handleVideoReady(project.slug)}
                  onPlaying={() => handleVideoReady(project.slug)}
                  className={cn(
                    "pointer-events-none block h-full w-full object-cover transition-opacity duration-200",
                    isReady ? "opacity-100" : "opacity-0"
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
