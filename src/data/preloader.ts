import type { BilingualText } from "./types";

export const PRELOADER_DATA: {
  tagline: BilingualText;
  ariaLabel: BilingualText;
  steps: readonly number[];
  durationSec: number;
} = {
  tagline: {
    id: "Dari Masalah — Menjadi Solusi",
    en: "From Problem — To Solution",
  },
  ariaLabel: {
    id: "Memuat portofolio Ari Rahman",
    en: "Loading Ari Rahman portfolio",
  },
  steps: [0, 25, 75, 100],
  durationSec: 4,
};
