# Product Requirements Document (PRD) — Ari Rahman Portfolio (`web-porto-ari`)

**Project**: Ari Rahman — Software Engineer Portfolio  
**Version**: 1.0.0  
**Status**: Approved Architecture Spec (Pre-Code)  
**Created**: 2026-11-18  
**Last Updated**: 2026-11-18  
**Design Source of Truth**: `../assets/uiux/` & `../assets/LINK.txt` *(Note: `../Konten Web Porto Ari.md` is explicitly ignored per owner directive.)*

---

## 1. Executive Summary

`web-porto-ari` is a high-standard, bilingual (`IND` / `ENG`), database-free interactive software engineering portfolio built with Next.js (App Router), React, TypeScript, Tailwind CSS v4, GSAP, and Framer Motion. It showcases Ari Rahman's real-world engineering projects, national hackathon & journal achievements, organizational leadership, technical stack, and UX-driven engineering principles to attract Software Engineering / Frontend / DevOps internship opportunities (Feb – Jun 2027) and commercial clients.

---

## 2. Problem Statement & Target Audience

- **Problem**: Standard developer portfolios often fail to demonstrate engineering trade-offs, context-aware UX decisions, and production impact in a cohesive, memorable visual experience.
- **Target Users**:
  1. **Technical Recruiters & Engineering Managers** evaluating candidates for Feb – Jun 2027 full-time internships (Software Engineer, Frontend Engineer, DevOps Engineer).
  2. **Freelance / Commercial Clients** assessing end-to-end product execution (discovery, Figma UI/UX, fullstack implementation, deployment).
  3. **Hackathon / Academic Peers** reviewing competition deliverables, publications, and repositories.

---

## 3. Goals & Success Metrics

| Goal | Metric | Target |
| :--- | :--- | :--- |
| Fast initial load & perceived polish | Core Web Vitals (Lighthouse) | LCP < 2.5s, INP < 150ms, CLS < 0.05 |
| Bilingual precision & natural tone | Copy audit (`id` & `en`) | 100% UI/UX parity; native SE English; italic rules enforced |
| Smooth, lightweight motion | Animation frame rate | 60fps GPU-composited animations + `prefers-reduced-motion` parity |
| Direct conversion paths | Click depth to CVs, Repos & Case Studies | <= 2 clicks from landing page to any CV, live demo, repo, or case study |

---

## 4. Information Architecture & Route Map

| Group | Route / Anchor | Purpose |
| :--- | :--- | :--- |
| **Utils (Global)** | `RootLayout` (`Navbar`, `Footer`) | Persistent navigation overlay, language toggle (`IND`/`ENG`), 3-role CV downloader, social/contact links |
| **1. Landing Page** | `/` (`#hero`, `#tech-stack`, `#projects`, `#achievements`, `#organizations`, `#about-me`, `#principles`) | Continuous storytelling page linking all 7 sections seamlessly |
| **2. Detail Projects** | `/projects/kasir`, `/projects/landeuh`, `/projects/ais`, `/projects/webgis` | 4 separate dedicated case study pages reached via each project's `Pendekatan ↗` button |
| **3. Detail Achievements** | `/achievements` | 1 consolidated page housing all 4 competitions & publications reached via `Jelajahi ↗` |

---

## 5. Functional Requirements

### 5.1 Global Utilities (`utils`)
- **FR-01 Navbar**: Fixed top bar with custom Ari geometric mark (`/` link) and menu trigger (`=`). Opens a fullscreen `#2855FF` -> `#1235D8` overlay with 5 section links (`PROYEK`, `PERAIHAN`, `ORGANISASI`, `TENTANG`, `KONTAK`), 4 social links (LinkedIn, WhatsApp, Instagram, GitHub), active `IND - ENG` switcher, and `UNDUH CV` dropdown (`CV SOFT. ENG.`, `CV FRONTEND`, `CV DEVOPS`).
- **FR-02 Footer**: Includes top row (`Github` + `Unduh CV` dropdown), large `LET'S CONNECT ↗` email trigger (`arirahman.rise@gmail.com`), and bottom social bar (`LinkedIn`, `WhatsApp`, `Instagram`).

### 5.2 Landing Page (`/`)
- **FR-03 Hero**: Full-viewport dark-blue radial hero featuring giant `SOFTWARE ENGINEER` typography layered behind Ari's transparent portrait (`hero.webp`), discipline labels (`FRONTEND`, `SOFTWARE`, `MOBILE`, `FULLSTACK`), internship badge (`Terbuka untuk Magang · Feb – Jun 2027`), and corner metadata (`BOGOR, INDONESIA / REALISASI SOLUSI`, `PEDULI UX / ANTUSIASME UI`).
- **FR-04 Tech Stack & Kemampuan**: `TECH STACK & KEMAMPUAN` heading followed by 5 interactive Polaroid-style cards (`Frontend & Mobile`, `Backend`, `UI/UX Design`, `Tools`, `AI-Assisted`) with visual previews and itemized stack copy, transitioning into the giant `PROYEK` section title.
- **FR-05 Projects (4 Full-Width Showcases)**: Displays 4 full-bleed project banners (`Toko All Rahman`, `Landeuh Village Riverside`, `Asrama IPB Sukasari`, `WebGIS RINTIK`). Each banner provides:
  - Left CTA: `↙ Kunjungi` (opens external production URL or GitHub repo in new tab).
  - Center: Project title.
  - Right CTA: `Pendekatan ↗` (navigates to `/projects/[slug]`).
- **FR-06 Achievements (`KOMPETISI & PUBLIKASI`)**: Scroll-choreographed pinned showcase where the centered title reveals/spreads 4 achievement cards (`JOINTS UGM 2026`, `Ifest Unpad 2026`, `Jurnal JTIK SINTA 4`, `Pelita Technoday 2025`) alongside a sticky central `Jelajahi ↗` button navigating to `/achievements`.
- **FR-07 Organizations (`ORGANISASI & KEPANITIAAN`)**: Interactive 3-panel horizontal expanding deck (`Pendikar 2025`, `Bendahara Asrama IPB Sukasari`, `Ketua OSIS SMAN 1 Talaga`). Clicking a collapsed vertical strip expands it; clicking `Selengkapnya ↗` blurs/flips the active panel to reveal bulleted impact metrics with a `↶ Putar` button to return.
- **FR-08 About Me**: Rounded light-accent portrait card (`1.webp`–`3.webp`) featuring Ari's narrative on the left (`Semester 5 · IPK 3,66/4,00`) and academic context on the right (`IPB UNIVERSITY`, `D4 Teknologi Rekayasa Perangkat Lunak`, `Siap Magang · Full-Time`).
- **FR-09 Principles (`Cara Kerja & Prinsip`)**: 4-row interactive accordion (`Keunggulan 01` – `Keunggulan 04`) detailing engineering philosophy.

### 5.3 Detail Projects (`/projects/[slug]`)
- **FR-10 Dedicated Case Study Pages**: 4 separate routes (`/projects/kasir`, `/projects/landeuh`, `/projects/ais`, `/projects/webgis`) sharing a unified editorial architecture:
  1. Hero header banner + `↓` scroll-to-content cue + 1-line summary + metadata strip (`Fokus`, `Tech Stack`, `Periode`).
  2. Device mockup centerpiece + quick-jump pill bar (`Masalah`, `Kontribusi`, `Proses`, `Keputusan & Trade-off`, `Hasil`).
  3. `Masalah` & `Kontribusi` two-column narratives.
  4. Numbered `Proses` timeline (`01`..`0N`).
  5. `Keputusan & Trade-off` technical decision callouts.
  6. `Hasil` visual card (`result-object.webp` + `result-banner.webp` + impact summary + external action buttons for Web/Repo/Figma/GitHub Projects).
  7. `Refleksi Teknis` closing block.

### 5.4 Detail Achievements (`/achievements`)
- **FR-11 Consolidated Achievements Page**: Single route (`/achievements`) displaying `Kompetisi & Prestasi` with 4 numbered expandable/accordion cards (`1` JOINTS, `2` Ifest, `3` Jurnal JTIK, `4` Pelita), each containing its hero visual, date badge, certificates/LOA/mockups, role breakdown, and external links (`Kunjungi Website`, `Kunjungi Video`, `Kunjungi Figma`, `Kunjungi ExSum`, `Kunjungi PitchDeck`, `Kunjungi Repo`, `Kunjungi Artikel`) sourced from `LINK.txt`.

---

## 6. Bilingual & Typography Specification

- **Font**: `Inter` (`next/font/google`).
- **Indonesian (`id`)**: Text taken strictly from `assets/uiux/`. English words inside Indonesian copy are **preserved in English** and **italicized (`<em>`)**.
- **English (`en`)**: Indonesian prose is translated into **natural, idiomatic native software engineering English** (upright normal `Inter`), as specified in [`docs/I18N_AND_COPY_SPEC.md`](./docs/I18N_AND_COPY_SPEC.md).

---

## 7. Technical Stack & No-Database Rationale

| Layer | Choice | Rationale |
| :--- | :--- | :--- |
| Framework | Next.js (App Router) + React 19 | Static SSG speed, clean nested routing (`/projects/*`, `/achievements`), zero-JS server components where static |
| Language | TypeScript (strict) | Compile-time guarantees across bilingual copy tokens, project metadata, and links |
| Styling | Tailwind CSS v4 (`@theme`) | Exact token fidelity, minimal CSS output, native fluid responsive layouts |
| Animation | GSAP (`ScrollTrigger`) + Framer Motion | GSAP handles pinned scroll choreography (`Achievements`, `Hero`); Framer Motion handles UI transitions (`Navbar`, `Organizations`, `Principles`, `Detail Achievements`) |
| Persistence | None (Zero DB) + `localStorage` for `IND`/`ENG` preference | Portfolio content is curated & static; eliminating DB removes latency, hosting cost, and failure points |

---

## 8. Non-Functional Requirements

- **Performance**: `next/image` WebP optimization, `LazyMotion` tree-shaken Framer bundle, dynamic/lazy GSAP ScrollTrigger registration, `LCP < 2.5s`, `INP < 150ms`, `CLS < 0.05`.
- **Accessibility**: Semantic HTML (`<header>`, `<main>`, `<section>`, `<footer>`), keyboard focus traps on fullscreen Navbar overlay, `aria-expanded` on accordions/dropdowns, WCAG AA contrast, `prefers-reduced-motion` fallbacks.
- **Responsive Design**: Desktop-first faithful reproduction from `1440px` Figma frames gracefully adapted down to Tablet (`768px–1023px`) and Mobile (`375px–767px`) without horizontal overflow.
- **SEO & GEO**: Per-page metadata (`title`, `description`, `openGraph`), custom favicon/logo/OG image, clean semantic headings.

---

## 9. Out of Scope

- Backend server, database, CMS, or authentication.
- Blog, contact form submission API (contact uses direct `mailto:`, WhatsApp, LinkedIn, Instagram, GitHub links from `LINK.txt`).
- Importing content from `../Konten Web Porto Ari.md`.

---

## 10. Open Questions / Pending Content Items (Confirmed Gaps)

1. **`Principles` (`Keunggulan 02`, `03`, `04`)**: In `assets/uiux/landingpage/principles.png`, rows 02–04 are collapsed so their titles and paragraphs are not visible. User will supply their copy when implementing `#principles`.
2. **JOINTS Repo URL**: In `assets/LINK.txt`, `joints -> repo:` is currently blank. Button should gracefully hide or stay disabled/omitted if URL remains empty.
3. **Three CV PDFs**: Navbar & Footer show 3 options (`CV SOFT. ENG.`, `CV FRONTEND`, `CV DEVOPS`), while `../CV_Ari/` currently contains 1 PDF (`ARI RAHMAN.pdf`). User should provide the 3 final PDFs in `public/cv/` before production launch.
4. **Video Assets**: `../assets/video/` is currently empty. If loader/hero/project preview videos are added later, place them in `public/videos/`.
5. **Minor UI/UX Typos Detected**:
   - `det-project-ais.png` period says `Jan 2026 – Semarang` -> confirm fix to `Jan 2026 – Sekarang`.
   - `det-project-webgis.png` focus says `Infromasi Spasial` -> fix to `Informasi Spasial`.
   - `comp-achievement-2.png` says `realease Repositori GitHub` -> fix to `*release* Repositori GitHub`.
