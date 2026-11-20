"use client";

import { Fragment } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { BilingualRichText, TextSegment } from "@/data/types";

type RichTextProps =
  | {
      copy: BilingualRichText;
      segments?: never;
      className?: string;
    }
  | {
      segments: TextSegment[];
      copy?: never;
      className?: string;
    };

function renderSegment(segment: TextSegment, index: number) {
  if (typeof segment === "string") {
    return <Fragment key={index}>{segment}</Fragment>;
  }

  let content: React.ReactNode = segment.text;
  if (segment.italic) {
    content = <em>{content}</em>;
  }
  if (segment.bold) {
    content = <strong className="font-semibold">{content}</strong>;
  }

  if (segment.href) {
    return (
      <a
        key={index}
        href={segment.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-current/40 underline-offset-4 transition-colors hover:text-primary-blue hover:decoration-primary-blue"
      >
        {content}
      </a>
    );
  }

  return <Fragment key={index}>{content}</Fragment>;
}

/**
 * Renders structured bilingual text segments safely without dangerouslySetInnerHTML,
 * preserving <em> italicization on English terms in Indonesian mode.
 */
export function RichText({ copy, segments, className }: RichTextProps) {
  const { locale } = useLanguage();
  const resolved = segments ?? copy[locale];

  return (
    <span className={className}>
      {resolved.map((segment, index) => renderSegment(segment, index))}
    </span>
  );
}
