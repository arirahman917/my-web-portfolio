import { ACHIEVEMENT_LINKS } from "./links";
import type { AchievementData, BilingualText } from "./types";

export const ACHIEVEMENTS_COPY: {
  landingHeading: BilingualText;
  landingExploreCta: BilingualText;
  detailPageHeading: BilingualText;
} = {
  landingHeading: {
    id: "KOMPETISI & PUBLIKASI",
    en: "COMPETITIONS & PUBLICATIONS",
  },
  landingExploreCta: {
    id: "Jelajahi ↗",
    en: "Explore ↗",
  },
  detailPageHeading: {
    id: "Kompetisi & Prestasi",
    en: "Competitions & Achievements",
  },
};

export const ACHIEVEMENTS: AchievementData[] = [
  {
    slug: "joints",
    indexNumber: 1,
    landingImage: "/images/achievements/joints_LP.webp",
    landingAlt: {
      id: "Dokumentasi Hackathon JOINTS UGM 2026",
      en: "JOINTS UGM Hackathon 2026 documentation",
    },
    title: {
      id: [
        "Peringkat 13 Nasional (dari 150+ Tim) — ",
        { text: "Hackathon", italic: true },
        " JOINTS UGM 2026",
      ],
      en: ["13th Place Nationwide (out of 150+ Teams) — JOINTS UGM Hackathon 2026"],
    },
    period: {
      id: "(Sep 2026 – Okt 2026)",
      en: "(Sep 2026 – Oct 2026)",
    },
    detailBlocks: [
      {
        id: "joints-summary",
        text: {
          id: [
            "Meraih peringkat ke-13 dari seluruh tim terdaftar se-Indonesia melalui ",
            { text: "hackday", italic: true },
            " daring selama empat hari penuh dengan luaran utuh pada tahap seleksi: proposal, ",
            { text: "pitch deck", italic: true },
            ", video pengenalan karya, repositori GitHub, dan aplikasi ",
            { text: "web", italic: true },
            " ter-",
            { text: "deploy", italic: true },
            ".",
          ],
          en: [
            "Ranked 13th nationwide out of 150+ registered teams in a 4-day online hackday, submitting a complete entry: proposal, pitch deck, demo video, GitHub repository, and deployed web app.",
          ],
        },
        media: [
          {
            src: "/images/achievements/detail-joints/sertif-joints.webp",
            width: 1600,
            height: 1130,
            alt: {
              id: "Sertifikat Peringkat 13 Nasional JOINTS UGM 2026",
              en: "JOINTS UGM 2026 13th Place Nationwide Certificate",
            },
          },
          {
            src: "/images/achievements/detail-joints/rank.webp",
            width: 702,
            height: 234,
            alt: {
              id: "Tabel skor dan peringkat 13 nasional JOINTS UGM 2026",
              en: "JOINTS UGM 2026 score and national rank table",
            },
          },
        ],
      },
      {
        id: "joints-role",
        text: {
          id: [
            "Bertugas sebagai ",
            { text: "UI/UX Designer & Video Creator", italic: true },
            " dalam tim beranggotakan empat orang untuk mengembangkan ",
            { text: "website", italic: true },
            " rekomendasi jurusan kuliah berbasis minat dan prestasi, yang dilengkapi fitur diskusi AI seputar peluang penerimaan.",
          ],
          en: [
            "Worked as UI/UX Designer & Video Creator on a 4-person team to build a web app that recommends university majors based on interests and achievements, with an AI chat on admission chances.",
          ],
        },
        actions: [
          {
            label: { id: "Kunjungi Website", en: "Visit Website" },
            href: ACHIEVEMENT_LINKS.joints.web,
          },
          {
            label: { id: "Kunjungi Video", en: "Watch Video" },
            href: ACHIEVEMENT_LINKS.joints.video,
          },
          ...(ACHIEVEMENT_LINKS.joints.repo
            ? [
                {
                  label: { id: "Kunjungi Repo", en: "View Repo" },
                  href: ACHIEVEMENT_LINKS.joints.repo,
                },
              ]
            : []),
        ],
        media: [
          {
            src: "/images/achievements/detail-joints/mockup.webp",
            width: 1500,
            height: 1061,
            alt: {
              id: "Mockup aplikasi web Cocokin JOINTS UGM 2026",
              en: "Cocokin JOINTS UGM 2026 web app mockup",
            },
          },
        ],
      },
      {
        id: "joints-figma",
        text: {
          id: [
            "Merancang antarmuka bergaya ",
            { text: "8-bit", italic: true },
            " yang dipadukan dengan palet warna Google agar terasa akrab, ",
            { text: "playful", italic: true },
            ", dan menarik bagi target pengguna siswa SMA, serta memproduksi video pengenalan karya.",
          ],
          en: [
            "Designed an 8-bit UI paired with Google's color palette to feel familiar, playful, and engaging for high school students, and produced the demo video.",
          ],
        },
        actions: [
          {
            label: { id: "Kunjungi Figma", en: "View Figma" },
            href: ACHIEVEMENT_LINKS.joints.figma,
          },
        ],
        media: [
          {
            src: "/images/achievements/detail-joints/figma.webp",
            width: 1600,
            height: 690,
            alt: {
              id: "Workspace desain Figma bergaya 8-bit untuk JOINTS UGM 2026",
              en: "8-bit Figma design workspace for JOINTS UGM 2026",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "ifest",
    indexNumber: 2,
    landingImage: "/images/achievements/ifest_LP.webp",
    landingAlt: {
      id: "Dokumentasi Finalis 15 Besar Hackathon Ifest Unpad 2026",
      en: "Ifest Unpad Hackathon 2026 Top 15 Finalist documentation",
    },
    title: {
      id: [
        "Finalis 15 Besar — ",
        { text: "Hackathon", italic: true },
        " Ifest Unpad 2026",
      ],
      en: ["Top 15 Finalist — Ifest Unpad Hackathon 2026"],
    },
    period: {
      id: "(Agu 2026 – Okt 2026)",
      en: "(Aug 2026 – Oct 2026)",
    },
    detailBlocks: [
      {
        id: "ifest-summary",
        text: {
          id: [
            "Lolos seleksi ",
            { text: "executive summary", italic: true },
            " dari 85+ tim menuju babak final implementasi aplikasi 24 jam dan sesi ",
            { text: "pitching", italic: true },
            " di Universitas Padjadjaran.",
          ],
          en: [
            "Advanced past executive-summary screening out of 85+ teams to the 24-hour app-building finals and pitch session at Universitas Padjadjaran.",
          ],
        },
        media: [
          {
            src: "/images/achievements/detail-ifest/sertif-ifest.webp",
            width: 1600,
            height: 1131,
            alt: {
              id: "Sertifikat Finalis 15 Besar Hackathon Ifest Unpad 2026",
              en: "Ifest Unpad 2026 Top 15 Finalist Certificate",
            },
          },
        ],
      },
      {
        id: "ifest-role",
        text: {
          id: [
            "Berperan sebagai Penyusun ",
            { text: "Executive Summary", italic: true },
            " & ",
            { text: "Pitch Deck", italic: true },
            " Tim, meliputi penulisan bagian pendahuluan proposal, 17 lampiran dokumen teknis, serta materi presentasi kompetisi.",
          ],
          en: [
            "Prepared the team's Executive Summary & Pitch Deck, writing the proposal introduction, 17 technical appendix documents, and competition presentation slides.",
          ],
        },
        actions: [
          {
            label: { id: "Kunjungi ExSum", en: "View ExSum" },
            href: ACHIEVEMENT_LINKS.ifest.exsum,
          },
          {
            label: { id: "Kunjungi PitchDeck", en: "View Pitch Deck" },
            href: ACHIEVEMENT_LINKS.ifest.pitchdeck,
          },
        ],
        media: [
          {
            src: "/images/achievements/detail-ifest/exsum.webp",
            width: 1600,
            height: 958,
            alt: {
              id: "Dokumen Executive Summary dan Pitch Deck Ifest Unpad 2026",
              en: "Ifest Unpad 2026 Executive Summary and Pitch Deck spread",
            },
          },
        ],
      },
      {
        id: "ifest-collab",
        text: {
          id: [
            "Berkolaborasi pada babak final 24 jam dan mempresentasikan solusi kepada dewan juri. Aplikasi terlampir di ",
            { text: "release", italic: true },
            " Repositori GitHub.",
          ],
          en: [
            "Collaborated during the 24-hour finals and presented the solution to the judging panel. The app is available under GitHub Releases in the project repository.",
          ],
        },
        actions: [
          {
            label: { id: "Kunjungi Repo", en: "View Repo" },
            href: ACHIEVEMENT_LINKS.ifest.repo,
          },
        ],
        media: [
          {
            src: "/images/achievements/detail-ifest/sudepi-app.webp",
            width: 3000,
            height: 2121,
            alt: {
              id: "Tampilan layar aplikasi mobile SUDEPI untuk Ifest Unpad 2026",
              en: "SUDEPI mobile app screens for Ifest Unpad 2026",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "jurnal",
    indexNumber: 3,
    landingImage: "/images/achievements/jurnal_LP.webp",
    landingAlt: {
      id: "Dokumentasi publikasi ilmiah Jurnal JTIK SINTA 4",
      en: "JTIK Journal SINTA 4 publication documentation",
    },
    title: {
      id: [
        "Penulis Pertama & Penulis Korespondensi — Jurnal JTIK (Terakreditasi SINTA 4)",
      ],
      en: ["First & Corresponding Author — JTIK Journal (SINTA 4 Accredited)"],
    },
    period: {
      id: "(Nov 2025 – Des 2025)",
      en: "(Nov 2025 – Dec 2025)",
    },
    detailBlocks: [
      {
        id: "jurnal-research",
        text: {
          id: [
            'Memimpin tim beranggotakan tiga orang dalam riset dan penulisan artikel ilmiah dengan judul "Penerapan ',
            { text: "Use Case", italic: true },
            ' pada Website Ayam Kabogor" (studi literatur 20+ jurnal, pembagian tugas, penyusunan metodologi, dan integrasi naskah).',
          ],
          en: [
            'Led a 3-person research team to write the paper "Use Case Application for Requirements Analysis and Modeling of the Ayam Kabogor Website," covering a 20+ journal literature review, task delegation, methodology design, and manuscript assembly.',
          ],
        },
        media: [
          {
            src: "/images/achievements/detail-jurnal/loa.webp",
            width: 601,
            height: 733,
            alt: {
              id: "Letter of Acceptance publikasi Jurnal JTIK",
              en: "JTIK Journal Letter of Acceptance",
            },
          },
        ],
      },
      {
        id: "jurnal-publication",
        text: {
          id: [
            "Mengelola proses revisi bersama dosen pembimbing dan menindaklanjuti komunikasi dengan ",
            { text: "admin", italic: true },
            " Jurnal JTIK hingga artikel resmi diterbitkan. DOI: ",
            {
              text: "https://doi.org/10.35870/jtik.v10i3.5949",
              href: ACHIEVEMENT_LINKS.jurnal.doi,
            },
            ".",
          ],
          en: [
            "Managed revisions with our faculty advisor and followed up with JTIK Journal administrators through final publication. DOI: ",
            {
              text: "https://doi.org/10.35870/jtik.v10i3.5949",
              href: ACHIEVEMENT_LINKS.jurnal.doi,
            },
            ".",
          ],
        },
        actions: [
          {
            label: { id: "Kunjungi Artikel", en: "Read Article" },
            href: ACHIEVEMENT_LINKS.jurnal.article,
          },
        ],
      },
    ],
  },
  {
    slug: "pelita",
    indexNumber: 4,
    landingImage: "/images/achievements/pelita_LP.webp",
    landingAlt: {
      id: "Dokumentasi UI/UX Case Study Pelita Technoday 2025",
      en: "Pelita UI/UX Case Study Technoday 2025 documentation",
    },
    title: {
      id: [
        { text: "UI/UX Case Study", italic: true },
        " (Pelita) — Peserta Kompetisi UI/UX Technoday 2025",
      ],
      en: [
        "UI/UX Case Study (Pelita) — Technoday 2025 UI/UX Competition Participant",
      ],
    },
    period: {
      id: "(Sep 2025 – Okt 2025)",
      en: "(Sep 2025 – Oct 2025)",
    },
    detailBlocks: [
      {
        id: "pelita-summary",
        text: {
          id: [
            "Merancang konsep produk, ",
            { text: "information architecture", italic: true },
            ", ",
            { text: "user flow", italic: true },
            ", hingga prototipe ",
            { text: "high-fidelity", italic: true },
            " sebanyak 35+ ",
            { text: "frame", italic: true },
            " di Figma untuk aplikasi pelaporan lingkungan dan transparansi anggaran daerah.",
          ],
          en: [
            "Designed the product concept, information architecture, user flows, and a high-fidelity Figma prototype (35+ frames) for an environmental reporting and regional budget transparency app.",
          ],
        },
        actions: [
          {
            label: { id: "Kunjungi Figma", en: "View Figma" },
            href: ACHIEVEMENT_LINKS.pelita.figma,
          },
        ],
        media: [
          {
            src: "/images/achievements/detail-pelita/pelita-mockup.webp",
            width: 1304,
            height: 1282,
            alt: {
              id: "Kumpulan layar prototipe Figma aplikasi Pelita",
              en: "Pelita Figma multi-screen prototype showcase",
            },
          },
        ],
      },
    ],
  },
];
