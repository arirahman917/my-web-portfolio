# Development Progress Tracker (`web-porto-ari`)

> Follow the build phases sequentially or prompt section-by-section once foundation & skills are finalized.

---

## Phase 1: Planning & Architecture Documentation (DONE)
- [x] `AGENTS.md` — AI rules, design tokens, bilingual italicization rules, workflow contract
- [x] `PRD.md` — Product Requirements Document & gap tracking
- [x] `BLUEPRINT.md` — Target directory structure, no-DB architecture, CSS tokens, GSAP vs Framer split
- [x] `docs/SECTION_SPECS.md` — UI anatomy, responsive behavior, motion specs for all routes/sections
- [x] `docs/I18N_AND_COPY_SPEC.md` — Pure UI/UX Indonesian copy + italic tags + native SE English copy
- [x] `docs/ASSETS_AND_LINKS.md` — Image migration map, `public/videos/` guide, CV & `LINK.txt` registry
- [x] `PROGRESS.md`, `CONTEXT_MAP.md`, `CHANGELOG.md`

---

## Phase 2: Project Scaffold, Assets & Core Infrastructure (SCAFFOLDED)
- [x] Inject/confirm any additional specialized Antigravity skills from owner *(integrated all 20 installed skills from `../daftar-skills.txt` into `AGENTS.md` and root `../AGENTS.md`, including always-on `no-ai-slop`)*
- [x] Initialize Next.js 16 (App Router, React 19, TypeScript strict, Tailwind CSS v4) inside `web-porto-ari/`
- [x] Install dependencies (`gsap`, `@gsap/react`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`)
- [x] Copy 41 images from `../assets/img/` -> `public/images/` per `docs/ASSETS_AND_LINKS.md`
- [x] Place `ARI RAHMAN.pdf` -> `public/cv/cv-software-engineer.pdf` and initialize `public/videos/` *(pending `cv-frontend.pdf` & `cv-devops.pdf`)*
- [x] Configure `globals.css` (`@theme`, `.bg-radial-black`, `.glass-blur-black`), `Inter` font (normal + italic), `LanguageContext`, `MotionProvider`, `gsapConfig`, `RichText`, UI primitives, and typed `src/data/*`
- [x] Scaffold route & section component structure (`app/`, `components/layout/`, `components/sections/landing/`, `components/sections/projects/`, `components/sections/achievements/`) passing `typecheck`, `lint`, and `next build`

---

## Phase 3: Global Utilities (`utils` — Visual & Motion Polish)
- [ ] `Logo.tsx` (Final geometric Ari SVG mark matching Figma proportions)
- [ ] `Navbar.tsx` (Scroll contrast adaptation + fullscreen `#2855FF` overlay + staggered links + focus trap)
- [ ] `Footer.tsx` (`LET'S CONNECT ↗` radial blue lighting + social links + `Unduh CV`)

---

## Phase 4: Landing Page Sections (`/`)
- [ ] `hero` (`HeroSection.tsx` — layered `SOFTWARE ENGINEER` + portrait depth parallax + orbs)
- [ ] `techstack` (`TechStackSection.tsx` — 5 fanned Polaroid cards + `PROYEK` transition)
- [ ] `projects` (`ProjectsSection.tsx` — 4 full-bleed project banners + `↙ Kunjungi` & `Pendekatan ↗`)
- [ ] `achievements` (`AchievementsSection.tsx` — GSAP ScrollTrigger pinned 4-card spread + `Jelajahi ↗`)
- [ ] `organizations` (`OrganizationsSection.tsx` — 3-panel horizontal accordion & detail flip)
- [ ] `about-me` (`AboutMeSection.tsx` — Portrait card + IPB University profile + photo showcase)
- [ ] `principles` (`PrinciplesSection.tsx` — `Cara Kerja & Prinsip` 4-row accordion; confirm Keunggulan 02–04 copy)

---

## Phase 5: Detail Project Pages (`/projects/[slug]`)
- [ ] Shared template & sub-nav (`ProjectDetailTemplate.tsx`, `ProjectSubNav.tsx`, `ProjectResultCard.tsx` full Figma layout)
- [ ] `/projects/kasir` (`project-kasir`)
- [ ] `/projects/landeuh` (`project-landeuh`)
- [ ] `/projects/ais` (`project-ais`)
- [ ] `/projects/webgis` (`project-webgis`)

---

## Phase 6: Detail Achievements Page (`/achievements`)
- [ ] `/achievements` (`AchievementsAccordion.tsx` & `AchievementPanel.tsx` — full banner fades + zig-zag media grids)

---

## Phase 7: Quality Assurance, SEO & Launch
- [ ] Responsive visual verification (`1440px`, `768px`, `375px`)
- [ ] Bilingual (`IND` & `ENG`) + italic rendering audit across all pages
- [ ] Accessibility audit (`prefers-reduced-motion`, keyboard navigation, focus states, WCAG AA contrast)
- [ ] Favicon, OG image, per-route metadata, and Vercel deployment
