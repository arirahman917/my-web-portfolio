# Technical Architecture Blueprint (`web-porto-ari`)

**Version**: 1.0.0  
**Last Updated**: 2026-11-18  
**Architecture Style**: Static-First Next.js App Router + Strongly Typed Content Layer (Zero Database)

---

## 1. Zero-Database Architecture Verification

**Question**: *Does this portfolio need a database?*  
**Answer**: **No.** Every single section (Hero, Tech Stack, 4 Projects + 4 Case Studies, 4 Achievements, 3 Organizations, About Me, Principles, Navbar/Footer links) consists of curated, structured portfolio content with no user-generated state or auth.

- **Benefits of Zero-DB + Typed `src/data/`**:
  - **0ms data-fetch overhead** at runtime (static build / RSC).
  - **Compile-time safety**: Missing translations, missing links, or malformed italic segments fail `tsc --noEmit` immediately.
  - **Zero infrastructure cost & zero cold starts** on Vercel.
  - **Instant client-side `IND ↔ ENG` switching** without round-trip API calls.

---

## 2. Target Project Directory Structure (`web-porto-ari/`)

> This blueprint defines the exact skeleton to be scaffolded inside `web-porto-ari/` when code implementation begins.

```text
web-porto-ari/
├── AGENTS.md                           # AI rules & design/i18n constitution
├── PRD.md                              # Product requirements & scope
├── BLUEPRINT.md                        # This architecture & skeleton spec
├── PROGRESS.md                         # Section-by-section implementation tracker
├── CONTEXT_MAP.md                      # Compact file-responsibility index
├── CHANGELOG.md                        # Keep-a-Changelog log
├── docs/
│   ├── SECTION_SPECS.md                # Layout, responsive & GSAP/Framer motion specs
│   ├── I18N_AND_COPY_SPEC.md           # Full UI/UX Indonesian copy + italic tags + EN translations
│   └── ASSETS_AND_LINKS.md             # Asset copy map, video storage guide, LINK.txt registry
├── public/
│   ├── images/                         # Migrated static WebP images from ../assets/img/
│   │   ├── hero.webp
│   │   ├── aboutme/                    # 1.webp, 2.webp, 3.webp
│   │   ├── skills/                     # frontend.webp, backend.webp, uiux.webp, tools.webp, ai-assited.webp
│   │   ├── organizations/              # pendikar.webp, bendahara-ais.webp, ketos-sma.webp
│   │   ├── projects/                   # *_LP.webp + detail-{kasir,landeuh,ais,webgis}/
│   │   └── achievements/               # *_LP.webp + detail-{joints,ifest,jurnal,pelita}/
│   ├── videos/                         # Optimized MP4/WebM video assets (future/optional)
│   ├── cv/                             # Downloadable PDF resumes (soft-eng, frontend, devops)
│   ├── favicon.ico
│   └── og-image.png
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # RootLayout: Inter font, LanguageProvider, MotionProvider, Navbar, Footer
│   │   ├── globals.css                 # Tailwind v4 @import + @theme tokens + custom utilities
│   │   ├── page.tsx                    # 1. Landing Page (composes 7 connected sections)
│   │   ├── projects/
│   │   │   ├── kasir/
│   │   │   │   └── page.tsx            # 2a. Detail Project: Toko All Rahman
│   │   │   ├── landeuh/
│   │   │   │   └── page.tsx            # 2b. Detail Project: Landeuh Village Riverside
│   │   │   ├── ais/
│   │   │   │   └── page.tsx            # 2c. Detail Project: Asrama IPB Sukasari
│   │   │   └── webgis/
│   │   │       └── page.tsx            # 2d. Detail Project: WebGIS RINTIK
│   │   └── achievements/
│   │       └── page.tsx                # 3. Detail Achievements (consolidated 4 achievements page)
│   ├── components/
│   │   ├── layout/                     # Global utils
│   │   │   ├── Logo.tsx                # Geometric Ari SVG mark
│   │   │   ├── Navbar.tsx              # Fixed top bar + fullscreen #2855FF overlay menu
│   │   │   ├── Footer.tsx              # Let's Connect + links + CV dropdown
│   │   │   ├── LanguageSwitcher.tsx    # IND - ENG toggle control
│   │   │   └── CvDropdown.tsx          # Shared 3-role CV dropdown (upward in navbar, downward in footer)
│   │   ├── motion/                     # Animation infrastructure
│   │   │   ├── MotionProvider.tsx      # Framer Motion <LazyMotion features={domAnimation}> + reduced motion
│   │   │   └── gsapConfig.ts           # Safe client-only ScrollTrigger registration helper
│   │   ├── ui/                         # Reusable UI primitives
│   │   │   ├── RichText.tsx            # Renders RichSegment[] with automatic <em> italicization
│   │   │   ├── ActionPill.tsx          # Pill CTA buttons (Kunjungi, Pendekatan, Jelajahi, external links)
│   │   │   └── GlassBadge.tsx          # blur-black (#3A3A3A @ 30%) glassmorphic pills
│   │   └── sections/
│   │       ├── landing/
│   │       │   ├── HeroSection.tsx
│   │       │   ├── TechStackSection.tsx
│   │       │   ├── ProjectsSection.tsx
│   │       │   ├── AchievementsSection.tsx
│   │       │   ├── OrganizationsSection.tsx
│   │       │   ├── AboutMeSection.tsx
│   │       │   └── PrinciplesSection.tsx
│   │       ├── projects/
│   │       │   ├── ProjectDetailTemplate.tsx   # Shared structured narrative template for all 4 projects
│   │       │   ├── ProjectSubNav.tsx           # Blue floating anchor pill bar (Masalah..Hasil)
│   │       │   └── ProjectResultCard.tsx       # Result banner + floating phone mockup + action links
│   │       └── achievements/
│   │           ├── AchievementsAccordion.tsx   # Single-page container for all 4 numbered achievements
│   │           └── AchievementPanel.tsx        # Individual expanded/collapsed achievement view
│   ├── context/
│   │   └── LanguageContext.tsx         # Holds 'id' | 'en', localStorage persistence, <html lang> sync
│   ├── data/
│   │   ├── types.ts                    # Shared TS interfaces (LocaleText, RichSegment, ProjectData, etc.)
│   │   ├── links.ts                    # Centralized external URLs from assets/LINK.txt
│   │   ├── navigation.ts               # Navbar items, CV list, Footer copy
│   │   ├── hero.ts                     # Hero bilingual copy & asset refs
│   │   ├── techstack.ts                # 5 Polaroid cards bilingual data
│   │   ├── projects.ts                 # All 4 projects (landing + full case studies)
│   │   ├── achievements.ts             # All 4 achievements (landing + detail-achievements)
│   │   ├── organizations.ts            # 3 organizations (front + flip detail copy)
│   │   ├── aboutme.ts                  # About Me bilingual copy + image carousel paths
│   │   └── principles.ts               # Keunggulan 01–04 bilingual data
│   └── lib/
│       └── utils.ts                    # cn() class merging helper (clsx + tailwind-merge)
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. Dependency Stack Plan

| Package | Role | Notes |
| :--- | :--- | :--- |
| `next`, `react`, `react-dom` | Core App Router framework | Latest Next.js 15/16 + React 19 |
| `typescript`, `@types/react`, `@types/node` | Strict type system | Enforce `"strict": true` |
| `tailwindcss`, `@tailwindcss/postcss` | Tailwind CSS v4 | CSS-first `@theme` configuration |
| `gsap`, `@gsap/react` | Scroll-driven choreography | `useGSAP()` ensures React 19 StrictMode-safe cleanup |
| `framer-motion` | Interactive UI motion | Use `LazyMotion` + `m` components for minimal client JS |
| `lucide-react` | Crisp UI icons | Arrows, close, menu, chevrons (`↗`, `↙`, `↓`, `↶`, etc.) |
| `clsx`, `tailwind-merge` | Conditional styling utility | Clean class composition |

---

## 4. Design Tokens & Tailwind CSS v4 Specification (`globals.css`)

```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;

  --color-primary-black: #080B18;
  --color-primary-blue: #1235D8;
  --color-primary-blue-contrast: #2855FF;
  --color-primary-purple: #6D8BFF;
  --color-lightblue: #EAF0FF;
  --color-white: #FFFFFF;
  --color-black: #000000;
  --color-blur-black: rgba(58, 58, 58, 0.30);
}
```

### Custom Surface Utilities
1. **`radial-black` (Figma 25% Radial Overlay)**:
   - Figma raw stops: `0% #9D9D9D (0%)` -> `25% #838383 (30%)` -> `50% #6A6A6A (58%)` -> `100% #373737 (100%)` with layer opacity `25%`.
   - Exact premultiplied CSS gradient utility:
     ```css
     .bg-radial-black {
       background-image: radial-gradient(
         circle at center,
         rgba(157, 157, 157, 0) 0%,
         rgba(131, 131, 131, 0.075) 25%,
         rgba(106, 106, 106, 0.145) 50%,
         rgba(55, 55, 55, 0.25) 100%
       );
     }
     ```
2. **`blur-black` (Glass Badge / Pill Surface)**:
   ```css
   .glass-blur-black {
     background-color: rgba(58, 58, 58, 0.30);
     backdrop-filter: blur(12px);
     -webkit-backdrop-filter: blur(12px);
   }
   ```
3. **Hero / Achievement / Footer Ambient Blue Glows**:
   - Layered radial gradients blending `#080B18` (`primary-black`) with soft blurred `#1235D8` (`primary-blue`) and `#2855FF` (`primary-blue-contrast`) light orbs (`pointer-events-none`, GPU-friendly static CSS gradients instead of heavy animated `box-shadow` or SVG `<feGaussianBlur>` filters).

---

## 5. Animation Governance (GSAP vs Framer Motion)

To maintain **60fps lightweight performance** and avoid animation conflicts:

| Responsibility | Library | Why | Target Sections |
| :--- | :--- | :--- | :--- |
| **Scroll-Linked Pinning & Parallax** | **GSAP + ScrollTrigger (`useGSAP`)** | Precision scrub & pin timelines tied to viewport scroll | `Hero` depth layers, `TechStack` fanned card spread, `Achievements` pinned spread (`KOMPETISI & PUBLIKASI`), `Projects` subtle image parallax |
| **Interactive State & Layout Transitions** | **Framer Motion (`LazyMotion` + `m`)** | Declarative `AnimatePresence`, spring physics, layout morphing | `Navbar` fullscreen curtain + staggered links, `CvDropdown`, `Organizations` card width/flip reveal, `Principles` accordion, `Detail Achievements` accordion, `About Me` photo crossfade |
| **Route Transitions & Scroll Anchors** | **Next.js `<Link>` + CSS `scroll-behavior: smooth`** | Native instant transitions without blocking navigation | `Pendekatan ↗`, `Jelajahi ↗`, `ProjectSubNav` section jump pills |

### Animation Performance Guardrails
- **Zero layout thrashing**: Never animate `width`, `height`, `top`, `left`, `margin`, or `padding` on scroll; use `transform` (`translate3d`, `scale`, `rotate`), `opacity`, and `clip-path`. For accordions (`Principles`, `Detail Achievements`), use Framer Motion `height: "auto"` only on click interactions with `overflow-hidden` or CSS `grid-template-rows: 0fr -> 1fr`.
- **Clean teardown**: Every GSAP hook MUST use `useGSAP(() => { ... }, { scope: containerRef })` so Next.js client-side route transitions (`/ -> /projects/kasir -> /`) cleanly revert ScrollTrigger pins and spacers.
- **Reduced Motion**: Wrap GSAP calls in `gsap.matchMedia()` checking `(prefers-reduced-motion: no-preference)`, and set `<MotionConfig reducedMotion="user">` in `MotionProvider.tsx`.

---

## 6. Bilingual State & Routing Design

- **URL Preservation**: Keeping `/` and `/projects/*` and `/achievements` clean without `/id/` or `/en/` prefix duplication allows instant language switching via `LanguageContext` on any scroll position without page reload or resetting interactive component state (e.g., an open accordion).
- **Rich Italic Rendering Engine (`src/data/types.ts` + `RichText.tsx`)**:
  ```ts
  export type Locale = "id" | "en";

  export type TextSegment =
    | string
    | {
        text: string;
        italic?: boolean;
        bold?: boolean;
      };

  export type BilingualRichText = Record<Locale, TextSegment[]>;
  export type BilingualText = Record<Locale, string>;
  ```
  This guarantees type-safe, XSS-free rendering where Indonesian mode preserves exact italicized English words (`<em>`) and English mode renders clean upright native Software Engineering English.

---

## 7. Next-Step Execution Map

1. Scaffold Next.js + dependencies inside `web-porto-ari/`.
2. Copy assets from `../assets/img/` -> `public/images/` (and CVs -> `public/cv/`).
3. Implement Design Tokens (`globals.css`), `LanguageContext`, `MotionProvider`, `RichText`, and `src/data/*`.
4. Implement sections per user prompt (`utils` -> `landingpage` -> `detail-projects` -> `detail-achievements`).
