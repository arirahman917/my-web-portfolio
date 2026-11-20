export type Locale = "id" | "en";

export type TextSegment =
  | string
  | {
      text: string;
      italic?: boolean;
      bold?: boolean;
      href?: string;
    };

export type BilingualRichText = Record<Locale, TextSegment[]>;
export type BilingualText = Record<Locale, string>;

export interface ExternalLinkItem {
  label: BilingualText;
  href: string;
}

export interface NavLinkItem {
  key: string;
  label: BilingualText;
  href: string;
}

export interface CvOption {
  key: string;
  label: BilingualText;
  href: string;
  fileName: string;
  isAvailable: boolean;
}

export interface TechStackCardData {
  id: string;
  title: string;
  image: string;
  imageAlt: BilingualText;
  rotationDeg: number;
  items: BilingualRichText;
}

export type ProjectSlug = "kasir" | "landeuh" | "ais" | "webgis";

export interface ProjectProcessStep {
  stepNumber: string;
  title: BilingualRichText;
  description: BilingualRichText;
}

export interface ProjectDecisionItem {
  title: BilingualRichText;
  description: BilingualRichText;
}

export interface ProjectData {
  slug: ProjectSlug;
  route: `/projects/${ProjectSlug}`;
  landingImage: string;
  landingAlt: BilingualText;
  visitUrl: string;
  title: BilingualRichText;
  subtitle: BilingualRichText;
  focus: BilingualText;
  techStack: string;
  period: BilingualText;
  mockupImage: string;
  resultBannerImage: string;
  resultObjectImage: string;
  problem: BilingualRichText[];
  contribution: BilingualRichText[];
  processSteps: ProjectProcessStep[];
  decisions: ProjectDecisionItem[];
  resultSummary: BilingualRichText;
  resultActions: ExternalLinkItem[];
  reflections: BilingualRichText[];
}

export type AchievementSlug = "joints" | "ifest" | "jurnal" | "pelita";

export interface AchievementDetailBlock {
  id: string;
  text: BilingualRichText;
  actions?: ExternalLinkItem[];
  media?: Array<{
    src: string;
    alt: BilingualText;
    width?: number;
    height?: number;
  }>;
}

export interface AchievementData {
  slug: AchievementSlug;
  indexNumber: number;
  landingImage: string;
  landingAlt: BilingualText;
  title: BilingualRichText;
  period: BilingualText;
  detailBlocks: AchievementDetailBlock[];
}

export interface OrganizationData {
  id: string;
  badge: BilingualText;
  title: BilingualRichText;
  period: BilingualRichText;
  image: string;
  imageAlt: BilingualText;
  bullets: BilingualRichText[];
}

export interface PrincipleData {
  id: string;
  indexLabel: BilingualText;
  title: BilingualRichText;
  description: BilingualRichText;
  isPendingContent?: boolean;
}
