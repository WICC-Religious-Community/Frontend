'use client';

import Image from 'next/image';
import { useMediaQuery } from '@/hooks/use-media-query';
import type { HeroMedia as HeroMediaModel } from '@/domain/site/model';

/**
 * Full-bleed background for the hero. Video only plays for visitors who
 * haven't asked for reduced motion; everyone else (and the video's own
 * loading state) gets the poster still. Decorative unless the church
 * supplied alt text.
 */
export function HeroMedia({ media }: { media: HeroMediaModel }) {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const playVideo = media.kind === 'video' && !reduceMotion;
  const still = media.kind === 'video' ? media.posterUrl : media.url;

  return (
    <div className="absolute inset-0 -z-20" aria-hidden={media.alt ? undefined : true}>
      {playVideo ? (
        <video
          className="h-full w-full object-cover"
          src={media.url}
          poster={media.posterUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={media.alt}
        />
      ) : still ? (
        <Image src={still} alt={media.alt ?? ''} fill priority sizes="100vw" className="object-cover" />
      ) : null}
    </div>
  );
}
