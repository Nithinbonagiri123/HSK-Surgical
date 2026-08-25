'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { products, getSpecialty, primarySpecialtyId } from '@/lib/products';

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductExplorerPreview() {
  const rows = products.slice(0, 8);
  return (
    <section className="relative bg-paper py-28 md:py-40 border-t border-ink/8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="eyebrow mb-6">05 · Product explorer</div>
            <h2 className="font-display font-medium text-display-xl text-balance leading-[1.02] max-w-2xl">
              Every instrument. One clear index.
            </h2>
          </div>
          <p className="max-w-md text-ink/60 text-lg">
            Browse HSK&rsquo;s catalogue by specialty, procedure or REF number.
          </p>
        </div>

        <div className="rounded-2xl border border-ink/10 bg-paper-50 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 border-b border-ink/10 px-6 py-4 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/50">
            <div className="col-span-5">Instrument</div>
            <div className="col-span-3">Specialty</div>
            <div className="col-span-2">REF</div>
            <div className="col-span-2 text-right">Detail</div>
          </div>
          <ul>
            {rows.map((p, i) => {
              const specialty = getSpecialty(primarySpecialtyId(p));
              return (
                <motion.li
                  key={p.slug}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.04, duration: 0.6, ease }}
                >
                  <Link
                    href={`/products/${p.slug}`}
                    className="group grid grid-cols-12 items-center gap-4 border-b border-ink/8 px-6 py-5 transition-colors hover:bg-paper"
                  >
                    <div className="col-span-12 md:col-span-5">
                      <div className="font-display font-medium text-lg md:text-xl tracking-tight leading-tight">
                        {p.name}
                      </div>
                      <div className="mt-1 text-sm text-ink/50 md:hidden">{p.tagline}</div>
                    </div>
                    <div className="col-span-6 md:col-span-3">
                      <span className="text-sm text-ink/70">{specialty?.name ?? '—'}</span>
                    </div>
                    <div className="col-span-4 md:col-span-2 font-mono text-xs text-ink/70">
                      {p.ref ?? '—'}
                    </div>
                    <div className="col-span-2 md:col-span-2 flex justify-end">
                      <ArrowUpRight
                        size={16}
                        className="text-ink/35 transition-all duration-300 ease-precision group-hover:text-ink group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                      />
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/products" className="btn btn-ghost group">
            Open full product explorer
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 ease-precision group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
