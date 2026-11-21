# Context Map (`web-porto-ari`)

> Compact architectural index for fast agent navigation. Update immediately when new routes, components, or data modules are created.

---

## Documentation Files
- `AGENTS.md` — Core rules, Tailwind v4 colors, `Inter` italicization rules, GSAP/Framer separation, workflow gates.
- `PRD.md` — Scope, functional requirements, non-functional metrics, open content gaps.
- `BLUEPRINT.md` — Zero-DB architecture rationale, target folder skeleton, CSS tokens, motion strategy.
- `PROGRESS.md` — Phase & section checklist.
- `CHANGELOG.md` — Versioned change log (`Keep a Changelog`).
- `docs/SECTION_SPECS.md` — Detailed layout anatomy & animation specs for `utils`, `landingpage`, `detail-projects`, and `detail-achievements`.
- `docs/I18N_AND_COPY_SPEC.md` — Exact Indonesian copy (with `*italic*` markers) from `../assets/uiux/` + native SE English translations.
- `docs/ASSETS_AND_LINKS.md` — Complete `assets/img/` -> `public/images/` map, `public/videos/` storage guide, CV files, normalized `LINK.txt` registry.

---

## Application Modules *(Scaffolded in Phase 2)*
- `src/app/layout.tsx` — Global font (`Inter` normal + italic), `LanguageProvider`, `MotionProvider`, `Navbar`, `Footer`.
- `src/app/globals.css` — Tailwind v4 `@theme` colors + `.bg-radial-black` + `.glass-blur-black`.
- `src/app/page.tsx` — Landing Page composing all 7 connected section scaffolds.
- `src/app/projects/{kasir,landeuh,ais,webgis}/page.tsx` — Dedicated case study pages.
- `src/app/achievements/page.tsx` — Consolidated 4-achievement detail page.
- `src/context/LanguageContext.tsx` — `id` | `en` state via `useSyncExternalStore` + `localStorage` (`porto_lang`).
- `src/components/motion/MotionProvider.tsx` — Framer Motion `LazyMotion` + `domAnimation` + `MotionConfig reducedMotion="user"`.
- `src/components/motion/SmoothScrollProvider.tsx` — Global GSAP `ScrollSmoother` wrapper across all routes (`/` + `/projects/*` + `/achievements`) with route-change/hash sync.
- `src/components/motion/gsapConfig.ts` — Client-only GSAP + `ScrollTrigger` + `ScrollToPlugin` + `ScrollSmoother` + `useGSAP` registration and `scrollSmoothTo` helper.
- `src/components/ui/{RichText,ActionPill,GlassBadge}.tsx` — Safe `<em>` segment renderer & reusable pill primitives.
- `src/components/layout/{Logo,Navbar,Footer,LanguageSwitcher,CvDropdown}.tsx` — Global layout shells.
- `src/components/sections/landing/*.tsx` — 7 landing section scaffolds (`HeroSection`, `TechStackSection`, `ProjectsSection`, `AchievementsSection`, `OrganizationsSection`, `AboutMeSection`, `PrinciplesSection`).
- `src/components/sections/projects/*.tsx` — Case study layout scaffolds (`ProjectDetailTemplate`, `ProjectSubNav`, `ProjectResultCard`).
- `src/components/sections/achievements/*.tsx` — Consolidated achievement scaffolds (`AchievementsAccordion`, `AchievementPanel`).
- `src/data/*.ts` — Strongly typed static data modules (`types.ts`, `links.ts`, `navigation.ts`, `hero.ts`, `techstack.ts`, `projects.ts`, `achievements.ts`, `organizations.ts`, `aboutme.ts`, `principles.ts`).
- `src/lib/utils.ts` — `cn()` Tailwind class merge helper.
