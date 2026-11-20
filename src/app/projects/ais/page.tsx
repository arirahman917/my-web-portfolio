import type { Metadata } from "next";
import { PROJECTS_BY_SLUG } from "@/data/projects";
import { ProjectDetailTemplate } from "@/components/sections/projects/ProjectDetailTemplate";

export const metadata: Metadata = {
  title: "Website Profil & Sistem Pendaftaran — Asrama IPB Sukasari",
  description:
    "Studi kasus website profil beranimasi GSAP & Framer Motion serta portal pendaftaran dan penilaian wawancara Asrama IPB Sukasari.",
};

export default function AisProjectPage() {
  return <ProjectDetailTemplate project={PROJECTS_BY_SLUG.ais} />;
}
