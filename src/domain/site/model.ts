export interface ServiceTime {
  dayOfWeek: string[];
  opens: string;
  closes?: string;
  label: string;
  timezone?: string;
}

export interface Address {
  streetAddress: string;
  locality: string;
  region?: string;
  country: string;
  mapUrl?: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  x?: string;
  whatsapp?: string;
}

export interface Announcement {
  enabled: boolean;
  text: string;
  href?: string;
}

export interface Cta {
  label: string;
  href: string;
}

export interface HeroMedia {
  kind: 'image' | 'video';
  url: string;
  posterUrl?: string;
  alt?: string;
}

export interface Hero {
  headline?: string;
  /** A short phrase rendered in the accent color on its own line, under `headline`. */
  headlineAccent?: string;
  subheadline?: string;
  media?: HeroMedia;
  primaryCta?: Cta;
  secondaryCta?: Cta;
}

export interface Pillar {
  title: string;
  description?: string;
}

export interface SiteSettings {
  name: string;
  description?: string;
  logoUrl?: string;
  phone?: string;
  email?: string;
  address?: Address;
  socialLinks: SocialLinks;
  serviceTimes: ServiceTime[];
  announcement?: Announcement;
  hero?: Hero;
  pillars: Pillar[];
}

export interface ServiceStatus {
  isLive: boolean;
  label?: string;
  streamUrl?: string;
  startedAt?: string;
  nextServiceAt?: string;
}
