'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Calendar, Heart, Menu } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MAIN_NAV } from '@/config/site';
import { routes } from '@/config/routes';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent title="Menu">
        <SheetDescription>Site navigation</SheetDescription>
        <nav className="flex flex-col gap-1">
          {MAIN_NAV.map(group => (
            <div key={group.label} className="border-border border-b py-3 first:pt-0">
              {group.href ? (
                <SheetClose asChild>
                  <Link href={group.href} className="text-body-lg font-semibold text-ink">
                    {group.label}
                  </Link>
                </SheetClose>
              ) : (
                <>
                  <p className="text-subtle text-label font-semibold uppercase tracking-wide">
                    {group.label}
                  </p>
                  <div className="mt-2 flex flex-col gap-2">
                    {group.items?.map(item => (
                      <SheetClose asChild key={item.href}>
                        <Link href={item.href} className="text-body text-ink">
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </nav>
        <div className="mt-6 flex flex-col gap-3">
          <SheetClose asChild>
            <Button asChild size="lg">
              <Link href={routes.give()}>
                <Heart aria-hidden="true" className="h-4 w-4" />
                Give
              </Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild variant="outline" size="lg">
              <Link href={routes.visit()}>
                <Calendar aria-hidden="true" className="h-4 w-4" />
                Plan a Visit
              </Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
