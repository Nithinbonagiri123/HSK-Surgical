'use client';

import { motion } from 'framer-motion';
import { LazyNeedleTipScene } from '@/components/three/LazyNeedleTipScene';

const ease = [0.22, 1, 0.36, 1] as const;

const callouts = [
  { top: '18%', left: '58%', label: 'Bevel tip', code: '01', side: 'right' },
  { top: '38%', left: '52%', label: 'Needle shaft', code: '02', side: 'right' },
  { top: '62%', left: '48%', label: 'Luer connection', code: '03', side: 'left' },
  { top: '78%', left: '52%', label: 'Colour-coded hub', code: '04', side: 'right' },
] as const;

export function NeedleCloseup() {
  return (
    <section className="relative bg-paper py-32 md:py-44 border-t border-ink/8 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4">
            <div className="eyebrow mb-8">05 · Macro</div>
            <h2 className="font-display font-medium text-display-xl leading-[1.02] tracking-tighter text-balance">
              A closer look.
            </h2>
            <p className="mt-8 text-lg text-ink/70 text-pretty max-w-md">
              The details that matter to the surgeon rarely announce themselves.
              A precision bevel. A colour-coded hub. A clean luer taper. Every
              tolerance chosen so the instrument is invisible to the hand and
              obvious to the outcome.
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-6 max-w-sm border-t border-ink/10 pt-6">
              <div>
                <dt className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/50">
                  Material
                </dt>
                <dd className="mt-2 text-ink/85">Stainless steel</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/50">
                  Bevel
                </dt>
                <dd className="mt-2 text-ink/85">Regular</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/50">
                  Connection
                </dt>
                <dd className="mt-2 text-ink/85">Luer taper</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/50">
                  Use
                </dt>
                <dd className="mt-2 text-ink/85">Single-use</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-8">
            <div className="relative mx-auto aspect-square w-full max-w-[720px]">
              {/* 3D scene */}
              <div className="absolute inset-0">
                <LazyNeedleTipScene className="absolute inset-0" />
              </div>

              {/* Corner marks */}
              {['tl', 'tr', 'bl', 'br'].map((c) => (
                <span
                  key={c}
                  aria-hidden
                  className={
                    'absolute h-4 w-4 border-ink/25 pointer-events-none ' +
                    (c === 'tl' ? 'top-3 left-3 border-l border-t' : '') +
                    (c === 'tr' ? 'top-3 right-3 border-r border-t' : '') +
                    (c === 'bl' ? 'bottom-3 left-3 border-l border-b' : '') +
                    (c === 'br' ? 'bottom-3 right-3 border-r border-b' : '')
                  }
                />
              ))}

              {/* Animated callouts */}
              {callouts.map((c, i) => (
                <motion.div
                  key={c.code}
                  initial={{ opacity: 0, x: c.side === 'right' ? 12 : -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.9, ease }}
                  className={`absolute flex items-center gap-3 ${c.side === 'right' ? 'flex-row' : 'flex-row-reverse'}`}
                  style={{ top: c.top, left: c.left }}
                >
                  {/* Anchor dot */}
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-accent" />
                    <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-40" />
                  </span>
                  {/* Leader line */}
                  <span className={`h-px w-16 md:w-24 bg-ink/40`} />
                  {/* Label */}
                  <span className="rounded-sm border border-ink/20 bg-paper/95 backdrop-blur-sm px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink whitespace-nowrap">
                    <span className="text-ink/50 mr-2">{c.code}</span>
                    {c.label}
                  </span>
                </motion.div>
              ))}

              {/* Scale marker */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.28em] text-ink/50">
                <span className="h-px w-16 bg-ink/40" />
                <span>≈ 25 mm</span>
                <span className="h-px w-16 bg-ink/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
