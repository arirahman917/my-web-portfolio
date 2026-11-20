import type { Metadata } from "next";
import { PROJECTS_BY_SLUG } from "@/data/projects";
import { ProjectDetailTemplate } from "@/components/sections/projects/ProjectDetailTemplate";

export const metadata: Metadata = {
  title: "Website Pemesanan Penginapan & Dashboard Admin — Landeuh Village Riverside",
  description:
    "Studi kasus platform reservasi penginapan dengan fitur blok slot pencegah double booking, integrasi Midtrans, dan kontrak komersial.",
};

export default function LandeuhProjectPage() {
  return <ProjectDetailTemplate project={PROJECTS_BY_SLUG.landeuh} />;
}
