import type { Metadata } from "next";
import { PROJECTS_BY_SLUG } from "@/data/projects";
import { ProjectDetailTemplate } from "@/components/sections/projects/ProjectDetailTemplate";

export const metadata: Metadata = {
  title: "WebGIS Persebaran & Analisis Lokasi UMKM — RINTIK",
  description:
    "Studi kasus platform WebGIS Kota Bogor (1.225 titik UMKM) dengan React, Next.js App Router, Tailwind CSS v4, Leaflet, dan Supabase PostGIS.",
};

export default function WebgisProjectPage() {
  return <ProjectDetailTemplate project={PROJECTS_BY_SLUG.webgis} />;
}
