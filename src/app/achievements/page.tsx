import type { Metadata } from "next";
import { ACHIEVEMENTS } from "@/data/achievements";
import { AchievementsAccordion } from "@/components/sections/achievements/AchievementsAccordion";

export const metadata: Metadata = {
  title: "Kompetisi & Prestasi",
  description:
    "Rekam jejak kompetisi hackathon nasional (JOINTS UGM 2026, Ifest Unpad 2026), publikasi jurnal ilmiah SINTA 4 (JTIK), dan studi kasus UI/UX Pelita.",
};

export default function AchievementsPage() {
  return <AchievementsAccordion achievements={ACHIEVEMENTS} />;
}
