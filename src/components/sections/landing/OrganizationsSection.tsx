"use client";

import {
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type RefObject,
} from "react";
import Image from "next/image";
import { Undo2 } from "lucide-react";
import { m } from "framer-motion";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";
import { useLanguage } from "@/context/LanguageContext";
import { ORGANIZATIONS, ORGANIZATIONS_COPY } from "@/data/organizations";
import type { Locale, OrganizationData } from "@/data/types";
import { RichText } from "@/components/ui/RichText";
import { gsap, registerGsapPlugins, useGSAP } from "@/components/motion/gsapConfig";
import { cn } from "@/lib/utils";

const LAST_EXPANDED_ORG_KEY = "porto_last_expanded_org";
const DEFAULT_ORG_ID = ORGANIZATIONS[0]?.id ?? "pendikar";
const VALID_ORG_IDS = new Set(ORGANIZATIONS.map((org) => org.id));

const orgSubscribers = new Set<() => void>();
let fallbackOrgId = DEFAULT_ORG_ID;

function subscribeLastExpandedOrg(callback: () => void): () => void {
  orgSubscribers.add(callback);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === LAST_EXPANDED_ORG_KEY) {
      callback();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    orgSubscribers.delete(callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function getLastExpandedOrgSnapshot(): string {
  try {
    const saved = window.localStorage.getItem(LAST_EXPANDED_ORG_KEY);
    if (saved && VALID_ORG_IDS.has(saved)) {
      fallbackOrgId = saved;
      return saved;
    }
  } catch {
    // Ignore storage read errors in restricted browsing contexts.
  }
  return fallbackOrgId;
}

function getLastExpandedOrgServerSnapshot(): string {
  return DEFAULT_ORG_ID;
}

function persistLastExpandedOrg(id: string) {
  if (!VALID_ORG_IDS.has(id)) return;
  fallbackOrgId = id;
  try {
    window.localStorage.setItem(LAST_EXPANDED_ORG_KEY, id);
  } catch {
    // Ignore storage write errors in restricted browsing contexts.
  }
  orgSubscribers.forEach((notify) => notify());
}

const IMAGE_OBJECT_POSITION: Record<string, string> = {
  pendikar: "object-[50%_70%]",
  "bendahara-ais": "object-[50%_42%]",
  "ketos-sma": "object-[50%_52%]",
};

const CARD_ACTION_BUTTON_CLASS =
  "inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-white px-4 py-2 text-xs font-medium tracking-[0.01em] text-black shadow-[0_2px_12px_rgba(8,11,24,0.22)] transition-all duration-200 hover:bg-lightblue active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-black sm:text-[0.8125rem] lg:min-h-[34px] lg:px-3.5 lg:py-1.5 lg:text-[clamp(0.75rem,0.92vw,0.875rem)] xl:min-h-[38px] xl:px-4";

const FLIP_EASE = [0.22, 1, 0.36, 1] as const;
const EXPAND_EASE = [0.32, 0.12, 0.42, 0.96] as const;

const EXPANDED_FLEX = 7.65;
const COLLAPSED_FLEX = 1;
const HOVER_WIDEN_DELTA = 0.22;
const EXPANDED_HOVER_WIDEN_DELTA = 0.24;
const ADJACENT_COLLAPSED_SQUEEZE = 0.07;
const FAR_COLLAPSED_SQUEEZE = 0.04;

function computeCardFlex(
  index: number,
  activeIndex: number,
  hoveredIndex: number | null
): number {
  const isExpanded = index === activeIndex;

  if (hoveredIndex === null) {
    return isExpanded ? EXPANDED_FLEX : COLLAPSED_FLEX;
  }

  if (hoveredIndex === activeIndex) {
    if (isExpanded) {
      return EXPANDED_FLEX + EXPANDED_HOVER_WIDEN_DELTA;
    }
    const collapsedCount = Math.max(1, ORGANIZATIONS.length - 1);
    return COLLAPSED_FLEX - EXPANDED_HOVER_WIDEN_DELTA / collapsedCount;
  }

  if (index === hoveredIndex) {
    return COLLAPSED_FLEX + HOVER_WIDEN_DELTA;
  }

  const otherCollapsedIndex =
    ORGANIZATIONS.length === 3 ? 3 - activeIndex - hoveredIndex : -1;
  const otherCollapsedSqueeze =
    otherCollapsedIndex >= 0 && Math.abs(otherCollapsedIndex - hoveredIndex) === 1
      ? ADJACENT_COLLAPSED_SQUEEZE
      : FAR_COLLAPSED_SQUEEZE;

  if (!isExpanded) {
    return COLLAPSED_FLEX - otherCollapsedSqueeze;
  }

  return EXPANDED_FLEX - (HOVER_WIDEN_DELTA - otherCollapsedSqueeze);
}

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className="size-[0.95em] shrink-0 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
    >
      <path d="M5 19L18.5 5.5" />
      <path d="M7 5H19V17" />
    </svg>
  );
}

interface OrganizationCardHeaderProps {
  badge: string;
  title: OrganizationData["title"];
  period?: OrganizationData["period"];
}

function OrganizationCardHeader({
  badge,
  title,
  period,
}: OrganizationCardHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="inline-flex items-center rounded-[4px] bg-[#3A3A3A]/50 px-3.5 py-1.5 text-xs font-medium tracking-[0.01em] text-white backdrop-blur-md [-webkit-backdrop-filter:blur(12px)] sm:text-[0.8125rem] lg:text-[clamp(0.75rem,0.92vw,0.875rem)]">
        {badge}
      </span>
      <h3 className="mt-2.5 max-w-[34ch] text-lg leading-[1.25] font-semibold tracking-[-0.01em] text-white [text-shadow:0_1px_8px_rgba(8,11,24,0.45)] sm:text-xl lg:text-[clamp(1.125rem,1.45vw,1.5rem)]">
        <RichText copy={title} />
      </h3>
      {period ? (
        <p className="mt-1 text-xs font-semibold text-white/95 [text-shadow:0_1px_6px_rgba(8,11,24,0.4)] sm:text-[0.8125rem] lg:text-[clamp(0.75rem,0.98vw,0.9375rem)]">
          <RichText copy={period} />
        </p>
      ) : null}
    </div>
  );
}

interface FlipSheenProps {
  sheenKey: string;
  opacityPeak: number;
}

function FlipSheen({ sheenKey, opacityPeak }: FlipSheenProps) {
  return (
    <m.div
      key={sheenKey}
      aria-hidden="true"
      initial={{ transform: "translateX(-120%) skewX(-12deg)", opacity: 0 }}
      animate={{
        transform: "translateX(140%) skewX(-12deg)",
        opacity: [0, opacityPeak, 0],
      }}
      transition={{ duration: 0.68, ease: FLIP_EASE }}
      className="pointer-events-none absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-lightblue/45 to-transparent"
    />
  );
}

interface MobileCollapsedStripProps {
  org: OrganizationData;
  locale: Locale;
  isExpanded: boolean;
  expandAriaLabel: string;
  objectPositionClass: string;
  onExpand: (id: string) => void;
}

function MobileCollapsedStrip({
  org,
  locale,
  isExpanded,
  expandAriaLabel,
  objectPositionClass,
  onExpand,
}: MobileCollapsedStripProps) {
  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity] duration-[720ms] ease-[cubic-bezier(0.32,0.12,0.42,0.96)] motion-reduce:transition-none lg:hidden",
        isExpanded
          ? "pointer-events-none grid-rows-[0fr] opacity-0"
          : "grid-rows-[1fr] opacity-100"
      )}
      aria-hidden={isExpanded}
    >
      <div className="min-h-0 overflow-hidden">
        <button
          type="button"
          tabIndex={isExpanded ? -1 : 0}
          aria-expanded={false}
          aria-label={expandAriaLabel}
          onClick={() => onExpand(org.id)}
          className="group relative flex h-[84px] w-full cursor-pointer items-center justify-center overflow-hidden bg-primary-black px-5 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-inset sm:h-[96px]"
        >
          <Image
            src={org.image}
            alt={org.imageAlt[locale]}
            fill
            loading="eager"
            sizes="95vw"
            className={cn(
              "object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none",
              objectPositionClass
            )}
          />
          <span
            aria-hidden="true"
            className="bg-radial-black pointer-events-none absolute inset-0"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[#080B18]/45 transition-colors duration-300 group-hover:bg-[#080B18]/30"
          />
          <span className="relative z-10 text-sm font-medium tracking-[0.01em] text-white [text-shadow:0_1px_6px_rgba(8,11,24,0.65)] sm:text-base">
            <RichText copy={org.title} />
          </span>
        </button>
      </div>
    </div>
  );
}

interface DesktopCollapsedStripProps {
  org: OrganizationData;
  shouldReduceMotion: boolean;
  expandAriaLabel: string;
  onExpand: (id: string) => void;
}

function DesktopCollapsedStrip({
  org,
  shouldReduceMotion,
  expandAriaLabel,
  onExpand,
}: DesktopCollapsedStripProps) {
  return (
    <m.button
      type="button"
      aria-expanded={false}
      aria-label={expandAriaLabel}
      onClick={() => onExpand(org.id)}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.32,
          delay: shouldReduceMotion ? 0 : 0.32,
          ease: EXPAND_EASE,
        },
      }}
      className="absolute inset-0 hidden cursor-pointer items-center justify-center bg-[#080B18]/10 transition-colors duration-300 hover:bg-[#080B18]/0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/85 focus-visible:ring-inset lg:flex"
    >
      <span className="block max-h-[86%] px-2 text-center text-[clamp(0.875rem,1.15vw,1.3125rem)] leading-[1.3] font-medium text-white [writing-mode:vertical-rl] rotate-180 [text-shadow:0_2px_10px_rgba(8,11,24,0.65)]">
        <RichText copy={org.title} />
      </span>
    </m.button>
  );
}

interface ExpandedFrontContentProps {
  org: OrganizationData;
  locale: Locale;
  isFlipped: boolean;
  shouldReduceMotion: boolean;
  readMoreLabel: string;
  readMoreButtonRef: RefObject<HTMLButtonElement | null>;
  onFlipToBack: (clickDetail: number) => void;
}

function ExpandedFrontContent({
  org,
  locale,
  isFlipped,
  shouldReduceMotion,
  readMoreLabel,
  readMoreButtonRef,
  onFlipToBack,
}: ExpandedFrontContentProps) {
  return (
    <m.div
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, transform: "translateY(10px)" }
      }
      animate={{
        opacity: 1,
        transform: "translateY(0px)",
        transition: {
          duration: shouldReduceMotion ? 0 : 0.42,
          delay: shouldReduceMotion ? 0 : 0.34,
          ease: FLIP_EASE,
        },
      }}
      className="relative z-10 flex h-full w-full flex-col items-center justify-between px-6 pt-9 pb-7 text-center sm:px-10 sm:pt-11 sm:pb-8 lg:px-12 lg:pt-[clamp(2.25rem,3.1vw,3.875rem)] lg:pb-[clamp(1.75rem,2.3vw,2.5rem)]"
    >
      <OrganizationCardHeader badge={org.badge[locale]} title={org.title} />

      <button
        ref={readMoreButtonRef}
        type="button"
        tabIndex={isFlipped ? -1 : 0}
        aria-expanded={isFlipped}
        onClick={(event) => onFlipToBack(event.detail)}
        className={cn("group/cta", CARD_ACTION_BUTTON_CLASS)}
      >
        <span>{readMoreLabel}</span>
        <ArrowUpRightIcon />
      </button>
    </m.div>
  );
}

interface OrganizationCardFrontProps {
  org: OrganizationData;
  locale: Locale;
  isExpanded: boolean;
  isFlipped: boolean;
  shouldReduceMotion: boolean;
  flipCount: number;
  objectPositionClass: string;
  expandAriaLabel: string;
  readMoreLabel: string;
  readMoreButtonRef: RefObject<HTMLButtonElement | null>;
  onExpand: (id: string) => void;
  onFlipToBack: (clickDetail: number) => void;
}

function OrganizationCardFront({
  org,
  locale,
  isExpanded,
  isFlipped,
  shouldReduceMotion,
  flipCount,
  objectPositionClass,
  expandAriaLabel,
  readMoreLabel,
  readMoreButtonRef,
  onExpand,
  onFlipToBack,
}: OrganizationCardFrontProps) {
  const showSheen = !shouldReduceMotion && flipCount > 0 && !isFlipped;
  const frontOverlayClass = isExpanded
    ? "bg-linear-to-b from-[#080B18]/28 via-transparent via-45% to-[#080B18]/18 opacity-100"
    : "bg-[#080B18]/22 opacity-100";
  const hideForReducedFlip = shouldReduceMotion && isExpanded && isFlipped;

  return (
    <div
      aria-hidden={isExpanded && isFlipped}
      className={cn(
        "relative col-start-1 row-start-1 h-full w-full overflow-hidden bg-primary-black [transform:rotateY(0deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]",
        isExpanded && isFlipped && "pointer-events-none",
        hideForReducedFlip && "opacity-0"
      )}
    >
      <Image
        src={org.image}
        alt={org.imageAlt[locale]}
        fill
        loading="eager"
        sizes="(max-width: 1023px) 95vw, (max-width: 1440px) 75vw, 1080px"
        className={cn(
          "object-cover transition-transform duration-[820ms] ease-[cubic-bezier(0.22,1,0.36,1)] select-none",
          objectPositionClass,
          isExpanded ? "scale-100" : "scale-[1.06]"
        )}
      />

      {/* Required Figma radial-black overlay on every card */}
      <div
        aria-hidden="true"
        className="bg-radial-black pointer-events-none absolute inset-0"
      />

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-500",
          frontOverlayClass
        )}
      />

      {showSheen ? (
        <FlipSheen sheenKey={`sheen-front-${flipCount}`} opacityPeak={0.28} />
      ) : null}

      {isExpanded ? (
        <ExpandedFrontContent
          org={org}
          locale={locale}
          isFlipped={isFlipped}
          shouldReduceMotion={shouldReduceMotion}
          readMoreLabel={readMoreLabel}
          readMoreButtonRef={readMoreButtonRef}
          onFlipToBack={onFlipToBack}
        />
      ) : (
        <DesktopCollapsedStrip
          org={org}
          shouldReduceMotion={shouldReduceMotion}
          expandAriaLabel={expandAriaLabel}
          onExpand={onExpand}
        />
      )}
    </div>
  );
}

interface OrganizationCardBackProps {
  org: OrganizationData;
  locale: Locale;
  isActiveBack: boolean;
  shouldReduceMotion: boolean;
  flipCount: number;
  objectPositionClass: string;
  flipBackLabel: string;
  flipBackButtonRef: RefObject<HTMLButtonElement | null>;
  onFlipToFront: (clickDetail: number) => void;
}

function OrganizationCardBack({
  org,
  locale,
  isActiveBack,
  shouldReduceMotion,
  flipCount,
  objectPositionClass,
  flipBackLabel,
  flipBackButtonRef,
  onFlipToFront,
}: OrganizationCardBackProps) {
  const showSheen = !shouldReduceMotion && flipCount > 0 && isActiveBack;

  return (
    <div
      aria-hidden={!isActiveBack}
      className={cn(
        "relative col-start-1 row-start-1 h-full w-full overflow-hidden bg-primary-black [backface-visibility:hidden] [-webkit-backface-visibility:hidden]",
        shouldReduceMotion
          ? "[transform:rotateY(0deg)]"
          : "[transform:rotateY(180deg)]",
        !isActiveBack && "pointer-events-none",
        shouldReduceMotion && !isActiveBack && "opacity-0"
      )}
    >
      <Image
        src={org.image}
        alt=""
        aria-hidden="true"
        fill
        loading="eager"
        sizes="(max-width: 1023px) 95vw, (max-width: 1440px) 75vw, 1080px"
        className={cn(
          "scale-110 object-cover blur-[22px] saturate-[1.05] select-none",
          objectPositionClass
        )}
      />

      {/* Required Figma radial-black overlay on every card */}
      <div
        aria-hidden="true"
        className="bg-radial-black pointer-events-none absolute inset-0"
      />

      {/* Soft dark veil preserving blurred photo hues while keeping white text readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[#080B18]/28"
      />

      {showSheen ? (
        <FlipSheen sheenKey={`sheen-back-${flipCount}`} opacityPeak={0.24} />
      ) : null}

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-between px-6 pt-9 pb-7 sm:px-10 sm:pt-11 sm:pb-8 lg:px-12 lg:pt-[clamp(2.25rem,3.1vw,3.875rem)] lg:pb-[clamp(1.75rem,2.3vw,2.5rem)]">
        <div className="flex w-full flex-col items-center">
          <OrganizationCardHeader
            badge={org.badge[locale]}
            title={org.title}
            period={org.period}
          />

          <div className="mt-5 w-full max-w-[96%] space-y-3 text-left sm:mt-6 sm:max-w-[88%] sm:space-y-3.5 lg:mt-[clamp(1.25rem,1.8vw,2.15rem)] lg:max-w-[84%] lg:space-y-[clamp(0.8rem,1.15vw,1.3rem)]">
            {org.bullets.map((bullet, bulletIndex) => (
              <m.p
                key={`${org.id}-p-${bulletIndex}`}
                initial={false}
                animate={
                  shouldReduceMotion || isActiveBack
                    ? { opacity: 1, transform: "translateY(0px)" }
                    : { opacity: 0, transform: "translateY(10px)" }
                }
                transition={{
                  duration: 0.34,
                  delay:
                    isActiveBack && !shouldReduceMotion
                      ? 0.16 + bulletIndex * 0.06
                      : 0,
                  ease: FLIP_EASE,
                }}
                className="text-[0.84375rem] leading-[1.48] font-normal text-white [text-shadow:0_1px_4px_rgba(8,11,24,0.38)] sm:text-[0.9375rem] lg:text-[clamp(0.875rem,1.08vw,1.125rem)]"
              >
                <RichText copy={bullet} />
              </m.p>
            ))}
          </div>
        </div>

        <button
          ref={flipBackButtonRef}
          type="button"
          tabIndex={isActiveBack ? 0 : -1}
          aria-expanded={isActiveBack}
          onClick={(event) => onFlipToFront(event.detail)}
          className={cn("mt-6 lg:mt-4", CARD_ACTION_BUTTON_CLASS)}
        >
          <Undo2 className="size-[0.95em] shrink-0" aria-hidden="true" />
          <span>{flipBackLabel}</span>
        </button>
      </div>
    </div>
  );
}

interface OrganizationCardProps {
  org: OrganizationData;
  locale: Locale;
  flexValue: number;
  isHoverTransition: boolean;
  isExpanded: boolean;
  isFlipped: boolean;
  isFlipping: boolean;
  shouldReduceMotion: boolean;
  onExpand: (id: string) => void;
  onCardHoverEnter: (id: string, pointerType: string) => void;
  onCardHoverLeave: (id: string | null, pointerType: string) => void;
  onToggleFlip: (id: string, focusTarget: "front" | "back") => void;
  onFlipSettled: (id: string) => void;
  readMoreLabel: string;
  flipBackLabel: string;
}

function OrganizationCard({
  org,
  locale,
  flexValue,
  isHoverTransition,
  isExpanded,
  isFlipped,
  isFlipping,
  shouldReduceMotion,
  onExpand,
  onCardHoverEnter,
  onCardHoverLeave,
  onToggleFlip,
  onFlipSettled,
  readMoreLabel,
  flipBackLabel,
}: OrganizationCardProps) {
  const readMoreButtonRef = useRef<HTMLButtonElement>(null);
  const flipBackButtonRef = useRef<HTMLButtonElement>(null);
  const [flipCount, setFlipCount] = useState(0);

  const objectPositionClass = IMAGE_OBJECT_POSITION[org.id] ?? "object-center";
  const allowMobileOverflow = isExpanded && (isFlipped || isFlipping);
  const isActiveBack = isExpanded && isFlipped;

  const handleTriggerFlip = (
    targetFace: "front" | "back",
    clickDetail: number
  ) => {
    setFlipCount((prev) => prev + 1);
    onToggleFlip(org.id, targetFace);

    if (clickDetail === 0) {
      window.requestAnimationFrame(() => {
        if (targetFace === "back") {
          flipBackButtonRef.current?.focus();
        } else {
          readMoreButtonRef.current?.focus();
        }
      });
    }
  };

  const expandAriaLabel =
    locale === "id"
      ? `Buka kartu ${org.badge[locale]}`
      : `Expand ${org.badge[locale]} card`;

  const cardStyle = {
    "--org-flex": flexValue,
  } as CSSProperties;

  return (
    <article
      style={cardStyle}
      onPointerEnter={(event) => {
        onCardHoverEnter(org.id, event.pointerType);
      }}
      onPointerLeave={(event) => {
        onCardHoverLeave(org.id, event.pointerType);
      }}
      className={cn(
        "relative w-full lg:h-full lg:min-w-0 lg:shrink lg:basis-0 lg:[flex-grow:var(--org-flex)] lg:transition-[flex-grow] lg:will-change-[flex-grow] motion-reduce:lg:transition-none",
        isHoverTransition
          ? "lg:duration-[650ms] lg:ease-[cubic-bezier(0.22,1,0.36,1)]"
          : "lg:duration-[820ms] lg:ease-[cubic-bezier(0.22,1,0.36,1)]",
        isExpanded && "z-20"
      )}
    >
      <MobileCollapsedStrip
        org={org}
        locale={locale}
        isExpanded={isExpanded}
        expandAriaLabel={expandAriaLabel}
        objectPositionClass={objectPositionClass}
        onExpand={onExpand}
      />

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-[720ms] ease-[cubic-bezier(0.32,0.12,0.42,0.96)] motion-reduce:transition-none lg:block lg:h-full",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          allowMobileOverflow
            ? "overflow-visible"
            : "overflow-hidden lg:overflow-visible"
        )}
      >
        <div
          className={cn(
            "min-h-0 lg:h-full lg:w-full",
            allowMobileOverflow
              ? "overflow-visible"
              : "overflow-hidden lg:overflow-visible"
          )}
        >
          <div
            className={cn(
              "relative h-full min-h-[430px] w-full [perspective:2000px] sm:min-h-[470px] lg:min-h-0",
              !isExpanded && "pointer-events-none lg:pointer-events-auto"
            )}
          >
            <m.div
              initial={false}
              animate={{
                transform:
                  !shouldReduceMotion && isActiveBack
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
              }}
              transition={{ duration: 0.72, ease: FLIP_EASE }}
              onAnimationComplete={() => onFlipSettled(org.id)}
              className="relative grid h-full min-h-[430px] w-full [transform-style:preserve-3d] sm:min-h-[470px] lg:min-h-0"
            >
              <OrganizationCardFront
                org={org}
                locale={locale}
                isExpanded={isExpanded}
                isFlipped={isFlipped}
                shouldReduceMotion={shouldReduceMotion}
                flipCount={flipCount}
                objectPositionClass={objectPositionClass}
                expandAriaLabel={expandAriaLabel}
                readMoreLabel={readMoreLabel}
                readMoreButtonRef={readMoreButtonRef}
                onExpand={onExpand}
                onFlipToBack={(detail) => handleTriggerFlip("back", detail)}
              />

              <OrganizationCardBack
                org={org}
                locale={locale}
                isActiveBack={isActiveBack}
                shouldReduceMotion={shouldReduceMotion}
                flipCount={flipCount}
                objectPositionClass={objectPositionClass}
                flipBackLabel={flipBackLabel}
                flipBackButtonRef={flipBackButtonRef}
                onFlipToFront={(detail) => handleTriggerFlip("front", detail)}
              />
            </m.div>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Organizations & Leadership section (`#organizations`) matching
 * `assets/uiux/landingpage/organizations-*.png` and `organizations-det-*.png`.
 * Persists the last expanded card in localStorage (defaulting to Pendikar),
 * animates smooth accordion expand/collapse, and performs a 3D card flip on click.
 */
export function OrganizationsSection() {
  const { locale } = useLanguage();
  const shouldReduceMotion = useHydratedReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const deckWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsapPlugins();

      const sectionEl = sectionRef.current;
      const headingEl = headingRef.current;
      const deckWrapEl = deckWrapRef.current;
      if (!sectionEl || !headingEl || !deckWrapEl) return;

      gsap.fromTo(
        headingEl,
        { y: 28 },
        {
          y: 0,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 92%",
            end: "top 48%",
            scrub: 0.12,
            invalidateOnRefresh: true,
          },
        }
      );

      gsap.fromTo(
        deckWrapEl,
        { y: 40 },
        {
          y: 0,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: deckWrapEl,
            start: "top 95%",
            end: "top 42%",
            scrub: 0.14,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const activeOrgId = useSyncExternalStore(
    subscribeLastExpandedOrg,
    getLastExpandedOrgSnapshot,
    getLastExpandedOrgServerSnapshot
  );
  const [hoveredOrgId, setHoveredOrgId] = useState<string | null>(null);
  const [transitionMode, setTransitionMode] = useState<"expand" | "hover">("expand");
  const [flippedOrgId, setFlippedOrgId] = useState<string | null>(null);
  const [flippingOrgId, setFlippingOrgId] = useState<string | null>(null);

  const handleExpand = (id: string) => {
    setTransitionMode("expand");
    setHoveredOrgId(null);
    persistLastExpandedOrg(id);
    setFlippedOrgId(null);
    setFlippingOrgId(null);
  };

  const handleCardHoverEnter = (id: string, pointerType: string) => {
    if (pointerType === "touch") return;
    if (hoveredOrgId === id) return;
    setTransitionMode("hover");
    setHoveredOrgId(id);
  };

  const handleCardHoverLeave = (id: string | null, pointerType: string) => {
    if (pointerType === "touch") return;
    setTransitionMode("hover");
    setHoveredOrgId((current) =>
      id === null || current === id ? null : current
    );
  };

  const handleToggleFlip = (
    id: string,
    targetFace: "front" | "back"
  ) => {
    persistLastExpandedOrg(id);
    if (!shouldReduceMotion) {
      setFlippingOrgId(id);
    }
    setFlippedOrgId(targetFace === "back" ? id : null);
  };

  const handleFlipSettled = (id: string) => {
    setFlippingOrgId((current) => (current === id ? null : current));
  };

  const activeIndex = Math.max(
    0,
    ORGANIZATIONS.findIndex((org) => org.id === activeOrgId)
  );
  const rawHoveredIndex =
    hoveredOrgId !== null
      ? ORGANIZATIONS.findIndex((org) => org.id === hoveredOrgId)
      : -1;
  const hoveredIndex = rawHoveredIndex >= 0 ? rawHoveredIndex : null;
  const isHoverTransition = transitionMode === "hover";

  const readMoreLabel = ORGANIZATIONS_COPY.readMoreCta[locale].replace(/\s*↗$/, "");
  const flipBackLabel = ORGANIZATIONS_COPY.flipBackCta[locale].replace(/^↶\s*/, "");

  return (
    <section
      ref={sectionRef}
      id="organizations"
      aria-labelledby="organizations-heading"
      className="relative z-10 overflow-x-clip bg-transparent pt-14 pb-12 text-lightblue sm:pt-16 sm:pb-14 lg:pt-[clamp(3.25rem,3.6vw,4.25rem)] lg:pb-[clamp(2.5rem,3vw,3.5rem)]"
    >
      {/* Layer 0: Vertical blend into #EAF0FF starting smoothly below the heading so the top meets #achievements seamlessly */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(234, 240, 255, 0) 0%, rgba(234, 240, 255, 0) 28%, rgba(234, 240, 255, 0.03) 36%, rgba(234, 240, 255, 0.1) 46%, rgba(234, 240, 255, 0.24) 57%, rgba(234, 240, 255, 0.46) 68%, rgba(234, 240, 255, 0.72) 80%, rgba(234, 240, 255, 0.92) 91%, #EAF0FF 98%, #EAF0FF 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[clamp(1.75rem,2.6vw,2.75rem)]">
        <h2
          ref={headingRef}
          id="organizations-heading"
          className="text-center text-[clamp(1.375rem,2.36vw,2.25rem)] leading-[1.15] font-medium tracking-[0.01em] text-lightblue uppercase select-none"
        >
          {ORGANIZATIONS_COPY.heading[locale]}
        </h2>

        <div
          ref={deckWrapRef}
          onPointerLeave={(event) => handleCardHoverLeave(null, event.pointerType)}
          className="mt-8 flex flex-col gap-3.5 sm:mt-10 sm:gap-4 lg:mt-[clamp(2.25rem,2.7vw,3.375rem)] lg:h-[clamp(29rem,34.5vw,43.875rem)] lg:flex-row lg:gap-5"
        >
          {ORGANIZATIONS.map((org, index) => {
            const isExpanded = activeOrgId === org.id;
            const isFlipped = isExpanded && flippedOrgId === org.id;
            const isFlipping = isExpanded && flippingOrgId === org.id;
            const flexValue = computeCardFlex(index, activeIndex, hoveredIndex);

            return (
              <OrganizationCard
                key={org.id}
                org={org}
                locale={locale}
                flexValue={flexValue}
                isHoverTransition={isHoverTransition}
                isExpanded={isExpanded}
                isFlipped={isFlipped}
                isFlipping={isFlipping}
                shouldReduceMotion={shouldReduceMotion}
                onExpand={handleExpand}
                onCardHoverEnter={handleCardHoverEnter}
                onCardHoverLeave={handleCardHoverLeave}
                onToggleFlip={handleToggleFlip}
                onFlipSettled={handleFlipSettled}
                readMoreLabel={readMoreLabel}
                flipBackLabel={flipBackLabel}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
