import type { BilingualText, TechStackCardData } from "./types";

export const TECH_STACK_COPY: {
  heading: BilingualText;
  projectsTransitionWord: BilingualText;
} = {
  heading: {
    id: "TECH STACK & KEMAMPUAN",
    en: "TECH STACK & SKILLS",
  },
  projectsTransitionWord: {
    id: "PROYEK",
    en: "PROJECTS",
  },
};

export const TECH_STACK_CARDS: TechStackCardData[] = [
  {
    id: "frontend",
    title: "Frontend & Mobile",
    image: "/images/skills/frontend.webp",
    imageAlt: {
      id: "Pratinjau keahlian Frontend & Mobile",
      en: "Frontend & Mobile skills preview",
    },
    rotationDeg: 0,
    items: {
      id: [
        "JavaScript (ES6+), TypeScript, React, Next.Js, HTML, CSS, Tailwind CSS, GSAP, Framer Motion, Leaflet, Flutter (Dart), Responsive Design",
      ],
      en: [
        "JavaScript (ES6+), TypeScript, React, Next.js, HTML, CSS, Tailwind CSS, GSAP, Framer Motion, Leaflet, Flutter (Dart), Responsive Design",
      ],
    },
  },
  {
    id: "backend",
    title: "Backend",
    image: "/images/skills/backend.webp",
    imageAlt: {
      id: "Pratinjau keahlian Backend",
      en: "Backend skills preview",
    },
    rotationDeg: 8.8,
    items: {
      id: [
        "Next.Js Route Handlers, Laravel, PHP, REST API, MySQL, Firebase Firestore, Supabase (PostgreSQL/PostGIS), IsarDB",
      ],
      en: [
        "Next.js Route Handlers, Laravel, PHP, REST API, MySQL, Firebase Firestore, Supabase (PostgreSQL/PostGIS), IsarDB",
      ],
    },
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    image: "/images/skills/uiux.webp",
    imageAlt: {
      id: "Pratinjau keahlian UI/UX Design",
      en: "UI/UX Design skills preview",
    },
    rotationDeg: -3.5,
    items: {
      id: [
        "Figma, Wireframing, High-Fidelity Design, Prototyping, Information Architecture, User Flow, Usability Testing",
      ],
      en: [
        "Figma, Wireframing, High-Fidelity Design, Prototyping, Information Architecture, User Flow, Usability Testing",
      ],
    },
  },
  {
    id: "tools",
    title: "Tools",
    image: "/images/skills/tools.webp",
    imageAlt: {
      id: "Pratinjau keahlian Tools & Deployment",
      en: "Tools & Deployment skills preview",
    },
    rotationDeg: 4.7,
    items: {
      id: [
        "Git, GitHub, GitHub Projects, Vite, Vercel, Firebase Hosting, Cloudflare (DNS), Google Search Console",
      ],
      en: [
        "Git, GitHub, GitHub Projects, Vite, Vercel, Firebase Hosting, Cloudflare (DNS), Google Search Console",
      ],
    },
  },
  {
    id: "ai-assisted",
    title: "AI-Assisted",
    image: "/images/skills/ai-assisted.webp",
    imageAlt: {
      id: "Pratinjau alur kerja AI-Assisted",
      en: "AI-Assisted workflow preview",
    },
    rotationDeg: 0,
    items: {
      id: [
        "Antigravity CLI, Cursor CLI (Digunakan untuk mempercepat implementasi dengan tetap merancang arsitektur, meninjau kode, dan ",
        { text: "debugging", italic: true },
        ")",
      ],
      en: [
        "Antigravity CLI, Cursor CLI (Used to speed up implementation while I handle architecture design, code review, and debugging)",
      ],
    },
  },
];
