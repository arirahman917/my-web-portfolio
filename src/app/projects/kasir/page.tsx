import type { Metadata } from "next";
import { PROJECTS_BY_SLUG } from "@/data/projects";
import { ProjectDetailTemplate } from "@/components/sections/projects/ProjectDetailTemplate";

export const metadata: Metadata = {
  title: "Aplikasi Kasir Offline-First & Web Pemesanan — Toko All Rahman",
  description:
    "Studi kasus aplikasi kasir Android offline-first dengan sinkronisasi multiakun, cetak struk termal, dan web pemesanan pelanggan.",
};

export default function KasirProjectPage() {
  return <ProjectDetailTemplate project={PROJECTS_BY_SLUG.kasir} />;
}
