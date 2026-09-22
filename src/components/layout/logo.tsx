import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center', className)}>
      <Image
        src="/brand/logo.png"
        alt="Word Impact Community Church"
        width={285}
        height={115}
        priority
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
