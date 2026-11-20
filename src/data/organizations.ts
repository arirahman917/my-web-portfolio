import type { BilingualText, OrganizationData } from "./types";

export const ORGANIZATIONS_COPY: {
  heading: BilingualText;
  readMoreCta: BilingualText;
  flipBackCta: BilingualText;
} = {
  heading: {
    id: "ORGANISASI & KEPANITIAAN",
    en: "ORGANIZATIONS & LEADERSHIP",
  },
  readMoreCta: {
    id: "Selengkapnya ↗",
    en: "Read More ↗",
  },
  flipBackCta: {
    id: "↶ Putar",
    en: "↶ Flip Back",
  },
};

export const ORGANIZATIONS: OrganizationData[] = [
  {
    id: "pendikar",
    badge: {
      id: "Kompetisi Nasional",
      en: "National Competition",
    },
    title: {
      id: ["Kepala Divisi ", { text: "Sponsorship", italic: true }, " — Pendikar 2025"],
      en: ["Head of Sponsorship Division — Pendikar 2025"],
    },
    period: {
      id: [{ text: "(Jan – Jun 2025)", italic: true }],
      en: ["(Jan – Jun 2025)"],
    },
    image: "/images/organizations/pendikar.webp",
    imageAlt: {
      id: "Dokumentasi Kepala Divisi Sponsorship Pendikar 2025",
      en: "Pendikar 2025 Sponsorship Division documentation",
    },
    bullets: [
      {
        id: [
          "Memilih dan memimpin ",
          { text: "8 anggota", bold: true },
          " divisi dalam mengelola tiga jalur pendanaan: ",
          { text: "sponsorship", italic: true },
          " perusahaan, dana usaha (penjualan makanan ringan secara tatap muka dan ",
          { text: "pre-order", italic: true },
          " WhatsApp), serta ",
          { text: "paid promote", italic: true },
          ".",
        ],
        en: [
          "Selected and led an ",
          { text: "8-member", bold: true },
          " team managing three funding streams: corporate sponsorships, fundraising (in-person snack sales and WhatsApp pre-orders), and paid promotions.",
        ],
      },
      {
        id: [
          "Membangun sistem ",
          { text: "workspace", italic: true },
          " pelacakan progres di ",
          { text: "spreadsheet", italic: true },
          " dan memimpin rapat evaluasi mingguan setiap hari Minggu.",
        ],
        en: [
          "Built a spreadsheet workspace to track progress and led weekly Sunday evaluation meetings.",
        ],
      },
      {
        id: [
          "Mengelola penawaran ",
          { text: "sponsorship", italic: true },
          " kepada ",
          { text: "143 perusahaan", bold: true },
          " melalui ",
          { text: "email", italic: true },
          " serta mengunjungi ",
          { text: "5+ perusahaan", bold: true },
          " secara langsung untuk presentasi penawaran.",
        ],
        en: [
          "Managed sponsorship outreach to ",
          { text: "143 companies", bold: true },
          " by email and pitched ",
          { text: "5+ companies", bold: true },
          " in person.",
        ],
      },
    ],
  },
  {
    id: "bendahara-ais",
    badge: {
      id: "Manajemen Keuangan",
      en: "Financial Management",
    },
    title: {
      id: ["Bendahara — Asrama IPB Sukasari"],
      en: ["Treasurer — Asrama IPB Sukasari"],
    },
    period: {
      id: [{ text: "(Jan – Des 2025)", italic: true }],
      en: ["(Jan – Dec 2025)"],
    },
    image: "/images/organizations/bendahara-ais.webp",
    imageAlt: {
      id: "Dokumentasi Bendahara Asrama IPB Sukasari",
      en: "Asrama IPB Sukasari Treasurer documentation",
    },
    bullets: [
      {
        id: [
          "Mengelola kas dan anggaran asrama senilai ",
          { text: "Rp35+ juta", bold: true },
          " dengan prinsip akuntabilitas dan rekonsiliasi saldo tanpa selisih (",
          { text: "zero balance discrepancy", italic: true },
          ").",
        ],
        en: [
          "Managed ",
          { text: "IDR 35M+", bold: true },
          " in dormitory cash and operating budgets, keeping accountable records and reconciling balances with zero discrepancy.",
        ],
      },
      {
        id: [
          "Menyusun serta mempresentasikan laporan keuangan secara transparan setiap bulan kepada ",
          { text: "30+ penghuni", bold: true },
          " dan mengoordinasikan penagihan iuran SPP asrama.",
        ],
        en: [
          "Prepared and presented transparent monthly financial reports to ",
          { text: "30+ residents", bold: true },
          " and coordinated dormitory fee collection.",
        ],
      },
    ],
  },
  {
    id: "ketos-sma",
    badge: {
      id: "Kepemimpinan",
      en: "Leadership",
    },
    title: {
      id: ["Ketua OSIS — SMA Negeri 1 Talaga"],
      en: ["Student Council President (OSIS) — SMA Negeri 1 Talaga"],
    },
    period: {
      id: [{ text: "(Jan – Nov 2022)", italic: true }],
      en: ["(Jan – Nov 2022)"],
    },
    image: "/images/organizations/ketos-sma.webp",
    imageAlt: {
      id: "Dokumentasi Ketua OSIS SMA Negeri 1 Talaga",
      en: "Student Council President at SMA Negeri 1 Talaga documentation",
    },
    bullets: [
      {
        id: [
          "Membawahi ",
          { text: "62 anggota", bold: true },
          " pengurus (BPH dan sembilan seksi bidang), mulai dari memimpin rapat program kerja mingguan, menjembatani perizinan kegiatan dengan pihak sekolah, mengambil keputusan acara, hingga mengevaluasi kinerja anggota.",
        ],
        en: [
          "Directed ",
          { text: "62 student council officers", bold: true },
          " across the executive board and nine divisions—chairing weekly planning meetings, coordinating event permits with school leadership, making event decisions, and evaluating member performance.",
        ],
      },
    ],
  },
];
