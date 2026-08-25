'use client';

import { Reveal } from '@/components/motion/Reveal';

export function Intro() {
  return (
    <section className="relative bg-paper py-32 md:py-44 border-t border-ink/8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3">
            <Reveal>
              <div className="eyebrow">01 · Manifesto</div>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <Reveal delay={0.1}>
              <p className="font-display font-medium text-display-xl text-balance leading-[1.05] text-ink">
                Better tools help clinicians deliver better outcomes.{' '}
                <span className="text-ink/45">
                  So we make surgical instruments that get out of the way — precise,
                  sterile, and ready when the moment demands it.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-14 flex items-center gap-6 border-t border-ink/10 pt-6 text-sm text-ink/60">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/45">
                  — HSK Surgical Ltd
                </span>
                <span className="text-ink/25">·</span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/45">
                  Ireland
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
