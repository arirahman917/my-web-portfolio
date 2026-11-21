import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { CvOption, CvVariant } from "@/data/types";

const ID_PATTERN =
  /\(\s*(?:id|ind|indo|indonesia|indonesian)\s*\)|(?:^|[\s_-])(?:id|ind|indo|indonesia|indonesian)$/i;
const EN_PATTERN =
  /\(\s*(?:en|eng|english)\s*\)|(?:^|[\s_-])(?:en|eng|english)$/i;

/** Converts a folder name such as `frontend-developer` into `CV FRONTEND DEVELOPER`. */
function formatFolderLabel(folderName: string): string {
  const normalized = folderName
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();

  if (!normalized) return "CV";
  return normalized.startsWith("CV ") || normalized === "CV"
    ? normalized
    : `CV ${normalized}`;
}

function buildFileHref(folderName: string, fileName: string): string {
  return `/cv/${encodeURIComponent(folderName)}/${encodeURIComponent(fileName)}`;
}

function scanFolderVariants(folderName: string): CvVariant[] {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(
      path.join(process.cwd(), "public", "cv", folderName),
      { withFileTypes: true }
    );
  } catch {
    return [];
  }

  const pdfFiles = entries
    .filter((entry) => entry.isFile() && /\.pdf$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));

  let idFile: string | null = null;
  let enFile: string | null = null;
  const extraFiles: string[] = [];

  for (const fileName of pdfFiles) {
    const stem = fileName.replace(/\.pdf$/i, "").trim();
    if (!idFile && ID_PATTERN.test(stem)) {
      idFile = fileName;
    } else if (!enFile && EN_PATTERN.test(stem)) {
      enFile = fileName;
    } else {
      extraFiles.push(fileName);
    }
  }

  const variants: CvVariant[] = [];

  if (idFile) {
    variants.push({
      key: `${folderName}-id`,
      langCode: "ID",
      label: { id: "Bahasa Indonesia", en: "Indonesian" },
      href: buildFileHref(folderName, idFile),
      fileName: idFile,
    });
  }

  if (enFile) {
    variants.push({
      key: `${folderName}-en`,
      langCode: "EN",
      label: { id: "Bahasa Inggris", en: "English" },
      href: buildFileHref(folderName, enFile),
      fileName: enFile,
    });
  }

  for (const fileName of extraFiles) {
    const cleanName = fileName.replace(/\.pdf$/i, "").trim();
    variants.push({
      key: `${folderName}-${fileName}`,
      langCode: "PDF",
      label: { id: cleanName, en: cleanName },
      href: buildFileHref(folderName, fileName),
      fileName,
    });
  }

  return variants;
}

/**
 * Discovers CV role folders and their ID/EN PDF variants under `public/cv/`.
 * Adding a new subfolder under `public/cv/` automatically exposes it in Navbar and Footer dropdowns.
 */
export const getCvOptions = cache((): CvOption[] => {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(path.join(process.cwd(), "public", "cv"), {
      withFileTypes: true,
    });
  } catch {
    return [];
  }

  return entries
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !entry.name.startsWith(".") &&
        !entry.name.startsWith("_")
    )
    .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }))
    .map((entry) => ({
      key: entry.name,
      folderName: entry.name,
      label: formatFolderLabel(entry.name),
      variants: scanFolderVariants(entry.name),
    }));
});
