'use client';

import { CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { icsDataUrl, type IcsEventInput } from '@/lib/ics';

export function AddToCalendar(event: IcsEventInput) {
  return (
    <Button asChild variant="outline">
      <a href={icsDataUrl(event)} download={`${event.uid}.ics`}>
        <CalendarPlus className="h-4 w-4" /> Add to calendar
      </a>
    </Button>
  );
}
