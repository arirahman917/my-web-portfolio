# Bilingual Copywriting & Italicization Spec (`IND` / `ENG`)

> **Source of Truth**: Purely transcribed from `../assets/uiux/` (`../Konten Web Porto Ari.md` is ignored).  
> **Rules**:
> 1. **Indonesian Mode (`id`)**: Keep all English terms present in the UI/UX in English (do NOT translate them into Indonesian) and render them in *italic* (`<em>`). Proper brand names/standalone tech chips (`React`, `Next.js`, `GitHub`, `Figma`, `WhatsApp`, `Google`, `Laravel`, `Vercel`, `Firebase`, `Supabase`) stay upright unless used as italicized English concepts or italicized in the original Figma frame.
> 2. **English Mode (`en`)**: Translate all Indonesian prose into natural, idiomatic, native software-engineering English (concise, natural phrasing, upright normal `Inter`).
> 3. **Notation below**: `*word*` indicates `{ text: "word", italic: true }` in `src/data/*.ts`.

---

## 0. Global Utilities (`Navbar` & `Footer`)

| Key | Indonesian (`id`) | English (`en`) |
| :--- | :--- | :--- |
| `nav.projects` | PROYEK | PROJECTS |
| `nav.achievements` | PERAIHAN | ACHIEVEMENTS |
| `nav.organizations` | ORGANISASI | ORGANIZATIONS |
| `nav.about` | TENTANG | ABOUT |
| `nav.contact` | KONTAK | CONTACT |
| `nav.lang.id` | IND | IND |
| `nav.lang.en` | ENG | ENG |
| `cv.download` | UNDUH CV | DOWNLOAD CV |
| `cv.downloadTitle` | Unduh CV | Download CV |
| `cv.softEng` | CV SOFT. ENG. | CV SOFT. ENG. |
| `cv.frontend` | CV FRONTEND | CV FRONTEND |
| `cv.devops` | CV DEVOPS | CV DEVOPS |
| `footer.headline` | LET'S CONNECT | LET'S CONNECT |
| `footer.email` | arirahman.rise@gmail.com | arirahman.rise@gmail.com |

---

## 1. Landing Page (`/`)

### 1.1 Hero (`hero.png`)
| Slot | Indonesian (`id`) | English (`en`) |
| :--- | :--- | :--- |
| Display BG | SOFTWARE ENGINEER | SOFTWARE ENGINEER |
| Roles Strip | FRONTEND · SOFTWARE · MOBILE · FULLSTACK | FRONTEND · SOFTWARE · MOBILE · FULLSTACK |
| Availability | Terbuka untuk Magang / Feb – Jun 2027 | Open for Internship / Feb – Jun 2027 |
| Bottom Left | BOGOR, INDONESIA / REALISASI SOLUSI | BOGOR, INDONESIA / SOLUTION DELIVERY |
| Bottom Right | PEDULI *UX* / ANTUSIASME *UI* | UX-FOCUSED / UI ENTHUSIAST |

### 1.2 Tech Stack & Kemampuan (`techstack-proyek.png`)
| Slot | Indonesian (`id`) | English (`en`) |
| :--- | :--- | :--- |
| Section Heading | TECH STACK & KEMAMPUAN | TECH STACK & SKILLS |
| Card 1 Title | Frontend & Mobile | Frontend & Mobile |
| Card 1 Body | JavaScript (ES6+), TypeScript, React, Next.Js, HTML, CSS, Tailwind CSS, GSAP, Framer Motion, Leaflet, Flutter (Dart), Responsive Design | JavaScript (ES6+), TypeScript, React, Next.js, HTML, CSS, Tailwind CSS, GSAP, Framer Motion, Leaflet, Flutter (Dart), Responsive Design |
| Card 2 Title | Backend | Backend |
| Card 2 Body | Next.Js Route Handlers, Laravel, PHP, REST API, MySQL, Firebase Firestore, Supabase (PostgreSQL/PostGIS), IsarDB | Next.js Route Handlers, Laravel, PHP, REST API, MySQL, Firebase Firestore, Supabase (PostgreSQL/PostGIS), IsarDB |
| Card 3 Title | UI/UX Design | UI/UX Design |
| Card 3 Body | Figma, Wireframing, High-Fidelity Design, Prototyping, Information Architecture, User Flow, Usability Testing | Figma, Wireframing, High-Fidelity Design, Prototyping, Information Architecture, User Flow, Usability Testing |
| Card 4 Title | Tools | Tools |
| Card 4 Body | Git, GitHub, GitHub Projects, Vite, Vercel, Firebase Hosting, Cloudflare (DNS), Google Search Console | Git, GitHub, GitHub Projects, Vite, Vercel, Firebase Hosting, Cloudflare (DNS), Google Search Console |
| Card 5 Title | AI-Assisted | AI-Assisted |
| Card 5 Body | Antigravity CLI, Cursor CLI (Digunakan untuk mempercepat implementasi dengan tetap merancang arsitektur, meninjau kode, dan *debugging*) | Antigravity CLI, Cursor CLI (Used to speed up implementation while I handle architecture design, code review, and debugging) |
| Transition Word | PROYEK | PROJECTS |

### 1.3 Projects — Landing Cards (`LP_*.png`)
| Slug | Indonesian (`id`) | English (`en`) |
| :--- | :--- | :--- |
| Shared CTAs | `↙ Kunjungi` / `Pendekatan ↗` | `↙ Visit` / `Approach ↗` |
| `kasir` | Aplikasi Kasir *Offline-First* & *Web* Pemesanan — Toko All Rahman | Offline-First POS App & Ordering Website — Toko All Rahman |
| `landeuh` | *Website* Pemesanan Penginapan dan *Dashboard Admin* — Landeuh Village Riverside | Lodging Booking Website & Admin Dashboard — Landeuh Village Riverside |
| `ais` | *Website* Profil & Sistem Pendaftaran — Asrama IPB Sukasari | Profile Website & Registration System — Asrama IPB Sukasari |
| `webgis` | WebGIS Persebaran & Analisis Lokasi UMKM — RINTIK | SME Distribution & Location Analysis WebGIS — RINTIK |

### 1.4 Achievements — Landing (`achievements.png` & `achievements-scroll.png`)
| Slot | Indonesian (`id`) | English (`en`) |
| :--- | :--- | :--- |
| Heading | KOMPETISI & PUBLIKASI | COMPETITIONS & PUBLICATIONS |
| CTA | Jelajahi ↗ | Explore ↗ |
| Card 1 (`joints`) | Peringkat 13 Nasional (dari 150+ Tim) — *Hackathon* JOINTS UGM 2026 | 13th Place Nationwide (out of 150+ Teams) — JOINTS UGM Hackathon 2026 |
| Card 2 (`ifest`) | Finalis 15 Besar — *Hackathon* Ifest Unpad 2026 | Top 15 Finalist — Ifest Unpad Hackathon 2026 |
| Card 3 (`jurnal`) | Penulis Pertama & Penulis Korespondensi — Jurnal JTIK (Terakreditasi SINTA 4) | First & Corresponding Author — JTIK Journal (SINTA 4 Accredited) |
| Card 4 (`pelita`) | *UI/UX Case Study* (Pelita) — Peserta Kompetisi UI/UX Technoday 2025 | UI/UX Case Study (Pelita) — Technoday 2025 UI/UX Competition Participant |

### 1.5 Organizations (`organizations-*.png`)
| Slot | Indonesian (`id`) | English (`en`) |
| :--- | :--- | :--- |
| Heading | ORGANISASI & KEPANITIAAN | ORGANIZATIONS & LEADERSHIP |
| Shared CTAs | `Selengkapnya ↗` / `↶ Putar` | `Read More ↗` / `↶ Flip Back` |
| **Org 1 Badge** | Kompetisi Nasional | National Competition |
| **Org 1 Title** | Kepala Divisi *Sponsorship* — Pendikar 2025 | Head of Sponsorship Division — Pendikar 2025 |
| **Org 1 Period** | *(Jan – Jun 2025)* | (Jan – Jun 2025) |
| **Org 1 Bullets** | 1. Memilih dan memimpin **8 anggota** divisi dalam mengelola tiga jalur pendanaan: *sponsorship* perusahaan, dana usaha (penjualan makanan ringan secara tatap muka dan *pre-order* WhatsApp), serta *paid promote*.<br>2. Membangun sistem *workspace* pelacakan progres di *spreadsheet* dan memimpin rapat evaluasi mingguan setiap hari Minggu.<br>3. Mengelola penawaran *sponsorship* kepada **143 perusahaan** melalui *email* serta mengunjungi **5+ perusahaan** secara langsung untuk presentasi penawaran. | 1. Selected and led an **8-member** team managing three funding streams: corporate sponsorships, fundraising (in-person snack sales and WhatsApp pre-orders), and paid promotions.<br>2. Built a spreadsheet workspace to track progress and led weekly Sunday evaluation meetings.<br>3. Managed sponsorship outreach to **143 companies** by email and pitched **5+ companies** in person. |
| **Org 2 Badge** | Manajemen Keuangan | Financial Management |
| **Org 2 Title** | Bendahara — Asrama IPB Sukasari | Treasurer — Asrama IPB Sukasari |
| **Org 2 Period** | *(Jan – Des 2025)* | (Jan – Dec 2025) |
| **Org 2 Bullets** | 1. Mengelola kas dan anggaran asrama senilai **Rp35+ juta** dengan prinsip akuntabilitas dan rekonsiliasi saldo tanpa selisih (*zero balance discrepancy*).<br>2. Menyusun serta mempresentasikan laporan keuangan secara transparan setiap bulan kepada **30+ penghuni** dan mengoordinasikan penagihan iuran SPP asrama. | 1. Managed **IDR 35M+** in dormitory cash and operating budgets, keeping accountable records and reconciling balances with zero discrepancy.<br>2. Prepared and presented transparent monthly financial reports to **30+ residents** and coordinated dormitory fee collection. |
| **Org 3 Badge** | Kepemimpinan | Leadership |
| **Org 3 Title** | Ketua OSIS — SMA Negeri 1 Talaga | Student Council President (OSIS) — SMA Negeri 1 Talaga |
| **Org 3 Period** | *(Jan – Nov 2022)* | (Jan – Nov 2022) |
| **Org 3 Bullets** | 1. Membawahi **62 anggota** pengurus (BPH dan sembilan seksi bidang), mulai dari memimpin rapat program kerja mingguan, menjembatani perizinan kegiatan dengan pihak sekolah, mengambil keputusan acara, hingga mengevaluasi kinerja anggota. | 1. Directed **62 student council officers** across the executive board and nine divisions—chairing weekly planning meetings, coordinating event permits with school leadership, making event decisions, and evaluating member performance. |

### 1.6 About Me (`aboutme.png`)
| Slot | Indonesian (`id`) | English (`en`) |
| :--- | :--- | :--- |
| Left Title | ARI RAHMAN | ARI RAHMAN |
| Left Bio | Ketertarikan saya pada rekayasa perangkat lunak berawal dari masalah di sekitar: pencatatan manual toko keluarga, *double booking* vila, hingga kurangnya *branding* asrama. Bagi saya, teknologi yang baik harus terasa mudah dipakai oleh orang awam. | My interest in software engineering began with everyday problems around me: manual bookkeeping in my family's shop, double-booked villas, and an unbranded dormitory. To me, good technology should be easy for non-technical people to use. |
| Left Pill | Semester 5 · IPK 3,66/4,00 | Semester 5 · GPA 3.66/4.00 |
| Right Title | IPB UNIVERSITY | IPB UNIVERSITY |
| Right Degree | D4 Teknologi Rekayasa Perangkat Lunak | B.A.Sc. in Software Engineering Technology |
| Right Period | *(Agu 2024 – Sekarang)* | (Aug 2024 – Present) |
| Right Bio | Terbiasa menggali kebutuhan pengguna nyata terlebih dahulu, lalu menerjemahkannya menjadi desain antarmuka dan kode yang teruji langsung. | I uncover real user needs first, then translate them into interface designs and code tested in practice. |
| Right Pill | Siap Magang · *Full-Time* | Available for Internship · Full-Time |

### 1.7 Principles (`principles.png`)
| Slot | Indonesian (`id`) | English (`en`) |
| :--- | :--- | :--- |
| Heading | Cara Kerja & Prinsip | How I Work & Principles |
| `( Keunggulan 01 )` Label | ( Keunggulan 01 ) | ( Strength 01 ) |
| `01` Title | Empati *UX* Berbasis Konteks | Context-Driven UX Empathy |
| `01` Body | Saya tidak menyamaratakan pendekatan desain. Untuk *website* pemesanan (Landeuh), saya memangkas animasi berat dan mengacu pada *muscle memory* pengguna agar transaksi cepat selesai; untuk *website branding* (Asrama), saya merancang animasi GSAP penuh dengan optimasi aset WebP dan video; untuk WebGIS RINTIK, animasi dibatasi hanya pada *landing page* agar halaman peta tetap nyaman digunakan; sementara untuk aplikasi kasir bagi pengguna nonteknis, saya mengadaptasi pola aplikasi harian yang sudah mereka kenal. | I tailor my design approach to each project. For the Landeuh booking site, I cut heavy animations and relied on user muscle memory so guests complete bookings quickly. For the Asrama branding site, I built full GSAP animations with optimized WebP images and video. For RINTIK WebGIS, I kept animations on the landing page only so the map stays comfortable to use. For a POS app serving non-technical users, I adapted patterns from everyday apps they already know. |
| `( Keunggulan 02 )` | `[PENDING_USER_CONTENT]` | `[PENDING_USER_CONTENT]` |
| `( Keunggulan 03 )` | `[PENDING_USER_CONTENT]` | `[PENDING_USER_CONTENT]` |
| `( Keunggulan 04 )` | `[PENDING_USER_CONTENT]` | `[PENDING_USER_CONTENT]` |

---

## 2. Detail Projects (`/projects/[slug]`)

Shared Section Labels (`ProjectSubNav` & Headings):
- `Masalah` -> `Problem`
- `Kontribusi` -> `Contribution`
- `Proses` -> `Process`
- `Keputusan & *Trade-off*` -> `Decisions & Trade-offs`
- `Hasil` -> `Results`
- `Refleksi Teknis` -> `Technical Reflection`
- Meta keys: `Fokus` / `Focus` · `Tech Stack` / `Tech Stack` · `Periode` / `Timeline`

### 2.1 `project-kasir` (`det-project-kasir.png`)
- **Title**: Aplikasi Kasir *Offline-First* & *Web* Pemesanan — Toko All Rahman | **EN**: Offline-First POS App & Ordering Website — Toko All Rahman
- **Subtitle**: Aplikasi kasir Android *offline-first* yang mendukung sinkronisasi multiakun, pencetakan struk termal, dan *web* pemesanan pelanggan, dikembangkan hingga tujuh rilis berdasarkan masukan pengguna langsung. | **EN**: An offline-first Android POS app with multi-account sync, thermal receipt printing, and a customer ordering website, refined across seven releases using direct user feedback.
- **Meta**: Fokus: `Mobile Dev - Manajemen Transaksi` (`Mobile Dev - Transaction Management`) | Tech Stack: `Flutter, Dart, IsarDB, Supabase, React, Vite, Vercel, Figma, Thermal Printer Integration` | Periode: `Jul – Sep 2026`
- **Masalah**:
  - ID: Usaha agen sembako milik keluarga (Toko All Rahman, Majalengka) masih mencatat transaksi, merekap keuangan, dan menulis struk secara manual. Koneksi internet di area toko tidak selalu stabil sehingga aplikasi kasir konvensional yang bergantung penuh pada internet berisiko menghambat transaksi saat toko ramai. / Pengelola terbiasa memakai aplikasi harian seperti WhatsApp dan YouTube, bukan sistem *point of sale* (POS) yang kompleks. Pencatatan juga berjalan melalui tiga akun dan perangkat yang datanya harus tetap selaras.
  - EN: My family's wholesale grocery business (Toko All Rahman, Majalengka) still logged transactions, tallied finances, and wrote receipts by hand. Because internet access at the store was unreliable, standard cloud-dependent POS apps risked slowing checkouts during busy hours. / Store operators were used to everyday apps like WhatsApp and YouTube rather than complex point-of-sale (POS) systems. Recordkeeping also ran across three accounts and devices whose data needed to stay in sync.
- **Kontribusi**:
  - ID: Pengembang *Full-Stack Mobile* dan *Web* serta Perancang *User Interface* dan *User Experience* (UI/UX): menangani riset UX, perancangan logo dan sistem desain di Figma, pembangunan aplikasi *mobile* (Flutter, IsarDB, Supabase) beserta integrasi printer termal, pembuatan *web* pemesanan (React dan Vercel), hingga iterasi rilis bersama mitra.
  - EN: Full-Stack Mobile & Web Developer and UI/UX Designer: handled UX research, designed the logo and Figma design system, built the mobile app (Flutter, IsarDB, Supabase) with thermal printer integration, created the ordering website (React and Vercel), and shipped release iterations with the store partners.
- **Proses (01–05)**:
  - `01` **Riset & Desain UX**: Mempelajari tata letak tombol, ukuran fon, dan alur aplikasi kasir di Google Play selama lima jam, lalu memadukannya dengan navigasi WhatsApp, YouTube, dan GoFood agar sesuai kebiasaan pengguna awam. Menuangkan rancangan ke dalam logo, palet warna, *wireframe*, hingga desain *high-fidelity* di Figma selama dua hari hingga disetujui mitra.
    - *EN*: **UX Research & Design**: Studied button layouts, font sizes, and POS flows across Google Play apps for five hours, then combined them with WhatsApp, YouTube, and GoFood navigation patterns familiar to non-technical users. Turned those insights into a logo, color palette, wireframes, and high-fidelity Figma designs within two days for store-owner approval.
  - `02` **Implementasi *Mobile Offline-First***: Membangun aplikasi Flutter dengan alur pendaftaran dan pemindaian *barcode* barang, keranjang, pembayaran, serta pencetakan struk ke printer termal. Data transaksi disimpan secara lokal di IsarDB agar operasional tetap berjalan tanpa koneksi internet.
    - *EN*: **Offline-First Mobile Implementation**: Built the Flutter app with product registration, barcode scanning, cart and payment flows, and thermal receipt printing. Stored transaction data locally in IsarDB so checkouts ran without an internet connection.
  - `03` **Sinkronisasi Multiakun**: Menghubungkan tiga akun melalui Supabase untuk menyelaraskan riwayat transaksi saat *online* tanpa menimpa *timestamp* asli transaksi yang tercatat secara *offline*.
    - *EN*: **Multi-Account Synchronization**: Connected three accounts via Supabase to sync transaction histories when online without overwriting original offline timestamps.
  - `04` ***Build Web* Pemesanan Pelanggan**: Merancang dan membangun *web* pemesanan *online* menggunakan React (Vite) yang di-*deploy* di Vercel dan terhubung dengan mode *online* aplikasi kasir.
    - *EN*: **Customer Ordering Web App**: Designed and built an online ordering website with React (Vite), deployed it on Vercel, and connected it to the POS app's online mode.
  - `05` **Pengujian dan Iterasi Rilis**: Seluruh fitur diuji bersama mitra sembari mendaftarkan 220 barang lengkap dengan nama, harga, dan *barcode*. Tujuh hingga sepuluh masukan berkala ditindaklanjuti menjadi tujuh pembaruan versi (v1.1–v1.7).
    - *EN*: **Testing & Release Iterations**: Tested every feature with the store owners while registering 220 products with names, prices, and barcodes. Addressed 7–10 ongoing feedback items across seven releases (v1.1–v1.7).
- **Keputusan & *Trade-off***:
  1. **Penyimpanan Lokal (IsarDB) dan *Timestamp* Asli**: Penyimpanan lokal dipilih agar kasir tetap beroperasi saat jaringan terputus. Saat sinkronisasi ke Supabase, sistem mempertahankan waktu transaksi asli alih-alih waktu unggah sehingga rekap dari tiga akun tetap sesuai urutan kejadian. Konsekuensinya, logika penggabungan data lebih kompleks dibandingkan dengan arsitektur *online* penuh. (*EN*: **Local Storage (IsarDB) & Original Timestamps** — Stored transactions locally so checkouts kept working offline. During Supabase sync, keeping original transaction timestamps instead of upload times preserved event order across three accounts, though it required more complex merge logic than an online-only design.)
  2. **Supabase sebagai Layanan *Backend***: Layanan *backend* terkelola digunakan untuk mempercepat pengembangan sinkronisasi multiakun. Waktu pengerjaan dapat dipusatkan pada keandalan alur transaksi dan integrasi perangkat keras (*barcode* serta printer termal). (*EN*: **Managed Supabase Backend** — Used a managed backend to speed up multi-account sync and keep development focused on checkout reliability, barcode scanning, and thermal printing.)
  3. **Antarmuka Familier dibandingkan dengan POS Konvensional**: Pola navigasi WhatsApp dan GoFood dipilih daripada tampilan kasir yang padat tombol demi meringankan kurva belajar pengguna nonteknis. (*EN*: **Familiar UX over Dense POS Layouts** — Adopted WhatsApp and GoFood navigation patterns instead of button-heavy cashier screens to shorten the learning curve for non-technical users.)
- **Hasil**: Aplikasi teruji dengan 220 barang terdaftar jelas dan 7 rilis (v1.1–v1.7) untuk mengelola transaksi, mencetak struk termal tepercaya tanpa tulis manual, serta menampilkan barang dan stok bagi pelanggan. Sistem siap dipakai di toko rumah, tetapi belum rutin saat pengiriman keliling (*door-to-door*). Kunjungi Repositori Github untuk cek rilisan aplikasi, kunjungi *website* untuk laman pemesanan *customer*. (*EN*: Tested with 220 cataloged products across 7 releases (v1.1–v1.7), the app handles transactions, prints reliable thermal receipts without handwriting, and shows live products and stock to customers. It is ready for in-store use, though not yet used routinely for door-to-door deliveries. Visit the GitHub repository to check app releases, or open the website for the customer ordering page.)
- **Refleksi Teknis**:
  - ID: Menambahkan mekanisme pelacakan *error* (*error logging/crash reporting*) otomatis agar kendala pada perangkat kasir terpantau tanpa menunggu laporan manual pengguna. / Menyederhanakan alur transaksi cepat dan pembaruan stok harian agar lebih sesuai dengan pola distribusi keliling.
  - EN: Add automated error logging and crash reporting to detect POS device issues without waiting for manual user reports. / Simplify quick-checkout and daily stock-update flows for mobile door-to-door delivery.

### 2.2 `project-landeuh` (`det-project-landeuh.png`)
- **Title**: *Website* Pemesanan Penginapan dan *Dashboard Admin* — Landeuh Village Riverside | **EN**: Lodging Booking Website & Admin Dashboard — Landeuh Village Riverside
- **Subtitle**: *Website* pemesanan penginapan dengan fitur blok *slot* pencegah *double booking*, integrasi pembayaran Midtrans, dan *dashboard admin* yang berlanjut dari proyek kuliah menjadi kontrak komersial klien. | **EN**: A lodging booking website with slot-locking to prevent double bookings, Midtrans payments, and an admin dashboard—a coursework project that became a commercial client contract.
- **Meta**: Fokus: `Sistem Informasi - Solusi Transaksi` (`Information Systems - Transaction Solution`) | Tech Stack: `React, Vite, Tailwind CSS, Laravel, PHP, MySQL, Figma, GitHub Projects` | Periode: `Feb 2026 – Sekarang` (`Feb 2026 – Present`)
- **Masalah**: Landeuh Village Riverside, usaha penyewaan penginapan (*cabin*, *glamping*, dan rumah industrial) di Bogor, mengelola seluruh reservasi secara manual melalui pesan WhatsApp. / Pencatatan manual dan komunikasi bolak-balik sering memicu *double booking* (satu unit terpesan ganda pada tanggal yang sama). Pengelola kesulitan memantau status pembayaran dan ketersediaan unit, sedangkan calon penyewa belum dapat melihat daftar penginapan beserta ketersediaannya secara langsung.
  - *EN*: Landeuh Village Riverside, a Bogor lodging business offering cabins, glamping tents, and industrial-style houses, managed all reservations manually via WhatsApp. / Manual logs and back-and-forth chats often caused double bookings on the same dates. Managers struggled to track payment status and unit availability, and prospective guests could not browse listings and open dates directly.
- **Kontribusi**: *Project Manager*, *UI/UX Designer*, & *Frontend Developer* dalam tim beranggotakan empat orang (1 PM/UI-UX/FE [Ari], 2 *Backend & Deployment*, 1 FE & *System Analyst*). / Bertanggung jawab atas riset UX, perancangan desain *end-to-end* di Figma, implementasi antarmuka *frontend*, pengelolaan progres tim di GitHub Projects, serta negosiasi penawaran komersial bersama klien.
  - *EN*: Project Manager, UI/UX Designer, and Frontend Developer in a 4-person team (1 PM/UI-UX/FE [Ari], 2 Backend & Deployment, 1 FE & System Analyst). / Handled UX research, end-to-end Figma design, frontend implementation, team task tracking on GitHub Projects, and commercial negotiations with the client.
- **Proses (01–05)**:
  - `01` **Discovery & Wawancara Klien**: Mewawancarai pihak Landeuh untuk memetakan kendala operasional dan menawarkan dua opsi solusi (menu *barcode* kafe atau *website* pemesanan penginapan dengan blok *slot* dan *payment gateway*); klien memilih opsi kedua.
    - *EN*: **Discovery & Client Interviews**: Interviewed the Landeuh owners to map operational issues and proposed two options (a QR café menu or a lodging booking website with slot-locking and a payment gateway); the client chose the second.
  - `02` **Riset UX & Desain Figma**: Mempelajari pola pemesanan di Traveloka, tiket.com, serta situs vila dan penginapan agar alur reservasi mudah diikuti pengguna. Menyusun *wireframe*, gaya warna berbasis logo Landeuh, dan prototipe *high-fidelity* (*landing page*, katalog penginapan, halaman pembayaran, konfirmasi transaksi, dan *dashboard admin*) selama dua minggu hingga disetujui klien melalui Zoom.
    - *EN*: **UX Research & Figma Design**: Studied booking flows on Traveloka, tiket.com, and villa websites to keep the reservation flow easy to follow. Created wireframes, a color palette based on Landeuh's logo, and high-fidelity Figma prototypes (landing page, catalog, checkout, confirmation, and admin dashboard) over two weeks until the client approved them over Zoom.
  - `03` **Implementasi *Frontend* & Koordinasi Tim**: Membangun antarmuka dengan React (Vite) selama sekitar dua minggu yang terhubung ke *backend* Laravel dan basis data MySQL. Berkoordinasi dengan pengembang *backend* dalam integrasi API serta *payment gateway* Midtrans agar status pesanan otomatis menjadi *booked* saat pembayaran berhasil tanpa pesan WhatsApp.
    - *EN*: **Frontend Implementation & Team Coordination**: Built the React (Vite) frontend in about two weeks and connected it to the Laravel backend and MySQL database. Worked with backend developers on API and Midtrans payment integration so successful payments mark units as booked automatically without WhatsApp messages.
  - `04` **Manajemen Proyek di GitHub Projects**: Saya membagi tugas per peran di GitHub Projects pada papan *To Do*, *In Progress*, *Done*, *Review*, dan *Final*, serta meninjau hasil kerja setiap anggota secara berkala [[Link GitHub Projects]].
    - *EN*: **Project Management on GitHub Projects**: Assigned role-based tasks across To Do, In Progress, Done, Review, and Final columns in GitHub Projects and reviewed each teammate's work regularly [[GitHub Projects]].
  - `05` **Komersialisasi Proyek**: Usai presentasi mata kuliah, saya mengajukan penawaran pengembangan lanjutan agar sistem siap produksi dengan menyiapkan empat dokumen resmi (proposal penawaran, daftar kredensial, BAST/perjanjian serah terima, dan *invoice*). Kontrak senilai Rp12,5 juta tersebut disetujui dan dilunasi klien, dan kini proyek memasuki tahap pemolesan (*polish*) akhir, pengujian, serta penyusunan dokumentasi.
    - *EN*: **Project Commercialization**: Pitched continued development after the course presentation to make the system production-ready, backed by four formal documents (proposal, credential list, handover agreement/BAST, and invoice). The client approved and paid the IDR 12.5M contract in full; the project is now in final polish, testing, and documentation.
- **Keputusan & *Trade-off***:
  1. **Kecepatan Alur dibandingkan dengan Animasi Berat**: Animasi berat dihindari agar pola interaksi selaras dengan kebiasaan pengguna Traveloka dan tiket.com. Kejelasan alur pemesanan serta kecepatan muat halaman diprioritaskan di atas efek visual dekoratif.
     - *EN*: **Flow Speed over Heavy Animations** — Skipped heavy decorative animations to keep page loads fast, preserve clear booking steps, and match user habits from Traveloka and tiket.com.
  2. **Sistem Blok *Slot***: Mengunci *slot* tanggal yang sedang diproses agar tidak dapat dipesan ganda selama transaksi berlangsung guna mengatasi masalah *double booking* secara langsung.
     - *EN*: **Date Slot-Locking** — Locked pending checkout dates during active transactions to prevent double bookings directly.
  3. **Tahap Tinjauan di GitHub Projects**: Kolom *Review* ditambahkan sebelum status *Final* untuk memastikan implementasi setiap anggota sesuai dengan desain dan alur bisnis.
     - *EN*: **Review Step on GitHub Projects** — Added a Review column before Final in GitHub Projects to verify every teammate's work against the Figma design and business flow.
- **Hasil**:
  - ID: Proyek ini berlanjut menjadi kontrak berbayar Rp12,5 juta yang telah dilunasi klien dan kini dalam tahap *polish* sebelum dipakai tamu. Sistem blok *slot* dan Midtrans dirancang mencegah *double booking*, otomatis berstatus *booked* saat pembayaran berhasil tanpa pesan WhatsApp, serta menampilkan daftar penginapan dengan jelas.
  - EN: The project grew into a paid IDR 12.5M commercial contract, now in final polish before launch. Built with slot-locking and Midtrans integration, the site prevents double bookings, marks reservations as booked upon payment without WhatsApp chats, and displays available units clearly.
- **Refleksi Teknis**:
  - ID: Mengaudit dan mengoptimalkan performa secara menyeluruh menggunakan Google Lighthouse (LCP, INP, CLS) sebelum peluncuran publik. / Menerapkan TypeScript pada komponen *frontend* dan kontrak API agar integrasi data reservasi serta *slot* tanggal lebih aman dari *bug* tipe data.
  - EN: Audit and optimize performance with Google Lighthouse (LCP, INP, CLS) before public launch. / Add TypeScript to frontend components and API contracts to prevent type bugs in reservation and date-slot data.

### 2.3 `project-ais` (`det-project-ais.png`)
- **Title**: *Website* Profil & Sistem Pendaftaran — Asrama IPB Sukasari | **EN**: Profile Website & Registration System — Asrama IPB Sukasari
- **Subtitle**: *Website* profil beranimasi elegan untuk memperkenalkan Asrama IPB Sukasari kepada mahasiswa IPB University, lengkap dengan sistem pendaftaran dan penilaian wawancara digital. | **EN**: An animated profile site introducing Asrama IPB Sukasari to IPB University students, complete with an online registration and interview-scoring system.
- **Meta**: Fokus: `Landingpage - Company Profile` (`Landing Page - Institutional Profile`) | Tech Stack: `React, Vite, Tailwind CSS, Laravel, PHP, MySQL, Figma, GitHub Projects` *(UI/UX card text; verify Firebase/React Vite parity with owner if desired)* | Periode: `Jan 2026 – Sekarang` (`Jan 2026 – Present`) *(corrected from Figma typo `Semarang`)*
- **Masalah**:
  - ID: Asrama IPB Sukasari belum memiliki *website* resmi sehingga kurang dikenal banyak mahasiswa IPB University dan sulit ditemukan di Google, padahal *branding* visual yang elegan dibutuhkan untuk menarik minat calon penghuni baru. / Proses pendaftaran calon penghuni dan pencatatan penilaian wawancara belum terpusat dalam satu *platform web*.
  - EN: Asrama IPB Sukasari had no official website, making it hard for IPB University students to find on Google and leaving it without strong visual branding to attract new residents. / Applicant registration and interview scoring also lacked a single, central web platform.
- **Kontribusi**:
  - ID: *Frontend Developer* (80% *Frontend*, 20% Firebase): menangani riset visual, *wireframe*, pengembangan antarmuka dan animasi, integrasi basis data pendaftaran, uji kelayakan pengguna, optimasi media, *deployment*, hingga pengaturan domain dan SEO dasar.
  - EN: Frontend Developer (80% Frontend, 20% Firebase): handled visual research, wireframing, UI and animation development, registration database integration, usability testing, media optimization, deployment, DNS setup, and baseline SEO.
- **Proses (01–04)**:
  - `01` **Riset & *Wireframe* (±3 hari riset, 2 minggu *wireframe*)**: Merancang konsep visual modern dan elegan agar asrama tampil kredibel serta menarik bagi mahasiswa baru.
    - *EN*: **Research & Wireframing (~3 days research, 2 weeks wireframing)**: Designed a modern visual concept to make the dormitory look credible and appealing to incoming students.
  - `02` **Pengembangan *Frontend* & Optimasi Media (±1 bulan)**: Membangun *landing page* interaktif menggunakan React, Vite, GSAP, dan Framer Motion, lalu mengonversi gambar ke format WebP dan mengompresi video *loader* agar halaman tetap ringan.
    - *EN*: **Frontend Development & Media Optimization (~1 month)**: Built an interactive landing page with React, Vite, GSAP, and Framer Motion, then converted images to WebP and compressed the loader video to keep the page lightweight.
  - `03` **Sistem Pendaftaran & Penilaian (Firebase Firestore)**: Membuat formulir pendaftaran calon penghuni dan *dashboard admin* untuk memantau pendaftar serta mencatat nilai wawancara, sekaligus menangani perbaikan *bug* selama masa pendaftaran.
    - *EN*: **Registration & Scoring System (Firebase Firestore)**: Built the applicant registration form and admin dashboard to track applicants and record interview scores, and fixed bugs throughout the intake period.
  - `04` **Pengujian Pengguna, *Deployment*, & SEO**: Menguji alur dan kelancaran situs bersama 10+ penghuni asrama, meluncurkannya di Firebase Hosting dengan pengaturan domain melalui Cloudflare DNS, serta mendaftarkannya ke Google Search Console.
    - *EN*: **User Testing, Deployment, & SEO**: Tested site flows with 10+ residents, deployed to Firebase Hosting with Cloudflare DNS, and submitted the site to Google Search Console.
- **Keputusan & *Trade-off***:
  1. **Kaya Animasi vs Halaman Minimalis**: Karena berperan sebagai etalase profil dan *branding* asrama, animasi interaktif sengaja ditonjolkan, sementara ukuran aset dikendalikan melalui format WebP dan kompresi video.
     - *EN*: **Rich Animation vs. Minimal Page** — Prioritized interactive animations because the site serves as the dormitory's branding showcase, and controlled asset sizes through WebP conversion and video compression.
  2. **Cloudflare DNS & Firebase Firestore**: Pengelolaan domain dialihkan ke Cloudflare untuk mengatasi *error* domain kustom di Firebase, sedangkan Firestore dipilih agar sistem pendaftaran cepat siap pakai sebelum penerimaan penghuni dibuka.
     - *EN*: **Cloudflare DNS & Firebase Firestore** — Moved DNS management to Cloudflare to fix Firebase custom-domain errors, and chose Firestore to launch the registration system before admissions opened.
- **Hasil**:
  - ID: *Website* digunakan pada penerimaan 43 pendaftar (meningkat dari sekitar 30 pendaftar sebelumnya), teruji ke 10+ penghuni, dan terindeks Google untuk "asrama ipb sukasari". Detail profil, fasilitas, dan program membantu menarik calon penghuni, sedangkan pengurus praktis menyeleksi serta menilai pendaftar lewat *dashboard admin*.
  - EN: The website supported 43 applicants during admissions (up from ~30 previously), passed testing with 10+ residents, and was indexed on Google for "asrama ipb sukasari." Clear profile, facility, and program pages helped attract prospective residents, and organizers screened and scored applicants directly in the admin dashboard.
- **Refleksi Teknis**:
  - ID: Mengaudit performa dan aksesibilitas melalui Google Lighthouse (termasuk dukungan *prefers-reduced-motion* bagi pengguna yang sensitif terhadap animasi). / Mengoptimalkan ulang kompresi aset gambar dan video agar tetap ringan pada perangkat berspesifikasi rendah.
  - EN: Audit performance and accessibility with Google Lighthouse, adding `prefers-reduced-motion` support for motion-sensitive users. / Re-optimize image and video compression to keep the site smooth on low-spec devices.

### 2.4 `project-webgis` (`det-project-webgis.png`)
- **Title**: WebGIS Persebaran & Analisis Lokasi UMKM — RINTIK | **EN**: SME Distribution & Location Analysis WebGIS — RINTIK
- **Subtitle**: *Website* RINTIK (Ruang Informasi Titik Industri Kreatif) yaitu webgis untuk menjelajahi persebaran 1.225 titik UMKM terverifikasi di Kota Bogor sekaligus menganalisis kesesuaian awal calon lokasi usaha secara spasial. | **EN**: RINTIK (Creative Industry Spatial Hub) is a WebGIS app for exploring 1,225 verified SMEs in Bogor City and evaluating candidate business locations through spatial analysis.
- **Meta**: Fokus: `Informasi Spasial - Solusi Bisnis` (`Spatial Information - Business Solutions`) *(fixed from `Infromasi`)* | Tech Stack: `React, TypeScript, Tailwind CSS (v4), Next.js, GSAP, Framer Motion, react-leaflet, Supabase, Vercel, Figma, Google Flow` | Periode: `Okt 2026 – Sekarang` (`Oct 2026 – Present`)
- **Masalah**:
  - ID: Persebaran UMKM di Kota Bogor sulit dipahami jika hanya disajikan dalam bentuk daftar tanpa konteks lokasi geografis, kategori, dan rute menuju usaha. / Calon pelaku UMKM memerlukan gambaran kondisi spasial di sekitar kandidat lokasi usaha, seperti keberadaan kompetitor sejenis serta kedekatan dengan jalan, permukiman, dan sekolah atau universitas, dalam satu peta interaktif.
  - EN: SME distribution across Bogor City is hard to understand in plain lists without location, category, and route context. / Prospective business owners also need a spatial view around candidate sites—including similar competitors and proximity to roads, housing, and schools or universities—on one interactive map.
- **Kontribusi**:
  - ID: *UI/UX Designer* & *Frontend Developer* dalam tim beranggotakan lima orang (1 *Project Manager*, 1 *UI/UX Designer & Frontend Developer* [Ari], 1 *Backend Developer*, 1 *Data Analyst*, dan 1 *GIS Developer*). / Bertanggung jawab merancang arsitektur UI/UX pada dua fokus utama (*landing page* dan antarmuka peta), menyusun sistem desain di Figma, mengarahkan pemilihan *stack frontend* modern, serta mengimplementasikan antarmuka *web* dan komponen peta interaktif.
  - EN: UI/UX Designer & Frontend Developer in a 5-person team (1 PM, 1 UI/UX & Frontend [Ari], 1 Backend, 1 Data Analyst, 1 GIS Developer). / Designed the UI/UX architecture for both the landing page and map interfaces, built the Figma design system, guided frontend stack selection, and implemented the web UI and interactive map components.
- **Proses (01–03)**:
  - `01` **Riset Referensi & Desain UI/UX (Figma)**: Mengadaptasi inspirasi tata letak dan animasi dari Awwwards dengan metode amati, tiru, modifikasi (ATM) ke dalam desain *high-fidelity* di Figma untuk dua fokus utama: *landing page* dan antarmuka peta (*Map* Pengunjung serta *Map* Calon Usaha).
    - *EN*: **Reference Research & Figma UI/UX**: Adapted layout and animation inspirations from Awwwards into high-fidelity Figma designs for two main areas: the landing page and the map interfaces (Visitor Map and Prospective Business Map).
  - `02` **Implementasi *Frontend* & Animasi Terukur**: Mengimplementasikan *frontend* dengan React, TypeScript, dan Tailwind CSS (v4) di atas Next.js (*App Router*) yang terhubung ke *route handlers* Next.js dan basis data Supabase (PostGIS). Pada *landing page*, koreografi *scroll* dan transisi dibangun memakai GSAP serta Framer Motion, dilengkapi *motion loader* logo berbasis video dari Google Flow sebagai animasi pembuka.
    - *EN*: **Frontend Implementation & Scoped Motion**: Built the frontend with React, TypeScript, and Tailwind CSS v4 on Next.js (App Router), connected to Next.js Route Handlers and Supabase (PostGIS). Added GSAP and Framer Motion scroll transitions plus an opening Google Flow video logo loader on the landing page only.
  - `03` **Integrasi Peta Interaktif & Alur Analisis Spasial**: Menghubungkan komponen Leaflet (`react-leaflet`) secara *client-side* pada Next.js untuk mendukung pencarian, *filter* kategori atau wilayah, rute multimoda, serta alur *wizard* analisis calon lokasi UMKM (*buffer* dan *proximity analysis* terhadap *layer* jalan, permukiman, dan sekolah atau universitas).
    - *EN*: **Interactive Map & Spatial Analysis Wizard**: Integrated client-side `react-leaflet` components in Next.js to support search, category and district filters, multimodal routing, and a site-analysis wizard that runs buffer and proximity checks against road, residential, and school or university layers.
- **Keputusan & *Trade-off***:
  1. **Animasi Terukur dibandingkan dengan Animasi Penuh**: Animasi dibatasi hanya pada *landing page*, berbeda dari proyek Asrama IPB Sukasari yang menonjolkan animasi penuh untuk pengenalan merek. Halaman peta pun dirancang agar pengguna nyaman menelusuri UMKM maupun menganalisis lokasi.
     - *EN*: **Scoped Motion over Full-Site Animation** — Restricted animations to the landing page—unlike the animation-rich Asrama IPB Sukasari site—so users can browse SMEs and analyze locations on the map without distraction.
  2. **React, TypeScript, Tailwind CSS (v4) & Next.js**: Dipilih untuk menjamin keamanan tipe data (*type safety*) pada struktur data spasial dan menyatukan antarmuka *frontend* serta API *route handlers* dalam satu basis kode berstandar industri.
     - *EN*: **React, TypeScript, Tailwind CSS v4 & Next.js** — Selected this stack to enforce type safety on spatial data structures and keep both the frontend UI and API route handlers in one industry-standard codebase.
  3. **Pemisahan Dua Mode Peta Tanpa *Login***: Memisahkan rute eksplorasi publik (`/map/pengunjung`) dan *wizard* analisis tiga langkah (`/map/calon-usaha`) tanpa mewajibkan akun agar pengguna dapat langsung mencoba fitur inti.
     - *EN*: **Two Open Map Modes (No Login Required)** — Separated public browsing (`/map/pengunjung`) and the 3-step analysis wizard (`/map/calon-usaha`) with no account required so users can try core features immediately.
- **Hasil**:
  - ID: Antarmuka WebGIS untuk 1.225 titik UMKM Kota Bogor telah selesai dibangun dan kini dalam penyempurnaan sebelum rilis di Vercel (belum diuji di lapangan). Sistem ini memberi masukan awal lokasi strategis bagi calon pelaku UMKM serta memudahkan pengunjung melihat UMKM sesuai kategori dan radius terdekat.
  - EN: The WebGIS interface for 1,225 Bogor SME points is complete and under final refinement before launching on Vercel (not yet field-tested). It gives prospective business owners early location guidance and helps visitors browse SMEs by category and nearby radius.
- **Refleksi Teknis**:
  - ID: Mengaudit performa pemuatan *layer* GeoJSON dan skor Google Lighthouse pada *landing page* maupun halaman peta sebelum rilis akhir. / Menyempurnakan tampilan responsif panel mengambang dan alur analisis bertahap pada berbagai ukuran layar perangkat seluler.
  - EN: Audit GeoJSON layer loading performance and Google Lighthouse scores on both the landing and map pages before final release. / Refine the responsive layout of floating panels and the stepped analysis flow across mobile screen sizes.

---

## 3. Detail Achievements (`/achievements`)

Page Heading: `Kompetisi & Prestasi` (`Competitions & Achievements`)

1. **`1` — Peringkat 13 Nasional (dari 150+ Tim) — *Hackathon* JOINTS UGM 2026** `(Sep 2026 – Okt 2026)`
   - **EN Title**: 13th Place Nationwide (out of 150+ Teams) — JOINTS UGM Hackathon 2026 `(Sep 2026 – Oct 2026)`
   - P1 (ID): Meraih peringkat ke-13 dari seluruh tim terdaftar se-Indonesia melalui *hackday* daring selama empat hari penuh dengan luaran utuh pada tahap seleksi: proposal, *pitch deck*, video pengenalan karya, repositori GitHub, dan aplikasi *web* ter-*deploy*.
   - P1 (EN): Ranked 13th nationwide out of 150+ registered teams in a 4-day online hackday, submitting a complete entry: proposal, pitch deck, demo video, GitHub repository, and deployed web app.
   - P2 (ID): Bertugas sebagai *UI/UX Designer & Video Creator* dalam tim beranggotakan empat orang untuk mengembangkan *website* rekomendasi jurusan kuliah berbasis minat dan prestasi, yang dilengkapi fitur diskusi AI seputar peluang penerimaan. | CTAs: `Kunjungi Website`, `Kunjungi Video`
   - P2 (EN): Worked as UI/UX Designer & Video Creator on a 4-person team to build a web app that recommends university majors based on interests and achievements, with an AI chat on admission chances. | CTAs: `Visit Website`, `Watch Video`
   - P3 (ID): Merancang antarmuka bergaya *8-bit* yang dipadukan dengan palet warna Google agar terasa akrab, *playful*, dan menarik bagi target pengguna siswa SMA, serta memproduksi video pengenalan karya. | CTA: `Kunjungi Figma`
   - P3 (EN): Designed an 8-bit UI paired with Google's color palette to feel familiar, playful, and engaging for high school students, and produced the demo video. | CTA: `View Figma`

2. **`2` — Finalis 15 Besar — *Hackathon* Ifest Unpad 2026** `(Agu 2026 – Okt 2026)`
   - **EN Title**: Top 15 Finalist — Ifest Unpad Hackathon 2026 `(Aug 2026 – Oct 2026)`
   - P1 (ID): Lolos seleksi *executive summary* dari 85+ tim menuju babak final implementasi aplikasi 24 jam dan sesi *pitching* di Universitas Padjadjaran.
   - P1 (EN): Advanced past executive-summary screening out of 85+ teams to the 24-hour app-building finals and pitch session at Universitas Padjadjaran.
   - P2 (ID): Berperan sebagai Penyusun *Executive Summary* & *Pitch Deck* Tim, meliputi penulisan bagian pendahuluan proposal, 17 lampiran dokumen teknis, serta materi presentasi kompetisi. | CTAs: `Kunjungi ExSum`, `Kunjungi PitchDeck`
   - P2 (EN): Prepared the team's Executive Summary & Pitch Deck, writing the proposal introduction, 17 technical appendix documents, and competition presentation slides. | CTAs: `View ExSum`, `View Pitch Deck`
   - P3 (ID): Berkolaborasi pada babak final 24 jam dan mempresentasikan solusi kepada dewan juri. Aplikasi terlampir di *release* Repositori GitHub *(fixed from Figma `realease`)*. | CTA: `Kunjungi Repo`
   - P3 (EN): Collaborated during the 24-hour finals and presented the solution to the judging panel. The app is available under GitHub Releases in the project repository. | CTA: `View Repo`

3. **`3` — Penulis Pertama & Penulis Korespondensi — Jurnal JTIK (Terakreditasi SINTA 4)** `(Nov 2025 – Des 2025)`
   - **EN Title**: First & Corresponding Author — JTIK Journal (SINTA 4 Accredited) `(Nov 2025 – Dec 2025)`
   - P1 (ID): Memimpin tim beranggotakan tiga orang dalam riset dan penulisan artikel ilmiah dengan judul "Penerapan *Use Case* pada Website Ayam Kabogor" (studi literatur 20+ jurnal, pembagian tugas, penyusunan metodologi, dan integrasi naskah).
   - P1 (EN): Led a 3-person research team to write the paper "Use Case Application for Requirements Analysis and Modeling of the Ayam Kabogor Website," covering a 20+ journal literature review, task delegation, methodology design, and manuscript assembly.
   - P2 (ID): Mengelola proses revisi bersama dosen pembimbing dan menindaklanjuti komunikasi dengan *admin* Jurnal JTIK hingga artikel resmi diterbitkan. DOI: `https://doi.org/10.35870/jtik.v10i3.5949`. | CTA: `Kunjungi Artikel`
   - P2 (EN): Managed revisions with our faculty advisor and followed up with JTIK Journal administrators through final publication. DOI: `https://doi.org/10.35870/jtik.v10i3.5949`. | CTA: `Read Article`

4. **`4` — *UI/UX Case Study* (Pelita) — Peserta Kompetisi UI/UX Technoday 2025** `(Sep 2025 – Okt 2025)`
   - **EN Title**: UI/UX Case Study (Pelita) — Technoday 2025 UI/UX Competition Participant `(Sep 2025 – Oct 2025)`
   - P1 (ID): Merancang konsep produk, *information architecture*, *user flow*, hingga prototipe *high-fidelity* sebanyak 35+ *frame* di Figma untuk aplikasi pelaporan lingkungan dan transparansi anggaran daerah. | CTA: `Kunjungi Figma`
   - P1 (EN): Designed the product concept, information architecture, user flows, and a high-fidelity Figma prototype (35+ frames) for an environmental reporting and regional budget transparency app. | CTA: `View Figma`
