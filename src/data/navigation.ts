import { SOCIAL_LINKS } from "./links";
import type { BilingualText, CvOption, NavLinkItem } from "./types";

export const NAV_LINKS: NavLinkItem[] = [
  {
    key: "projects",
    label: { id: "PROYEK", en: "PROJECTS" },
    href: "/#projects",
  },
  {
    key: "achievements",
    label: { id: "PERAIHAN", en: "ACHIEVEMENTS" },
    href: "/#achievements",
  },
  {
    key: "organizations",
    label: { id: "ORGANISASI", en: "ORGANIZATIONS" },
    href: "/#organizations",
  },
  {
    key: "about",
    label: { id: "TENTANG", en: "ABOUT" },
    href: "/#about-me",
  },
  {
    key: "contact",
    label: { id: "KONTAK", en: "CONTACT" },
    href: "/#footer",
  },
];

export const CV_OPTIONS: CvOption[] = [
  {
    key: "software-engineer",
    label: { id: "CV SOFT. ENG.", en: "CV SOFT. ENG." },
    href: "/cv/cv-software-engineer.pdf",
    fileName: "Ari-Rahman-CV-Software-Engineer.pdf",
    isAvailable: true,
  },
  {
    key: "frontend",
    label: { id: "CV FRONTEND", en: "CV FRONTEND" },
    href: "/cv/cv-frontend.pdf",
    fileName: "Ari-Rahman-CV-Frontend.pdf",
    isAvailable: false,
  },
  {
    key: "devops",
    label: { id: "CV DEVOPS", en: "CV DEVOPS" },
    href: "/cv/cv-devops.pdf",
    fileName: "Ari-Rahman-CV-DevOps.pdf",
    isAvailable: false,
  },
];

export const NAV_COPY: {
  openMenuAria: BilingualText;
  closeMenuAria: BilingualText;
  downloadCvButton: BilingualText;
  footerDownloadCvButton: BilingualText;
  footerHeadline: BilingualText;
  email: string;
  socialLinks: Array<{ key: string; label: string; href: string }>;
} = {
  openMenuAria: {
    id: "Buka menu navigasi",
    en: "Open navigation menu",
  },
  closeMenuAria: {
    id: "Tutup menu navigasi",
    en: "Close navigation menu",
  },
  downloadCvButton: {
    id: "UNDUH CV",
    en: "DOWNLOAD CV",
  },
  footerDownloadCvButton: {
    id: "Unduh CV",
    en: "Download CV",
  },
  footerHeadline: {
    id: "LET'S CONNECT",
    en: "LET'S CONNECT",
  },
  email: SOCIAL_LINKS.emailAddress,
  socialLinks: [
    { key: "linkedin", label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
    { key: "whatsapp", label: "WhatsApp", href: SOCIAL_LINKS.whatsapp },
    { key: "instagram", label: "Instagram", href: SOCIAL_LINKS.instagram },
    { key: "github", label: "GitHub", href: SOCIAL_LINKS.github },
  ],
};
