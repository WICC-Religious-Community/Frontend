'use client';

import { useServiceStatus } from '@/domain/site/client';
import { useCountdown } from '@/lib/live/countdown';
import { VideoEmbed } from '@/components/media/video-embed';
import type { ServiceStatus } from '@/domain/site/model';

export function WatchLive({ initial }: { initial: ServiceStatus }) {
  const status = useServiceStatus(initial);
  const countdown = useCountdown(!status.isLive ? status.nextServiceAt ?? null : null);

  if (status.isLive) {
    return <VideoEmbed src={status.streamUrl} title={status.label ?? 'Live Service'} />;
  }

  return (
    <div className="on-dark bg-grain bg-dark relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-lg text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_100%,var(--color-primary-tint-strong),transparent_70%)]"
      />
      <p className="eyebrow relative">Not Currently Live</p>
      <p className="font-display text-display-sm relative mt-4 max-w-md font-semibold text-balance text-on-dark">
        {status.label ?? 'Join us for our next service'}
      </p>
      {countdown && !countdown.isPast ? (
        <p className="text-muted relative mt-3 text-body-lg tabular-nums">
          Starts in {countdown.days > 0 ? `${countdown.days}d ` : ''}
          {countdown.hours}h {countdown.minutes}m
        </p>
      ) : null}
    </div>
  );
}
