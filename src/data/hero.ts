import type { BilingualRichText, BilingualText } from "./types";

export const HERO_DATA: {
  displayLines: [string, string];
  roles: string[];
  portrait: {
    src: string;
    alt: BilingualText;
  };
  availabilityLabel: BilingualText;
  availabilityPeriod: BilingualText;
  bottomLeftPrimary: BilingualText;
  bottomLeftSecondary: BilingualText;
  bottomRightPrimary: BilingualRichText;
  bottomRightSecondary: BilingualRichText;
} = {
  displayLines: ["SOFTWARE", "ENGINEER"],
  roles: ["FRONTEND", "SOFTWARE", "MOBILE", "FULLSTACK"],
  portrait: {
    src: "/images/hero.webp",
    alt: {
      id: "Potret Ari Rahman, Software Engineer",
      en: "Portrait of Ari Rahman, Software Engineer",
    },
  },
  availabilityLabel: {
    id: "Terbuka untuk Magang",
    en: "Open for Internship",
  },
  availabilityPeriod: {
    id: "Jan – Jun 2027",
    en: "Jan – Jun 2027",
  },
  bottomLeftPrimary: {
    id: "BOGOR, INDONESIA",
    en: "BOGOR, INDONESIA",
  },
  bottomLeftSecondary: {
    id: "REALISASI SOLUSI",
    en: "SOLUTION DELIVERY",
  },
  bottomRightPrimary: {
    id: ["PEDULI ", { text: "UX", italic: true }],
    en: ["UX-FOCUSED"],
  },
  bottomRightSecondary: {
    id: ["ANTUSIASME ", { text: "UI", italic: true }],
    en: ["UI ENTHUSIAST"],
  },
};
