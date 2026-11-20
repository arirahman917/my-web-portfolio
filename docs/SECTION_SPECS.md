# Section-by-Section Architecture & Motion Specification

> Every UI layout, responsive behavior, interactive state, and GSAP / Framer Motion choreography derived strictly from `../assets/uiux/`.

---

## 0. Global Utilities (`utils`)

### `Navbar` (`src/components/layout/Navbar.tsx`)
- **UI Reference**: `../assets/uiux/landingpage/navbar.png` & `hero.png`
- **Closed Bar State**:
  - Fixed top bar (`z-50`), transparent over dark canvas (subtle gradient/glass on scroll over light backgrounds so white logo & trigger remain legible or adapt cleanly when over `#EAF0FF` sections!).
  - Left: Geometric Ari logo mark (`Logo.tsx` SVG linking to `/`).
  - Right: Minimal 3-line / 2-line hamburger menu button (`aria-label="Open navigation menu"`).
- **Fullscreen Overlay State**:
  - Full-viewport overlay (`fixed inset-0 z-50`) in electric gradient `#1235D8` -> `#2855FF`.
  - Top bar: Ari Logo (left), Close `X` button (right).
  - Center stack: 5 oversized uppercase display nav links (`PROYEK`, `PERAIHAN`, `ORGANISASI`, `TENTANG`, `KONTAK`), navigating to `/#projects`, `/#achievements`, `/#organizations`, `/#about-me`, `/#footer` (closes overlay automatically on click).
  - Bottom bar (3-column responsive alignment):
    - Left: 4 crisp icon links (LinkedIn, WhatsApp, Instagram, GitHub).
    - Center: Language toggle `IND - ENG` (active language bold white `#FFFFFF`, inactive muted white).
    - Right: `UNDUH CV ^` trigger opening an upward glassmorphic menu (`CV SOFT. ENG.`, `CV FRONTEND`, `CV DEVOPS`).
- **Motion (Framer Motion)**:
  - Overlay entrance/exit: smooth `clip-path` or `opacity` + subtle scale (`duration: 0.35`, `ease: [0.22, 1, 0.36, 1]`), staggered link reveal (`staggerChildren: 0.05`).
  - Keyboard accessibility: `Escape` closes overlay; focus trapped inside when open.

### `Footer` (`src/components/layout/Footer.tsx`)
- **UI Reference**: `../assets/uiux/landingpage/footer.png`
- **Layout**:
  - Full-bleed dark-blue ambient canvas (`#080B18` base with soft `#1235D8`/`#2855FF` radial lighting on right/bottom-left).
  - Top row: `Github` link (left) | `Unduh CV v` outlined pill with glassmorphic dropdown below (right).
  - Center hero CTA: Oversized `LET'S CONNECT ↗` clickable link (`mailto:arirahman.rise@gmail.com`) + `arirahman.rise@gmail.com` email copy/link underneath.
  - Bottom row: 3-column spread (`LinkedIn` left, `WhatsApp` center, `Instagram` right).
- **Motion (Framer Motion)**:
  - Hover arrow rotation/nudge on `↗`, smooth dropdown height/opacity reveal on `Unduh CV`.

---

## 1. Landing Page (`/`) — Connected Vertical Flow

### 1.1 `HeroSection` (`#hero`)
- **UI Reference**: `../assets/uiux/landingpage/hero.png`
- **Visual Anatomy**:
  - Full viewport (`min-h-[100dvh]`) on `#080B18` with vibrant asymmetric `#1235D8`/`#2855FF` glow orbs.
  - Layered z-index composition:
    - **Back layer (`z-0`)**: Giant 2-line display text `SOFTWARE` / `ENGINEER` in crisp off-white gradient.
    - **Mid strip (`z-10`)**: Horizontal specialization tags (`FRONTEND`, `SOFTWARE`, `MOBILE`, `FULLSTACK`) woven across the center gap.
    - **Foreground layer (`z-20`)**: Transparent portrait `/images/hero.webp` centered vertically/bottom-anchored so `SOFTWARE ENGINEER` sits behind Ari's head/shoulders just like `hero.png`!
    - **Overlay layer (`z-30`)**:
      - Bottom-center: `Terbuka untuk Magang` / `Feb – Jun 2027`
      - Bottom-left: `BOGOR, INDONESIA` / `REALISASI SOLUSI` (`#6D8BFF`)
      - Bottom-right: `PEDULI UX` / `ANTUSIASME UI` (`#6D8BFF`)
- **Motion (GSAP)**:
  - Subtle initial stagger entrance (`opacity` + `y`) on load and gentle scroll-linked depth parallax (`y` offset between background `SOFTWARE ENGINEER` text and foreground portrait on desktop).
- **Responsive**: Scales display font fluently via `clamp(...)` so `SOFTWARE ENGINEER` stays legible and never overflows horizontally on mobile (`375px`).

### 1.2 `TechStackSection` (`#tech-stack`)
- **UI Reference**: `../assets/uiux/landingpage/techstack-proyek.png`
- **Visual Anatomy**:
  - Dark `#080B18` canvas with subtle ambient glow and `radial-black` atmosphere.
  - Section heading: `TECH STACK & KEMAMPUAN`.
  - 5 fanned Polaroid-style cards on `#EAF0FF` (`lightblue`) with `#000000` (`black`) text and slight alternating rotations (`-3deg`, `2deg`, `-1deg`, `3deg`, `1.5deg` on desktop, straightening smoothly on hover or mobile grid):
    1. `Frontend & Mobile` (`/images/skills/frontend.webp`)
    2. `Backend` (`/images/skills/backend.webp`)
    3. `UI/UX Design` (`/images/skills/uiux.webp`)
    4. `Tools` (`/images/skills/tools.webp`)
    5. `AI-Assisted` (`/images/skills/ai-assisted.webp`)
  - Below the 5 cards: Giant display transition word `PROYEK` (`PROJECTS` in EN) introducing the Projects section immediately below.
- **Motion (GSAP + Framer)**:
  - GSAP ScrollTrigger staggered reveal of the 5 cards + smooth scale/straighten hover interaction (`rotate: 0, y: -8`) via Framer Motion / CSS transform.
- **Responsive**: Desktop 5-column overlap/fan; Tablet 2–3 cols; Mobile horizontal swipe or clean 1-col stack without awkward clipping.

### 1.3 `ProjectsSection` (`#projects`)
- **UI Reference**: `../assets/uiux/landingpage/LP_kasir.png`, `LP_landeuh.png`, `LP_ais.png`, `LP_webgis.png`
- **Visual Anatomy**:
  - 4 stacked full-bleed project showcases (`kasir`, `landeuh`, `ais`, `webgis`).
  - Each item is a dramatic full-width visual banner (`min-h-[70vh]` to `85vh` desktop) with its `_LP.webp` photograph, dark bottom scrim gradient + `radial-black` overlay for crisp white text contrast.
  - Bottom action bar anchored inside each banner:
    - Left: `↙ Kunjungi` (external link to live production or repo from `LINK.txt`, `target="_blank" rel="noopener noreferrer"`).
    - Center: Full project title (`Aplikasi Kasir Offline-First & Web Pemesanan — Toko All Rahman`, etc.).
    - Right: `Pendekatan ↗` (`<Link href="/projects/kasir">`, etc.).
- **Motion (GSAP)**:
  - Smooth subtle image scale/parallax inside `overflow-hidden` wrapper on scroll (`scale: 1.06 -> 1`), lightweight and crisp.

### 1.4 `AchievementsSection` (`#achievements`)
- **UI Reference**: `../assets/uiux/landingpage/achievements.png` & `achievements-scroll.png`
- **Visual Anatomy**:
  - Vibrant `#080B18` + `#1235D8`/`#2855FF` radiant blue backdrop.
  - Centered title: `KOMPETISI & PUBLIKASI` + glassmorphic pill CTA `Jelajahi ↗` (`<Link href="/achievements">`).
  - 4 floating dark-glass achievement cards (`joints_LP.webp`, `ifest_LP.webp`, `jurnal_LP.webp`, `pelita_LP.webp`) each with a `blur-black` bottom caption bar.
- **Motion (GSAP ScrollTrigger)**:
  - On desktop (`min-width: 1024px`): Pinned scroll choreography matching `achievements.png` -> `achievements-scroll.png`! Starts with centered `KOMPETISI & PUBLIKASI`, and as the user scrolls, the 4 cards glide upward/inward across left/right staggered lanes while `Jelajahi ↗` remains centered and clickable.
  - On mobile/tablet: Clean vertical staggered cards with subtle GSAP reveal so pinning never feels cramped on touch screens.

### 1.5 `OrganizationsSection` (`#organizations`)
- **UI Reference**: `../assets/uiux/landingpage/organizations-*.png`
- **Visual Anatomy**:
  - Background gradient transitions smoothly from top dark `#080B18`/`#1235D8` down into `#EAF0FF` (`lightblue`), creating a seamless bridge into `AboutMeSection`.
  - Section title: `ORGANISASI & KEPANITIAAN`.
  - 3-panel horizontal interactive accordion deck (`Pendikar 2025`, `Bendahara — Asrama IPB Sukasari`, `Ketua OSIS — SMA Negeri 1 Talaga`):
    - **Active panel** (~72% width desktop): Full photo, top `blur-black` category badge, title, and bottom white pill `Selengkapnya ↗`.
    - **Inactive panels** (~12% width each): Narrow vertical strips with rotated vertical white titles (`writing-mode: vertical-rl` / `-rotate-90`). Clicking an inactive strip switches it to the active panel!
    - **Detail/Flipped view** (`Selengkapnya ↗` clicked): Active panel photo blurs deeply (`backdrop-blur-xl` + dark scrim), displaying period `(Jan – Jun 2025)` and impact paragraphs cleanly, with a bottom white `↶ Putar` button to flip back.
- **Motion (Framer Motion)**:
  - Smooth spring flex/width transition between panels + crossfade/blur reveal for front vs detail content.
- **Responsive**: On mobile, stacks vertically as 3 interactive cards (tap to expand / flip).

### 1.6 `AboutMeSection` (`#about-me`)
- **UI Reference**: `../assets/uiux/landingpage/aboutme.png`
- **Visual Anatomy**:
  - Sits on `#EAF0FF` (`lightblue`) / `#FFFFFF` bridge canvas, featuring a large rounded hero-style portrait container (`rounded-3xl`, `overflow-hidden`) with ambient blue side vignettes (`#1235D8` left/right glow edges).
  - Center portrait (`/images/aboutme/1.webp` default — optional subtle interactive switcher or auto crossfade across `1.webp`, `2.webp`, `3.webp` if desired, keeping `1.webp` sharp & primary!).
  - Left column: `ARI RAHMAN`, narrative paragraph (with `*branding*` italicized in ID), bottom pill `Semester 5 · IPK 3,66/4,00` (`blur-black`).
  - Right column: `IPB UNIVERSITY`, `D4 Teknologi Rekayasa Perangkat Lunak`, `*(Agu 2024 – Sekarang)*`, narrative paragraph, bottom pill `Siap Magang · Full-Time`.

### 1.7 `PrinciplesSection` (`#principles`)
- **UI Reference**: `../assets/uiux/landingpage/principles.png`
- **Visual Anatomy**:
  - Deep `#080B18` canvas with bottom-right `#1235D8`/`#2855FF` glow seamlessly flowing into `Footer`.
  - Centered heading: `Cara Kerja & Prinsip`.
  - 4 horizontal hairline-divided accordion rows (`( Keunggulan 01 )` through `( Keunggulan 04 )`):
    - Left column: Label `( Keunggulan 01 )` + Bold Title (`Empati UX Berbasis Konteks`).
    - Right column (visible when expanded): Narrative paragraph with italicized English UX/tech terms.
    - Note: Row 01 is open by default; clicking any row toggles it smoothly (`Framer Motion` `AnimatePresence`). Rows 02–04 await user copy confirmation.

---

## 2. Detail Projects (`/projects/[slug]`) — 4 Dedicated Pages

Routes:
- `/projects/kasir` (`src/app/projects/kasir/page.tsx`)
- `/projects/landeuh` (`src/app/projects/landeuh/page.tsx`)
- `/projects/ais` (`src/app/projects/ais/page.tsx`)
- `/projects/webgis` (`src/app/projects/webgis/page.tsx`)

### Shared Case Study Anatomy (`ProjectDetailTemplate.tsx`)
Derived identically from `det-project-kasir.png`, `det-project-landeuh.png`, `det-project-ais.png`, `det-project-webgis.png`:
1. **Top Hero Header**:
   - Full-bleed dark-scrimmed project `_LP.webp` top strip, project title + circular `↓` scroll-to-details anchor button on the right, 1-sentence subtitle.
   - 3-column metadata row separated by thin divider line: `Fokus` | `Tech Stack` | `Periode`.
2. **Mockup Showcase & Floating Sub-Nav**:
   - Centered high-res multi-device mockup (`detail-{slug}/mockup.webp`) over a soft `#1235D8` ambient glow.
   - Blue pill navigation bar (`bg-primary-blue-contrast` / `rounded-xl`) with 5 anchor buttons (`Masalah`, `Kontribusi`, `Proses`, `Keputusan & Trade-off`, `Hasil`) that smoothly scroll to each section on the page.
3. **Masalah & Kontribusi** (`#masalah`, `#kontribusi`):
   - Two-column editorial layout: large left heading (`Masalah`, `Kontribusi`) + multi-paragraph right narrative.
4. **Proses** (`#proses`):
   - Left giant index numbers (`01`, `02`, `03`, `04`, `05` as applicable per project), right bold step title + detailed paragraph (supporting inline external links like `[Link GitHub Projects]` in `landeuh`).
5. **Keputusan & *Trade-off*** (`#keputusan`):
   - Section title with italicized *Trade-off* in ID mode.
   - Stacked items prefixed by `>` chevron, bold decision title, and trade-off explanation.
6. **Hasil** (`#hasil`):
   - Centered heading `Hasil`.
   - Composite showcase card: left-protruding floating phone image (`detail-{slug}/result-object.webp`) overlapping a rounded wide dark banner (`detail-{slug}/result-banner.webp`) containing the outcome summary + pill action links (`Repositori GitHub`, `Kunjungi Website`, `Kunjungi Website Pemesanan`, `Figma` — strictly wired from `LINK.txt`).
7. **Refleksi Teknis**:
   - Two-column footer-like closing block (`Refleksi Teknis` left, 2 bullet/paragraph takeaways right) leading into global `Footer`.

---

## 3. Detail Achievements (`/achievements`) — 1 Consolidated Page

- **Route**: `src/app/achievements/page.tsx`
- **UI Reference**: `../assets/uiux/detail-achievements/det-achievements-1.png`, `comp-achievement-2.png`, `comp-achievement-3.png`, `comp-achievement-4.png`
- **Visual Anatomy**:
  - Top page heading `Kompetisi & Prestasi` on `#080B18` -> `#1235D8` dark-blue header backdrop.
  - 4 stacked light-surface (`#EAF0FF` / `lightblue`, `#000000` black typography) rounded expandable panels numbered `1`, `2`, `3`, `4` (`#1 JOINTS UGM 2026` expanded by default; clicking header `2`, `3`, `4` toggles/switches smoothly!):
    - **Header Banner**: Full-width rounded header visual (`joints_LP.webp`, `ifest_LP.webp`, `jurnal_LP.webp`, `pelita_LP.webp`) fading smoothly into `#EAF0FF` at the bottom where the large index number (`1`–`4`), title, and pill period badge (`(Sep 2026 – Okt 2026)`, etc.) sit.
    - **Zig-Zag Alternating Content Grid**:
      - **#1 JOINTS**: Row 1 (Left: `sertif-joints.webp` + `rank.webp`; Right: Summary copy) -> Row 2 (Left: Role copy + `Kunjungi Website` + `Kunjungi Video`; Right: `mockup.webp`) -> Row 3 (Left: `figma.webp`; Right: UI/UX & video copy + `Kunjungi Figma`).
      - **#2 Ifest**: Row 1 (Left: `sertif-ifest.webp`; Right: Summary copy) -> Row 2 (Left: Role copy + `Kunjungi ExSum` + `Kunjungi PitchDeck`; Right: `exsum.webp`) -> Row 3 (Right-aligned collaboration copy + `Kunjungi Repo`).
      - **#3 Jurnal JTIK**: Two-column split (Left: `loa.webp`; Right: 2 research paragraphs + `Kunjungi Artikel`).
      - **#4 Pelita**: Two-column split (Left: `pelita-mockup.webp`; Right: Product/Figma summary + `Kunjungi Figma`).
