import type { Metadata } from 'next';
import { ClearViewStory } from '@/components/sections/ClearViewStory';
import { Reveal } from '@/components/motion/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { ContactCTA } from '@/components/sections/ContactCTA';

export const metadata: Metadata = {
  title: 'ClearView™ — Anti-Fog Scope Warmer',
  description:
    'ClearView™ pre-heats laparoscopes and endoscopes to body temperature — no electricity, no hot water — to resolve lens fogging during surgery.',
};

const features = [
  { k: 'Pre-heats scope to body temperature', body: 'Warms the scope before it enters the patient.' },
  { k: 'No electricity or hot water', body: 'Ready on the sterile field, no external power.' },
  { k: 'Easy to use', body: 'Designed to fit seamlessly into existing workflow.' },
];

export default function ClearViewPage() {
  return (
    <>
      <section className="relative pt-36 md:pt-44 pb-24 bg-paper border-b border-ink/8">
        <div className="container mx-auto">
          <Reveal>
            <div className="eyebrow mb-8">ClearView™ · Anti-Fog Scope Warmer · HSK-CVW</div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-display font-medium text-display-2xl leading-[0.98] tracking-tighter text-balance max-w-5xl">
              See clearly.{' '}
              <span className="text-ink/45">Perform confidently.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-xl md:text-2xl text-ink/70 text-pretty">
              Resolve lens fogging during surgery. A cold scope entering a warm
              patient environment creates condensation on the lens. ClearView™
              addresses this — without electricity, without hot water.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 flex flex-wrap items-center gap-3">
              <LinkButton href="/contact?intent=clearview" variant="primary" arrow size="lg">
                Request information
              </LinkButton>
              <LinkButton href="/products/clearview-scope-warmer" variant="ghost" arrow size="lg">
                View product spec · REF HSK-CVW
              </LinkButton>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/8 rounded-2xl overflow-hidden border border-ink/8">
              {features.map((f, i) => (
                <div key={f.k} className="bg-paper p-8 flex items-start gap-5">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-ink/50 pt-1 w-6 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <dt className="font-display font-medium text-xl tracking-tight">{f.k}</dt>
                    <dd className="mt-2 text-sm text-ink/65">{f.body}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <ClearViewStory />

      <section className="bg-paper-50 py-24 md:py-32 border-t border-ink/8">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Reveal>
            <div className="rounded-2xl border border-ink/10 bg-paper p-10 md:p-14 h-full">
              <div className="eyebrow mb-6">The problem</div>
              <h3 className="font-display font-medium text-display-lg leading-[1.02] text-balance">
                Cold lens + warm patient = condensation.
              </h3>
              <p className="mt-6 text-ink/70 text-pretty">
                A dry theatre and a humid abdominal cavity create the perfect
                conditions for a laparoscope lens to fog. Every clean-and-reinsert
                cycle is an interruption to the procedure.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-ink text-paper p-10 md:p-14 h-full">
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-paper/50 mb-6">
                The ClearView™ solution
              </div>
              <h3 className="font-display font-medium text-display-lg leading-[1.02] text-balance">
                Pre-heat. Insert. Continue.
              </h3>
              <p className="mt-6 text-paper/75 text-pretty">
                ClearView™ brings the scope up to body temperature on the sterile
                field. No electricity. No hot water. Just a clearer starting
                point for the surgeon.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
