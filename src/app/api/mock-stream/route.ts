import { NextRequest } from 'next/server';
import { serviceStatusFixture } from '@/domain/site/fixtures';
import { testimonialsFixture } from '@/domain/testimonials/fixtures';

export const dynamic = 'force-dynamic';

/**
 * A real SSE endpoint that stands in for the backend's `/v1/stream` in mock
 * mode (`NEXT_PUBLIC_API_MODE=mock`) — see `lib/live/source.ts`. Not MSW:
 * MSW doesn't intercept `EventSource`, so this is Next itself generating a
 * genuine live feed, which is a more honest demo of the real-time layer than
 * faking it. Emits a heartbeat plus a synthetic event per subscribed topic
 * every few seconds so the UI's live indicators visibly move in mock mode.
 */
export async function GET(request: NextRequest) {
  const topics = (request.nextUrl.searchParams.get('topics') ?? '')
    .split(',')
    .map(topic => topic.trim())
    .filter(Boolean);

  const encoder = new TextEncoder();
  let closed = false;

  const stream = new ReadableStream({
    start(controller) {
      const send = (event: string, data: unknown) => {
        if (closed) return;
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };

      // Immediate snapshot so subscribers don't wait for the first tick.
      for (const topic of topics) send(topic, mockPayloadFor(topic));

      const interval = setInterval(() => {
        for (const topic of topics) send(topic, mockPayloadFor(topic));
      }, 8_000);

      request.signal.addEventListener('abort', () => {
        closed = true;
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}

let tick = 0;

function mockPayloadFor(topic: string): unknown {
  tick += 1;

  if (topic === 'service-status') {
    // Flips "live" on roughly every third tick so the banner is visibly demoable.
    return { ...serviceStatusFixture, isLive: tick % 3 === 0 };
  }

  if (topic === 'testimonials') {
    const sample = testimonialsFixture[tick % testimonialsFixture.length];
    return { ...sample, id: `${sample.id}-live-${tick}`, submittedAt: new Date().toISOString() };
  }

  if (topic.startsWith('event-availability:')) {
    const eventId = topic.split(':')[1];
    return { eventId, capacity: 80, seatsTaken: Math.min(80, 40 + (tick % 40)) };
  }

  if (topic.startsWith('giving-campaign:')) {
    const campaignId = topic.split(':')[1];
    return { id: campaignId, raisedAmount: 31_200_000 + tick * 15_000 };
  }

  return {};
}
