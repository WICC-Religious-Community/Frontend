'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * The API paginates by cursor (`nextCursor`), not page number, so this is a
 * "Load more" control rather than numbered pagination — one component for
 * every cursor-paginated list (sermons, events, blog).
 */
export function LoadMore({
  onClick,
  isLoading,
  hasMore,
}: {
  onClick: () => void;
  isLoading: boolean;
  hasMore: boolean;
}) {
  if (!hasMore) return null;
  return (
    <div className="mt-10 flex justify-center">
      <Button variant="outline" size="lg" onClick={onClick} disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isLoading ? 'Loading…' : 'Load more'}
      </Button>
    </div>
  );
}
