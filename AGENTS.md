# AGENTS.md — Engineering Constitution (`web-porto-ari`)

> **Scope**: Mandatory engineering rules, design tokens, bilingual copy rules, and workflow constraints for all AI agents operating inside `D:\Work\Portofolio\web-porto-ari`.
> **Canonical Reference Docs**:
> - Product requirements & scope: [`PRD.md`](./PRD.md)
> - Architecture, folder layout & animation architecture: [`BLUEPRINT.md`](./BLUEPRINT.md)
> - Section-by-section UI & motion specs: [`docs/SECTION_SPECS.md`](./docs/SECTION_SPECS.md)
> - Bilingual copy & italicization tokens: [`docs/I18N_AND_COPY_SPEC.md`](./docs/I18N_AND_COPY_SPEC.md)
> - Asset migration, video storage & links: [`docs/ASSETS_AND_LINKS.md`](./docs/ASSETS_AND_LINKS.md)
> - Progress & context index: [`PROGRESS.md`](./PROGRESS.md) | [`CONTEXT_MAP.md`](./CONTEXT_MAP.md) | [`CHANGELOG.md`](./CHANGELOG.md)

---

## 1. Architectural Identity & Non-Negotiable Principles

1. **Zero-Database Static-First Architecture**:
   - This portfolio **does NOT use any database** (no SQL, no Prisma, no Supabase runtime queries, no CMS).
   - All content lives in version-controlled, strongly typed TypeScript data modules under `src/data/`.
   - Pages are statically pre-rendered via Next.js App Router (`output` optimized for Vercel/SSG + React Server Components).
2. **Core Stack**:
   - **Framework**: Next.js (App Router) + React 19 + TypeScript (`strict: true`, zero `any`).
   - **Styling**: Tailwind CSS v4 (`@theme` CSS-first tokens in `src/app/globals.css`).
   - **Motion**:
     - **GSAP** (`gsap` + `@gsap/react` + `ScrollTrigger`): Reserved for scroll-choreographed storytelling, pinned timelines, parallax spreads, and smooth section entrances. Always wrap in `useGSAP()` / `gsap.context()` for strict cleanup.
     - **Framer Motion** (`LazyMotion` + `domAnimation` + `m`): Reserved for interactive UI state transitions (fullscreen Navbar overlay, CV dropdown, Organizations card flip/expand, Principles accordion, hover/tap micro-interactions).
     - **Rule of Non-Conflict**: NEVER animate the same DOM node's `transform`/`opacity` simultaneously with both GSAP and Framer Motion. Wrap Framer interactive cards inside GSAP scroll containers if both are needed.
     - **Performance & A11y**: Animate ONLY GPU-composited properties (`transform`, `opacity`, `clip-path`). Always honor `prefers-reduced-motion: reduce`.
3. **Pure UI/UX Content Fidelity**:
   - All visual layout, hierarchy, copywriting, and interactions MUST follow `../assets/uiux/` and [`docs/I18N_AND_COPY_SPEC.md`](./docs/I18N_AND_COPY_SPEC.md).
   - **Ignore** `../Konten Web Porto Ari.md` completely (explicitly superseded by `../assets/uiux/`).
   - All external URLs MUST come from [`docs/ASSETS_AND_LINKS.md`](./docs/ASSETS_AND_LINKS.md) (sourced from `../assets/LINK.txt`). Never invent placeholder URLs.

---

## 2. Design System & Color Tokens (Strict Match to Figma)

Define and consume these exact tokens via Tailwind v4 `@theme` and CSS custom properties:

| Token Name | Value / Definition | Usage |
| :--- | :--- | :--- |
| `--color-primary-black` | `#080B18` | Primary dark canvas background (`P-black`) |
| `--color-primary-blue` | `#1235D8` | Deep electric brand blue (`P-blue`) & gradient base |
| `--color-primary-blue-contrast` | `#2855FF` | High-contrast vibrant blue (`P-blue-contrast`), overlay menu, glows |
| `--color-primary-purple` | `#6D8BFF` | Accent labels, subtle blue-violet highlights (`P-purple`) |
| `--color-lightblue` | `#EAF0FF` | Light surface cards (Tech Stack Polaroids, Detail Achievements, Organizations bottom transition) |
| `--color-white` | `#FFFFFF` | Primary text on dark backgrounds, crisp UI borders/buttons |
| `--color-black` | `#000000` | Primary font color on light surfaces (`#EAF0FF` / `#FFFFFF`) |
| `--color-blur-black` | `rgba(58, 58, 58, 0.30)` | Frosted/glass badges & overlays (`3A3A3A` @ 30% + `backdrop-blur-md`) |
| `--bg-radial-black` | `radial-gradient(circle at center, rgba(157,157,157,0) 0%, rgba(131,131,131,0.075) 25%, rgba(106,106,106,0.145) 50%, rgba(55,55,55,0.25) 100%)` | Figma `radial-black` (layer opacity 25% applied to stops `9D9D9D` 0%, `838383` 30%, `6A6A6A` 58%, `373737` 100%) |

---

## 3. Typography, Bilingual (ID / EN) & Italicization Contract (CRITICAL)

1. **Font Family**: Load `Inter` via `next/font/google` (include weights `400`, `500`, `600`, `700`, `800` and italic styles so `<em>` renders true `Inter` italic — never faux oblique).
2. **Language Switcher (`IND` / `ENG`)**:
   - Controlled from the Navbar (`IND - ENG`) via a React Context (`LanguageContext`) persisted in `localStorage` (`porto_lang`) without losing the current route or scroll state.
   - Default language: `id` (Indonesian).
3. **Strict Language & Italicization Rules**:
   - **When `id` (Indonesian) is active**:
     - Do **NOT** translate existing English words/terms shown in the UI/UX into Indonesian. Keep them in English and **italicize (`<em>`)** every English term embedded in Indonesian prose, headings, or descriptions (e.g., *Offline-First*, *double booking*, *branding*, *Website*, *Use Case*, *Trade-off*, *muscle memory*, *landing page*, *workspace*, *sponsorship*, *pre-order*, *paid promote*, *zero balance discrepancy*, *executive summary*, *pitch deck*, *feedback*, *polish*, *review*, *Full-Time*, *buffer*, *proximity analysis*, *error logging*, *crash reporting*).
     - Proper brand/technology nouns inside tech-stack chips or standalone labels (`React`, `Next.js`, `TypeScript`, `GitHub`, `Figma`, `Tailwind CSS`, `GSAP`, `Framer Motion`, `Vercel`, `Supabase`) remain upright unless used inline inside Indonesian narrative where UI/UX italicizes them.
   - **When `en` (English) is active**:
     - Translate all Indonesian text into **natural, idiomatic, native Software Engineering English** (concise, technical, portfolio-grade — never stiff or word-for-word).
     - Render English prose in upright normal `Inter` (do NOT italicize whole English sentences).
   - **Implementation Pattern**: Store rich copy using structured segment arrays (`RichSegment[] = Array<string | { text: string; italic?: boolean; bold?: boolean }>`) rendered via a shared `<RichText />` component. Never use `dangerouslySetInnerHTML`.

---

## 4. Required Route & Structure Contract

1. **Global Utilities (`utils`)**:
   - `Navbar` (top bar with Ari SVG logo + hamburger trigger; fullscreen `#2855FF`/`#1235D8` overlay with links `PROYEK`, `PERAIHAN`, `ORGANISASI`, `TENTANG`, `KONTAK`, 4 social icons, `IND - ENG` toggle, and `UNDUH CV` 3-role dropdown).
   - `Footer` (`Github` + `Unduh CV` dropdown top row, `LET'S CONNECT ↗` + email center, `LinkedIn` / `WhatsApp` / `Instagram` bottom row).
2. **Landing Page (`/`)** — Connected vertical storytelling flow + Navbar & Footer:
   1. `Hero` (`#hero`)
   2. `Tech Stack & Kemampuan` (`#tech-stack`)
   3. `Projects` (`#projects` — 4 projects, each with `↙ Kunjungi` and `Pendekatan ↗` linking to its dedicated detail page)
   4. `Achievements` (`#achievements` — scroll-choreographed showcase of 4 achievements with central `Jelajahi ↗` linking to `/achievements`)
   5. `Organizations` (`#organizations` — 3 interactive horizontal accordion cards with front/detail flip)
   6. `About Me` (`#about-me`)
   7. `Principles` (`#principles` — `Cara Kerja & Prinsip` 4-item accordion)
3. **Detail Projects (4 Dedicated Pages)**:
   - `/projects/kasir` (`project-kasir`)
   - `/projects/landeuh` (`project-landeuh`)
   - `/projects/ais` (`project-ais`)
   - `/projects/webgis` (`project-webgis`)
4. **Detail Achievements (1 Consolidated Page)**:
   - `/achievements` (contains all 4 achievements in an expandable/stacked interactive layout)

---

## 5. Assets & File Hygiene Rules

- Use `next/image` with explicit dimensions or `fill` + proper `sizes` for every image under `public/images/`.
- Place video files (if used for background loops, loaders, or previews) under `public/videos/` (`.mp4` H.264 + `.webm` VP9/AV1, paired with a `.webp` poster).
- Place downloadable CV PDFs under `public/cv/` (`cv-software-engineer.pdf`, `cv-frontend.pdf`, `cv-devops.pdf`).
- Never duplicate UI components or copy across project pages; parameterize shared layouts cleanly.

---

## 6. Section-by-Section Workflow & Verification Gate

- **Execution Order**:
  1. Foundation setup (`package.json`, `globals.css` tokens, `LanguageContext`, `MotionProvider`, `RichText`, data modules).
  2. Global `utils` (`Navbar`, `Footer`).
  3. Landing Page sections (`hero` -> `techstack` -> `projects` -> `achievements` -> `organizations` -> `about-me` -> `principles`).
  4. Detail Project pages (`kasir`, `landeuh`, `ais`, `webgis`).
  5. Detail Achievements page (`/achievements`).
  6. Production hardening (TypeScript check, ESLint, Next build, React Doctor scan, Lighthouse Core Web Vitals, WCAG 2.2 AA audit, SEO metadata, `og:image`, Vercel deployment).
- **Mandatory Pre-Work Step**: Before implementing or editing any section, check **Section 7** below and read the relevant `SKILL.md` files for that task.
- **Parallel Multi-Terminal Protocol (10+ Concurrent `agy` CLI Sessions)**:
  - **Foundation First**: Complete Phase 2 (`package.json`, `globals.css`, `LanguageContext`, `MotionProvider`, `RichText`, `src/data/types.ts`, `src/data/links.ts`, and `src/app/page.tsx` / `layout.tsx` scaffolding) **before** launching parallel section terminals.
  - **Strict File Ownership**: Each parallel terminal MUST create/edit **only** its assigned section component(s), route file, and dedicated data file (e.g., `HeroSection.tsx` + `src/data/hero.ts`, or `src/app/projects/kasir/page.tsx` + `src/data/projects/kasir.ts`). Never touch another section's files or `src/app/page.tsx` / `layout.tsx` unless explicitly assigned.
  - **Do NOT Edit Shared Docs in Parallel**: Parallel section terminals MUST **skip** editing `PROGRESS.md`, `CONTEXT_MAP.md`, and `CHANGELOG.md` to prevent merge/overwrite races. Update or overwrite (`Overwrite: true`) those 3 tracking files in a single final consolidation pass after all parallel terminals finish.
  - **Build & Verify Without `.next` Collisions**: During parallel runs, do **NOT** run `npm run build` concurrently (parallel `next build` processes corrupt `.next/`). Each parallel terminal verifies its own scope with `npx tsc --noEmit` and `npx eslint <its-changed-files>`. Run full `npm run build` and `react-doctor` once in the final integration pass.
- **Single-Terminal / Final Integration Verification Gate**: Follow `verification-before-completion` — per section, verify with `npx tsc --noEmit` and `npx eslint <its-changed-files>`; in the final integration pass (Phase 7), run fresh `npm run typecheck`, `npm run lint`, `npm run build`, and `react-doctor` before claiming completion, then overwrite/update `PROGRESS.md`, `CONTEXT_MAP.md`, and `CHANGELOG.md`.

---

## 7. Active Skills Constitution & Intuitive Routing (`../daftar-skills.txt`)

All 20 installed skills documented in `../daftar-skills.txt` are active for this project. Use **progressive disclosure**: read the exact `SKILL.md` files needed for the active prompt before writing code, copy, or running deployment commands.

### 7.1 Always-On Rule: `no-ai-slop` (`anti-slop`)

- **Path**: `C:\Users\Ari Rahman\.gemini\config\skills\anti-slop\SKILL.md`
- **Always Active**: Apply on every turn for all agent explanations, `PROGRESS.md` / `CHANGELOG.md` entries, `docs/`, English (`en`) translations in `src/data/*.ts`, new or unconfirmed Indonesian copy (e.g., `Keunggulan 02–04`), metadata descriptions, and commit messages. Cut banned AI clichés (`delve`, `leverage`, `robust`, `cutting-edge`, `streamline`, `pivotal`, `testament`), dramatic fragments, summary-recap endings, and formatting slop. Prefer concrete facts, mechanisms, and active verbs.
- **Figma Copy Precedence Guard**: Never alter verbatim Indonesian UI copy locked from `../assets/uiux/` in `docs/I18N_AND_COPY_SPEC.md` unless the owner explicitly asks to edit or rewrite that copy.

### 7.2 Installed Skills Registry & Intuitive Triggers

| Category | Skill `name` (Folder if different) | `SKILL.md` Path | When to Load & Apply |
| :--- | :--- | :--- | :--- |
| **Always-On** | `no-ai-slop` (`anti-slop`) | `C:\Users\Ari Rahman\.gemini\config\skills\anti-slop\SKILL.md` | Every turn: prose, EN copy, new copy, docs, metadata, reports |
| **Writing (EN)** | `writing-clearly-and-concisely` | `C:\Users\Ari Rahman\.gemini\config\skills\writing-clearly-and-concisely\SKILL.md` | Authoring/editing English (`en`) UI copy, case studies, README, docs, metadata |
| **Writing (ID)** | `naskah-id` | `C:\Users\Ari Rahman\.gemini\config\skills\naskah-id\SKILL.md` | Formal/academic Indonesian prose (EYD V, KBBI), JTIK SINTA 4 text, formal ID proofreading |
| **Writing (ID)** | `parafrase-artikel-akademik-indonesia` (`parafrase`) | `C:\Users\Ari Rahman\.gemini\config\skills\parafrase\SKILL.md` | Paraphrasing/revising Indonesian scientific/academic text ONLY (never casual UI copy) |
| **Frontend** | `vercel-react-best-practices` | `C:\Users\Ari Rahman\.gemini\config\plugins\frontend\skills\vercel-react-best-practices\SKILL.md` | Any React/Next.js component, RSC/client boundary, bundle size, dynamic import, re-render optimization |
| **Frontend** | `responsive-adaptation` (`responsive-mobile-tablet`) | `C:\Users\Ari Rahman\.gemini\config\plugins\frontend\skills\responsive-mobile-tablet\SKILL.md` | Mobile (`<768px`) & tablet (`768–1023px`) layout adaptation across 8 principles; freeze colors/content/brand; test `360–1440px` |
| **Frontend** | `web-design-guidelines` | `C:\Users\Ari Rahman\.gemini\config\plugins\frontend\skills\web-design-guidelines\SKILL.md` | Full UI/UX, accessibility (`aria-*`, keyboard nav, focus trap), contrast, and typography audit in Phase 7 (apply basic `aria-*`/keyboard rules inline during section builds) |
| **Frontend** | `react-doctor` | `C:\Users\Ari Rahman\.gemini\config\plugins\frontend\skills\react-doctor\SKILL.md` | Once in Phase 7 (`npx react-doctor@latest --verbose`, `design`, or `/doctor`), or only when explicitly requested |
| **Animation** | `gsap-react` | `C:\Users\Ari Rahman\.gemini\config\plugins\animations\skills\gsap-react\SKILL.md` | Any GSAP code in React/Next.js (`useGSAP()`, `scope` ref, `contextSafe`, unmount cleanup) |
| **Animation** | `gsap-core` | `C:\Users\Ari Rahman\.gemini\config\plugins\animations\skills\gsap-core\SKILL.md` | GSAP tweens (`to`, `from`, `fromTo`), easing, stagger, `gsap.matchMedia()` for responsive + `prefers-reduced-motion` |
| **Animation** | `gsap-scrolltrigger` | `C:\Users\Ari Rahman\.gemini\config\plugins\animations\skills\gsap-scrolltrigger\SKILL.md` | Scroll-driven animations, `pin`, `scrub`, parallax, `clamp()`, `ScrollTrigger.refresh()` |
| **Animation** | `gsap-timeline` | `C:\Users\Ari Rahman\.gemini\config\plugins\animations\skills\gsap-timeline\SKILL.md` | Multi-step sequenced animations (`gsap.timeline()`, position parameters, nested timelines) |
| **Animation** | `gsap-plugins` | `C:\Users\Ari Rahman\.gemini\config\plugins\animations\skills\gsap-plugins\SKILL.md` | Registering/using GSAP plugins (`ScrollToPlugin` for anchor jumps, `Flip`, `Observer`, `SplitText`, `CustomEase`) |
| **Animation** | `gsap-performance` | `C:\Users\Ari Rahman\.gemini\config\plugins\animations\skills\gsap-performance\SKILL.md` | 60fps tuning: compositor-only `x`/`y`/`scale`/`rotation`/`opacity`, `will-change`, batching, `gsap.quickTo()` |
| **Animation** | `gsap-utils` | `C:\Users\Ari Rahman\.gemini\config\plugins\animations\skills\gsap-utils\SKILL.md` | Value math/mapping (`clamp`, `mapRange`, `normalize`, `interpolate`, `snap`, `toArray`, `wrap`) |
| **Animation** | `gsap-frameworks` | `C:\Users\Ari Rahman\.gemini\config\plugins\animations\skills\gsap-frameworks\SKILL.md` | Non-React frameworks only (Vue/Nuxt/Svelte); use `gsap-react` for this Next.js repo |
| **Deploy & QA** | `verification-before-completion` | `C:\Users\Ari Rahman\.gemini\config\plugins\deploy\skills\verification-before-completion\SKILL.md` | Mandatory gate before claiming any section, bugfix, or deploy is complete (fresh terminal evidence) |
| **Deploy & QA** | `vercel-cli-with-tokens` | `C:\Users\Ari Rahman\.gemini\config\plugins\deploy\skills\vercel-cli-with-tokens\SKILL.md` | Vercel CLI workflows (`vercel build`, `vercel deploy`, env vars) using `VERCEL_TOKEN` from env/`.env` (never `--token` arg) |
| **Deploy & QA** | `seo-audit` | `C:\Users\Ari Rahman\.gemini\config\plugins\deploy\skills\seo-audit\SKILL.md` | Metadata, Open Graph (`og:image`), `robots.txt`, `sitemap.xml`, heading hierarchy, indexation, Core Web Vitals |
| **Discovery** | `find-skills` | `C:\Users\Ari Rahman\.gemini\config\plugins\animations\skills\find-skills\SKILL.md` | Searching/installing new skills via `npx skills` / `skills.sh` when requested |

- **Complementary Built-In Skills (`vibes-plug`)**: When deeper domain guidance is needed, pair the primary skills above with `nextjs-app-router-expert`, `tailwind-expert`, `typescript-expert`, `ui-ux-pro-max`, `global-a11y-i18n-expert`, `performance-web-vitals`, or `seo` (and `C:\Users\Ari Rahman\.gemini\config\plugins\modern-web-guidance-plugin\README.md` for native Web API patterns).

### 7.3 Section-by-Section Routing Matrix (`web-porto-ari`)

When the owner prompts for a specific section or task, automatically load `no-ai-slop` plus only the build-time skill bundle for that section (verify per section with `npx tsc --noEmit` + `npx eslint <changed-files>`; reserve `react-doctor`, `seo-audit`, and full `web-design-guidelines` audits for Phase 7 to avoid redundant token usage):

1. **Global `utils` (`Logo`, `Navbar`, `Footer`, `LanguageSwitcher`, `CvDropdown`)**:
   - `vercel-react-best-practices`, `responsive-adaptation`, `writing-clearly-and-concisely` (EN labels), `verification-before-completion` (`tsc` + `eslint`). Apply focus trap, `Escape`, `aria-label`, and `44px` tap targets inline.
2. **`hero` (`HeroSection`)**:
   - `vercel-react-best-practices`, `responsive-adaptation` (fluid `clamp()` preventing `375px` overflow), `gsap-react`, `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-performance` (+ `gsap-utils` only if pointer parallax uses `quickTo`/`mapRange`), `verification-before-completion` (`tsc` + `eslint`).
3. **`techstack` (`TechStackSection` — 5 Polaroids + `PROYEK` transition)**:
   - `vercel-react-best-practices`, `responsive-adaptation` (5-col fan -> tablet 2–3 col -> mobile stack/swipe), `gsap-react`, `gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-performance`, `verification-before-completion` (`tsc` + `eslint`).
4. **`projects` (`ProjectsSection` — 4 project banners + `↙ Kunjungi` / `Pendekatan ↗`)**:
   - `vercel-react-best-practices`, `responsive-adaptation`, `gsap-react`, `gsap-scrolltrigger`, `gsap-performance`, `verification-before-completion` (`tsc` + `eslint`).
5. **`achievements` (`AchievementsSection` — pinned 4-card spread + `Jelajahi ↗`)**:
   - `vercel-react-best-practices`, `responsive-adaptation`, `gsap-react`, `gsap-core` (`gsap.matchMedia()` so desktop `pin` disables cleanly on mobile/tablet), `gsap-scrolltrigger`, `gsap-timeline`, `gsap-utils`, `gsap-performance`, `verification-before-completion` (`tsc` + `eslint`).
6. **`organizations` (`OrganizationsSection` — 3-panel horizontal accordion & detail flip)**:
   - `vercel-react-best-practices`, `responsive-adaptation` (horizontal strips -> vertical mobile cards), `writing-clearly-and-concisely`, `verification-before-completion` (`tsc` + `eslint`).
7. **`about-me` (`AboutMeSection` — portrait card & IPB profile)**:
   - `vercel-react-best-practices`, `responsive-adaptation`, `writing-clearly-and-concisely`, `verification-before-completion` (`tsc` + `eslint`).
8. **`principles` (`PrinciplesSection` — `Cara Kerja & Prinsip` 01–04 accordion)**:
   - `vercel-react-best-practices`, `responsive-adaptation`, `writing-clearly-and-concisely`, `naskah-id` (only if drafting/polishing Indonesian copy for `Keunggulan 02–04`), `verification-before-completion` (`tsc` + `eslint`). Apply accordion `aria-expanded` & keyboard support inline.
9. **`detail-projects` (`/projects/{kasir,landeuh,ais,webgis}`)**:
   - `vercel-react-best-practices`, `responsive-adaptation`, `gsap-react`, `gsap-plugins` (`ScrollToPlugin` for `↓` and `ProjectSubNav` anchors), `gsap-scrolltrigger`, `gsap-performance`, `writing-clearly-and-concisely`, `verification-before-completion` (`tsc` + `eslint`).
10. **`detail-achievements` (`/achievements` — 4 panels incl. JTIK SINTA 4)**:
    - `vercel-react-best-practices`, `responsive-adaptation`, `writing-clearly-and-concisely`, (`naskah-id` / `parafrase-artikel-akademik-indonesia` only if asked to edit/paraphrase JTIK SINTA 4 Indonesian academic prose), `verification-before-completion` (`tsc` + `eslint`).
11. **Phase 7 QA, SEO & Vercel Deployment (Run Once at End)**:
    - `web-design-guidelines`, `responsive-adaptation` (`360–1440px` audit), `react-doctor` (full & `design` scan), `seo-audit`, `vercel-cli-with-tokens`, `verification-before-completion` (full `typecheck`, `lint`, `next build`).
