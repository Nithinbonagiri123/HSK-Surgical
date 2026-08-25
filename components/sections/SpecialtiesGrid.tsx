'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { specialties, getBySpecialty } from '@/lib/products';

const ease = [0.22, 1, 0.36, 1] as const;

export function SpecialtiesGrid() {
  return (
    <section className="relative bg-paper py-28 md:py-40 border-t border-ink/8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <div className="eyebrow mb-6">02 · Specialties</div>
            <h2 className="font-display font-medium text-display-xl text-balance leading-[1.02]">
              Solutions across the surgical suite.
            </h2>
          </div>
          <p className="max-w-md text-ink/60 text-lg">
            Ranges organised the way surgical teams work — from diagnostic endoscopy to specialised electrosurgery accessories.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/8 rounded-2xl overflow-hidden border border-ink/8">
          {specialties.map((s, i) => (
            <SpecialtyCard key={s.id} s={s} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function SpecialtyCard({
  s,
  index,
}: {
  s: typeof specialties[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const count = getBySpecialty(s.id).length;
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: index * 0.05, ease }}
    >
      <Link
        href={s.href}
        className="group relative block h-full bg-paper p-8 md:p-10 overflow-hidden transition-colors duration-500 hover:bg-paper-200"
      >
        <SpecialtyMotif id={s.id} />

        <div className="relative flex items-start justify-between">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/40">
            {String(index + 1).padStart(2, '0')} · {count} products
          </div>
          <ArrowUpRight
            size={18}
            className="text-ink/40 transition-all duration-500 ease-precision group-hover:text-ink group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
          />
        </div>

        <div className="relative mt-24 md:mt-32">
          <h3 className="font-display font-medium text-3xl md:text-4xl tracking-tighter leading-[1.02]">
            {s.name}
          </h3>
          <p className="mt-3 text-sm text-ink/60 max-w-sm text-pretty">
            {s.description}
          </p>
        </div>

        {!reduce && (
          <span
            aria-hidden
            className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-precision group-hover:scale-x-100"
          />
        )}
      </Link>
    </motion.li>
  );
}

function SpecialtyMotif({ id }: { id: (typeof specialties)[number]['id'] }) {
  const common = 'absolute right-6 top-6 h-32 w-32 text-ink/[0.09] transition-colors duration-500 group-hover:text-ink/25';
  switch (id) {
    case 'endoscopy':
      return (
        <svg className={common} viewBox="0 0 128 128" aria-hidden>
          <path d="M20 108 L100 28" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="28" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="28" r="3" fill="currentColor" />
          <path d="M20 108 L20 96 L32 96" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'general-surgery':
      return (
        <svg className={common} viewBox="0 0 128 128" aria-hidden>
          <path d="M18 96 L104 24" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M104 24 L114 30 L108 40 L98 34 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M18 96 L14 100 M18 96 L14 92" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'gynaecology':
      return (
        <svg className={common} viewBox="0 0 128 128" aria-hidden>
          <path d="M32 40 Q64 24 96 40 L96 88 Q64 104 32 88 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M32 64 L96 64" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'ent':
      return (
        <svg className={common} viewBox="0 0 128 128" aria-hidden>
          <path d="M40 100 L72 32 L88 32 L60 108 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="80" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'electrosurgery':
      return (
        <svg className={common} viewBox="0 0 128 128" aria-hidden>
          <path d="M32 24 L88 24 L88 88 L96 96" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M56 44 L72 60 L56 76 L72 92" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'clearview':
      return (
        <svg className={common} viewBox="0 0 128 128" aria-hidden>
          <circle cx="64" cy="64" r="34" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="64" cy="64" r="18" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M40 40 L88 88" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.6" />
        </svg>
      );
    default:
      return null;
  }
}
