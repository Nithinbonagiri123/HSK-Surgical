import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * HSK mark — clean, technical, precision-instrument feel.
 * A crosshair anchored inside a circular boundary.
 */
export function Logo({
  variant = 'ink',
  className,
  href = '/',
}: {
  variant?: 'ink' | 'paper';
  className?: string;
  href?: string;
}) {
  const color = variant === 'ink' ? 'text-ink' : 'text-paper';
  return (
    <Link
      href={href}
      className={cn('inline-flex items-center gap-3 group', color, className)}
      aria-label="HSK Surgical — home"
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center">
        <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
          <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeWidth="1" />
          <line x1="16" y1="4" x2="16" y2="10" stroke="currentColor" strokeWidth="1" />
          <line x1="16" y1="22" x2="16" y2="28" stroke="currentColor" strokeWidth="1" />
          <line x1="4" y1="16" x2="10" y2="16" stroke="currentColor" strokeWidth="1" />
          <line x1="22" y1="16" x2="28" y2="16" stroke="currentColor" strokeWidth="1" />
          <circle cx="16" cy="16" r="2" fill="currentColor" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-medium tracking-tight">HSK Surgical</span>
        <span className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.28em] opacity-55">
          Surgical Instruments · IE
        </span>
      </span>
    </Link>
  );
}
