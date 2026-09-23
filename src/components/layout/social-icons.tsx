import type { SVGProps } from 'react';
import type { SocialLinks } from '@/domain/site/model';
import { cn } from '@/lib/utils/cn';

/**
 * lucide-react dropped brand/logo icons (trademark reasons) — these three
 * are drawn inline, matching lucide's 24x24 stroke style, rather than
 * pulling in a whole brand-icon package for three static glyphs.
 */
const iconProps: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function Facebook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Instagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-7.914 1.174 4 4 0 0 1 7.914-1.174z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Youtube(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const platformIcons = { facebook: Facebook, instagram: Instagram, youtube: Youtube } as const;

/**
 * The one "row of social icon links" treatment — reused by the footer (site
 * socials) and the pastor spotlight (a leader's own). Renders nothing when
 * there are no links at all, and skips any platform that isn't set, rather
 * than showing a dead/disabled icon.
 */
export function SocialLinksRow({ links, className }: { links?: SocialLinks; className?: string }) {
  const entries = (Object.keys(platformIcons) as (keyof typeof platformIcons)[]).filter(key => links?.[key]);
  if (entries.length === 0) return null;

  return (
    <div className={cn('flex gap-3', className)}>
      {entries.map(key => {
        const Icon = platformIcons[key];
        return (
          <a
            key={key}
            href={links![key]}
            target="_blank"
            rel="noreferrer"
            aria-label={key}
            className="border-border bg-surface text-muted hover:border-primary hover:bg-primary hover:text-on-primary flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
