'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getFeatured, getSpecialty, primarySpecialtyId } from '@/lib/products';

const ease = [0.22, 1, 0.36, 1] as const;

export function FeaturedProducts() {
  const items = getFeatured();
  return (
    <section className="relative bg-paper-50 py-28 md:py-40 border-t border-ink/8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="eyebrow mb-6">03 · Featured</div>
            <h2 className="font-display font-medium text-display-xl text-balance leading-[1.02] max-w-2xl">
              Signature instruments in the HSK range.
            </h2>
          </div>
          <Link href="/products" className="group inline-flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-ink">
            View all products
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 ease-precision group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </Link>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((p, i) => {
            const specialty = getSpecialty(primarySpecialtyId(p));
            return (
              <motion.li
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.85, delay: i * 0.06, ease }}
              >
                <Link
                  href={`/products/${p.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-paper border border-ink/8 transition-all duration-500 ease-precision hover:-translate-y-[3px] hover:border-ink/25"
                >
                  {/* Product visual */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-paper-200">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <InstrumentGlyph slug={p.slug} />
                    </div>
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink/50">
                        {p.ref ?? '—'}
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink/50">
                        {specialty?.name}
                      </span>
                    </div>
                    {/* Bottom hairline */}
                    <div className="absolute inset-x-6 bottom-0 h-px bg-ink/8" />
                  </div>

                  {/* Text */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display font-medium text-xl leading-[1.15] tracking-tight">
                      {p.name}
                    </h3>
                    <p className="mt-2 text-sm text-ink/60 text-pretty">{p.tagline}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-ink/8 pt-4">
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink/50">
                        View product
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-ink/40 transition-all duration-300 ease-precision group-hover:text-ink group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                      />
                    </div>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function InstrumentGlyph({ slug }: { slug: string }) {
  const common = 'h-28 w-28 md:h-32 md:w-32 text-ink/25';
  const props = { stroke: 'currentColor', strokeWidth: 1.25, fill: 'none' as const };

  if (slug.includes('syringe') || slug.includes('injection')) {
    return (
      <svg className={common} viewBox="0 0 100 100" aria-hidden>
        <rect x="20" y="42" width="52" height="16" rx="1.5" {...props} />
        <line x1="72" y1="50" x2="92" y2="50" {...props} />
        <rect x="8" y="44" width="12" height="12" rx="1" {...props} />
        <line x1="30" y1="42" x2="30" y2="46" {...props} />
        <line x1="40" y1="42" x2="40" y2="46" {...props} />
        <line x1="50" y1="42" x2="50" y2="46" {...props} />
        <line x1="60" y1="42" x2="60" y2="46" {...props} />
      </svg>
    );
  }
  if (slug.includes('proctoscope') || slug.includes('scope')) {
    return (
      <svg className={common} viewBox="0 0 100 100" aria-hidden>
        <path d="M14 82 L78 20" {...props} />
        <circle cx="78" cy="20" r="10" {...props} />
        <circle cx="78" cy="20" r="3" fill="currentColor" />
      </svg>
    );
  }
  if (slug.includes('snare')) {
    return (
      <svg className={common} viewBox="0 0 100 100" aria-hidden>
        <path d="M8 50 L60 50" {...props} />
        <ellipse cx="74" cy="50" rx="20" ry="12" {...props} />
      </svg>
    );
  }
  if (slug.includes('electrode') || slug.includes('hook')) {
    return (
      <svg className={common} viewBox="0 0 100 100" aria-hidden>
        <path d="M8 50 L74 50 L74 68 L86 68" {...props} />
      </svg>
    );
  }
  if (slug.includes('speculum') || slug.includes('cusco')) {
    return (
      <svg className={common} viewBox="0 0 100 100" aria-hidden>
        <path d="M20 28 L60 40 L60 60 L20 72 Z" {...props} />
        <path d="M60 40 L92 28 L92 72 L60 60" {...props} />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 100 100" aria-hidden>
      <circle cx="50" cy="50" r="30" {...props} />
      <circle cx="50" cy="50" r="12" {...props} />
    </svg>
  );
}
