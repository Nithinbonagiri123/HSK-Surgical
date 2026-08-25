'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { LinkButton } from '@/components/ui/Button';
import { nav } from '@/lib/site';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-precision',
          scrolled ? 'py-2.5' : 'py-4',
        )}
      >
        <div
          className={cn(
            'container mx-auto flex items-center justify-between transition-all duration-500 ease-precision',
            scrolled
              ? 'bg-paper/85 backdrop-blur-xl border border-ink/8 rounded-full px-4 py-2 shadow-[0_10px_30px_-20px_rgba(10,15,26,0.2)]'
              : 'bg-transparent px-2 py-2',
          )}
        >
          <Logo />
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
            {nav.primary.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative px-4 py-2 text-sm rounded-full transition-colors',
                    'text-ink/65 hover:text-ink',
                    active && 'text-ink',
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-ink/[0.06]"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="hidden lg:block">
            <LinkButton href={nav.cta.href} variant="primary" size="sm" arrow>
              {nav.cta.label}
            </LinkButton>
          </div>
          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper/80 backdrop-blur-xl border border-ink/10"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-ink text-paper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto flex items-center justify-between py-4">
        <Logo variant="paper" />
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper/20"
          aria-label="Close menu"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>
      <nav className="container mx-auto mt-14" aria-label="Mobile primary">
        <ul className="flex flex-col divide-y divide-paper/10 border-y border-paper/10">
          {nav.primary.map((item, i) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={item.href} className="group flex items-baseline justify-between py-6">
                <span className="font-display font-medium text-4xl md:text-5xl tracking-tighter">
                  {item.label}
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-paper/45">
                  {String(i + 1).padStart(2, '0')} /{nav.primary.length}
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
        <div className="mt-10">
          <LinkButton href={nav.cta.href} variant="onInk" arrow>
            {nav.cta.label}
          </LinkButton>
        </div>
      </nav>
    </motion.div>
  );
}
