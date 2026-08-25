'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import { LazySyringeScene } from '@/components/three/LazySyringeScene';

const ease = [0.22, 1, 0.36, 1] as const;

const callouts = [
  { k: '01', label: 'Barrel', copy: 'Optical-grade barrel with clear graduation ticks for accurate dosing.' },
  { k: '02', label: 'Luer hub', copy: 'Precision-machined connection for a secure, leak-free needle interface.' },
  { k: '03', label: 'Needle', copy: 'Fine-gauge stainless-steel needle designed for controlled delivery.' },
  { k: '04', label: 'Cap', copy: 'Single-use protective cap. Sterile until moment of use.' },
];

export function PrecisionExplode() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start end', 'end start'] });
  const explode = useTransform(scrollYProgress, [0.2, 0.55, 0.9], [0, 1, 0.85]);
  const rotY = useTransform(scrollYProgress, [0, 1], [-0.35, 0.35]);

  return (
    <section
      ref={wrap}
      className="relative bg-ink text-paper overflow-hidden py-32 md:py-44"
    >
      <div aria-hidden className="absolute inset-0 opacity-[0.04] bg-grid-fine-dark bg-grid" />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 h-[820px] w-[820px] translate-x-1/4 -translate-y-1/2 rounded-full bg-radial-accent blur-3xl opacity-90"
      />

      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="eyebrow text-paper/50 mb-8">
              <span className="!bg-paper/25 h-px w-8 block" />
              04 · Instrument laboratory
            </div>
            <h2 className="font-display font-medium text-display-2xl leading-[0.98] tracking-tighter text-balance">
              Engineered —{' '}
              <span className="text-paper/45">component by component.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg text-paper/70 text-pretty">
              A single-use syringe shown as its makers see it: barrel, hub,
              needle, cap. Each element made to a purpose.
            </p>

            <ul className="mt-14 space-y-6">
              {callouts.map((c, i) => (
                <motion.li
                  key={c.k}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease }}
                  className="flex items-start gap-5"
                >
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-paper/45 pt-1 w-6 shrink-0">
                    {c.k}
                  </span>
                  <div className="flex-1 border-t border-paper/15 pt-4">
                    <div className="font-display font-medium text-xl md:text-2xl tracking-tight">{c.label}</div>
                    <p className="mt-1 text-sm text-paper/60 max-w-sm text-pretty">
                      {c.copy}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="sticky top-24 h-[min(75svh,720px)]">
              <div className="relative h-full w-full">
                <ExplodeLive explode={explode} rotY={rotY} reduce={reduce ?? false} />

                {/* Measurement ticks */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-y-0 left-4 flex flex-col justify-between py-4">
                    {['1', '2', '3', '4', '5'].map((t) => (
                      <div key={t} className="flex items-center gap-2">
                        <span className="h-px w-4 bg-paper/25" />
                        <span className="font-mono text-[0.55rem] tracking-widest text-paper/40">
                          {t}0
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <span className="absolute top-4 right-4 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper/40">
                  Exploded view · Scroll to actuate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExplodeLive({
  explode,
  rotY,
  reduce,
}: {
  explode: MotionValue<number>;
  rotY: MotionValue<number>;
  reduce: boolean;
}) {
  const [state, setState] = useState({ explode: explode.get(), rotY: rotY.get() });
  useMotionValueEvent(explode, 'change', (v) => setState((p) => ({ ...p, explode: v })));
  useMotionValueEvent(rotY, 'change', (v) => setState((p) => ({ ...p, rotY: v })));
  useEffect(() => {
    setState({ explode: explode.get(), rotY: rotY.get() });
  }, [explode, rotY]);

  return (
    <LazySyringeScene
      explode={reduce ? 0.6 : state.explode}
      interactive={false}
      tone="dark"
      className="absolute inset-0 h-full w-full"
    />
  );
}
