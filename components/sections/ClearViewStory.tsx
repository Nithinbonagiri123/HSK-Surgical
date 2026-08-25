'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionTemplate } from 'framer-motion';
import { LinkButton } from '@/components/ui/Button';

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  { k: 'Cold lens · warm patient', body: 'Temperature differential creates condensation on the lens.' },
  { k: 'Pre-heat with ClearView™', body: 'Warmed to body temperature on the sterile field.' },
  { k: 'Clear view · full workflow', body: 'Fewer clean-and-reinsert interruptions.' },
];

export function ClearViewStory() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ['start end', 'end start'],
  });

  const fog = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);
  const blurPx = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 10, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const stepIndex = useTransform(scrollYProgress, [0.15, 0.45, 0.75], [0, 1, 2]);

  return (
    <section
      ref={wrap}
      className="relative overflow-hidden bg-ink text-paper py-32 md:py-44"
    >
      <div aria-hidden className="absolute inset-0 opacity-[0.04] bg-grid-fine-dark bg-grid" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/2 h-[720px] w-[720px] -translate-y-1/2 rounded-full bg-radial-accent blur-3xl"
      />

      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="eyebrow text-paper/50 mb-8">
              <span className="!bg-paper/25 h-px w-8 block" />
              04 · ClearView™ · Anti-fog scope warmer
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
              className="font-display font-medium text-display-2xl leading-[0.98] tracking-tighter text-balance"
            >
              See clearly.{' '}
              <span className="text-paper/45">Perform confidently.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="mt-8 max-w-md text-lg text-paper/70 text-pretty"
            >
              A cold scope entering a warm surgical field creates condensation.
              ClearView™ pre-heats the scope to body temperature — no
              electricity, no hot water.
            </motion.p>

            <ol className="mt-14 space-y-4">
              {steps.map((step, i) => (
                <motion.li
                  key={step.k}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.12, duration: 0.8, ease }}
                  className="flex items-start gap-5"
                >
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-paper/45 pt-1 w-6 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1 border-t border-paper/15 pt-4">
                    <div className="font-display font-medium text-xl md:text-2xl tracking-tight text-paper">
                      {step.k}
                    </div>
                    <p className="mt-1 text-sm text-paper/60 max-w-sm text-pretty">
                      {step.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <div className="mt-12 flex flex-wrap gap-3">
              <LinkButton href="/clearview" variant="onInk" arrow>Explore ClearView™</LinkButton>
              <LinkButton href="/contact?intent=clearview" variant="onInkGhost" arrow>
                Request information
              </LinkButton>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <div className="relative mx-auto aspect-square w-full max-w-[600px]">
                <div className="absolute inset-0 rounded-full border border-paper/12 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.5)]" />
                <div className="absolute inset-3 rounded-full bg-ink-900" />
                <motion.div
                  style={{ filter: reduce ? undefined : filter }}
                  className="absolute inset-6 overflow-hidden rounded-full"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,#F4C0A6_0%,#C97E7A_28%,#5D2434_60%,#0A0F1A_100%)]" />
                  <div className="absolute inset-x-8 top-1/3 h-24 rounded-full bg-white/10 blur-2xl" />
                  <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full opacity-30">
                    <path d="M40 260 Q140 200 260 250 T400 240" stroke="#F5F4F0" strokeWidth="1" fill="none" />
                    <path d="M20 320 Q160 260 320 300 T400 300" stroke="#F5F4F0" strokeWidth="1" fill="none" />
                  </svg>
                </motion.div>

                <motion.div
                  style={{ opacity: reduce ? 0.4 : fog }}
                  className="absolute inset-6 rounded-full bg-paper/85 backdrop-blur-md"
                />
                <div className="absolute inset-6 rounded-full shadow-[inset_0_0_80px_rgba(10,15,26,0.7)]" />

                <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
                  {Array.from({ length: 60 }).map((_, i) => {
                    const angle = (i / 60) * Math.PI * 2;
                    const rOuter = 96;
                    const rInner = i % 5 === 0 ? 90 : 94;
                    const cos = Math.cos(angle);
                    const sin = Math.sin(angle);
                    const round = (n: number) => Number(n.toFixed(3));
                    return (
                      <line
                        key={i}
                        x1={round(100 + cos * rOuter)}
                        y1={round(100 + sin * rOuter)}
                        x2={round(100 + cos * rInner)}
                        y2={round(100 + sin * rInner)}
                        stroke="#F5F4F0"
                        strokeOpacity={i % 5 === 0 ? 0.8 : 0.35}
                        strokeWidth={i % 5 === 0 ? 0.6 : 0.3}
                      />
                    );
                  })}
                </svg>

                <StepLabel index={stepIndex} />
              </div>

              <p className="mt-8 text-center font-mono text-[0.6rem] uppercase tracking-[0.28em] text-paper/45">
                Illustrative laparoscopic view · scroll to progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepLabel({ index }: { index: ReturnType<typeof useTransform<number, number>> }) {
  const label = useTransform(index, (v) => {
    const i = Math.round(v);
    return ['Cold scope', 'Fogging', 'ClearView™ · clear'][i] ?? '';
  });
  return (
    <motion.div className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-paper px-5 py-2 text-ink">
      <motion.span className="font-mono text-[0.68rem] uppercase tracking-[0.28em]">
        {label}
      </motion.span>
    </motion.div>
  );
}
