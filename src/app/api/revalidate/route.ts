import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/config/env';

/**
 * Webhook target for the admin portal: "sermon published", "event updated",
 * etc. call this with the affected tag(s) so the next request gets fresh
 * data instead of waiting out the `revalidate` window.
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  if (!env.REVALIDATE_SECRET || secret !== env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const tags: unknown = body?.tags;
  if (!Array.isArray(tags) || tags.some(tag => typeof tag !== 'string')) {
    return NextResponse.json({ message: '"tags" must be a string array' }, { status: 400 });
  }

  // Called from outside a Server Action (an external webhook), so `updateTag`
  // isn't available — expire immediately rather than serving stale content.
  for (const tag of tags as string[]) revalidateTag(tag, { expire: 0 });

  return NextResponse.json({ revalidated: true, tags });
}
