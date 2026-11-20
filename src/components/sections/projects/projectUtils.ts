import type { TextSegment } from "@/data/types";

/** Flattens structured `RichText` segments into plain text for alt attributes and stable keys. */
export function extractPlainText(segments: TextSegment[]): string {
  return segments
    .map((segment) => (typeof segment === "string" ? segment : segment.text))
    .join("");
}
