import { PROJECT_LINKS } from "./links";
import type {
  BilingualRichText,
  BilingualText,
  ProjectData,
  ProjectSlug,
} from "./types";

export const PROJECT_SHARED_COPY: {
  landingIntroTitle: BilingualText;
  landingVisitCta: BilingualText;
  landingApproachCta: BilingualText;
  metaLabels: {
    focus: BilingualText;
    techStack: BilingualText;
    period: BilingualText;
  };
  sectionNav: Array<{ id: string; label: BilingualRichText }>;
  reflectionHeading: BilingualText;
} = {
  landingIntroTitle: {
    id: "PROYEK",
    en: "PROJECTS",
  },
  landingVisitCta: {
    id: "↙ Kunjungi",
    en: "↙ Visit",
  },
  landingApproachCta: {
    id: "Pendekatan ↗",
    en: "Approach ↗",
  },
  metaLabels: {
    focus: { id: "Fokus", en: "Focus" },
    techStack: { id: "Tech Stack", en: "Tech Stack" },
    period: { id: "Periode", en: "Timeline" },
  },
  sectionNav: [
    { id: "masalah", label: { id: ["Masalah"], en: ["Problem"] } },
    {
      id: "kontribusi",
      label: { id: ["Kontribusi"], en: ["Contribution"] },
    },
    {
      id: "proses",
      label: { id: ["Proses"], en: ["Process"] },
    },
    {
      id: "keputusan",
      label: {
        id: ["Keputusan & ", { text: "Trade-off", italic: true }],
        en: ["Decisions & Trade-offs"],
      },
    },
    { id: "hasil", label: { id: ["Hasil"], en: ["Results"] } },
  ],
  reflectionHeading: {
    id: "Refleksi Teknis",
    en: "Technical Reflection",
  },
};

export const PROJECTS: ProjectData[] = [
  {
    slug: "kasir",
    route: "/projects/kasir",
    landingImage: "/images/projects/allrahman-app_LP.webp",
    landingAlt: {
      id: "Pratinjau proyek Aplikasi Kasir Offline-First Toko All Rahman",
      en: "Toko All Rahman Offline-First POS App project preview",
    },
    visitUrl: PROJECT_LINKS.kasir.visit,
    title: {
      id: [
        "Aplikasi Kasir ",
        { text: "Offline-First", italic: true },
        " & ",
        { text: "Web", italic: true },
        " Pemesanan — Toko All Rahman",
      ],
      en: ["Offline-First POS App & Ordering Website — Toko All Rahman"],
    },
    subtitle: {
      id: [
        "Aplikasi kasir Android ",
        { text: "offline-first", italic: true },
        " yang mendukung sinkronisasi multiakun, pencetakan struk termal, dan ",
        { text: "web", italic: true },
        " pemesanan pelanggan, dikembangkan hingga tujuh rilis berdasarkan masukan pengguna langsung.",
      ],
      en: [
        "An offline-first Android POS app with multi-account sync, thermal receipt printing, and a customer ordering website, refined across seven releases using direct user feedback.",
      ],
    },
    focus: {
      id: "Mobile Dev - Manajemen Transaksi",
      en: "Mobile Dev - Transaction Management",
    },
    techStack:
      "Flutter, Dart, IsarDB, Supabase, React, Vite, Vercel, Figma, Thermal Printer Integration",
    period: {
      id: "Jul – Sep 2026",
      en: "Jul – Sep 2026",
    },
    mockupImage: "/images/projects/detail-kasir/mockup.webp",
    resultBannerImage: "/images/projects/detail-kasir/result-banner.webp",
    resultObjectImage: "/images/projects/detail-kasir/result-object.webp",
    problem: [
      {
        id: [
          "Usaha agen sembako milik keluarga (Toko All Rahman, Majalengka) masih mencatat transaksi, merekap keuangan, dan menulis struk secara manual. Koneksi internet di area toko tidak selalu stabil sehingga aplikasi kasir konvensional yang bergantung penuh pada internet berisiko menghambat transaksi saat toko ramai.",
        ],
        en: [
          "My family's wholesale grocery business (Toko All Rahman, Majalengka) still logged transactions, tallied finances, and wrote receipts by hand. Because internet access at the store was unreliable, standard cloud-dependent POS apps risked slowing checkouts during busy hours.",
        ],
      },
      {
        id: [
          "Pengelola terbiasa memakai aplikasi harian seperti WhatsApp dan YouTube, bukan sistem ",
          { text: "point of sale", italic: true },
          " (POS) yang kompleks. Pencatatan juga berjalan melalui tiga akun dan perangkat yang datanya harus tetap selaras.",
        ],
        en: [
          "Store operators were used to everyday apps like WhatsApp and YouTube rather than complex point-of-sale (POS) systems. Recordkeeping also ran across three accounts and devices whose data needed to stay in sync.",
        ],
      },
    ],
    contribution: [
      {
        id: [
          "Pengembang ",
          { text: "Full-Stack Mobile", italic: true },
          " dan ",
          { text: "Web", italic: true },
          " serta Perancang ",
          { text: "User Interface", italic: true },
          " dan ",
          { text: "User Experience", italic: true },
          " (UI/UX): menangani riset UX, perancangan logo dan sistem desain di Figma, pembangunan aplikasi ",
          { text: "mobile", italic: true },
          " (Flutter, IsarDB, Supabase) beserta integrasi printer termal, pembuatan ",
          { text: "web", italic: true },
          " pemesanan (React dan Vercel), hingga iterasi rilis bersama mitra.",
        ],
        en: [
          "Full-Stack Mobile & Web Developer and UI/UX Designer: handled UX research, designed the logo and Figma design system, built the mobile app (Flutter, IsarDB, Supabase) with thermal printer integration, created the ordering website (React and Vercel), and shipped release iterations with the store partners.",
        ],
      },
    ],
    processSteps: [
      {
        stepNumber: "01",
        title: {
          id: ["Riset & Desain UX"],
          en: ["UX Research & Design"],
        },
        description: {
          id: [
            "Mempelajari tata letak tombol, ukuran fon, dan alur aplikasi kasir di Google Play selama lima jam, lalu memadukannya dengan navigasi WhatsApp, YouTube, dan GoFood agar sesuai kebiasaan pengguna awam. Menuangkan rancangan ke dalam logo, palet warna, ",
            { text: "wireframe", italic: true },
            ", hingga desain ",
            { text: "high-fidelity", italic: true },
            " di Figma selama dua hari hingga disetujui mitra.",
          ],
          en: [
            "Studied button layouts, font sizes, and POS flows across Google Play apps for five hours, then combined them with WhatsApp, YouTube, and GoFood navigation patterns familiar to non-technical users. Turned those insights into a logo, color palette, wireframes, and high-fidelity Figma designs within two days for store-owner approval.",
          ],
        },
      },
      {
        stepNumber: "02",
        title: {
          id: ["Implementasi ", { text: "Mobile Offline-First", italic: true }],
          en: ["Offline-First Mobile Implementation"],
        },
        description: {
          id: [
            "Membangun aplikasi Flutter dengan alur pendaftaran dan pemindaian ",
            { text: "barcode", italic: true },
            " barang, keranjang, pembayaran, serta pencetakan struk ke printer termal. Data transaksi disimpan secara lokal di IsarDB agar operasional tetap berjalan tanpa koneksi internet.",
          ],
          en: [
            "Built the Flutter app with product registration, barcode scanning, cart and payment flows, and thermal receipt printing. Stored transaction data locally in IsarDB so checkouts ran without an internet connection.",
          ],
        },
      },
      {
        stepNumber: "03",
        title: {
          id: ["Sinkronisasi Multiakun"],
          en: ["Multi-Account Synchronization"],
        },
        description: {
          id: [
            "Menghubungkan tiga akun melalui Supabase untuk menyelaraskan riwayat transaksi saat ",
            { text: "online", italic: true },
            " tanpa menimpa ",
            { text: "timestamp", italic: true },
            " asli transaksi yang tercatat secara ",
            { text: "offline", italic: true },
            ".",
          ],
          en: [
            "Connected three accounts via Supabase to sync transaction histories when online without overwriting original offline timestamps.",
          ],
        },
      },
      {
        stepNumber: "04",
        title: {
          id: [{ text: "Build Web", italic: true }, " Pemesanan Pelanggan"],
          en: ["Customer Ordering Web App"],
        },
        description: {
          id: [
            "Merancang dan membangun ",
            { text: "web", italic: true },
            " pemesanan ",
            { text: "online", italic: true },
            " menggunakan React (Vite) yang di-",
            { text: "deploy", italic: true },
            " di Vercel dan terhubung dengan mode ",
            { text: "online", italic: true },
            " aplikasi kasir.",
          ],
          en: [
            "Designed and built an online ordering website with React (Vite), deployed it on Vercel, and connected it to the POS app's online mode.",
          ],
        },
      },
      {
        stepNumber: "05",
        title: {
          id: ["Pengujian dan Iterasi Rilis"],
          en: ["Testing & Release Iterations"],
        },
        description: {
          id: [
            "Seluruh fitur diuji bersama mitra sembari mendaftarkan 220 barang lengkap dengan nama, harga, dan ",
            { text: "barcode", italic: true },
            ". Tujuh hingga sepuluh masukan berkala ditindaklanjuti menjadi tujuh pembaruan versi (v1.1–v1.7).",
          ],
          en: [
            "Tested every feature with the store owners while registering 220 products with names, prices, and barcodes. Addressed 7–10 ongoing feedback items across seven releases (v1.1–v1.7).",
          ],
        },
      },
    ],
    decisions: [
      {
        title: {
          id: [
            "Penyimpanan Lokal (IsarDB) dan ",
            { text: "Timestamp", italic: true },
            " Asli",
          ],
          en: ["Local Storage (IsarDB) & Original Timestamps"],
        },
        description: {
          id: [
            "Penyimpanan lokal dipilih agar kasir tetap beroperasi saat jaringan terputus. Saat sinkronisasi ke Supabase, sistem mempertahankan waktu transaksi asli alih-alih waktu unggah sehingga rekap dari tiga akun tetap sesuai urutan kejadian. Konsekuensinya, logika penggabungan data lebih kompleks dibandingkan dengan arsitektur ",
            { text: "online", italic: true },
            " penuh.",
          ],
          en: [
            "Stored transactions locally so checkouts kept working offline. During Supabase sync, keeping original transaction timestamps instead of upload times preserved event order across three accounts, though it required more complex merge logic than an online-only design.",
          ],
        },
      },
      {
        title: {
          id: ["Supabase sebagai Layanan ", { text: "Backend", italic: true }],
          en: ["Managed Supabase Backend"],
        },
        description: {
          id: [
            "Layanan ",
            { text: "backend", italic: true },
            " terkelola digunakan untuk mempercepat pengembangan sinkronisasi multiakun. Waktu pengerjaan dapat dipusatkan pada keandalan alur transaksi dan integrasi perangkat keras (",
            { text: "barcode", italic: true },
            " serta printer termal).",
          ],
          en: [
            "Used a managed backend to speed up multi-account sync and keep development focused on checkout reliability, barcode scanning, and thermal printing.",
          ],
        },
      },
      {
        title: {
          id: ["Antarmuka Familier dibandingkan dengan POS Konvensional"],
          en: ["Familiar UX over Dense POS Layouts"],
        },
        description: {
          id: [
            "Pola navigasi WhatsApp dan GoFood dipilih daripada tampilan kasir yang padat tombol demi meringankan kurva belajar pengguna nonteknis.",
          ],
          en: [
            "Adopted WhatsApp and GoFood navigation patterns instead of button-heavy cashier screens to shorten the learning curve for non-technical users.",
          ],
        },
      },
    ],
    resultSummary: {
      id: [
        "Aplikasi teruji dengan 220 barang terdaftar jelas dan 7 rilis (v1.1–v1.7) untuk mengelola transaksi, mencetak struk termal tepercaya tanpa tulis manual, serta menampilkan barang dan stok bagi pelanggan. Sistem siap dipakai di toko rumah, tetapi belum rutin saat pengiriman keliling (",
        { text: "door-to-door", italic: true },
        "). Kunjungi Repositori Github untuk cek rilisan aplikasi, kunjungi ",
        { text: "website", italic: true },
        " untuk laman pemesanan ",
        { text: "customer", italic: true },
        ".",
      ],
      en: [
        "Tested with 220 cataloged products across 7 releases (v1.1–v1.7), the app handles transactions, prints reliable thermal receipts without handwriting, and shows live products and stock to customers. It is ready for in-store use, though not yet used routinely for door-to-door deliveries. Visit the GitHub repository to check app releases, or open the website for the customer ordering page.",
      ],
    },
    resultActions: [
      {
        label: { id: "Repositori GitHub", en: "GitHub Repository" },
        href: PROJECT_LINKS.kasir.repo,
      },
      {
        label: {
          id: "Kunjungi Website Pemesanan",
          en: "Visit Ordering Website",
        },
        href: PROJECT_LINKS.kasir.orderingWeb,
      },
      {
        label: { id: "Figma", en: "Figma" },
        href: PROJECT_LINKS.kasir.figma,
      },
    ],
    reflections: [
      {
        id: [
          "Menambahkan mekanisme pelacakan ",
          { text: "error", italic: true },
          " (",
          { text: "error logging/crash reporting", italic: true },
          ") otomatis agar kendala pada perangkat kasir terpantau tanpa menunggu laporan manual pengguna.",
        ],
        en: [
          "Add automated error logging and crash reporting to detect POS device issues without waiting for manual user reports.",
        ],
      },
      {
        id: [
          "Menyederhanakan alur transaksi cepat dan pembaruan stok harian agar lebih sesuai dengan pola distribusi keliling.",
        ],
        en: [
          "Simplify quick-checkout and daily stock-update flows for mobile door-to-door delivery.",
        ],
      },
    ],
  },
  {
    slug: "landeuh",
    route: "/projects/landeuh",
    landingImage: "/images/projects/landeuh_LP.webp",
    landingAlt: {
      id: "Pratinjau proyek Website Pemesanan Penginapan Landeuh Village Riverside",
      en: "Landeuh Village Riverside Lodging Booking Website preview",
    },
    visitUrl: PROJECT_LINKS.landeuh.visit,
    title: {
      id: [
        { text: "Website", italic: true },
        " Pemesanan Penginapan dan ",
        { text: "Dashboard Admin", italic: true },
        " — Landeuh Village Riverside",
      ],
      en: ["Lodging Booking Website & Admin Dashboard — Landeuh Village Riverside"],
    },
    subtitle: {
      id: [
        { text: "Website", italic: true },
        " pemesanan penginapan dengan fitur blok ",
        { text: "slot", italic: true },
        " pencegah ",
        { text: "double booking", italic: true },
        ", integrasi pembayaran Midtrans, dan ",
        { text: "dashboard admin", italic: true },
        " yang berlanjut dari proyek kuliah menjadi kontrak komersial klien.",
      ],
      en: [
        "A lodging booking website with slot-locking to prevent double bookings, Midtrans payments, and an admin dashboard—a coursework project that became a commercial client contract.",
      ],
    },
    focus: {
      id: "Sistem Informasi - Solusi Transaksi",
      en: "Information Systems - Transaction Solution",
    },
    techStack:
      "React, Vite, Tailwind CSS, Laravel, PHP, MySQL, Figma, GitHub Projects",
    period: {
      id: "Feb 2026 – Sekarang",
      en: "Feb 2026 – Present",
    },
    mockupImage: "/images/projects/detail-landeuh/mockup.webp",
    resultBannerImage: "/images/projects/detail-landeuh/result-banner.webp",
    resultObjectImage: "/images/projects/detail-landeuh/result-object.webp",
    problem: [
      {
        id: [
          "Landeuh Village Riverside, usaha penyewaan penginapan (",
          { text: "cabin", italic: true },
          ", ",
          { text: "glamping", italic: true },
          ", dan rumah industrial) di Bogor, mengelola seluruh reservasi secara manual melalui pesan WhatsApp.",
        ],
        en: [
          "Landeuh Village Riverside, a Bogor lodging business offering cabins, glamping tents, and industrial-style houses, managed all reservations manually via WhatsApp.",
        ],
      },
      {
        id: [
          "Pencatatan manual dan komunikasi bolak-balik sering memicu ",
          { text: "double booking", italic: true },
          " (satu unit terpesan ganda pada tanggal yang sama). Pengelola kesulitan memantau status pembayaran dan ketersediaan unit, sedangkan calon penyewa belum dapat melihat daftar penginapan beserta ketersediaannya secara langsung.",
        ],
        en: [
          "Manual logs and back-and-forth chats often caused double bookings on the same dates. Managers struggled to track payment status and unit availability, and prospective guests could not browse listings and open dates directly.",
        ],
      },
    ],
    contribution: [
      {
        id: [
          { text: "Project Manager", italic: true },
          ", ",
          { text: "UI/UX Designer", italic: true },
          ", & ",
          { text: "Frontend Developer", italic: true },
          " dalam tim beranggotakan empat orang (1 PM/UI-UX/FE [Ari], 2 ",
          { text: "Backend & Deployment", italic: true },
          ", 1 FE & ",
          { text: "System Analyst", italic: true },
          ").",
        ],
        en: [
          "Project Manager, UI/UX Designer, and Frontend Developer in a 4-person team (1 PM/UI-UX/FE [Ari], 2 Backend & Deployment, 1 FE & System Analyst).",
        ],
      },
      {
        id: [
          "Bertanggung jawab atas riset UX, perancangan desain ",
          { text: "end-to-end", italic: true },
          " di Figma, implementasi antarmuka ",
          { text: "frontend", italic: true },
          ", pengelolaan progres tim di GitHub Projects, serta negosiasi penawaran komersial bersama klien.",
        ],
        en: [
          "Handled UX research, end-to-end Figma design, frontend implementation, team task tracking on GitHub Projects, and commercial negotiations with the client.",
        ],
      },
    ],
    processSteps: [
      {
        stepNumber: "01",
        title: {
          id: ["Discovery & Wawancara Klien"],
          en: ["Discovery & Client Interviews"],
        },
        description: {
          id: [
            "Mewawancarai pihak Landeuh untuk memetakan kendala operasional dan menawarkan dua opsi solusi (menu ",
            { text: "barcode", italic: true },
            " kafe atau ",
            { text: "website", italic: true },
            " pemesanan penginapan dengan blok ",
            { text: "slot", italic: true },
            " dan ",
            { text: "payment gateway", italic: true },
            "); klien memilih opsi kedua.",
          ],
          en: [
            "Interviewed the Landeuh owners to map operational issues and proposed two options (a QR café menu or a lodging booking website with slot-locking and a payment gateway); the client chose the second.",
          ],
        },
      },
      {
        stepNumber: "02",
        title: {
          id: ["Riset UX & Desain Figma"],
          en: ["UX Research & Figma Design"],
        },
        description: {
          id: [
            "Mempelajari pola pemesanan di Traveloka, tiket.com, serta situs vila dan penginapan agar alur reservasi mudah diikuti pengguna. Menyusun ",
            { text: "wireframe", italic: true },
            ", gaya warna berbasis logo Landeuh, dan prototipe ",
            { text: "high-fidelity", italic: true },
            " (",
            { text: "landing page", italic: true },
            ", katalog penginapan, halaman pembayaran, konfirmasi transaksi, dan ",
            { text: "dashboard admin", italic: true },
            ") selama dua minggu hingga disetujui klien melalui Zoom.",
          ],
          en: [
            "Studied booking flows on Traveloka, tiket.com, and villa websites to keep the reservation flow easy to follow. Created wireframes, a color palette based on Landeuh's logo, and high-fidelity Figma prototypes (landing page, catalog, checkout, confirmation, and admin dashboard) over two weeks until the client approved them over Zoom.",
          ],
        },
      },
      {
        stepNumber: "03",
        title: {
          id: [
            "Implementasi ",
            { text: "Frontend", italic: true },
            " & Koordinasi Tim",
          ],
          en: ["Frontend Implementation & Team Coordination"],
        },
        description: {
          id: [
            "Membangun antarmuka dengan React (Vite) selama sekitar dua minggu yang terhubung ke ",
            { text: "backend", italic: true },
            " Laravel dan basis data MySQL. Berkoordinasi dengan pengembang ",
            { text: "backend", italic: true },
            " dalam integrasi API serta ",
            { text: "payment gateway", italic: true },
            " Midtrans agar status pesanan otomatis menjadi ",
            { text: "booked", italic: true },
            " saat pembayaran berhasil tanpa pesan WhatsApp.",
          ],
          en: [
            "Built the React (Vite) frontend in about two weeks and connected it to the Laravel backend and MySQL database. Worked with backend developers on API and Midtrans payment integration so successful payments mark units as booked automatically without WhatsApp messages.",
          ],
        },
      },
      {
        stepNumber: "04",
        title: {
          id: ["Manajemen Proyek di GitHub Projects"],
          en: ["Project Management on GitHub Projects"],
        },
        description: {
          id: [
            "Saya membagi tugas per peran di GitHub Projects pada papan ",
            { text: "To Do", italic: true },
            ", ",
            { text: "In Progress", italic: true },
            ", ",
            { text: "Done", italic: true },
            ", ",
            { text: "Review", italic: true },
            ", dan ",
            { text: "Final", italic: true },
            ", serta meninjau hasil kerja setiap anggota secara berkala (",
            {
              text: "Link GitHub Projects",
              href: PROJECT_LINKS.landeuh.githubProjects,
            },
            ").",
          ],
          en: [
            "Assigned role-based tasks across To Do, In Progress, Done, Review, and Final columns in GitHub Projects and reviewed each teammate's work regularly (",
            {
              text: "GitHub Projects",
              href: PROJECT_LINKS.landeuh.githubProjects,
            },
            ").",
          ],
        },
      },
      {
        stepNumber: "05",
        title: {
          id: ["Komersialisasi Proyek"],
          en: ["Project Commercialization"],
        },
        description: {
          id: [
            "Usai presentasi mata kuliah, saya mengajukan penawaran pengembangan lanjutan agar sistem siap produksi dengan menyiapkan empat dokumen resmi (proposal penawaran, daftar kredensial, BAST/perjanjian serah terima, dan ",
            { text: "invoice", italic: true },
            "). Kontrak senilai Rp12,5 juta tersebut disetujui dan dilunasi klien, dan kini proyek memasuki tahap pemolesan (",
            { text: "polish", italic: true },
            ") akhir, pengujian, serta penyusunan dokumentasi.",
          ],
          en: [
            "Pitched continued development after the course presentation to make the system production-ready, backed by four formal documents (proposal, credential list, handover agreement/BAST, and invoice). The client approved and paid the IDR 12.5M contract in full; the project is now in final polish, testing, and documentation.",
          ],
        },
      },
    ],
    decisions: [
      {
        title: {
          id: ["Kecepatan Alur dibandingkan dengan Animasi Berat"],
          en: ["Flow Speed over Heavy Animations"],
        },
        description: {
          id: [
            "Animasi berat dihindari agar pola interaksi selaras dengan kebiasaan pengguna Traveloka dan tiket.com. Kejelasan alur pemesanan serta kecepatan muat halaman diprioritaskan di atas efek visual dekoratif.",
          ],
          en: [
            "Skipped heavy decorative animations to keep page loads fast, preserve clear booking steps, and match user habits from Traveloka and tiket.com.",
          ],
        },
      },
      {
        title: {
          id: ["Sistem Blok ", { text: "Slot", italic: true }],
          en: ["Date Slot-Locking"],
        },
        description: {
          id: [
            "Mengunci ",
            { text: "slot", italic: true },
            " tanggal yang sedang diproses agar tidak dapat dipesan ganda selama transaksi berlangsung guna mengatasi masalah ",
            { text: "double booking", italic: true },
            " secara langsung.",
          ],
          en: [
            "Locked pending checkout dates during active transactions to prevent double bookings directly.",
          ],
        },
      },
      {
        title: {
          id: ["Tahap Tinjauan di GitHub Projects"],
          en: ["Review Step on GitHub Projects"],
        },
        description: {
          id: [
            "Kolom ",
            { text: "Review", italic: true },
            " ditambahkan sebelum status ",
            { text: "Final", italic: true },
            " untuk memastikan implementasi setiap anggota sesuai dengan desain dan alur bisnis.",
          ],
          en: [
            "Added a Review column before Final in GitHub Projects to verify every teammate's work against the Figma design and business flow.",
          ],
        },
      },
    ],
    resultSummary: {
      id: [
        "Proyek ini berlanjut menjadi kontrak berbayar Rp12,5 juta yang telah dilunasi klien dan kini dalam tahap ",
        { text: "polish", italic: true },
        " sebelum dipakai tamu. Sistem blok ",
        { text: "slot", italic: true },
        " dan Midtrans dirancang mencegah ",
        { text: "double booking", italic: true },
        ", otomatis berstatus ",
        { text: "booked", italic: true },
        " saat pembayaran berhasil tanpa pesan WhatsApp, serta menampilkan daftar penginapan dengan jelas.",
      ],
      en: [
        "The project grew into a paid IDR 12.5M commercial contract, now in final polish before launch. Built with slot-locking and Midtrans integration, the site prevents double bookings, marks reservations as booked upon payment without WhatsApp chats, and displays available units clearly.",
      ],
    },
    resultActions: [
      {
        label: { id: "Kunjungi Website", en: "Visit Website" },
        href: PROJECT_LINKS.landeuh.web,
      },
      {
        label: { id: "Repositori GitHub", en: "GitHub Repository" },
        href: PROJECT_LINKS.landeuh.repo,
      },
      {
        label: { id: "Figma", en: "Figma" },
        href: PROJECT_LINKS.landeuh.figma,
      },
    ],
    reflections: [
      {
        id: [
          "Mengaudit dan mengoptimalkan performa secara menyeluruh menggunakan Google Lighthouse (LCP, INP, CLS) sebelum peluncuran publik.",
        ],
        en: [
          "Audit and optimize performance with Google Lighthouse (LCP, INP, CLS) before public launch.",
        ],
      },
      {
        id: [
          "Menerapkan TypeScript pada komponen ",
          { text: "frontend", italic: true },
          " dan kontrak API agar integrasi data reservasi serta ",
          { text: "slot", italic: true },
          " tanggal lebih aman dari ",
          { text: "bug", italic: true },
          " tipe data.",
        ],
        en: [
          "Add TypeScript to frontend components and API contracts to prevent type bugs in reservation and date-slot data.",
        ],
      },
    ],
  },
  {
    slug: "ais",
    route: "/projects/ais",
    landingImage: "/images/projects/ais_LP.webp",
    landingAlt: {
      id: "Pratinjau proyek Website Profil dan Sistem Pendaftaran Asrama IPB Sukasari",
      en: "Asrama IPB Sukasari Profile Website and Registration System preview",
    },
    visitUrl: PROJECT_LINKS.ais.visit,
    title: {
      id: [
        { text: "Website", italic: true },
        " Profil & Sistem Pendaftaran — Asrama IPB Sukasari",
      ],
      en: ["Profile Website & Registration System — Asrama IPB Sukasari"],
    },
    subtitle: {
      id: [
        { text: "Website", italic: true },
        " profil beranimasi elegan untuk memperkenalkan Asrama IPB Sukasari kepada mahasiswa IPB University, lengkap dengan sistem pendaftaran dan penilaian wawancara digital.",
      ],
      en: [
        "An animated profile site introducing Asrama IPB Sukasari to IPB University students, complete with an online registration and interview-scoring system.",
      ],
    },
    focus: {
      id: "Landingpage - Company Profile",
      en: "Landing Page - Institutional Profile",
    },
    techStack:
      "React, Vite, Tailwind CSS, Laravel, PHP, MySQL, Figma, GitHub Projects",
    period: {
      id: "Jan 2026 – Sekarang",
      en: "Jan 2026 – Present",
    },
    mockupImage: "/images/projects/detail-ais/mockup.webp",
    resultBannerImage: "/images/projects/detail-ais/result-banner.webp",
    resultObjectImage: "/images/projects/detail-ais/result-object.webp",
    problem: [
      {
        id: [
          "Asrama IPB Sukasari belum memiliki ",
          { text: "website", italic: true },
          " resmi sehingga kurang dikenal banyak mahasiswa IPB University dan sulit ditemukan di Google, padahal ",
          { text: "branding", italic: true },
          " visual yang elegan dibutuhkan untuk menarik minat calon penghuni baru.",
        ],
        en: [
          "Asrama IPB Sukasari had no official website, making it hard for IPB University students to find on Google and leaving it without strong visual branding to attract new residents.",
        ],
      },
      {
        id: [
          "Proses pendaftaran calon penghuni dan pencatatan penilaian wawancara belum terpusat dalam satu ",
          { text: "platform web", italic: true },
          ".",
        ],
        en: [
          "Applicant registration and interview scoring also lacked a single, central web platform.",
        ],
      },
    ],
    contribution: [
      {
        id: [
          { text: "Frontend Developer", italic: true },
          " (80% ",
          { text: "Frontend", italic: true },
          ", 20% Firebase): menangani riset visual, ",
          { text: "wireframe", italic: true },
          ", pengembangan antarmuka dan animasi, integrasi basis data pendaftaran, uji kelayakan pengguna, optimasi media, ",
          { text: "deployment", italic: true },
          ", hingga pengaturan domain dan SEO dasar.",
        ],
        en: [
          "Frontend Developer (80% Frontend, 20% Firebase): handled visual research, wireframing, UI and animation development, registration database integration, usability testing, media optimization, deployment, DNS setup, and baseline SEO.",
        ],
      },
    ],
    processSteps: [
      {
        stepNumber: "01",
        title: {
          id: [
            "Riset & ",
            { text: "Wireframe", italic: true },
            " (±3 hari riset, 2 minggu ",
            { text: "wireframe", italic: true },
            ")",
          ],
          en: ["Research & Wireframing (~3 days research, 2 weeks wireframing)"],
        },
        description: {
          id: [
            "Merancang konsep visual modern dan elegan agar asrama tampil kredibel serta menarik bagi mahasiswa baru.",
          ],
          en: [
            "Designed a modern visual concept to make the dormitory look credible and appealing to incoming students.",
          ],
        },
      },
      {
        stepNumber: "02",
        title: {
          id: [
            "Pengembangan ",
            { text: "Frontend", italic: true },
            " & Optimasi Media (±1 bulan)",
          ],
          en: ["Frontend Development & Media Optimization (~1 month)"],
        },
        description: {
          id: [
            "Membangun ",
            { text: "landing page", italic: true },
            " interaktif menggunakan React, Vite, GSAP, dan Framer Motion, lalu mengonversi gambar ke format WebP dan mengompresi video ",
            { text: "loader", italic: true },
            " agar halaman tetap ringan.",
          ],
          en: [
            "Built an interactive landing page with React, Vite, GSAP, and Framer Motion, then converted images to WebP and compressed the loader video to keep the page lightweight.",
          ],
        },
      },
      {
        stepNumber: "03",
        title: {
          id: ["Sistem Pendaftaran & Penilaian (Firebase Firestore)"],
          en: ["Registration & Scoring System (Firebase Firestore)"],
        },
        description: {
          id: [
            "Membuat formulir pendaftaran calon penghuni dan ",
            { text: "dashboard admin", italic: true },
            " untuk memantau pendaftar serta mencatat nilai wawancara, sekaligus menangani perbaikan ",
            { text: "bug", italic: true },
            " selama masa pendaftaran.",
          ],
          en: [
            "Built the applicant registration form and admin dashboard to track applicants and record interview scores, and fixed bugs throughout the intake period.",
          ],
        },
      },
      {
        stepNumber: "04",
        title: {
          id: [
            "Pengujian Pengguna, ",
            { text: "Deployment", italic: true },
            ", & SEO",
          ],
          en: ["User Testing, Deployment, & SEO"],
        },
        description: {
          id: [
            "Menguji alur dan kelancaran situs bersama 10+ penghuni asrama, meluncurkannya di Firebase Hosting dengan pengaturan domain melalui Cloudflare DNS, serta mendaftarkannya ke Google Search Console.",
          ],
          en: [
            "Tested site flows with 10+ residents, deployed to Firebase Hosting with Cloudflare DNS, and submitted the site to Google Search Console.",
          ],
        },
      },
    ],
    decisions: [
      {
        title: {
          id: ["Kaya Animasi vs Halaman Minimalis"],
          en: ["Rich Animation vs. Minimal Page"],
        },
        description: {
          id: [
            "Karena berperan sebagai etalase profil dan ",
            { text: "branding", italic: true },
            " asrama, animasi interaktif sengaja ditonjolkan, sementara ukuran aset dikendalikan melalui format WebP dan kompresi video.",
          ],
          en: [
            "Prioritized interactive animations because the site serves as the dormitory's branding showcase, and controlled asset sizes through WebP conversion and video compression.",
          ],
        },
      },
      {
        title: {
          id: ["Cloudflare DNS & Firebase Firestore"],
          en: ["Cloudflare DNS & Firebase Firestore"],
        },
        description: {
          id: [
            "Pengelolaan domain dialihkan ke Cloudflare untuk mengatasi ",
            { text: "error", italic: true },
            " domain kustom di Firebase, sedangkan Firestore dipilih agar sistem pendaftaran cepat siap pakai sebelum penerimaan penghuni dibuka.",
          ],
          en: [
            "Moved DNS management to Cloudflare to fix Firebase custom-domain errors, and chose Firestore to launch the registration system before admissions opened.",
          ],
        },
      },
    ],
    resultSummary: {
      id: [
        { text: "Website", italic: true },
        " digunakan pada penerimaan 43 pendaftar (meningkat dari sekitar 30 pendaftar sebelumnya), teruji ke 10+ penghuni, dan terindeks Google untuk \"asrama ipb sukasari\". Detail profil, fasilitas, dan program membantu menarik calon penghuni, sedangkan pengurus praktis menyeleksi serta menilai pendaftar lewat ",
        { text: "dashboard admin", italic: true },
        ".",
      ],
      en: [
        "The website supported 43 applicants during admissions (up from ~30 previously), passed testing with 10+ residents, and was indexed on Google for \"asrama ipb sukasari.\" Clear profile, facility, and program pages helped attract prospective residents, and organizers screened and scored applicants directly in the admin dashboard.",
      ],
    },
    resultActions: [
      {
        label: { id: "Kunjungi Website", en: "Visit Website" },
        href: PROJECT_LINKS.ais.web,
      },
      {
        label: { id: "Repositori GitHub", en: "GitHub Repository" },
        href: PROJECT_LINKS.ais.repo,
      },
      {
        label: { id: "Figma", en: "Figma" },
        href: PROJECT_LINKS.ais.figma,
      },
    ],
    reflections: [
      {
        id: [
          "Mengaudit performa dan aksesibilitas melalui Google Lighthouse (termasuk dukungan ",
          { text: "prefers-reduced-motion", italic: true },
          " bagi pengguna yang sensitif terhadap animasi).",
        ],
        en: [
          "Audit performance and accessibility with Google Lighthouse, adding prefers-reduced-motion support for motion-sensitive users.",
        ],
      },
      {
        id: [
          "Mengoptimalkan ulang kompresi aset gambar dan video agar tetap ringan pada perangkat berspesifikasi rendah.",
        ],
        en: [
          "Re-optimize image and video compression to keep the site smooth on low-spec devices.",
        ],
      },
    ],
  },
  {
    slug: "webgis",
    route: "/projects/webgis",
    landingImage: "/images/projects/webgis_LP.webp",
    landingAlt: {
      id: "Pratinjau proyek WebGIS Persebaran dan Analisis Lokasi UMKM RINTIK",
      en: "RINTIK SME Distribution & Location Analysis WebGIS preview",
    },
    visitUrl: PROJECT_LINKS.webgis.visit,
    title: {
      id: ["WebGIS Persebaran & Analisis Lokasi UMKM — RINTIK"],
      en: ["SME Distribution & Location Analysis WebGIS — RINTIK"],
    },
    subtitle: {
      id: [
        { text: "Website", italic: true },
        " RINTIK (Ruang Informasi Titik Industri Kreatif) yaitu webgis untuk menjelajahi persebaran 1.225 titik UMKM terverifikasi di Kota Bogor sekaligus menganalisis kesesuaian awal calon lokasi usaha secara spasial.",
      ],
      en: [
        "RINTIK (Creative Industry Spatial Hub) is a WebGIS app for exploring 1,225 verified SMEs in Bogor City and evaluating candidate business locations through spatial analysis.",
      ],
    },
    focus: {
      id: "Informasi Spasial - Solusi Bisnis",
      en: "Spatial Information - Business Solutions",
    },
    techStack:
      "React, TypeScript, Tailwind CSS (v4), Next.js, GSAP, Framer Motion, react-leaflet, Supabase, Vercel, Figma, Google Flow",
    period: {
      id: "Okt 2026 – Sekarang",
      en: "Oct 2026 – Present",
    },
    mockupImage: "/images/projects/detail-webgis/mockup.webp",
    resultBannerImage: "/images/projects/detail-webgis/result-banner.webp",
    resultObjectImage: "/images/projects/detail-webgis/result-object.webp",
    problem: [
      {
        id: [
          "Persebaran UMKM di Kota Bogor sulit dipahami jika hanya disajikan dalam bentuk daftar tanpa konteks lokasi geografis, kategori, dan rute menuju usaha.",
        ],
        en: [
          "SME distribution across Bogor City is hard to understand in plain lists without location, category, and route context.",
        ],
      },
      {
        id: [
          "Calon pelaku UMKM memerlukan gambaran kondisi spasial di sekitar kandidat lokasi usaha, seperti keberadaan kompetitor sejenis serta kedekatan dengan jalan, permukiman, dan sekolah atau universitas, dalam satu peta interaktif.",
        ],
        en: [
          "Prospective business owners also need a spatial view around candidate sites—including similar competitors and proximity to roads, housing, and schools or universities—on one interactive map.",
        ],
      },
    ],
    contribution: [
      {
        id: [
          { text: "UI/UX Designer", italic: true },
          " & ",
          { text: "Frontend Developer", italic: true },
          " dalam tim beranggotakan lima orang (1 ",
          { text: "Project Manager", italic: true },
          ", 1 ",
          { text: "UI/UX Designer & Frontend Developer", italic: true },
          " [Ari], 1 ",
          { text: "Backend Developer", italic: true },
          ", 1 ",
          { text: "Data Analyst", italic: true },
          ", dan 1 ",
          { text: "GIS Developer", italic: true },
          ").",
        ],
        en: [
          "UI/UX Designer & Frontend Developer in a 5-person team (1 PM, 1 UI/UX & Frontend [Ari], 1 Backend, 1 Data Analyst, 1 GIS Developer).",
        ],
      },
      {
        id: [
          "Bertanggung jawab merancang arsitektur UI/UX pada dua fokus utama (",
          { text: "landing page", italic: true },
          " dan antarmuka peta), menyusun sistem desain di Figma, mengarahkan pemilihan ",
          { text: "stack frontend", italic: true },
          " modern, serta mengimplementasikan antarmuka ",
          { text: "web", italic: true },
          " dan komponen peta interaktif.",
        ],
        en: [
          "Designed the UI/UX architecture for both the landing page and map interfaces, built the Figma design system, guided frontend stack selection, and implemented the web UI and interactive map components.",
        ],
      },
    ],
    processSteps: [
      {
        stepNumber: "01",
        title: {
          id: ["Riset Referensi & Desain UI/UX (Figma)"],
          en: ["Reference Research & Figma UI/UX"],
        },
        description: {
          id: [
            "Mengadaptasi inspirasi tata letak dan animasi dari Awwwards dengan metode amati, tiru, modifikasi (ATM) ke dalam desain ",
            { text: "high-fidelity", italic: true },
            " di Figma untuk dua fokus utama: ",
            { text: "landing page", italic: true },
            " dan antarmuka peta (",
            { text: "Map", italic: true },
            " Pengunjung serta ",
            { text: "Map", italic: true },
            " Calon Usaha).",
          ],
          en: [
            "Adapted layout and animation inspirations from Awwwards into high-fidelity Figma designs for two main areas: the landing page and the map interfaces (Visitor Map and Prospective Business Map).",
          ],
        },
      },
      {
        stepNumber: "02",
        title: {
          id: [
            "Implementasi ",
            { text: "Frontend", italic: true },
            " & Animasi Terukur",
          ],
          en: ["Frontend Implementation & Scoped Motion"],
        },
        description: {
          id: [
            "Mengimplementasikan ",
            { text: "frontend", italic: true },
            " dengan React, TypeScript, dan Tailwind CSS (v4) di atas Next.js (",
            { text: "App Router", italic: true },
            ") yang terhubung ke ",
            { text: "route handlers", italic: true },
            " Next.js dan basis data Supabase (PostGIS). Pada ",
            { text: "landing page", italic: true },
            ", koreografi ",
            { text: "scroll", italic: true },
            " dan transisi dibangun memakai GSAP serta Framer Motion, dilengkapi ",
            { text: "motion loader", italic: true },
            " logo berbasis video dari Google Flow sebagai animasi pembuka.",
          ],
          en: [
            "Built the frontend with React, TypeScript, and Tailwind CSS v4 on Next.js (App Router), connected to Next.js Route Handlers and Supabase (PostGIS). Added GSAP and Framer Motion scroll transitions plus an opening Google Flow video logo loader on the landing page only.",
          ],
        },
      },
      {
        stepNumber: "03",
        title: {
          id: ["Integrasi Peta Interaktif & Alur Analisis Spasial"],
          en: ["Interactive Map & Spatial Analysis Wizard"],
        },
        description: {
          id: [
            "Menghubungkan komponen Leaflet (",
            { text: "react-leaflet", italic: true },
            ") secara ",
            { text: "client-side", italic: true },
            " pada Next.js untuk mendukung pencarian, ",
            { text: "filter", italic: true },
            " kategori atau wilayah, rute multimoda, serta alur ",
            { text: "wizard", italic: true },
            " analisis calon lokasi UMKM (",
            { text: "buffer", italic: true },
            " dan ",
            { text: "proximity analysis", italic: true },
            " terhadap ",
            { text: "layer", italic: true },
            " jalan, permukiman, dan sekolah atau universitas).",
          ],
          en: [
            "Integrated client-side react-leaflet components in Next.js to support search, category and district filters, multimodal routing, and a site-analysis wizard that runs buffer and proximity checks against road, residential, and school or university layers.",
          ],
        },
      },
    ],
    decisions: [
      {
        title: {
          id: ["Animasi Terukur dibandingkan dengan Animasi Penuh"],
          en: ["Scoped Motion over Full-Site Animation"],
        },
        description: {
          id: [
            "Animasi dibatasi hanya pada ",
            { text: "landing page", italic: true },
            ", berbeda dari proyek Asrama IPB Sukasari yang menonjolkan animasi penuh untuk pengenalan merek. Halaman peta pun dirancang agar pengguna nyaman menelusuri UMKM maupun menganalisis lokasi.",
          ],
          en: [
            "Restricted animations to the landing page—unlike the animation-rich Asrama IPB Sukasari site—so users can browse SMEs and analyze locations on the map without distraction.",
          ],
        },
      },
      {
        title: {
          id: ["React, TypeScript, Tailwind CSS (v4) & Next.js"],
          en: ["React, TypeScript, Tailwind CSS v4 & Next.js"],
        },
        description: {
          id: [
            "Dipilih untuk menjamin keamanan tipe data (",
            { text: "type safety", italic: true },
            ") pada struktur data spasial dan menyatukan antarmuka ",
            { text: "frontend", italic: true },
            " serta API ",
            { text: "route handlers", italic: true },
            " dalam satu basis kode berstandar industri.",
          ],
          en: [
            "Selected this stack to enforce type safety on spatial data structures and keep both the frontend UI and API route handlers in one industry-standard codebase.",
          ],
        },
      },
      {
        title: {
          id: ["Pemisahan Dua Mode Peta Tanpa ", { text: "Login", italic: true }],
          en: ["Two Open Map Modes (No Login Required)"],
        },
        description: {
          id: [
            "Memisahkan rute eksplorasi publik (/map/pengunjung) dan ",
            { text: "wizard", italic: true },
            " analisis tiga langkah (/map/calon-usaha) tanpa mewajibkan akun agar pengguna dapat langsung mencoba fitur inti.",
          ],
          en: [
            "Separated public browsing (/map/pengunjung) and the 3-step analysis wizard (/map/calon-usaha) with no account required so users can try core features immediately.",
          ],
        },
      },
    ],
    resultSummary: {
      id: [
        "Antarmuka WebGIS untuk 1.225 titik UMKM Kota Bogor telah selesai dibangun dan kini dalam penyempurnaan sebelum rilis di Vercel (belum diuji di lapangan). Sistem ini memberi masukan awal lokasi strategis bagi calon pelaku UMKM serta memudahkan pengunjung melihat UMKM sesuai kategori dan radius terdekat.",
      ],
      en: [
        "The WebGIS interface for 1,225 Bogor SME points is complete and under final refinement before launching on Vercel (not yet field-tested). It gives prospective business owners early location guidance and helps visitors browse SMEs by category and nearby radius.",
      ],
    },
    resultActions: [
      {
        label: { id: "Kunjungi Website", en: "Visit Website" },
        href: PROJECT_LINKS.webgis.web,
      },
      {
        label: { id: "Repositori GitHub", en: "GitHub Repository" },
        href: PROJECT_LINKS.webgis.repo,
      },
      {
        label: { id: "Figma", en: "Figma" },
        href: PROJECT_LINKS.webgis.figma,
      },
    ],
    reflections: [
      {
        id: [
          "Mengaudit performa pemuatan ",
          { text: "layer", italic: true },
          " GeoJSON dan skor Google Lighthouse pada ",
          { text: "landing page", italic: true },
          " maupun halaman peta sebelum rilis akhir.",
        ],
        en: [
          "Audit GeoJSON layer loading performance and Google Lighthouse scores on both the landing and map pages before final release.",
        ],
      },
      {
        id: [
          "Menyempurnakan tampilan responsif panel mengambang dan alur analisis bertahap pada berbagai ukuran layar perangkat seluler.",
        ],
        en: [
          "Refine the responsive layout of floating panels and the stepped analysis flow across mobile screen sizes.",
        ],
      },
    ],
  },
];

export const PROJECTS_BY_SLUG: Record<ProjectSlug, ProjectData> = {
  kasir: PROJECTS[0]!,
  landeuh: PROJECTS[1]!,
  ais: PROJECTS[2]!,
  webgis: PROJECTS[3]!,
};
