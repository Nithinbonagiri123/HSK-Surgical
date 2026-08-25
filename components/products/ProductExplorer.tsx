'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search } from 'lucide-react';
import { products, specialties, getSpecialty, primarySpecialtyId, type SpecialtyId } from '@/lib/products';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductExplorer() {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState<SpecialtyId | 'all'>('all');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const inSpecialty =
        active === 'all' ||
        (Array.isArray(p.specialty) ? p.specialty.includes(active) : p.specialty === active);
      if (!inSpecialty) return false;
      if (!q) return true;
      const hay = [p.name, p.tagline, p.ref, p.overview].filter(Boolean).join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [query, active]);

  return (
    <div>
      <div className="sticky top-24 z-20">
        <div className="rounded-full border border-ink/10 bg-paper/90 backdrop-blur-xl shadow-[0_20px_50px_-30px_rgba(10,15,26,0.2)] px-3 py-2 flex flex-col md:flex-row md:items-center gap-3">
          <label className="flex-1 flex items-center gap-3 px-3 py-2 min-w-0">
            <Search size={16} className="text-ink/40 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search by name, REF, or keyword"
              className="w-full bg-transparent outline-none placeholder:text-ink/40 text-sm"
              aria-label="Search products"
            />
          </label>
          <div className="hidden md:block h-6 w-px bg-ink/10" />
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar px-1">
            <Chip active={active === 'all'} onClick={() => setActive('all')}>All</Chip>
            {specialties.map((s) => (
              <Chip key={s.id} active={active === s.id} onClick={() => setActive(s.id)}>
                {s.name}
              </Chip>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between px-2 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/50">
          <span>Results · {rows.length}</span>
          <span>Live index</span>
        </div>
      </div>

      <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {rows.map((p, i) => {
            const specialty = getSpecialty(primarySpecialtyId(p));
            return (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.03, ease }}
              >
                <Link
                  href={`/products/${p.slug}`}
                  className="group relative flex h-full flex-col rounded-2xl border border-ink/10 bg-paper p-6 transition-all duration-500 ease-precision hover:-translate-y-[3px] hover:border-ink/25"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ink/50">
                      {p.ref ?? '—'}
                    </span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-ink/60">
                      {specialty?.name}
                    </span>
                  </div>
                  <h3 className="mt-8 font-display font-medium text-2xl tracking-tight leading-tight">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink/65 text-pretty">{p.tagline}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4">
                    <span className="text-xs text-ink/50">
                      {p.variants ? `${p.variants.length} variants` : p.contents ? `${p.contents.length} in set` : 'Single item'}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-ink/40 transition-all duration-300 ease-precision group-hover:text-ink group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                    />
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {rows.length === 0 && (
        <div className="mt-16 rounded-2xl border border-ink/10 bg-paper p-12 text-center">
          <p className="font-display font-medium text-2xl">No products match your search.</p>
          <p className="mt-2 text-ink/60">Try a different keyword or clear the filters.</p>
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all',
        active ? 'bg-ink text-paper' : 'text-ink/70 hover:text-ink hover:bg-ink/[0.04]',
      )}
    >
      {children}
    </button>
  );
}
