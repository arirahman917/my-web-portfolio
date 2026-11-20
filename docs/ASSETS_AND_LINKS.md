# Asset Migration Guide, Video Storage & External Links Registry

> **Source Assets**: `D:\Work\Portofolio\assets\` & `D:\Work\Portofolio\CV_Ari\`  
> **Target Project Public Directory**: `D:\Work\Portofolio\web-porto-ari\public\`

---

## 1. Where to Put Static Assets in Next.js (`public/`)

In Next.js App Router, **all static assets served directly by URL must live inside `web-porto-ari/public/`**:

| Asset Type | Source Folder (Current) | Target Folder in Project | URL Referenced in Code |
| :--- | :--- | :--- | :--- |
| **Images (`.webp`, `.png`, `.svg`)** | `../assets/img/...` | `web-porto-ari/public/images/...` | `/images/...` |
| **Videos (`.mp4`, `.webm`)** | `../assets/video/` *(currently empty)* | `web-porto-ari/public/videos/...` | `/videos/...` |
| **Downloadable CVs (`.pdf`)** | `../CV_Ari/...` | `web-porto-ari/public/cv/...` | `/cv/...` |
| **Favicon & OG Image** | Generated / custom brand assets | `web-porto-ari/public/` (`src/app/icon.*` or `public/`) | `/favicon.ico`, `/og-image.png` |

> **Important Note on Naming Hygiene**:
> - Avoid spaces in web asset filenames (e.g., rename `Group 60.webp` -> `pelita-mockup.webp`, and normalize `WhatsApp Image 2026-11-15 at 17.48.36.webp` -> `joints-poster-bg.webp` when copying to `public/images/`).
> - Never reference files outside `web-porto-ari/` (`../assets/...`) from React components — Next.js only bundles/serves files inside `web-porto-ari/public/` or imported inside `src/`.

---

## 2. Exact Image Migration Map (`assets/img/` -> `public/images/`)

### 2.1 Hero & Shared Visuals
| Source (`D:\Work\Portofolio\assets\img\...`) | Target (`web-porto-ari\public\images\...`) | Used In |
| :--- | :--- | :--- |
| `hero.webp` | `public/images/hero.webp` | Landing Hero portrait |
| `WhatsApp Image 2026-11-15 at 17.48.36.webp` | `public/images/achievements/detail-joints/joints-poster-bg.webp` | JOINTS poster background (optional / detail-joints header) |

### 2.2 About Me (`aboutme/`)
| Source | Target | Used In |
| :--- | :--- | :--- |
| `aboutme/1.webp` | `public/images/aboutme/1.webp` | About Me portrait 1 (primary / interactive gallery) |
| `aboutme/2.webp` | `public/images/aboutme/2.webp` | About Me portrait 2 |
| `aboutme/3.webp` | `public/images/aboutme/3.webp` | About Me portrait 3 |

### 2.3 Tech Stack & Kemampuan (`skills/`)
| Source | Target | Used In |
| :--- | :--- | :--- |
| `skills/frontend.webp` | `public/images/skills/frontend.webp` | Card 1: Frontend & Mobile |
| `skills/backend.webp` | `public/images/skills/backend.webp` | Card 2: Backend |
| `skills/uiux.webp` | `public/images/skills/uiux.webp` | Card 3: UI/UX Design |
| `skills/tools.webp` | `public/images/skills/tools.webp` | Card 4: Tools |
| `skills/ai-assited.webp` | `public/images/skills/ai-assisted.webp` | Card 5: AI-Assisted *(clean spelling)* |

### 2.4 Organizations (`organizations/`)
| Source | Target | Used In |
| :--- | :--- | :--- |
| `organizations/pendikar.webp` | `public/images/organizations/pendikar.webp` | Organization 1: Kepala Divisi Sponsorship — Pendikar 2025 |
| `organizations/bendahara-ais.webp` | `public/images/organizations/bendahara-ais.webp` | Organization 2: Bendahara — Asrama IPB Sukasari |
| `organizations/ketos-sma.webp` | `public/images/organizations/ketos-sma.webp` | Organization 3: Ketua OSIS — SMA Negeri 1 Talaga |

### 2.5 Projects — Landing & Detail Pages (`projects/`)
| Source | Target | Used In |
| :--- | :--- | :--- |
| `projects/allrahman-app_LP.webp` | `public/images/projects/allrahman-app_LP.webp` | Landing Project 1 & `/projects/kasir` hero banner |
| `projects/detail-kasir/mockup.webp` | `public/images/projects/detail-kasir/mockup.webp` | `/projects/kasir` device showcase |
| `projects/detail-kasir/result-banner.webp` | `public/images/projects/detail-kasir/result-banner.webp` | `/projects/kasir` Hasil banner background |
| `projects/detail-kasir/result-object.webp` | `public/images/projects/detail-kasir/result-object.webp` | `/projects/kasir` Hasil phone foreground |
| `projects/landeuh_LP.webp` | `public/images/projects/landeuh_LP.webp` | Landing Project 2 & `/projects/landeuh` hero banner |
| `projects/detail-landeuh/mockup.webp` | `public/images/projects/detail-landeuh/mockup.webp` | `/projects/landeuh` device showcase |
| `projects/detail-landeuh/result-banner.webp` | `public/images/projects/detail-landeuh/result-banner.webp` | `/projects/landeuh` Hasil banner background |
| `projects/detail-landeuh/result-object.webp` | `public/images/projects/detail-landeuh/result-object.webp` | `/projects/landeuh` Hasil phone foreground |
| `projects/ais_LP.webp` | `public/images/projects/ais_LP.webp` | Landing Project 3 & `/projects/ais` hero banner |
| `projects/detail-ais/mockup.webp` | `public/images/projects/detail-ais/mockup.webp` | `/projects/ais` device showcase |
| `projects/detail-ais/result-banner.webp` | `public/images/projects/detail-ais/result-banner.webp` | `/projects/ais` Hasil banner background |
| `projects/detail-ais/result-object.webp` | `public/images/projects/detail-ais/result-object.webp` | `/projects/ais` Hasil phone foreground |
| `projects/webgis_LP.webp` | `public/images/projects/webgis_LP.webp` | Landing Project 4 & `/projects/webgis` hero banner |
| `projects/detail-webgis/mockup.webp` | `public/images/projects/detail-webgis/mockup.webp` | `/projects/webgis` device showcase |
| `projects/detail-webgis/result-banner.webp` | `public/images/projects/detail-webgis/result-banner.webp` | `/projects/webgis` Hasil banner background |
| `projects/detail-webgis/result-object.webp` | `public/images/projects/detail-webgis/result-object.webp` | `/projects/webgis` Hasil phone foreground |

### 2.6 Achievements — Landing & Detail Page (`achievements/`)
| Source | Target | Used In |
| :--- | :--- | :--- |
| `achievements/joints_LP.webp` | `public/images/achievements/joints_LP.webp` | Landing Achievement 1 & `/achievements` banner 1 |
| `achievements/ifest_LP.webp` | `public/images/achievements/ifest_LP.webp` | Landing Achievement 2 & `/achievements` banner 2 |
| `achievements/jurnal_LP.webp` | `public/images/achievements/jurnal_LP.webp` | Landing Achievement 3 & `/achievements` banner 3 |
| `achievements/pelita_LP.webp` | `public/images/achievements/pelita_LP.webp` | Landing Achievement 4 & `/achievements` banner 4 |
| `achievements/detail-joints/sertif-joints.webp` | `public/images/achievements/detail-joints/sertif-joints.webp` | `/achievements` #1 Certificate |
| `achievements/detail-joints/rank.webp` | `public/images/achievements/detail-joints/rank.webp` | `/achievements` #1 Score & Rank table |
| `achievements/detail-joints/mockup.webp` | `public/images/achievements/detail-joints/mockup.webp` | `/achievements` #1 Mobile mockup |
| `achievements/detail-joints/figma.webp` | `public/images/achievements/detail-joints/figma.webp` | `/achievements` #1 Figma workspace |
| `achievements/detail-ifest/sertif-ifest.webp` | `public/images/achievements/detail-ifest/sertif-ifest.webp` | `/achievements` #2 Certificate |
| `achievements/detail-ifest/exsum.webp` | `public/images/achievements/detail-ifest/exsum.webp` | `/achievements` #2 ExSum & PitchDeck spread |
| `achievements/detail-jurnal/loa.webp` | `public/images/achievements/detail-jurnal/loa.webp` | `/achievements` #3 Letter of Acceptance |
| `achievements/detail-pelita/Group 60.webp` | `public/images/achievements/detail-pelita/pelita-mockup.webp` | `/achievements` #4 Pelita multi-screen spread *(renamed without spaces)* |

---

## 3. Video Storage & Optimization Guide (`public/videos/`)

1. **Directory**: Put any local `.mp4` / `.webm` videos inside **`web-porto-ari/public/videos/`** (for example: `public/videos/hero-ambient.webm`, `public/videos/loader.mp4`, or project walkthrough demos like `public/videos/kasir-demo.mp4`).
2. **Next.js Serving**: Files placed in `public/videos/name.mp4` are served directly at `/videos/name.mp4`.
3. **Production Rules for Lightweight Performance**:
   - Prefer **WebM (VP9/AV1)** primary source + **MP4 (H.264)** fallback (`<video>` with two `<source>` tags).
   - Keep ambient loop clips **<= 3–5 MB**, muted, `playsInline`, `preload="metadata"` (or `preload="none"` below the fold with a `.webp` `poster`).
   - Pause/disable autoplay when `prefers-reduced-motion: reduce` is active.
   - Note: External large videos (such as JOINTS demo video) remain hosted externally via the Google Drive link in `LINK.txt` (`Kunjungi Video` button) rather than bloating the web bundle.

---

## 4. Downloadable CV Mapping (`public/cv/`)

Navbar (`UNDUH CV`) and Footer (`Unduh CV`) expose three role-tailored CV downloads:

| UI Label | Target File Path | Public Download URL | Current Status |
| :--- | :--- | :--- | :--- |
| `CV SOFT. ENG.` | `public/cv/cv-software-engineer.pdf` | `/cv/cv-software-engineer.pdf` | Source available in `../CV_Ari/ARI RAHMAN.pdf` (copy/verify) |
| `CV FRONTEND` | `public/cv/cv-frontend.pdf` | `/cv/cv-frontend.pdf` | Pending user placement (fallback or distinct PDF) |
| `CV DEVOPS` | `public/cv/cv-devops.pdf` | `/cv/cv-devops.pdf` | Pending user placement (fallback or distinct PDF) |

---

## 5. External Links Registry (Normalized from `../assets/LINK.txt`)

> **Important**: `../assets/LINK.txt` contained a stray zero-width space before `arirahman.rise@gmail.com` and omitted `https://` prefixes on several domains. The table below is the clean, verified target for `src/data/links.ts`.

### 5.1 Contact & Social Links (Navbar, Footer, Hero)
| Key | Normalized URL / URI | Notes |
| :--- | :--- | :--- |
| `linkedin` | `https://www.linkedin.com/in/ari-rahman-216593378` | Opens in new tab |
| `whatsapp` | `https://wa.me/6285795016378` | Converted from `085795016378` |
| `instagram` | `https://www.instagram.com/arirahmanrise?fqnt=MTd4eGQ4eTZncjNlMQ==` | Exact tracking query preserved |
| `github` | `https://github.com/arirahman917` | Main profile |
| `email` | `mailto:arirahman.rise@gmail.com` | Display text: `arirahman.rise@gmail.com` |

### 5.2 Landing Projects (`↙ Kunjungi` button per project)
| Project Slug | `↙ Kunjungi` Target URL | Source in `LINK.txt` |
| :--- | :--- | :--- |
| `kasir` | `https://github.com/arirahman917/toko-allrahman-app` | `kunjungi-proyek -> kasir` |
| `landeuh` | `https://landeuhvillage.com` | `kunjungi-proyek -> landeuh` |
| `ais` | `https://asramaipbsukasari.com` | `kunjungi-proyek -> ais` |
| `webgis` | `https://webgis-rintik-kel8.vercel.app` | `kunjungi-proyek -> webgis` |

### 5.3 Detail Projects (`Hasil` Action Buttons)
| Project | Action Label (`id` / `en`) | Target URL |
| :--- | :--- | :--- |
| `kasir` | Repositori GitHub / GitHub Repository | `https://github.com/arirahman917/toko-allrahman-app` |
| `kasir` | Kunjungi Website Pemesanan / Visit Ordering Website | `https://toko-allrahman.vercel.app` |
| `kasir` | Figma | `https://www.figma.com/design/UD1mzcU4TOFQMzJeVYDipb/Aplikasi-Kasir-Al-Rohman?t=4yKjJZaLuj7ZYuWl-1` |
| `landeuh` | Kunjungi Website / Visit Website | `https://landeuhvillage.com` |
| `landeuh` | Repositori GitHub / GitHub Repository | `https://github.com/arirahman917/Project-Landeuh---Sisfor` |
| `landeuh` | GitHub Projects *(inline link in Proses 04)* | `https://github.com/users/arirahman917/projects/3/views/2` |
| `landeuh` | Figma | `https://www.figma.com/design/8a0XeFLcU2a9r1fzh7e8Y0/Landeuh?node-id=0-1&t=fAakpxbsHmtpZUCN-1` |
| `ais` | Kunjungi Website / Visit Website | `https://asramaipbsukasari.com` |
| `ais` | Repositori GitHub / GitHub Repository | `https://github.com/arirahman917/web_asrama-ipb-sukasari_with-react-vite` |
| `ais` | Figma | `https://www.figma.com/design/GQEvGid4hmOxViUjItaO7z/Web-AIS?node-id=0-1&t=BqG9kbzEjqY9eggT-1` |
| `webgis` | Kunjungi Website / Visit Website | `https://webgis-rintik-kel8.vercel.app` |
| `webgis` | Repositori GitHub / GitHub Repository | `https://github.com/daffaerdyn/webgis-rintik` |
| `webgis` | Figma | `https://www.figma.com/design/H40Rae1Mqk7QQSUzvAXwDc/RINTIK?node-id=0-1&t=8ecemnDEAUw5LRyU-1` |

### 5.4 Detail Achievements (`Kompetisi & Prestasi` Buttons)
| Achievement | Action Label (`id` / `en`) | Target URL |
| :--- | :--- | :--- |
| `#1 JOINTS` | Kunjungi Website / Visit Website | `https://cocokin-joints.vercel.app/` |
| `#1 JOINTS` | Kunjungi Video / Watch Demo Video | `https://drive.google.com/file/d/1syZqVgFra3Y9HMICchz30dckLL_WHoGM/view?usp=sharing` |
| `#1 JOINTS` | Kunjungi Figma / View Figma | `https://www.figma.com/design/7cjqnxwFVnIH22ba3Kof7Z/FIGMA-JOINTS?node-id=18-885&t=K86xn5ZqzloCqCOm-1` |
| `#1 JOINTS` | Repo | *(Blank in `LINK.txt` — render conditionally when populated)* |
| `#2 Ifest` | Kunjungi ExSum / View Executive Summary | `https://drive.google.com/file/d/1MH1HPoyJCabBF5uCT-_wbun4fg-NYFie/view?usp=sharing` |
| `#2 Ifest` | Kunjungi PitchDeck / View Pitch Deck | `https://drive.google.com/file/d/1jwyJNMBM6znof-NKRdeZa-tO6MHKHIE1/view?usp=sharing` |
| `#2 Ifest` | Kunjungi Repo / View Repository | `https://github.com/farrelzaki/SUDEPI` |
| `#3 Jurnal JTIK` | Kunjungi Artikel / Read Published Article | `https://journal.lembagakita.com/jtik/article/view/5949` |
| `#4 Pelita` | Kunjungi Figma / View Figma Prototype | `https://www.figma.com/design/KUmMTGtHvbLsSeFWhH65fW/PELITA?node-id=0-1&t=esYIzgAeGuIs8wbt-1` |
