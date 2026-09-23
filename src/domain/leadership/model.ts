import type { SocialLinks } from '@/domain/site/model';

export interface Leader {
  id: string;
  slug: string;
  name: string;
  role?: string;
  bio?: string;
  photoUrl?: string;
  /** A second portrait, used only for the homepage senior-pastor spotlight's diagonal photo stack. */
  secondaryPhotoUrl?: string;
  socialLinks?: SocialLinks;
  order?: number;
}
