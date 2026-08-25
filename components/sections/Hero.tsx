'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { LazySyringeScene } from '@/components/three/LazySyringeScene';
import { LinkButton } from '@/components/ui/Button';

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper pt-28 md:pt-32 pb-16">
      {/* Fine technical grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]"
      >
        <div className="absolute inset-0 bg-grid-fine-dark bg-grid" />
      </div>
      {/* Subtle accent halo behind the syringe */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[820px] w-[820px] translate-x-1/3 -translate-y-1/2 rounded-full bg-radial-accent blur-3xl opacity-90"
      />

      <div className="container mx-auto relative">
        {/* Top marker rail */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center justify-between text-paper/60"
        >
          <div className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.28em]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse-soft" />
            <span>HSK Surgical Ltd</span>
            <span className="text-paper/25">·</span>
            <span>Ireland</span>
          </div>
          <div className="hidden md:flex items-center gap-6 font-mono text-[0.6rem] uppercase tracking-[0.28em]">
            <span>N 53.3498°</span>
            <span>W 6.2603°</span>
            <span className="text-paper/25">·</span>
            <span>MMXXVI</span>
          </div>
        </motion.div>

        {/* Main split */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left — copy */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="eyebrow text-paper/50 mb-8">
              <span className="!bg-paper/30 h-px w-8 block" />
              Precision surgical instruments
            </div>

            <h1 className="font-display font-medium text-display-3xl text-balance text-paper">
              <RevealLine delay={0.1}>Instruments</RevealLine>
              <RevealLine delay={0.22}>engineered</RevealLine>
              <RevealLine delay={0.34}>
                <span className="text-paper/45">for the moment.</span>
              </RevealLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9, ease }}
              className="mt-10 max-w-md text-lg text-paper/70 text-pretty"
            >
              An Irish surgical company. Single-use instruments and procedural
              sets across endoscopy, general surgery, gynaecology, ENT and
              electrosurgery — supplied directly by HSK.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.9, ease }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <LinkButton href="/products" variant="onInk" arrow size="lg">
                Explore the range
              </LinkButton>
              <LinkButton href="/clearview" variant="onInkGhost" arrow size="lg">
                ClearView™
              </LinkButton>
            </motion.div>

            {/* Fact rail */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.8 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-lg border-t border-paper/12 pt-6"
            >
              {[
                { k: '06', v: 'Specialties' },
                { k: '20+', v: 'Instruments' },
                { k: 'EO', v: 'Single-use sterile' },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-paper/45">
                    {s.v}
                  </dt>
                  <dd className="mt-2 font-display font-medium text-3xl tracking-tighter text-paper">
                    {s.k}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* Right — syringe stage */}
          <div className="lg:col-span-6 xl:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.35, ease }}
              className="relative aspect-[4/5] w-full max-w-[720px] mx-auto"
            >
              <LazySyringeScene className="absolute inset-0" tone="dark" interactive />

              {/* Precision corner marks */}
              {['tl', 'tr', 'bl', 'br'].map((c) => (
                <span
                  key={c}
                  aria-hidden
                  className={
                    'absolute h-4 w-4 border-paper/25 pointer-events-none ' +
                    (c === 'tl' ? 'top-3 left-3 border-l border-t' : '') +
                    (c === 'tr' ? 'top-3 right-3 border-r border-t' : '') +
                    (c === 'bl' ? 'bottom-3 left-3 border-l border-b' : '') +
                    (c === 'br' ? 'bottom-3 right-3 border-r border-b' : '')
                  }
                />
              ))}

              {/* Technical callouts */}
              <div className="absolute top-6 left-8 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper/55">
                <div>Ref · Single-use syringe</div>
                <div className="mt-1 text-paper/35">Reference model</div>
              </div>
              <div className="absolute bottom-6 right-8 text-right font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper/55">
                <div>01 / 06</div>
                <div className="mt-1 text-paper/35">Interactive · move cursor</div>
              </div>

              {/* Vertical measurement ticks on left */}
              <div aria-hidden className="absolute inset-y-8 left-6 flex flex-col justify-between">
                {['00', '25', '50', '75', '100'].map((n) => (
                  <div key={n} className="flex items-center gap-2 text-paper/25">
                    <span className="h-px w-4 bg-paper/25" />
                    <span className="font-mono text-[0.5rem] tracking-widest">{n}</span>
                  </div>
                ))}
              </div>

              {/* Subtle scan line */}
              {!reduce && (
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute -inset-x-4 h-20 bg-gradient-to-b from-transparent via-accent/5 to-transparent animate-scan-line" />
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="mt-16 md:mt-24 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.28em] text-paper/40">
          <span>Scroll · The HSK Catalogue</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1, delay, ease }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
