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
}

export interface ServiceStatus {
  isLive: boolean;
  label?: string;
  streamUrl?: string;
  startedAt?: string;
  nextServiceAt?: string;
}
