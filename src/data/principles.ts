import type { BilingualText, PrincipleData } from "./types";

export const PRINCIPLES_COPY: {
  heading: BilingualText;
} = {
  heading: {
    id: "Cara Kerja & Prinsip",
    en: "How I Work & Principles",
  },
};

export const PRINCIPLES: PrincipleData[] = [
  {
    id: "principle-01",
    indexLabel: {
      id: "( Keunggulan 01 )",
      en: "( Strength 01 )",
    },
    title: {
      id: ["Empati ", { text: "UX", italic: true }, " Berbasis Konteks"],
      en: ["Context-Driven UX Empathy"],
    },
    description: {
      id: [
        "Saya tidak menyamaratakan pendekatan desain. Untuk ",
        { text: "website", italic: true },
        " pemesanan (Landeuh), saya memangkas animasi berat dan mengacu pada ",
        { text: "muscle memory", italic: true },
        " pengguna agar transaksi cepat selesai; untuk ",
        { text: "website branding", italic: true },
        " (Asrama), saya merancang animasi GSAP penuh dengan optimasi aset WebP dan video; untuk WebGIS RINTIK, animasi dibatasi hanya pada ",
        { text: "landing page", italic: true },
        " agar halaman peta tetap nyaman digunakan; sementara untuk aplikasi kasir bagi pengguna nonteknis, saya mengadaptasi pola aplikasi harian yang sudah mereka kenal.",
      ],
      en: [
        "I tailor my design approach to each project. For the Landeuh booking site, I cut heavy animations and relied on user muscle memory so guests complete bookings quickly. For the Asrama branding site, I built full GSAP animations with optimized WebP images and video. For RINTIK WebGIS, I kept animations on the landing page only so the map stays comfortable to use. For a POS app serving non-technical users, I adapted patterns from everyday apps they already know.",
      ],
    },
  },
  {
    id: "principle-02",
    indexLabel: {
      id: "( Keunggulan 02 )",
      en: "( Strength 02 )",
    },
    title: {
      id: [{ text: "End-to-End Ownership", italic: true }, " & Komunikatif"],
      en: ["End-to-End Ownership & Clear Communication"],
    },
    description: {
      id: [
        "Terbiasa bergerak mulai dari wawancara kebutuhan klien atau mitra, penyusunan desain, pengembangan produk, pengujian langsung kepada pengguna, hingga pengelolaan alur kerja tim di GitHub Projects.",
      ],
      en: [
        "I handle the full product cycle, from interviewing clients and partners to designing interfaces, building the product, running user tests, and tracking team workflows in GitHub Projects.",
      ],
    },
  },
  {
    id: "principle-03",
    indexLabel: {
      id: "( Keunggulan 03 )",
      en: "( Strength 03 )",
    },
    title: {
      id: [
        "Adaptif & Bertanggung Jawab dengan ",
        { text: "AI Workflow", italic: true },
      ],
      en: ["Adaptable & Accountable AI Workflow"],
    },
    description: {
      id: [
        "Saya memanfaatkan ",
        { text: "AI coding tools", italic: true },
        " untuk mempercepat iterasi pengembangan produk, sambil tetap memegang kendali penuh atas desain sistem, arsitektur alur data, peninjauan kode, ",
        { text: "debugging", italic: true },
        ", dan penyesuaian kode secara langsung.",
      ],
      en: [
        "I use AI coding tools to speed up development iterations while keeping full ownership of system design, data flow architecture, code reviews, debugging, and direct code adjustments.",
      ],
    },
  },
  {
    id: "principle-04",
    indexLabel: {
      id: "( Keunggulan 04 )",
      en: "( Strength 04 )",
    },
    title: {
      id: ["Terbuka untuk Berkembang"],
      en: ["Open to Growth"],
    },
    description: {
      id: [
        "Fokus utama saya berada pada ",
        { text: "Frontend & Mobile Development", bold: true },
        ", khususnya ",
        { text: "React, Next.js, dan TypeScript", bold: true },
        " untuk web serta ",
        { text: "Flutter", bold: true },
        " untuk ",
        { text: "mobile", italic: true },
        ", dengan kemampuan ",
        { text: "Full-Stack", bold: true },
        " menggunakan Next.js, Laravel, dan BaaS (Supabase/Firebase). Saya terbuka untuk ditempatkan pada tim Software Engineering, Frontend, Mobile, maupun IT/Programmer sesuai kebutuhan tim dan siap belajar cepat di lingkungan kerja nyata.",
      ],
      en: [
        "My core focus is ",
        { text: "Frontend & Mobile Development", bold: true },
        ", specifically ",
        { text: "React, Next.js, and TypeScript", bold: true },
        " for web and ",
        { text: "Flutter", bold: true },
        " for mobile, alongside ",
        { text: "Full-Stack", bold: true },
        " work with Next.js, Laravel, and BaaS (Supabase/Firebase). I am open to joining Software Engineering, Frontend, Mobile, or IT/Programmer teams based on team needs and ready to learn quickly in production.",
      ],
    },
  },
];
