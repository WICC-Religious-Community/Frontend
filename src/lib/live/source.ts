import { env } from '@/config/env';

type Listener<T = unknown> = (data: T) => void;

const MAX_BACKOFF_MS = 30_000;
const BASE_BACKOFF_MS = 1_000;
const RECONNECT_DEBOUNCE_MS = 50;

/**
 * One multiplexed SSE connection for the whole app. Components subscribe to a
 * named topic (`lib/live/topics.ts`); the connection's `?topics=` query is
 * the union of every currently-subscribed topic, re-opened (debounced) as
 * subscriptions come and go. Ref-counted, so five components on the same
 * topic share one wire subscription.
 *
 * Browser-only by construction (`EventSource` doesn't exist on the server) —
 * every page still server-renders a REST snapshot first; this only takes over
 * once mounted client-side. See `use-live.ts`.
 */
class LiveConnection {
  private source: EventSource | null = null;
  private listeners = new Map<string, Set<Listener>>();
  private refCounts = new Map<string, number>();
  private reconnectAttempt = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private rebuildTimer: ReturnType<typeof setTimeout> | null = null;
  private visibilityBound = false;

  subscribe<T>(topic: string, listener: Listener<T>): () => void {
    if (typeof window === 'undefined') return () => {};

    this.bindVisibility();
    const set = this.listeners.get(topic) ?? new Set();
    set.add(listener as Listener);
    this.listeners.set(topic, set);
    this.refCounts.set(topic, (this.refCounts.get(topic) ?? 0) + 1);
    this.scheduleRebuild();

    return () => {
      set.delete(listener as Listener);
      const remaining = (this.refCounts.get(topic) ?? 1) - 1;
      if (remaining <= 0) {
        this.refCounts.delete(topic);
        this.listeners.delete(topic);
      } else {
        this.refCounts.set(topic, remaining);
      }
      this.scheduleRebuild();
    };
  }

  private bindVisibility() {
    if (this.visibilityBound || typeof document === 'undefined') return;
    this.visibilityBound = true;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.close();
      } else {
        this.reconnectAttempt = 0;
        this.rebuild();
      }
    });
  }

  private scheduleRebuild() {
    if (this.rebuildTimer) clearTimeout(this.rebuildTimer);
    this.rebuildTimer = setTimeout(() => this.rebuild(), RECONNECT_DEBOUNCE_MS);
  }

  private rebuild() {
    this.close();
    const topics = [...this.listeners.keys()];
    if (topics.length === 0 || document.hidden) return;
    if (env.NEXT_PUBLIC_LIVE_TRANSPORT === 'poll') return; // polling handled per-hook

    // In mock mode there is no backend yet — Next's own `/api/mock-stream`
    // route generates a genuine SSE feed instead (see that route's doc
    // comment). Live mode points straight at the backend's stream.
    const base =
      env.NEXT_PUBLIC_API_MODE === 'mock' ? '/api/mock-stream' : `${env.NEXT_PUBLIC_API_URL}/v1/stream`;
    const url = `${base}?topics=${encodeURIComponent(topics.join(','))}`;
    const source = new EventSource(url, { withCredentials: false });
    this.source = source;

    for (const topic of topics) {
      source.addEventListener(topic, (event: MessageEvent) => {
        this.reconnectAttempt = 0;
        this.dispatch(topic, event.data);
      });
    }

    source.onerror = () => {
      source.close();
      this.source = null;
      this.reconnectAttempt += 1;
      const delay = Math.min(BASE_BACKOFF_MS * 2 ** this.reconnectAttempt, MAX_BACKOFF_MS);
      if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
      this.reconnectTimer = setTimeout(() => this.rebuild(), delay);
    };
  }

  private dispatch(topic: string, raw: string) {
    const set = this.listeners.get(topic);
    if (!set || set.size === 0) return;
    let parsed: unknown = raw;
    try {
      parsed = JSON.parse(raw);
    } catch {
      // non-JSON payload — deliver as-is
    }
    for (const listener of set) listener(parsed);
  }

  private close() {
    this.source?.close();
    this.source = null;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
}

/** One instance per browser tab — module-level singleton by design. */
export const liveConnection = new LiveConnection();
