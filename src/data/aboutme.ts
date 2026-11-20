import type { BilingualRichText, BilingualText } from "./types";

export const ABOUT_ME_DATA: {
  images: Array<{ src: string; alt: BilingualText }>;
  leftTitle: string;
  leftBio: BilingualRichText;
  leftPill: BilingualText;
  rightTitle: string;
  rightDegree: BilingualText;
  rightPeriod: BilingualRichText;
  rightBio: BilingualRichText;
  rightPill: BilingualRichText;
} = {
  images: [
    {
      src: "/images/aboutme/1.webp",
      alt: {
        id: "Foto profil Ari Rahman 1",
        en: "Ari Rahman portrait 1",
      },
    },
    {
      src: "/images/aboutme/2.webp",
      alt: {
        id: "Foto profil Ari Rahman 2",
        en: "Ari Rahman portrait 2",
      },
    },
    {
      src: "/images/aboutme/3.webp",
      alt: {
        id: "Foto profil Ari Rahman 3",
        en: "Ari Rahman portrait 3",
      },
    },
  ],
  leftTitle: "ARI RAHMAN",
  leftBio: {
    id: [
      "Ketertarikan saya pada rekayasa perangkat lunak berawal dari masalah di sekitar: pencatatan manual toko keluarga, ",
      { text: "double booking", italic: true },
      " vila, hingga kurangnya ",
      { text: "branding", italic: true },
      " asrama. Bagi saya, teknologi yang baik harus terasa mudah dipakai oleh orang awam.",
    ],
    en: [
      "My interest in software engineering began with everyday problems around me: manual bookkeeping in my family's shop, double-booked villas, and an unbranded dormitory. To me, good technology should be easy for non-technical people to use.",
    ],
  },
  leftPill: {
    id: "Semester 5 · IPK 3,66/4,00",
    en: "Semester 5 · GPA 3.66/4.00",
  },
  rightTitle: "IPB UNIVERSITY",
  rightDegree: {
    id: "D4 Teknologi Rekayasa Perangkat Lunak",
    en: "B.A.Sc. in Software Engineering Technology",
  },
  rightPeriod: {
    id: [{ text: "(Agu 2024 – Sekarang)", italic: true }],
    en: ["(Aug 2024 – Present)"],
  },
  rightBio: {
    id: [
      "Terbiasa menggali kebutuhan pengguna nyata terlebih dahulu, lalu menerjemahkannya menjadi desain antarmuka dan kode yang teruji langsung.",
    ],
    en: [
      "I uncover real user needs first, then translate them into interface designs and code tested in practice.",
    ],
  },
  rightPill: {
    id: ["Siap Magang · ", { text: "Full-Time", italic: true }],
    en: ["Available for Internship · Full-Time"],
  },
};
