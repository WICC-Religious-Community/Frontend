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
    <div className="on-dark bg-dark flex aspect-video flex-col items-center justify-center rounded-lg text-center">
      <p className="eyebrow">Not Currently Live</p>
      <p className="font-display mt-3 text-heading-lg font-semibold text-on-dark">
        {status.label ?? 'Join us for our next service'}
      </p>
      {countdown && !countdown.isPast ? (
        <p className="text-muted mt-2 text-body-sm">
          Starts in {countdown.days > 0 ? `${countdown.days}d ` : ''}
          {countdown.hours}h {countdown.minutes}m
        </p>
      ) : null}
    </div>
  );
}
