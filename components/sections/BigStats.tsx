'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { n: '06', label: 'Surgical specialties' },
  { n: '20+', label: 'Instruments in range' },
  { n: '100%', label: 'EO sterile · single-use' },
  { n: '01', label: 'Direct line to HSK' },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function BigStats() {
  return (
    <section className="relative bg-paper-50 py-24 md:py-32 border-y border-ink/8">
      <div className="container mx-auto">
        <div className="mb-14 max-w-2xl">
          <div className="eyebrow mb-6">06 · By the numbers</div>
          <h2 className="font-display font-medium text-display-lg leading-[1.02] text-balance">
            A focused catalogue.
          </h2>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink/8 rounded-2xl overflow-hidden border border-ink/8">
          {stats.map((s, i) => (
            <StatCard key={s.label} n={s.n} label={s.label} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatCard({ n, label, index }: { n: string; label: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(n);

  useEffect(() => {
    if (!inView) return;
    const target = parseInt(n, 10);
    if (Number.isNaN(target)) return;
    const suffix = n.replace(/^\d+/, '');
    const start = 0;
    const dur = 900;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(start + (target - start) * eased);
      setDisplay(`${val}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, n]);

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay: index * 0.06, ease }}
      className="group relative bg-paper p-8 md:p-10 transition-colors duration-500 hover:bg-paper-100"
    >
      <div className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/50">
        {label}
      </div>
      <div className="mt-6 font-display font-medium text-[clamp(3.5rem,8vw,6rem)] leading-[0.9] tracking-tighter text-ink">
        {display}
      </div>
    </motion.li>
  );
}
