# Changelog (`web-porto-ari`)

All notable changes to this project will be documented in this file.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

### Changed
- **English Copywriting Refinement (`docs/I18N_AND_COPY_SPEC.md`, `src/data/*`)**:
  - Audited and revised all English (`en`) copy in `docs/I18N_AND_COPY_SPEC.md` using Strunk's *Elements of Style* rules and anti-AI-writing guidelines (removed filler puffery, fixed non-idiomatic phrasing, enforced active voice, parallel structure, and tense consistency, and restored omitted details from the Indonesian source).
  - Synced all updated English copy into `src/data/` (`hero.ts`, `techstack.ts`, `projects.ts`, `achievements.ts`, `organizations.ts`, `aboutme.ts`, `principles.ts`).
- **Skills Constitution & Intuitive Routing (`AGENTS.md`, `../AGENTS.md`, `PROGRESS.md`)**:
  - Integrated all 20 installed skills from `../daftar-skills.txt` into `web-porto-ari/AGENTS.md` (Section 6 & Section 7) with exact `SKILL.md` paths, domain triggers, and a section-by-section routing table (`utils`, `hero`, `techstack`, `projects`, `achievements`, `organizations`, `about-me`, `principles`, `detail-projects`, `detail-achievements`, Phase 7 QA/Vercel deploy).
  - Configured `no-ai-slop` (`C:\Users\Ari Rahman\.gemini\config\skills\anti-slop\SKILL.md`) as always-on across prose, English translations, new copy, docs, and agent outputs while protecting Figma-locked Indonesian copy in `docs/I18N_AND_COPY_SPEC.md`.
  - Added workspace-root `../AGENTS.md` to enforce `no-ai-slop` and bridge directly into `web-porto-ari/AGENTS.md` when prompts start from `D:\Work\Portofolio`.

### Added
- **Phase 2 Project Scaffold & Core Infrastructure**:
  - Initialized Next.js `16.4.6` (App Router, Turbopack), React `19.3.1`, TypeScript (`strict: true`), Tailwind CSS v4 (`@tailwindcss/postcss`), GSAP (`3.15.1` + `@gsap/react`), Framer Motion (`12.43.0`), Lucide React, `clsx`, and `tailwind-merge` inside `web-porto-ari/`.
  - Migrated all 41 image assets from `../assets/img/` to `public/images/` (normalizing `ai-assisted.webp`, `pelita-mockup.webp`, and `joints-poster-bg.webp`) and copied `../CV_Ari/ARI RAHMAN.pdf` to `public/cv/cv-software-engineer.pdf`.
  - Implemented core infrastructure: `src/app/globals.css` (`@theme` tokens, `.bg-radial-black`, `.glass-blur-black`), `src/context/LanguageContext.tsx` (`useSyncExternalStore` + `porto_lang`), `src/components/motion/{MotionProvider,gsapConfig}`, `src/components/ui/{RichText,ActionPill,GlassBadge}`, and `src/lib/utils.ts`.
  - Populated strongly typed static bilingual content modules under `src/data/` (`types.ts`, `links.ts`, `navigation.ts`, `hero.ts`, `techstack.ts`, `projects.ts`, `achievements.ts`, `organizations.ts`, `aboutme.ts`, `principles.ts`).
  - Scaffolded full route tree (`/`, `/projects/{kasir,landeuh,ais,webgis}`, `/achievements`) and section/layout component structure ready for section-by-section implementation.
- **Phase 1 Pre-code Architecture & Documentation**:
  - `AGENTS.md`: Engineering constitution, exact Figma color tokens, bilingual italicization rules, GSAP vs Framer Motion guidelines, and workflow gates.
  - `PRD.md`: Full product requirements aligned to `../assets/uiux/` and `../assets/LINK.txt`.
  - `BLUEPRINT.md`: Zero-database Next.js App Router + TypeScript folder structure and Tailwind CSS v4 `@theme` design tokens.
  - `docs/SECTION_SPECS.md`: Layout anatomy, responsive specs, and motion choreography across `utils`, `landingpage`, `detail-projects`, and `detail-achievements`.
  - `docs/I18N_AND_COPY_SPEC.md`: Verbatim UI/UX Indonesian copy with italicization markers paired with native software engineering English translations.
  - `docs/ASSETS_AND_LINKS.md`: Complete image migration table (`public/images/`), video storage rules (`public/videos/`), CV download paths (`public/cv/`), and normalized external URL registry.
  - `PROGRESS.md` & `CONTEXT_MAP.md`: Build tracking and quick-reference module index.
